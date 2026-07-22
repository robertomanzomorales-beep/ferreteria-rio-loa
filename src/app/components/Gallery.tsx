"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import styles from "./Gallery.module.css";

type GalleryImage = {
  src: string;
  alt: string;
  category: string;
  title: string;
  className: string;
  sizes: string;
  directionX: string;
  directionY: string;
};

type RevealStyle = CSSProperties & {
  "--reveal-delay": string;
  "--from-x": string;
  "--from-y": string;
};

const galleryImages: GalleryImage[] = [
  {
    src: "/cartel-ferreteria.webp",
    alt: "Cartel exterior de Ferretería Río Loa",
    category: "Nuestra identidad",
    title: "Presencia local",
    className: "landscape",
    sizes: "(max-width: 760px) 100vw, 33.34vw",
    directionX: "-140px",
    directionY: "45px",
  },
  {
    src: "/despacho-a-domicilio.webp",
    alt: "Vehículo de despacho de Ferretería Río Loa",
    category: "Nuestro servicio",
    title: "Despacho a domicilio",
    className: "landscape",
    sizes: "(max-width: 760px) 100vw, 33.34vw",
    directionX: "0px",
    directionY: "130px",
  },
  {
    src: "/local-por-fuera.webp",
    alt: "Fachada de Ferretería Río Loa en Calama",
    category: "Ferretería Río Loa",
    title: "Nuestro local",
    className: "landscape",
    sizes: "(max-width: 760px) 100vw, 33.34vw",
    directionX: "140px",
    directionY: "45px",
  },
  {
    src: "/muestrario-1.webp",
    alt: "Productos de ferretería disponibles en sala de ventas",
    category: "Variedad",
    title: "Soluciones para cada proyecto",
    className: "portrait",
    sizes: "(max-width: 760px) 50vw, 16.67vw",
    directionX: "-120px",
    directionY: "90px",
  },
  {
    src: "/muestrario-2.webp",
    alt: "Sección de productos eléctricos de Ferretería Río Loa",
    category: "Electricidad",
    title: "Materiales eléctricos",
    className: "portrait",
    sizes: "(max-width: 760px) 50vw, 16.67vw",
    directionX: "-70px",
    directionY: "140px",
  },
  {
    src: "/muestrario-3.webp",
    alt: "Sección de productos de quincallería",
    category: "Quincallería",
    title: "Accesorios y soluciones",
    className: "portrait",
    sizes: "(max-width: 760px) 50vw, 16.67vw",
    directionX: "-25px",
    directionY: "150px",
  },
  {
    src: "/muestrario-4.webp",
    alt: "Productos para mantención y construcción",
    category: "Construcción",
    title: "Productos confiables",
    className: "portrait",
    sizes: "(max-width: 760px) 50vw, 16.67vw",
    directionX: "25px",
    directionY: "150px",
  },
  {
    src: "/muestrario-5.webp",
    alt: "Accesorios de pintura disponibles en Ferretería Río Loa",
    category: "Pintura",
    title: "Todo para sus terminaciones",
    className: "portrait",
    sizes: "(max-width: 760px) 50vw, 16.67vw",
    directionX: "70px",
    directionY: "140px",
  },
  {
    src: "/muestrario-6.webp",
    alt: "Herramientas y accesorios disponibles en sala",
    category: "Herramientas",
    title: "Equipamiento para trabajar",
    className: "portrait",
    sizes: "(max-width: 760px) 50vw, 16.67vw",
    directionX: "120px",
    directionY: "90px",
  },
];

const getRevealStyle = (
  image: GalleryImage,
  index: number,
): RevealStyle => ({
  "--reveal-delay": `${80 + (index % 6) * 85}ms`,
  "--from-x": image.directionX,
  "--from-y": image.directionY,
});

