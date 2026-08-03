"use client";

import Image from "next/image";
import {
  type CSSProperties,
  type FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "./Contact.module.css";

type FormStatus = "idle" | "sending" | "success" | "error";

type Department = {
  area: string;
  phone: string;
  phoneHref: string;
  emails: string[];
};

type FormSubmitResponse = {
  success?: boolean | string;
  message?: string;
};

const FORM_ENDPOINT =
  "https://formsubmit.co/ajax/contacto@ferreteriarioloa.cl";

const departments: Department[] = [
  {
    area: "Administración / Jefatura",
    phone: "+56 9 6597 5372",
    phoneHref: "tel:+56965975372",
    emails: [
      "pagoproveedores@ferreteriarioloa.cl",
      "contacto@ferreteriarioloa.cl",
    ],
  },
  {
    area: "Abastecimiento / Logística",
    phone: "+56 9 5179 1483",
    phoneHref: "tel:+56951791483",
    emails: ["abastecimiento@ferreteriarioloa.cl"],
  },
  {
    area: "Ventas empresas",
    phone: "+56 9 8819 5180",
    phoneHref: "tel:+56988195180",
    emails: ["ventas@ferreteriarioloa.cl"],
  },
  {
    area: "Ventas mesón 1",
    phone: "+56 9 7988 6283",
    phoneHref: "tel:+56979886283",
    emails: ["ventasmeson@ferreteriarioloa.cl"],
  },
  {
    area: "Ventas mesón 2",
    phone: "+56 9 7566 9127",
    phoneHref: "tel:+56975669127",
    emails: ["ventasmeson@ferreteriarioloa.cl"],
  },
];

const socialNetworks = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/ferreteria.rio.loa/",
    icon: "/logo-instagram.webp",
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/FerreteriaRioLoa",
    icon: "/logo-facebook.webp",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/ferreter%C3%ADa-r%C3%ADo-loa-32a72831a/",
    icon: "/logo-linkedin.webp",
  },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement | null>(null);

  const [isVisible, setIsVisible] = useState(false);
  const [formStatus, setFormStatus] =
    useState<FormStatus>("idle");

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, []);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const senderEmail = formData.get("Correo electrónico");

    if (
      typeof senderEmail === "string" &&
      senderEmail.trim().length > 0
    ) {
      formData.set("_replyto", senderEmail.trim());
    }

    setFormStatus("sending");

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("No fue posible enviar el formulario.");
      }

      const result =
        (await response.json()) as FormSubmitResponse;

      if (
        result.success === false ||
        result.success === "false"
      ) {
        throw new Error(
          result.message || "FormSubmit rechazó el envío."
        );
      }

      form.reset();
      setFormStatus("success");
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      setFormStatus("error");
    }
  }

  return (
    <section
      ref={sectionRef}
      id="contacto"
      className={`${styles.contact} ${
        isVisible ? styles.isVisible : ""
      }`}
      aria-labelledby="contact-title"
    >
      <div className={styles.container}>
        <header className={styles.sectionHeader}>
          <div className={styles.headingBlock}>
            <span className={styles.eyebrow}>
              Contacto y cotizaciones
            </span>

            <h2 id="contact-title" className={styles.title}>
              Hablemos de su requerimiento
            </h2>
          </div>

          <p className={styles.headerText}>
            Nuestro equipo está disponible para atender compras,
            cotizaciones y requerimientos de empresas, minería,
            construcción y clientes particulares.
          </p>
        </header>

        <div className={styles.mainLayout}>
          <div className={styles.directoryColumn}>
            <div className={styles.directoryHeading}>
              <span className={styles.smallLabel}>
                Atención especializada
              </span>

              <h3>
                Comuníquese directamente con el área indicada.
              </h3>

              <p>
                Seleccione el contacto correspondiente para recibir
                una respuesta más rápida y precisa.
              </p>
            </div>

            <div className={styles.departmentList}>
              {departments.map((department, index) => (
                <article
                  className={styles.department}
                  key={`${department.area}-${department.phone}`}
                  style={
                    {
                      "--item-index": index,
                    } as CSSProperties
                  }
                >
                  <span className={styles.departmentNumber}>
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div className={styles.departmentInformation}>
                    <h4>{department.area}</h4>

                    <div className={styles.emailList}>
                      {department.emails.map((email) => (
                        <a
                          key={email}
                          href={`mailto:${email}`}
                        >
                          {email}
                        </a>
                      ))}
                    </div>
                  </div>

                  <a
                    className={styles.departmentPhone}
                    href={department.phoneHref}
                  >
                    {department.phone}
                  </a>
                </article>
              ))}
            </div>

            <div className={styles.directChannels}>
              <div className={styles.directChannel}>
                <Image
                  className={styles.channelIcon}
                  src="/logo-whatsapp.webp"
                  alt=""
                  width={32}
                  height={32}
                />

                <div className={styles.channelContent}>
                  <span>Atención por WhatsApp</span>
                  <strong>+56 9 7988 6283</strong>

                  <a
                    href="https://wa.me/56979886283?text=Hola%2C%20quiero%20solicitar%20informaci%C3%B3n%20o%20una%20cotizaci%C3%B3n."
                    target="_blank"
                    rel="noreferrer"
                  >
                    Iniciar conversación
                  </a>
                </div>
              </div>

              <div className={styles.directChannel}>
                <Image
                  className={styles.channelIcon}
                  src="/icono-direccion.webp"
                  alt=""
                  width={32}
                  height={32}
                />

                <div className={styles.channelContent}>
                  <span>Nuestra ubicación</span>
                  <strong>Av. Grecia 880, Calama</strong>

                  <a
                    href="https://www.google.com/maps/place/Ferreter%C3%ADa+R%C3%ADo+Loa/@-22.473361,-68.9315727,264m/data=!3m1!1e3!4m6!3m5!1s0x96ac084a91eb99f5:0x5031a6ec2061703d!8m2!3d-22.4736527!4d-68.9311718!16s%2Fg%2F11dxcqw01d?entry=ttu&g_ep=EgoyMDI2MDcyOS4wIKXMDSoASAFQAw%3D%3D"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Consultar ubicación
                  </a>
                </div>
              </div>
            </div>

            <div className={styles.socialArea}>
              <span>Síganos en redes sociales</span>

              <div className={styles.socialNetworks}>
                {socialNetworks.map((network) => (
                  <a
                    key={network.name}
                    className={styles.socialLink}
                    href={network.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Visitar ${network.name} de Ferretería Río Loa`}
                    title={network.name}
                  >
                    <Image
                      src={network.icon}
                      alt=""
                      width={28}
                      height={28}
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.formPanel}>
            <div className={styles.formHeading}>
              <span
                className={styles.formIconBox}
                aria-hidden="true"
              >
                <Image
                  className={styles.formIcon}
                  src="/icono-correo.webp"
                  alt=""
                  width={24}
                  height={24}
                />
              </span>

              <div className={styles.formHeadingText}>
                <span className={styles.formEyebrow}>
                  Solicitud comercial
                </span>
                <h3>Envíenos su requerimiento</h3>
              </div>
            </div>

            <p className={styles.formIntroduction}>
              Complete el formulario y nuestro equipo revisará su
              solicitud para responder con disponibilidad,
              alternativas y condiciones de entrega.
            </p>

            <form
              className={styles.form}
              onSubmit={handleSubmit}
              aria-busy={formStatus === "sending"}
            >
              <input
                type="hidden"
                name="_subject"
                value="Nueva solicitud desde Ferretería Río Loa"
              />

              <input
                type="hidden"
                name="_template"
                value="table"
              />

              <input
                type="hidden"
                name="_captcha"
                value="false"
              />

              <input
                className={styles.honeypot}
                type="text"
                name="_honey"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />

              <div className={styles.field}>
                <label htmlFor="contact-name">
                  Nombre y apellido
                </label>

                <input
                  id="contact-name"
                  name="Nombre y apellido"
                  type="text"
                  autoComplete="name"
                  placeholder="Ingrese su nombre"
                  required
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="contact-company">
                  Empresa
                </label>

                <input
                  id="contact-company"
                  name="Empresa"
                  type="text"
                  autoComplete="organization"
                  placeholder="Nombre de la empresa"
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="contact-position">
                  Cargo
                </label>

                <input
                  id="contact-position"
                  name="Cargo"
                  type="text"
                  autoComplete="organization-title"
                  placeholder="Cargo o área"
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="contact-email">
                  Correo electrónico
                </label>

                <input
                  id="contact-email"
                  name="Correo electrónico"
                  type="email"
                  autoComplete="email"
                  placeholder="correo@empresa.cl"
                  required
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="contact-phone">
                  Teléfono / WhatsApp
                </label>

                <input
                  id="contact-phone"
                  name="Teléfono / WhatsApp"
                  type="tel"
                  autoComplete="tel"
                  placeholder="+56 9 1234 5678"
                  required
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="contact-type">
                  Tipo de cliente
                </label>

                <select
                  id="contact-type"
                  name="Tipo de cliente"
                  defaultValue=""
                  required
                >
                  <option value="" disabled>
                    Seleccione una opción
                  </option>
                  <option value="Empresa">Empresa</option>
                  <option value="Minería">Minería</option>
                  <option value="Construcción">
                    Construcción
                  </option>
                  <option value="Maestro o contratista">
                    Maestro o contratista
                  </option>
                  <option value="Cliente particular">
                    Cliente particular
                  </option>
                  <option value="Institución pública">
                    Institución pública
                  </option>
                </select>
              </div>

              <div
                className={`${styles.field} ${styles.fullField}`}
              >
                <label htmlFor="contact-product">
                  Producto o servicio requerido
                </label>

                <input
                  id="contact-product"
                  name="Producto o servicio requerido"
                  type="text"
                  placeholder="Indique brevemente lo que necesita"
                  required
                />
              </div>

              <div
                className={`${styles.field} ${styles.fullField}`}
              >
                <label htmlFor="contact-message">
                  Mensaje / requerimiento
                </label>

                <textarea
                  id="contact-message"
                  name="Mensaje / requerimiento"
                  rows={5}
                  placeholder="Cuéntenos los detalles de su solicitud"
                  required
                />
              </div>

              <div className={styles.submitArea}>
                <button
                  className={styles.submitButton}
                  type="submit"
                  disabled={formStatus === "sending"}
                >
                  {formStatus === "sending"
                    ? "Enviando solicitud..."
                    : "Enviar solicitud"}
                </button>

                <p>
                  Sus datos serán utilizados únicamente para
                  responder este requerimiento.
                </p>
              </div>

              <div
                className={`${styles.formMessage} ${
                  formStatus === "success"
                    ? styles.successMessage
                    : ""
                } ${
                  formStatus === "error"
                    ? styles.errorMessage
                    : ""
                }`}
                role="status"
                aria-live="polite"
              >
                {formStatus === "success" && (
                  <>
                    <strong>
                      Mensaje enviado correctamente.
                    </strong>
                    <span>
                      Recibimos su requerimiento en
                      contacto@ferreteriarioloa.cl y nuestro
                      equipo responderá a la brevedad.
                    </span>
                  </>
                )}

                {formStatus === "error" && (
                  <>
                    <strong>
                      No pudimos enviar el mensaje.
                    </strong>
                    <span>
                      Inténtelo nuevamente o comuníquese
                      directamente por WhatsApp.
                    </span>
                  </>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}