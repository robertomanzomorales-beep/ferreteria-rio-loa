"use client";

import { useEffect, useState } from "react";
import styles from "./WhatsAppButton.module.css";

const whatsappUrl =
  "https://wa.me/56979886283?text=Hola%2C%20quisiera%20solicitar%20informaci%C3%B3n%20o%20una%20cotizaci%C3%B3n%20de%20Ferreter%C3%ADa%20R%C3%ADo%20Loa.";

export default function WhatsAppButton() {
  const [footerVisible, setFooterVisible] = useState(false);

  useEffect(() => {
    const footer = document.querySelector("footer");

    if (!footer) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setFooterVisible(entry.isIntersecting);
      },
      {
        threshold: 0,
        rootMargin: "0px 0px 130px 0px",
      }
    );

    observer.observe(footer);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      className={styles.wrapper}
      data-footer-visible={footerVisible}
    >
      <div className={styles.message}>
        <span className={styles.messageAccent} />

        <div>
          <strong>¿Necesitas ayuda?</strong>
          <span>Escríbenos por WhatsApp</span>
        </div>
      </div>

      <a
        className={styles.button}
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar a Ferretería Río Loa por WhatsApp"
        title="Escríbenos por WhatsApp"
      >
        <span className={styles.pulse} aria-hidden="true" />

        <svg
          className={styles.icon}
          viewBox="0 0 24 24"
          aria-hidden="true"
          focusable="false"
        >
          <path
            fill="currentColor"
            d="M12.04 2C6.52 2 2.03 6.48 2.03 12c0 1.76.46 3.48 1.33 4.99L2 22l5.13-1.35A9.96 9.96 0 0 0 12.04 22h.01c5.52 0 10.01-4.48 10.01-10S17.57 2 12.04 2Zm0 18.31a8.3 8.3 0 0 1-4.23-1.16l-.3-.18-3.05.8.81-2.97-.2-.31A8.3 8.3 0 1 1 12.04 20.31Zm4.56-6.22c-.25-.13-1.48-.73-1.71-.81-.23-.08-.4-.13-.57.13-.17.25-.65.81-.8.98-.15.17-.3.19-.55.06-.25-.13-1.06-.39-2.01-1.24a7.5 7.5 0 0 1-1.39-1.73c-.15-.25-.02-.38.11-.51.11-.11.25-.3.38-.44.12-.15.16-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.57-1.37-.78-1.88-.21-.5-.42-.43-.57-.44h-.49c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1s.9 2.44 1.03 2.61c.12.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.43.52.6.19 1.15.16 1.58.1.48-.07 1.48-.61 1.69-1.19.21-.59.21-1.09.15-1.19-.06-.11-.23-.17-.48-.3Z"
          />
        </svg>

        <span
          className={styles.notification}
          aria-hidden="true"
        >
          1
        </span>
      </a>
    </div>
  );
}