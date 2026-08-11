"use client";

import Image from "next/image";
import {
  useEffect,
  useState,
  type MouseEvent,
} from "react";
import styles from "./Header.module.css";

const navigationItems = [
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
    label: "Clientes",
    href: "#clientes",
  },
  {
    label: "Contacto",
    href: "#contacto",
  },
];

const socialNetworks = [
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

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] =
    useState("#inicio");

  useEffect(() => {
    let animationFrame = 0;

    const updateHeader = () => {
      cancelAnimationFrame(animationFrame);

      animationFrame = window.requestAnimationFrame(() => {
        const hasScrolled = window.scrollY > 24;

        setScrolled(hasScrolled);

        const marker =
          window.scrollY +
          Math.min(window.innerHeight * 0.32, 260);

        let currentSection = "#inicio";

        navigationItems.forEach((item) => {
          const section =
            document.querySelector<HTMLElement>(
              item.href
            );

          if (section && section.offsetTop <= marker) {
            currentSection = item.href;
          }
        });

        setActiveSection(currentSection);
      });
    };

    updateHeader();

    window.addEventListener("scroll", updateHeader, {
      passive: true,
    });

    window.addEventListener("resize", updateHeader);

    return () => {
      cancelAnimationFrame(animationFrame);

      window.removeEventListener(
        "scroll",
        updateHeader
      );

      window.removeEventListener(
        "resize",
        updateHeader
      );
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    const handleResize = () => {
      if (window.innerWidth > 980) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);
    window.addEventListener("resize", handleResize);

    return () => {
      document.body.style.overflow = previousOverflow;

      window.removeEventListener(
        "keydown",
        handleEscape
      );

      window.removeEventListener(
        "resize",
        handleResize
      );
    };
  }, [menuOpen]);

  const handleNavigation = (
    event: MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    const destination =
      document.querySelector<HTMLElement>(href);

    if (!destination) {
      return;
    }

    event.preventDefault();

    setMenuOpen(false);
    setActiveSection(href);

    const headerOffset =
      window.innerWidth <= 980 ? 70 : 68;

    const destinationPosition =
      destination.getBoundingClientRect().top +
      window.scrollY -
      headerOffset;

    window.scrollTo({
      top: Math.max(destinationPosition, 0),
      behavior: "smooth",
    });
  };

  return (
    <header className={styles.header}>
      <div
        className={styles.fixedHeader}
        data-scrolled={scrolled}
        data-menu-open={menuOpen}
      >
        <div className={styles.topBar}>
          <div className={styles.topBarContent}>
            <a
              className={styles.emailLink}
              href="mailto:contacto@ferreteriarioloa.cl"
            >
              <span className={styles.topIcon}>
                <Image
                  src="/icono-correo.webp"
                  alt=""
                  width={18}
                  height={18}
                />
              </span>

              <span>
                contacto@ferreteriarioloa.cl
              </span>
            </a>

            <div
              className={styles.topSocial}
              aria-label="Redes sociales"
            >
              <span className={styles.followText}>
                Síguenos
              </span>

              {socialNetworks.map((network) => (
                <a
                  key={network.label}
                  className={styles.topSocialLink}
                  href={network.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visitar ${network.label}`}
                  title={network.label}
                >
                  <Image
                    src={network.icon}
                    alt=""
                    width={17}
                    height={17}
                  />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.mainBar}>
          <div className={styles.mainBarContent}>
            <a
              className={styles.logoLink}
              href="#inicio"
              onClick={(event) =>
                handleNavigation(event, "#inicio")
              }
              aria-label="Ferretería Río Loa - Inicio"
            >
              <Image
                className={styles.logo}
                src={
                  menuOpen
                    ? "/logo-rio-loa-menu-blanco.webp"
                    : "/logo-rio-loa-menu.webp"
                }
                alt="Ferretería Río Loa"
                width={240}
                height={100}
                priority
                sizes="(max-width: 980px) 165px, 200px"
              />
            </a>

            <nav
              className={styles.desktopNavigation}
              aria-label="Navegación principal"
            >
              {navigationItems.map((item) => (
                <a
                  key={item.href}
                  className={
                    activeSection === item.href
                      ? styles.activeLink
                      : undefined
                  }
                  href={item.href}
                  onClick={(event) =>
                    handleNavigation(
                      event,
                      item.href
                    )
                  }
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <a
              className={styles.quoteButton}
              href="https://wa.me/56975669127?text=Hola%2C%20quiero%20solicitar%20informaci%C3%B3n%20o%20cotizaci%C3%B3n%20para%20productos%20de%20Ferreter%C3%ADa%20R%C3%ADo%20Loa."
              target="_blank"
              rel="noopener noreferrer"
            >
              Solicitar cotización
            </a>

            <button
              className={styles.menuButton}
              type="button"
              aria-label={
                menuOpen
                  ? "Cerrar menú"
                  : "Abrir menú"
              }
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              onClick={() =>
                setMenuOpen((current) => !current)
              }
            >
              <span className={styles.menuButtonText}>
                {menuOpen ? "Cerrar" : "Menú"}
              </span>

              <span
                className={styles.menuIcon}
                aria-hidden="true"
              >
                <span className={styles.menuLineTop} />

                <span
                  className={styles.menuLineMiddle}
                />

                <span
                  className={styles.menuLineBottom}
                />
              </span>
            </button>
          </div>
        </div>

        <div
          id="mobile-navigation"
          className={styles.mobileMenu}
          data-open={menuOpen}
          aria-hidden={!menuOpen}
        >
          <span
            className={styles.waveOne}
            aria-hidden="true"
          />

          <span
            className={styles.waveTwo}
            aria-hidden="true"
          />

          <span
            className={styles.menuDecoration}
            aria-hidden="true"
          />

          <div className={styles.mobileMenuContent}>
            <div className={styles.mobileMenuHeading}>
              <span />

              <p>Navegación</p>
            </div>

            <nav
              className={styles.mobileNavigation}
              aria-label="Navegación móvil"
            >
              {navigationItems.map((item) => (
                <a
                  key={item.href}
                  className={
                    activeSection === item.href
                      ? styles.mobileActiveLink
                      : undefined
                  }
                  href={item.href}
                  tabIndex={menuOpen ? 0 : -1}
                  onClick={(event) =>
                    handleNavigation(
                      event,
                      item.href
                    )
                  }
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <div className={styles.mobileMenuFooter}>
              <a
                className={styles.mobileQuoteButton}
                href="https://wa.me/56979886283?text=Hola%2C%20quiero%20solicitar%20informaci%C3%B3n%20o%20cotizaci%C3%B3n%20para%20productos%20de%20Ferreter%C3%ADa%20R%C3%ADo%20Loa."
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={menuOpen ? 0 : -1}
              >
                Solicitar cotización
              </a>

              <div className={styles.mobileContactRow}>
                <a
                  href="mailto:contacto@ferreteriarioloa.cl"
                  tabIndex={menuOpen ? 0 : -1}
                >
                  contacto@ferreteriarioloa.cl
                </a>

                <div
                  className={styles.mobileSocial}
                  aria-label="Redes sociales"
                >
                  {socialNetworks.map((network) => (
                    <a
                      key={network.label}
                      href={network.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visitar ${network.label}`}
                      tabIndex={menuOpen ? 0 : -1}
                    >
                      <Image
                        src={network.icon}
                        alt=""
                        width={20}
                        height={20}
                      />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}