export default function Gallery() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const closeLightbox = useCallback(() => {
    setActiveIndex(null);
  }, []);

  const showPrevious = useCallback(() => {
    setActiveIndex((current) => {
      if (current === null) {
        return null;
      }

      return current === 0
        ? galleryImages.length - 1
        : current - 1;
    });
  }, []);

  const showNext = useCallback(() => {
    setActiveIndex((current) => {
      if (current === null) {
        return null;
      }

      return current === galleryImages.length - 1
        ? 0
        : current + 1;
    });
  }, []);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const revealElements = Array.from(
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
        threshold: 0.12,
        rootMargin: "0px 0px -7% 0px",
      },
    );

    revealElements.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (activeIndex === null) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeLightbox();
      }

      if (event.key === "ArrowLeft") {
        showPrevious();
      }

      if (event.key === "ArrowRight") {
        showNext();
      }
    };

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeIndex, closeLightbox, showNext, showPrevious]);

  const activeImage =
    activeIndex !== null ? galleryImages[activeIndex] : null;

  return (
    <>
      <section
        id="galeria"
        ref={sectionRef}
        className={styles.gallery}
      >
        <header className={styles.heading}>
          <div
            className={`${styles.headingMain} ${styles.revealHeading}`}
            data-reveal
          >
            <p className={styles.eyebrow}>NUESTRA FERRETERÍA</p>

            <h2 className={styles.title}>
              Conozca nuestros espacios
              <span> y la variedad que ofrecemos.</span>
            </h2>
          </div>

          <p
            className={`${styles.introduction} ${styles.revealHeading}`}
            data-reveal
          >
            Una mirada a nuestro local, áreas de productos y servicio de
            despacho para clientes del hogar, maestros y empresas de Calama.
          </p>
        </header>

        <div className={styles.galleryGrid}>
          {galleryImages.map((image, index) => (
            <button
              key={image.src}
              type="button"
              className={`${styles.tile} ${
                styles[image.className]
              } ${styles.revealTile}`}
              data-reveal
              style={getRevealStyle(image, index)}
              onClick={() => setActiveIndex(index)}
              aria-label={`Ampliar imagen: ${image.title}`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes={image.sizes}
                className={styles.image}
              />

              <span className={styles.overlay} aria-hidden="true" />

              <span className={styles.tileContent}>
                <span className={styles.category}>{image.category}</span>
                <strong>{image.title}</strong>
                <span className={styles.openLabel}>
                  Ver imagen
                  <span>↗</span>
                </span>
              </span>

              <span className={styles.tileNumber} aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
            </button>
          ))}
        </div>
      </section>

      {activeImage && activeIndex !== null && (
        <div
          className={styles.lightbox}
          role="dialog"
          aria-modal="true"
          aria-label={`Imagen ampliada: ${activeImage.title}`}
          onClick={closeLightbox}
        >
          <button
            type="button"
            className={styles.closeButton}
            onClick={closeLightbox}
            aria-label="Cerrar galería"
          >
            <span aria-hidden="true" />
          </button>

          <button
            type="button"
            className={`${styles.navigationButton} ${styles.previousButton}`}
            onClick={(event) => {
              event.stopPropagation();
              showPrevious();
            }}
            aria-label="Imagen anterior"
          >
            ‹
          </button>

          <div
            className={styles.lightboxContent}
            onClick={(event) => event.stopPropagation()}
          >
            <div className={styles.lightboxImageArea}>
              <Image
                key={activeImage.src}
                src={activeImage.src}
                alt={activeImage.alt}
                fill
                sizes="95vw"
                className={styles.lightboxImage}
                priority
              />
            </div>

            <div className={styles.lightboxCaption}>
              <div>
                <span>{activeImage.category}</span>
                <strong>{activeImage.title}</strong>
              </div>

              <small>
                {String(activeIndex + 1).padStart(2, "0")} /{" "}
                {String(galleryImages.length).padStart(2, "0")}
              </small>
            </div>
          </div>

          <button
            type="button"
            className={`${styles.navigationButton} ${styles.nextButton}`}
            onClick={(event) => {
              event.stopPropagation();
              showNext();
            }}
            aria-label="Imagen siguiente"
          >
            ›
          </button>
        </div>
      )}
    </>
  );
}