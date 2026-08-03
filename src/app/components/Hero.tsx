"use client";

import Image from "next/image";
import {
  type CSSProperties,
  type FocusEvent,
  type TouchEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "./Hero.module.css";

type HeroSlide = {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  imagePosition: string;
  mobileImagePosition: string;
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
    imageAlt:
      "Equipo de Ferretería Río Loa atendiendo a sus clientes",
    imagePosition: "center center",
    mobileImagePosition: "58% center",
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
    mobileImagePosition: "center center",
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
    mobileImagePosition: "55% center",
    primaryLabel: "Cotizar para empresa",
    primaryHref: "#contacto",
    secondaryLabel: "Conózcanos",
    secondaryHref: "#quienes-somos",
  },
];

const AUTO_PLAY_DELAY = 6500;
const SWIPE_THRESHOLD = 55;

export default function Hero() {
  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);

  const [activeSlide, setActiveSlide] = useState(0);
  const [isPointerInside, setIsPointerInside] =
    useState(false);
  const [isFocusInside, setIsFocusInside] =
    useState(false);
  const [isTouching, setIsTouching] =
    useState(false);
  const [isDocumentVisible, setIsDocumentVisible] =
    useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] =
    useState(false);

  const currentSlide = slides[activeSlide];

  const isPaused =
    isPointerInside ||
    isFocusInside ||
    isTouching ||
    !isDocumentVisible;

  useEffect(() => {
    const motionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    const updateMotionPreference = () => {
      setPrefersReducedMotion(motionQuery.matches);
    };

    updateMotionPreference();

    motionQuery.addEventListener(
      "change",
      updateMotionPreference
    );

    return () => {
      motionQuery.removeEventListener(
        "change",
        updateMotionPreference
      );
    };
  }, []);

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsDocumentVisible(
        document.visibilityState === "visible"
      );
    };

    handleVisibilityChange();

    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange
    );

    return () => {
      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange
      );
    };
  }, []);

  useEffect(() => {
    if (isPaused || prefersReducedMotion) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setActiveSlide((current) =>
        current === slides.length - 1
          ? 0
          : current + 1
      );
    }, AUTO_PLAY_DELAY);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [
    activeSlide,
    isPaused,
    prefersReducedMotion,
  ]);

  const goToSlide = (index: number) => {
    const normalizedIndex =
      (index + slides.length) % slides.length;

    setActiveSlide(normalizedIndex);
  };

  const goToPreviousSlide = () => {
    setActiveSlide((current) =>
      current === 0
        ? slides.length - 1
        : current - 1
    );
  };

  const goToNextSlide = () => {
    setActiveSlide((current) =>
      current === slides.length - 1
        ? 0
        : current + 1
    );
  };

  const handleBlurCapture = (
    event: FocusEvent<HTMLElement>
  ) => {
    const nextElement =
      event.relatedTarget as Node | null;

    if (
      !nextElement ||
      !event.currentTarget.contains(nextElement)
    ) {
      setIsFocusInside(false);
    }
  };

  const handleTouchStart = (
    event: TouchEvent<HTMLElement>
  ) => {
    const touch = event.touches[0];

    if (!touch) {
      return;
    }

    touchStartXRef.current = touch.clientX;
    touchStartYRef.current = touch.clientY;
    setIsTouching(true);
  };

  const handleTouchEnd = (
    event: TouchEvent<HTMLElement>
  ) => {
    const touch = event.changedTouches[0];

    const startX = touchStartXRef.current;
    const startY = touchStartYRef.current;

    touchStartXRef.current = null;
    touchStartYRef.current = null;
    setIsTouching(false);

    if (
      !touch ||
      startX === null ||
      startY === null
    ) {
      return;
    }

    const distanceX = touch.clientX - startX;
    const distanceY = touch.clientY - startY;

    const isHorizontalGesture =
      Math.abs(distanceX) > Math.abs(distanceY);

    if (
      !isHorizontalGesture ||
      Math.abs(distanceX) < SWIPE_THRESHOLD
    ) {
      return;
    }

    if (distanceX > 0) {
      goToPreviousSlide();
      return;
    }

    goToNextSlide();
  };

  const handleTouchCancel = () => {
    touchStartXRef.current = null;
    touchStartYRef.current = null;
    setIsTouching(false);
  };

  return (
    <section
      id="inicio"
      className={styles.hero}
      aria-roledescription="carrusel"
      aria-label="Destacados de Ferretería Río Loa"
      onMouseEnter={() => setIsPointerInside(true)}
      onMouseLeave={() => setIsPointerInside(false)}
      onFocusCapture={() => setIsFocusInside(true)}
      onBlurCapture={handleBlurCapture}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchCancel}
    >
      <div className={styles.slides}>
        {slides.map((slide, index) => {
          const isActive = index === activeSlide;

          const imageStyles = {
            "--desktop-image-position":
              slide.imagePosition,
            "--mobile-image-position":
              slide.mobileImagePosition,
          } as CSSProperties;

          return (
            <div
              key={slide.image}
              className={`${styles.slide} ${
                isActive ? styles.slideActive : ""
              }`}
              aria-hidden={!isActive}
            >
              <Image
                className={styles.backgroundImage}
                src={slide.image}
                alt={isActive ? slide.imageAlt : ""}
                fill
                priority={index === 0}
                loading={
                  index === 0 ? undefined : "eager"
                }
                fetchPriority={
                  index === 0 ? "high" : "auto"
                }
                quality={90}
                sizes="100vw"
                draggable={false}
                style={imageStyles}
              />
            </div>
          );
        })}

        <div
          className={styles.overlay}
          aria-hidden="true"
        />

        <div className={styles.contentWrapper}>
          <div
            key={`content-${activeSlide}`}
            className={styles.content}
          >
            <p className={styles.eyebrow}>
              {currentSlide.eyebrow}
            </p>

            <h1 className={styles.title}>
              {currentSlide.title}
            </h1>

            <p className={styles.description}>
              {currentSlide.description}
            </p>

            <div className={styles.actions}>
              <a
                className={styles.primaryButton}
                href={currentSlide.primaryHref}
              >
                <span>{currentSlide.primaryLabel}</span>

                <Image
                  className={styles.buttonArrowImage}
                  src="/flecha-horizontal.webp"
                  alt=""
                  width={19}
                  height={19}
                  aria-hidden="true"
                />
              </a>

              <a
                className={styles.secondaryButton}
                href={currentSlide.secondaryHref}
              >
                {currentSlide.secondaryLabel}
              </a>
            </div>
          </div>
        </div>
      </div>

      <button
        className={`${styles.arrow} ${styles.arrowPrevious}`}
        type="button"
        onClick={goToPreviousSlide}
        aria-label="Ver lámina anterior"
      >
        <Image
          className={`${styles.arrowImage} ${styles.arrowImagePrevious}`}
          src="/flecha-horizontal.webp"
          alt=""
          width={22}
          height={22}
          aria-hidden="true"
        />
      </button>

      <button
        className={`${styles.arrow} ${styles.arrowNext}`}
        type="button"
        onClick={goToNextSlide}
        aria-label="Ver siguiente lámina"
      >
        <Image
          className={styles.arrowImage}
          src="/flecha-horizontal.webp"
          alt=""
          width={22}
          height={22}
          aria-hidden="true"
        />
      </button>

      <div
        className={styles.pagination}
        aria-label="Seleccionar lámina"
      >
        {slides.map((slide, index) => (
          <button
            key={slide.title}
            className={`${styles.paginationButton} ${
              index === activeSlide
                ? styles.paginationButtonActive
                : ""
            }`}
            type="button"
            onClick={() => goToSlide(index)}
            aria-label={`Ver lámina ${index + 1}: ${slide.title}`}
            aria-current={
              index === activeSlide
                ? "true"
                : undefined
            }
          />
        ))}
      </div>
    </section>
  );
}