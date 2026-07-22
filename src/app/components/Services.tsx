"use client";

import {
  useEffect,
  useRef,
  type CSSProperties,
} from "react";
import styles from "./Services.module.css";

type Service = {
  number: string;
  title: string;
  description: string;
};

type RevealStyle = CSSProperties & {
  "--reveal-delay": string;
};

const services: Service[] = [
  {
    number: "01",
    title: "Productos para construcción",
    description:
      "Materiales y productos para obras, reparaciones, proyectos y necesidades de clientes del hogar, maestros y empresas.",
  },
  {
    number: "02",
    title: "Productos para minería",
    description:
      "Abastecimiento de productos asociados a operaciones, mantención y requerimientos del rubro minero e industrial.",
  },
  {
    number: "03",
    title: "Atención personalizada a empresas",
    description:
      "Apoyo directo en requerimientos, compras específicas y coordinación comercial para responder de forma clara y oportuna.",
  },
  {
    number: "04",
    title: "Despacho a domicilio",
    description:
      "Entrega de productos a domicilio según coordinación y disponibilidad, facilitando sus compras y ahorrando tiempo.",
  },
  {
    number: "05",
    title: "Acercamiento a puntos de encuentro",
    description:
      "Coordinación para acercar productos a puntos de encuentro definidos por empresas y apoyar sus procesos de abastecimiento.",
  },
  {
    number: "06",
    title: "Crédito a empresas",
    description:
      "Alternativa comercial disponible para clientes empresa, sujeta a evaluación y a las condiciones internas de Ferretería Río Loa.",
  },
  {
    number: "07",
    title: "Mercado público",
    description:
      "Participación en Mercado Público para atender requerimientos de instituciones, organizaciones y empresas.",
  },
  {
    number: "08",
    title: "Evaluación SICEP",
    description:
      "Más de un 80% de puntaje obtenido en evaluación SICEP, respaldando nuestro compromiso con una atención profesional y confiable.",
  },
];

const revealDelay = (delay: number): RevealStyle => ({
  "--reveal-delay": `${delay}ms`,
});

export default function Services() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const elements = Array.from(
      section.querySelectorAll<HTMLElement>("[data-reveal]"),
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          const element = entry.target as HTMLElement;

          element.classList.add(styles.revealed);
          observer.unobserve(element);
        });
      },
      {
        threshold: 0.14,
        rootMargin: "0px 0px -8% 0px",
      },
    );

    elements.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      id="servicios"
      ref={sectionRef}
      className={styles.services}
    >
      <div className={styles.backgroundShape} aria-hidden="true" />
      <div className={styles.backgroundLine} aria-hidden="true" />

      <div className={styles.container}>
        <header className={styles.heading}>
          <div className={styles.headingMain}>
            <p
              className={`${styles.eyebrow} ${styles.revealUp}`}
              data-reveal
              style={revealDelay(0)}
            >
              NUESTROS SERVICIOS
            </p>

            <h2
              className={`${styles.title} ${styles.revealUp}`}
              data-reveal
              style={revealDelay(90)}
            >
              Soluciones que ayudan
              <span> a ganar tiempo.</span>
            </h2>
          </div>

          <div
            className={`${styles.introduction} ${styles.revealUp}`}
            data-reveal
            style={revealDelay(180)}
          >
            <p>
              Atendemos las necesidades de empresas, minería, construcción,
              maestros y clientes del hogar con una respuesta cercana,
              confiable y profesional.
            </p>

            <p>
              Desde una compra específica hasta la coordinación de un
              abastecimiento, nuestro equipo le ayuda a encontrar una solución
              clara y oportuna.
            </p>
          </div>
        </header>

        <div className={styles.servicesGrid}>
          {services.map((service, index) => (
            <article
              key={service.number}
              className={`${styles.service} ${styles.revealUp}`}
              data-reveal
              style={revealDelay(100 + (index % 4) * 90)}
            >
              <span className={styles.number} aria-hidden="true">
                {service.number}
              </span>

              <div className={styles.serviceContent}>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            </article>
          ))}
        </div>

        <div
          className={`${styles.closing} ${styles.revealUp}`}
          data-reveal
          style={revealDelay(240)}
        >
          <div className={styles.closingContent}>
            <span>¿NECESITA UN PRODUCTO ESPECÍFICO?</span>

            <p>
              Cuéntenos qué necesita y nuestro equipo le ayudará a revisar
              disponibilidad, alternativas y coordinación de entrega.
            </p>
          </div>

          <a
            href="https://wa.me/56979886283?text=Hola%2C%20quiero%20solicitar%20informaci%C3%B3n%20o%20cotizaci%C3%B3n%20para%20productos%20de%20Ferreter%C3%ADa%20R%C3%ADo%20Loa."
            target="_blank"
            rel="noopener noreferrer"
            className={styles.button}
          >
            Solicitar cotización
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}