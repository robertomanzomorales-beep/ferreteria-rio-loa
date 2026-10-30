import type { Metadata } from "next";
import Link from "next/link";
import PrivacyPage from "../components/PrivacyPage";
import { BUSINESS } from "@/lib/privacy";

export const metadata: Metadata = { title: "Aviso legal | Ferretería Río Loa", description: "Información del sitio, contacto comercial y condiciones de uso de los contenidos de Ferretería Río Loa." };

export default function LegalNoticePage() {
  return <PrivacyPage title="Aviso legal" intro="Información de contacto y condiciones de uso del sitio web de Ferretería Río Loa." current="/aviso-legal">
    <section><h2>Identificación y contacto</h2><p>Este sitio presenta los productos, servicios y canales de atención de <strong>{BUSINESS.name}</strong>, ubicada en {BUSINESS.address}.</p><p>Para consultas comerciales o relativas al sitio, escriba a <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a>. También puede contactar a Administración al <a href="tel:+56965975372">+56 9 6597 5372</a>.</p></section>
    <section><h2>Información comercial y cotizaciones</h2><p>Los contenidos tienen una finalidad informativa. El envío de un formulario constituye una solicitud de atención o cotización y no confirma por sí solo una compra, una reserva de productos o una aprobación de crédito.</p><p>La disponibilidad, precios, condiciones de despacho y demás condiciones comerciales deben confirmarse con el equipo de la ferretería para cada requerimiento. Esto no limita los derechos que correspondan a los consumidores conforme a la ley.</p></section>
    <section><h2>Uso de contenidos y marcas</h2><p>Las fotografías, textos, identidad visual y demás contenidos se presentan para informar sobre la actividad de la ferretería. Las marcas de productos y los logotipos de otras empresas pertenecen a sus respectivos titulares; su presencia no atribuye derechos de propiedad a Ferretería Río Loa.</p><p>Para solicitar autorización de reutilización de contenidos propios o comunicar una observación sobre ellos, utilice el correo de contacto.</p></section>
    <section><h2>Enlaces a otros servicios</h2><p>El sitio ofrece enlaces a plataformas externas para facilitar la comunicación, la consulta de ubicación o el acceso a información. Esos servicios tienen sus propias condiciones y políticas. Consulte <Link href="/cookies">Cookies y navegación</Link> para conocer cuándo intervienen.</p></section>
    <section><h2>Datos personales</h2><p>El uso de los datos proporcionados en el formulario se explica en la <Link href="/privacidad">Política de privacidad</Link>. Para consultar o ejercer derechos, visite <Link href="/proteccion-de-datos">Derechos sobre sus datos</Link>.</p></section>
  </PrivacyPage>;
}
