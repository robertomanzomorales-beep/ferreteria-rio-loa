"use client";

import Image from "next/image";
import {
  useEffect,
  useRef,
  type MouseEvent,
} from "react";
import styles from "./Footer.module.css";

const quickLinks = [
  {
    label: "Inicio",
    href: "#inicio",
  },
  {
    label: "Quiénes somos",
    href: "#quienes-somos",
  },
  {
    label: "Servicios",
    href: "#servicios",
  },
  {
    label: "Galería",
    href: "#galeria",
  },
  {
    label: "Marcas",
    href: "#marcas",
  },
  {
    label: "Clientes",
    href: "#clientes",
  },
  {
    label: "Contacto",
    href: "#contacto",
  },
];

const socialLinks = [
  {
    label: "Facebook",
    href: "https://facebook.com/FerreteriaRioLoa",
    icon: "/logo-facebook.webp",
  },
  {
    label: "Instagram",
    href: "https://instagram.com/ferreteria.rio.loa",
    icon: "/logo-instagram.webp",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/ferreter%C3%ADa-r%C3%ADo-loa-32a72831a/",
    icon: "/logo-linkedin.webp",
  },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const footer = footerRef.current;

    if (!footer) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.setAttribute("data-visible", "true");
        observer.unobserve(entry.target);
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -6% 0px",
      }
    );

    observer.observe(footer);

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleNavigation = (
    event: MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (!href.startsWith("#")) {
      return;
    }

    const destination = document.querySelector(href);

    if (!destination) {
      return;
    }

    event.preventDefault();

    destination.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <footer ref={footerRef} className={styles.footer}>
      <div className={styles.imageSection}>
        <Image
          className={styles.backgroundImage}
          src="/cartel-ferreteria.webp"
          alt=""
          fill
          sizes="100vw"
        />

        <span
          className={styles.imageOverlay}
          aria-hidden="true"
        />

        <span
          className={styles.blueGlow}
          aria-hidden="true"
        />

        <div className={styles.slogan}>
          <span
            className={styles.sloganLine}
            aria-hidden="true"
          />

          <p>Ferretería Río Loa</p>

          <h2>
            El amor por tu hogar
            <span> nos une.</span>
          </h2>
        </div>
      </div>

      <div className={styles.informationWrapper}>
        <div className={styles.information}>
          <div
            className={`${styles.column} ${styles.brandColumn}`}
          >
            <a
              className={styles.logoLink}
              href="#inicio"
              onClick={(event) =>
                handleNavigation(event, "#inicio")
              }
              aria-label="Volver al inicio"
            >
              <Image
                className={styles.logo}
                src="/logo-rio-loa-menu.webp"
                alt="Ferretería Río Loa"
                width={290}
                height={130}
                sizes="245px"
              />
            </a>

            <p className={styles.description}>
              Ferretería, construcción y abastecimiento para
              empresas mineras, maestros y hogares de Calama.
            </p>

            <div
              className={styles.socialNetworks}
              aria-label="Redes sociales"
            >
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  className={styles.socialLink}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visitar ${social.label}`}
                  title={social.label}
                >
                  <Image
                    className={styles.socialIcon}
                    src={social.icon}
                    alt=""
                    width={22}
                    height={22}
                  />
                </a>
              ))}
            </div>
          </div>

          <div className={styles.column}>
            <div className={styles.columnHeading}>
              <span aria-hidden="true" />
              <h3>Accesos rápidos</h3>
            </div>

            <nav
              className={styles.navigation}
              aria-label="Navegación del pie de página"
            >
              {quickLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(event) =>
                    handleNavigation(event, link.href)
                  }
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          <div className={styles.column}>
            <div className={styles.columnHeading}>
              <span aria-hidden="true" />
              <h3>Contacto principal</h3>
            </div>

            <div className={styles.contactList}>
              <a
                className={styles.contactItem}
                href="https://wa.me/56975669127"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className={styles.contactIcon}>
                  <Image
                    src="/logo-whatsapp.webp"
                    alt=""
                    width={22}
                    height={22}
                  />
                </span>

                <span>
                  <small>WhatsApp</small>
                  <strong>+56 9 7566 9127</strong>
                </span>
              </a>

              <a
                className={styles.contactItem}
                href="mailto:contacto@ferreteriarioloa.cl"
              >
                <span className={styles.contactIcon}>
                  <Image
                    src="/icono-correo.webp"
                    alt=""
                    width={22}
                    height={22}
                  />
                </span>

                <span>
                  <small>Correo general</small>
                  <strong>
                    contacto@ferreteriarioloa.cl
                  </strong>
                </span>
              </a>

              <a
                className={styles.contactItem}
                href="mailto:ventas@ferreteriarioloa.cl"
              >
                <span className={styles.contactIcon}>
                  <Image
                    src="/icono-correo.webp"
                    alt=""
                    width={22}
                    height={22}
                  />
                </span>

                <span>
                  <small>Ventas empresas</small>
                  <strong>
                    ventas@ferreteriarioloa.cl
                  </strong>
                </span>
              </a>
            </div>
          </div>

          <div className={styles.column}>
            <div className={styles.columnHeading}>
              <span aria-hidden="true" />
              <h3>Ferretería Río Loa</h3>
            </div>

            <address className={styles.address}>
              <a
                className={styles.addressItem}
                href="https://www.google.com/maps/place/Ferreter%C3%ADa+R%C3%ADo+Loa/@-22.473361,-68.9315727,264m/data=!3m1!1e3!4m6!3m5!1s0x96ac084a91eb99f5:0x5031a6ec2061703d!8m2!3d-22.4736527!4d-68.9311718!16s%2Fg%2F11dxcqw01d?entry=ttu&g_ep=EgoyMDI2MDcyOS4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className={styles.contactIcon}>
                  <Image
                    src="/icono-direccion.webp"
                    alt=""
                    width={22}
                    height={22}
                  />
                </span>

                <span>
                  <small>Dirección</small>
                  <strong>
                    Av. Grecia 880
                    <br />
                    Calama, Chile
                  </strong>
                </span>
              </a>

              <a
                className={styles.addressItem}
                href="tel:+56965975372"
              >
                <span className={styles.contactIcon}>
                  <Image
                    src="/icono-telefono.webp"
                    alt=""
                    width={22}
                    height={22}
                  />
                </span>

                <span>
                  <small>Administración</small>
                  <strong>+56 9 6597 5372</strong>
                </span>
              </a>
            </address>

            <a
              className={styles.quoteButton}
              href="https://wa.me/56975669127?text=Hola%2C%20quiero%20solicitar%20informaci%C3%B3n%20o%20cotizaci%C3%B3n%20para%20productos%20de%20Ferreter%C3%ADa%20R%C3%ADo%20Loa."
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>Solicitar cotización</span>

              <Image
                className={styles.buttonArrowImage}
                src="/flecha-horizontal.webp"
                alt=""
                width={21}
                height={21}
                aria-hidden="true"
              />
            </a>
          </div>
        </div>
      </div>

      <div className={styles.bottomBar}>
        <div className={styles.bottomContent}>
          <p>
            © 2026 Ferretería Río Loa. Todos los derechos
            reservados.
          </p>

          <span>
            Ferretería, construcción y abastecimiento en Calama
          </span>

          <a
            className={styles.vialoopCredit}
            href="https://vialoop.cl"
            target="_blank"
            rel="noopener noreferrer"
          >
            Diseñado y potenciado por Vialoop.cl
          </a>
        </div>
      </div>
    </footer>
  );
}