import { BUSINESS, PRIVACY_CONSENT, PRIVACY_VERSION } from "../../../lib/privacy";

const LIMIT = 30_000;
const fields = [
  ["Nombre y apellido", 120, true],
  ["Empresa", 180, false],
  ["Cargo", 120, false],
  ["Correo electrónico", 254, true],
  ["Teléfono / WhatsApp", 50, true],
  ["Tipo de cliente", 80, true],
  ["Producto o servicio requerido", 240, true],
  ["Mensaje / requerimiento", 4000, true],
] as const;

const customerTypes = new Set(["Empresa", "Minería", "Construcción", "Maestro o contratista", "Cliente particular", "Institución pública"]);
const failure = (status: number) => Response.json({ success: false }, { status, headers: { "Cache-Control": "no-store" } });

export async function POST(request: Request) {
  if (request.headers.get("origin") !== new URL(request.url).origin) return failure(403);
  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) return failure(415);
  if (Number(request.headers.get("content-length")) > LIMIT) return failure(413);

  let data: Record<string, unknown>;
  try {
    const raw = await request.text();
    if (new TextEncoder().encode(raw).length > LIMIT) return failure(413);
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return failure(400);
    data = parsed as Record<string, unknown>;
  } catch {
    return failure(400);
  }

  if (data.consentimiento !== "on" || data._honey) return failure(400);
  if (data.version_politica_privacidad !== PRIVACY_VERSION) return failure(409);
  const payload: Record<string, string> = {};
  for (const [name, maxLength, required] of fields) {
    const value = data[name];
    if (value !== undefined && typeof value !== "string") return failure(400);
    const text = typeof value === "string" ? value.trim() : "";
    if ((required && !text) || text.length > maxLength) return failure(400);
    payload[name] = text;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload["Correo electrónico"]) || !customerTypes.has(payload["Tipo de cliente"])) return failure(400);

  Object.assign(payload, {
    autorizacion_datos_personales: PRIVACY_CONSENT,
    consentimiento: "Aceptado expresamente mediante casilla no premarcada",
    version_politica_privacidad: PRIVACY_VERSION,
    fecha_autorizacion_utc: new Date().toISOString(),
    politica_consultada: `${BUSINESS.origin}/privacidad`,
    _subject: "Nueva solicitud desde Ferretería Río Loa",
    _replyto: payload["Correo electrónico"],
    _template: "table",
    _captcha: "false",
    _url: BUSINESS.origin,
  });

  try {
    const response = await fetch(`https://formsubmit.co/ajax/${BUSINESS.email}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json", Referer: `${BUSINESS.origin}/` },
      body: JSON.stringify(payload),
      cache: "no-store",
      signal: AbortSignal.timeout(15000),
    });
    if (!response.ok) return failure(502);
    const result: unknown = await response.json();
    if (!result || typeof result !== "object" || !("success" in result) || (result.success !== true && result.success !== "true")) return failure(502);
    return Response.json({ success: true }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return failure(502);
  }
}
