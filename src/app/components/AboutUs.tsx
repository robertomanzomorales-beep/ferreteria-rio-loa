"use client";

import Image from "next/image";
import {
  useEffect,
  useRef,
  type CSSProperties,
} from "react";
import styles from "./AboutUs.module.css";

type RevealStyle = CSSProperties & {
  "--reveal-delay": string;
};

const revealDelay = (delay: number): RevealStyle => ({
  "--reveal-delay": `${delay}ms`,
});

export default function AboutUs() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const elements = Array.from(
      section.querySelectorAll<HTMLElement>("[data-reveal]"),
    );

    const revealElement = (element: HTMLElement) => {
      element.classList.add(styles.revealed);
    };

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (
      prefersReducedMotion ||
      !("IntersectionObserver" in window)
    ) {
      elements.forEach(revealElement);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          revealElement(entry.target as HTMLElement);
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.11,
        rootMargin: "0px 0px -5% 0px",
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
      id="quienes-somos"
      ref={sectionRef}
      className={styles.about}
    >
      <div
        className={styles.backgroundGeometry}
        aria-hidden="true"
      />

      <div className={styles.container}>
        <div className={styles.content}>
          <p
            className={`${styles.eyebrow} ${styles.revealUp}`}
            data-reveal
            style={revealDelay(0)}
          >
            QUIÉNES SOMOS
          </p>

          <h2
            className={`${styles.title} ${styles.revealUp}`}
            data-reveal
            style={revealDelay(80)}
          >
            Una historia construida
            <span> junto a Calama.</span>
          </h2>

          <p
            className={`${styles.lead} ${styles.revealUp}`}
            data-reveal
            style={revealDelay(160)}
          >
            Más que una ferretería, somos un equipo local que
            entiende las necesidades y desafíos de quienes trabajan
            y construyen en nuestra ciudad.
          </p>

          <p
            className={`${styles.description} ${styles.revealUp}`}
            data-reveal
            style={revealDelay(220)}
          >
            Durante más de 20 años hemos acompañado a familias,
            maestros, contratistas y empresas con atención
            personalizada, productos confiables y una respuesta
            cercana. Somos atendidos por nuestros propios dueños y
            por colaboradores comprometidos con entregar soluciones
            claras y oportunas.
          </p>

          <div className={styles.facts}>
            <article
              className={`${styles.fact} ${styles.revealUp}`}
              data-reveal
              style={revealDelay(100)}
            >
              <strong>+20</strong>

              <span>
                Años creciendo
                <br />
                junto a Calama
              </span>
            </article>

            <article
              className={`${styles.fact} ${styles.revealUp}`}
              data-reveal
              style={revealDelay(180)}
            >
              <strong>Local</strong>

              <span>
                Experiencia y conocimiento
                <br />
                de nuestra zona
              </span>
            </article>

            <article
              className={`${styles.fact} ${styles.revealUp}`}
              data-reveal
              style={revealDelay(260)}
            >
              <strong>Directa</strong>

              <span>
                Atención cercana
                <br />
                y personalizada
              </span>
            </article>
          </div>
        </div>

        <div
          className={styles.visual}
          aria-label="Historia y equipo de Ferretería Río Loa"
        >
          <div
            className={`${styles.accentLine} ${styles.accentLineTop} ${styles.revealLine}`}
            data-reveal
            style={revealDelay(40)}
            aria-hidden="true"
          />

          <div
            className={`${styles.accentLine} ${styles.accentLineMiddle} ${styles.revealLine}`}
            data-reveal
            style={revealDelay(120)}
            aria-hidden="true"
          />

          <div
            className={`${styles.accentLine} ${styles.accentLineBottom} ${styles.revealLine}`}
            data-reveal
            style={revealDelay(200)}
            aria-hidden="true"
          />

          <figure
            className={`${styles.photo} ${styles.historyPhoto} ${styles.revealLeft}`}
            data-reveal
            style={revealDelay(80)}
          >
            <div className={styles.imageArea}>
              <Image
                src="/antigua-ferreteria.webp"
                alt="Historia de Ferretería Río Loa"
                fill
                sizes="(max-width: 620px) 44vw, 220px"
                className={styles.image}
              />
            </div>
          </figure>

          <figure
            className={`${styles.photo} ${styles.teamPhoto} ${styles.revealRight}`}
            data-reveal
            style={revealDelay(160)}
          >
            <div className={styles.imageArea}>
              <Image
                src="/colaboradores.webp"
                alt="Equipo de colaboradores de Ferretería Río Loa"
                fill
                sizes="(max-width: 620px) 50vw, 430px"
                className={styles.image}
              />
            </div>
          </figure>

          <figure
            className={`${styles.photo} ${styles.ownerPhoto} ${styles.revealLeft}`}
            data-reveal
            style={revealDelay(100)}
          >
            <div className={styles.imageArea}>
              <Image
                src="/dueno.webp"
                alt="Atención directa del dueño de Ferretería Río Loa"
                fill
                sizes="(max-width: 620px) 43vw, 190px"
                className={styles.image}
              />
            </div>
          </figure>

          <figure
            className={`${styles.photo} ${styles.businessPhoto} ${styles.revealRight}`}
            data-reveal
            style={revealDelay(180)}
          >
            <div className={styles.imageArea}>
              <Image
                src="/local-por-fuera.webp"
                alt="Ferretería Río Loa colaborando con empresas"
                fill
                sizes="(max-width: 620px) 50vw, 300px"
                className={styles.image}
              />
            </div>
          </figure>

          <div
            className={`${styles.brandSignature} ${styles.revealUp}`}
            data-reveal
            style={revealDelay(240)}
          >
            <span className={styles.signatureEyebrow}>
              FERRETERÍA RÍO LOA
            </span>

            <strong>
              Preocupados
              <span>por ti.</span>
            </strong>

            <small>CALAMA · CHILE</small>
          </div>

          <figure
            className={`${styles.photo} ${styles.communityPhoto} ${styles.revealUp}`}
            data-reveal
            style={revealDelay(160)}
          >
            <div className={styles.imageArea}>
              <Image
                src="/lazos-con-empresas.webp"
                alt="Representantes de Ferretería Río Loa junto a empresas"
                fill
                sizes="(max-width: 620px) 92vw, 390px"
                className={styles.image}
              />
            </div>
          </figure>
        </div>
      </div>
    </section>
  );
}