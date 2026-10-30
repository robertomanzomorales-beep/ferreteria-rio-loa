import assert from "node:assert/strict";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { createRequire } from "node:module";
import ts from "typescript";

const temp = await mkdtemp(path.join(tmpdir(), "rio-privacy-"));
const originalFetch = globalThis.fetch;
const require = createRequire(import.meta.url);
const origin = "https://www.ferreteriarioloa.cl";
let forwarded;
let calls = 0;

try {
  const root = path.resolve("src");
  const program = ts.createProgram([path.join(root, "app/api/contacto/route.ts"), path.join(root, "lib/privacy.ts")], {
    rootDir: root, outDir: temp, target: ts.ScriptTarget.ES2022,
    module: ts.ModuleKind.CommonJS, moduleResolution: ts.ModuleResolutionKind.Node10,
    strict: true, skipLibCheck: true, esModuleInterop: true,
  });
  const result = program.emit();
  const diagnostics = ts.getPreEmitDiagnostics(program).concat(result.diagnostics);
  assert.equal(diagnostics.filter(d => d.category === ts.DiagnosticCategory.Error).length, 0, ts.formatDiagnosticsWithColorAndContext(diagnostics, {
    getCanonicalFileName: n => n, getCurrentDirectory: () => process.cwd(), getNewLine: () => "\n",
  }));
  await writeFile(path.join(temp, "package.json"), '{"type":"commonjs"}');
  const { POST } = require(path.join(temp, "app/api/contacto/route.js"));
  const { PRIVACY_CONSENT, PRIVACY_VERSION } = require(path.join(temp, "lib/privacy.js"));
  const valid = {
    "Nombre y apellido": "Prueba de validación", "Empresa": "", "Cargo": "",
    "Correo electrónico": "prueba@example.com", "Teléfono / WhatsApp": "+56 9 1234 5678",
    "Tipo de cliente": "Empresa", "Producto o servicio requerido": "Herramientas",
    "Mensaje / requerimiento": "Prueba controlada; no enviar correos reales.",
    consentimiento: "on", _honey: "", version_politica_privacidad: PRIVACY_VERSION,
  };
  const request = (body, headers = {}) => new Request(`${origin}/api/contacto`, {
    method: "POST", headers: { Origin: origin, "Content-Type": "application/json", ...headers },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
  globalThis.fetch = async (url, options) => {
    calls++;
    assert.equal(url, "https://formsubmit.co/ajax/contacto@ferreteriarioloa.cl");
    forwarded = JSON.parse(options.body);
    return Response.json({ success: "true" });
  };

  for (const consent of [undefined, false, true, "", "off"]) {
    const response = await POST(request({ ...valid, consentimiento: consent }));
    assert.equal(response.status, 400);
  }
  assert.equal((await POST(request(valid, { Origin: "https://otro.example" }))).status, 403);
  assert.equal((await POST(request(valid, { Origin: "" }))).status, 403);
  assert.equal((await POST(request(valid, { "Content-Type": "text/plain" }))).status, 415);
  assert.equal((await POST(request("{invalid"))).status, 400);
  assert.equal((await POST(request({ ...valid, _honey: "bot" }))).status, 400);
  assert.equal((await POST(request({ ...valid, version_politica_privacidad: "falsa" }))).status, 409);
  assert.equal((await POST(request({ ...valid, version_politica_privacidad: undefined }))).status, 409);
  assert.equal((await POST(request({ ...valid, "Correo electrónico": "invalido" }))).status, 400);
  assert.equal((await POST(request({ ...valid, "Tipo de cliente": "Otro" }))).status, 400);
  assert.equal((await POST(request({ ...valid, "Nombre y apellido": "   " }))).status, 400);
  assert.equal((await POST(request({ ...valid, "Mensaje / requerimiento": "x".repeat(4001) }))).status, 400);
  assert.equal((await POST(request({ ...valid, extra: "x".repeat(30000) }))).status, 413);
  assert.equal(calls, 0, "Los envíos inválidos no deben llegar al proveedor");

  const before = Date.now();
  const success = await POST(request({ ...valid, _replyto: "ajeno@example.com", _subject: "Manipulado", fecha_autorizacion_utc: "2000-01-01", autorizacion_datos_personales: "Manipulado" }));
  assert.equal(success.status, 200);
  assert.deepEqual(await success.json(), { success: true });
  assert.equal(forwarded.autorizacion_datos_personales, PRIVACY_CONSENT);
  assert.equal(forwarded.version_politica_privacidad, PRIVACY_VERSION);
  assert.equal(forwarded._replyto, valid["Correo electrónico"]);
  assert.equal(forwarded._subject, "Nueva solicitud desde Ferretería Río Loa");
  assert.ok(Date.parse(forwarded.fecha_autorizacion_utc) >= before);
  assert.equal(forwarded.politica_consultada, `${origin}/privacidad`);
  assert.equal(success.headers.get("Cache-Control"), "no-store");

  for (const value of [false, "false", undefined]) {
    globalThis.fetch = async () => Response.json({ success: value });
    assert.equal((await POST(request(valid))).status, 502);
  }
  globalThis.fetch = async () => new Response("Proveedor no disponible", { status: 503 });
  assert.equal((await POST(request(valid))).status, 502);
  globalThis.fetch = async () => new Response("Respuesta no interpretable", { status: 200 });
  assert.equal((await POST(request(valid))).status, 502);
  globalThis.fetch = async () => { throw new Error("Timeout simulado"); };
  assert.equal((await POST(request(valid))).status, 502);
  console.log("OK: consentimiento obligatorio, validación, origen, límites, constancia fiable y errores del proveedor. Sin envíos reales.");
} finally {
  globalThis.fetch = originalFetch;
  await rm(temp, { recursive: true, force: true });
}
