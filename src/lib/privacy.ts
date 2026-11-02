export const PRIVACY_VERSION = "2026-11-02";
export const PRIVACY_UPDATED = "2 de noviembre de 2026";
export const BUSINESS = {
  name: "Ferretería Río Loa",
  legalName: "Javier Rojas Vega",
  legalRepresentative: "Javier Rojas Vega",
  email: "contacto@ferreteriarioloa.cl",
  address: "Av. Grecia 880, Calama, Chile",
  origin: "https://www.ferreteriarioloa.cl",
};

export const PRIVACY_CONSENT =
  `Autorizo a ${BUSINESS.legalName}, quien opera bajo el nombre comercial ${BUSINESS.name}, a tratar los datos que proporciono para responder esta solicitud y gestionar su cotización. He leído la Política de privacidad, que informa el uso de FormSubmit para enviar mi solicitud al correo de la empresa.`;

export const PRIVACY_DOCUMENTS = [
  { href: "/privacidad", label: "Política de privacidad" },
  { href: "/cookies", label: "Cookies y navegación" },
  { href: "/proteccion-de-datos", label: "Derechos sobre sus datos" },
  { href: "/aviso-legal", label: "Aviso legal" },
];

export const RIGHTS_EMAIL = `mailto:${BUSINESS.email}?subject=${encodeURIComponent("Solicitud sobre datos personales")}&body=${encodeURIComponent("Nombre:\nCorreo para recibir respuesta:\nRelación con Ferretería Río Loa o fecha aproximada de la consulta:\nSolicitud que deseo presentar:\nDescripción de los datos o antecedentes involucrados:\n")}`;
