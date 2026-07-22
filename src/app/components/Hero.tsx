"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./Hero.module.css";

type HeroSlide = {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  imagePosition: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
};

const slides: HeroSlide[] = [
  {
    eyebrow: "FERRETERÍA RÍO LOA · CALAMA",
    title: "Cercanía y confianza para cada proyecto.",
    description:
      "Acompañamos a nuestros clientes con productos ferreteros, herramientas y una atención comprometida.",
    image: "/portada-1-ferreteria-rio-loa.webp",
    imageAlt: "Equipo de Ferretería Río Loa atendiendo a sus clientes",
    imagePosition: "center center",
    primaryLabel: "Solicitar cotización",
    primaryHref: "#contacto",
    secondaryLabel: "Conózcanos",
    secondaryHref: "#quienes-somos",
  },
  {
    eyebrow: "DESPACHO Y ABASTECIMIENTO",
    title: "Productos donde su proyecto los necesita.",
    description:
      "Coordinamos pedidos y despachos para apoyar a maestros, empresas y clientes de Calama.",
    image: "/portada-2-ferreteria-rio-loa.webp",
    imageAlt: "Camión de despacho de Ferretería Río Loa",
    imagePosition: "center center",
    primaryLabel: "Solicitar cotización",
    primaryHref: "#contacto",
    secondaryLabel: "Ver servicios",
    secondaryHref: "#servicios",
  },
  {
    eyebrow: "CALAMA · ZONA NORTE",
    title: "Abastecimiento para una zona que no se detiene.",
    description:
      "Entendemos las exigencias de la construcción, mantención y operación de empresas en Calama.",
    image: "/Portada%20Calama.webp",
    imageAlt: "Maquinaria industrial y grúa en Calama",
    imagePosition: "center center",
    primaryLabel: "Cotizar para empresa",
    primaryHref: "#contacto",
    secondaryLabel: "Conózcanos",
    secondaryHref: "#quienes-somos",
  },
];

const AUTO_PLAY_DELAY = 6500;

export default function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveSlide((currentSlide) =>
        currentSlide === slides.length - 1 ? 0 : currentSlide + 1,
      );
    }, AUTO_PLAY_DELAY);

    return () => window.clearInterval(interval);
  }, []);

  const goToPreviousSlide = () => {
    setActiveSlide((currentSlide) =>
      currentSlide === 0 ? slides.length - 1 : currentSlide - 1,
    );
  };

  const goToNextSlide = () => {
    setActiveSlide((currentSlide) =>
      currentSlide === slides.length - 1 ? 0 : currentSlide + 1,
    );
  };

  return (
    <section
      className={styles.hero}
      aria-roledescription="carrusel"
      aria-label="Destacados Ferretería Río Loa"
    >
      <div className={styles.slides}>
        {slides.map((slide, index) => {
          const isActive = index === activeSlide;

          return (
            <article
              className={`${styles.slide} ${
                isActive ? styles.slideActive : ""
              }`}
              key={slide.title}
              aria-hidden={!isActive}
            >
              <Image
                className={styles.backgroundImage}
                src={slide.image}
                alt={slide.imageAlt}
                fill
                priority={index === 0}
                sizes="100vw"
                style={{ objectPosition: slide.imagePosition }}
              />

              <div className={styles.overlay} />

              <div className={styles.contentWrapper}>
                <div
                  className={`${styles.content} ${
                    isActive ? styles.contentActive : ""
                  }`}
                >
                  <p className={styles.eyebrow}>{slide.eyebrow}</p>

                  <h1 className={styles.title}>{slide.title}</h1>

                  <p className={styles.description}>{slide.description}</p>

                  <div className={styles.actions}>
                    <a className={styles.primaryButton} href={slide.primaryHref}>
                      {slide.primaryLabel}
                      <span aria-hidden="true">→</span>
                    </a>

                    <a
                      className={styles.secondaryButton}
                      href={slide.secondaryHref}
                    >
                      {slide.secondaryLabel}
                    </a>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <button
        className={`${styles.arrow} ${styles.arrowPrevious}`}
        type="button"
        onClick={goToPreviousSlide}
        aria-label="Ver lámina anterior"
      >
        <span aria-hidden="true">←</span>
      </button>

      <button
        className={`${styles.arrow} ${styles.arrowNext}`}
        type="button"
        onClick={goToNextSlide}
        aria-label="Ver siguiente lámina"
      >
        <span aria-hidden="true">→</span>
      </button>

      <div className={styles.pagination} aria-label="Seleccionar lámina">
        {slides.map((slide, index) => (
          <button
            className={`${styles.paginationButton} ${
              index === activeSlide ? styles.paginationButtonActive : ""
            }`}
            type="button"
            key={slide.title}
            onClick={() => setActiveSlide(index)}
            aria-label={`Ver lámina ${index + 1}`}
            aria-current={index === activeSlide ? "true" : undefined}
          />
        ))}
      </div>
    </section>
  );
}