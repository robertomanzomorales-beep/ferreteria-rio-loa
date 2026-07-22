"use client";

import Image from "next/image";
import {
  type CSSProperties,
  useEffect,
  useRef,
} from "react";
import styles from "./Brands.module.css";

type Brand = {
  name: string;
  background: string;
  logo: string;
  tone: "blue" | "orange";
  position?: string;
};

const brands: Brand[] = [
  {
    name: "Dewalt",
    background: "/fondo-dewalt.webp",
    logo: "/logo-dewalt.webp",
    tone: "blue",
    position: "center",
  },
  {
    name: "Einhell",
    background: "/fondo-einhell.webp",
    logo: "/logo-einhell.webp",
    tone: "orange",
    position: "center",
  },
  {
    name: "Hoffens",
    background: "/fondo-hoffens.webp",
    logo: "/logo-hoffens.webp",
    tone: "blue",
    position: "center",
  },
  {
    name: "Imporper",
    background: "/fondo-imporper.webp",
    logo: "/logo-imporper.webp",
    tone: "orange",
    position: "center",
  },
  {
    name: "Klingspor",
    background: "/fondo-klingspor.webp",
    logo: "/logo-klingspor.webp",
    tone: "blue",
    position: "center",
  },
  {
    name: "Lioi",
    background: "/fondo-lioi.webp",
    logo: "/logo-lioi.webp",
    tone: "blue",
    position: "center",
  },
  {
    name: "Odis",
    background: "/fondo-odis.webp",
    logo: "/logo-odis.webp",
    tone: "orange",
    position: "center",
  },
  {
    name: "Täumm",
    background: "/fondo-taumm.webp",
    logo: "/logo-taumm.webp",
    tone: "blue",
    position: "center",
  },
  {
    name: "Truper",
    background: "/fondo-truper.webp",
    logo: "/logo-truper.webp",
    tone: "orange",
    position: "center",
  },
  {
    name: "Uyustools",
    background: "/fondo-uyustools.webp",
    logo: "/logo-uyustools.webp",
    tone: "blue",
    position: "center",
  },
  {
    name: "Würth",
    background: "/fondo-wurth.webp",
    logo: "/logo-wurth.webp",
    tone: "blue",
    position: "center",
  },
];

function getEntryDirection(index: number) {
  const directions = [
    "-110px",
    "0px",
    "110px",
    "-100px",
    "-45px",
    "45px",
    "100px",
    "-100px",
    "-35px",
    "35px",
    "100px",
  ];

  return directions[index] ?? "0px";
}

export default function Brands() {
  const headerRef = useRef<HTMLDivElement | null>(null);
  const brandRefs = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    const header = headerRef.current;

    const headerObserver = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.setAttribute("data-visible", "true");
        headerObserver.unobserve(entry.target);
      },
      {
        threshold: 0.25,
        rootMargin: "0px 0px -8% 0px",
      }
    );

    if (header) {
      headerObserver.observe(header);
    }

    const brandObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.setAttribute("data-visible", "true");
          brandObserver.unobserve(entry.target);
        });
      },
      {
        threshold: 0.28,
        rootMargin: "0px 0px -7% 0px",
      }
    );

    const currentBrandRefs = brandRefs.current;

    currentBrandRefs.forEach((brand) => {
      if (brand) {
        brandObserver.observe(brand);
      }
    });

    return () => {
      headerObserver.disconnect();
      brandObserver.disconnect();
    };
  }, []);

  return (
    <section
      id="marcas"
      className={styles.brands}
      aria-labelledby="brands-title"
    >
      <div ref={headerRef} className={styles.header}>
        <div className={styles.heading}>
          <span className={styles.eyebrow}>
            Calidad y respaldo
          </span>

          <h2 id="brands-title" className={styles.title}>
            Marcas preparadas para{" "}
            <span>el trabajo exigente.</span>
          </h2>
        </div>

        <div className={styles.headerInformation}>
          <span
            className={styles.informationLine}
            aria-hidden="true"
          />

          <p>
            Herramientas, materiales y equipamiento de marcas
            reconocidas para responder a proyectos industriales,
            constructivos y de mantenimiento.
          </p>
        </div>
      </div>

      <div className={styles.grid}>
        {brands.map((brand, index) => (
          <article
            key={brand.name}
            ref={(element) => {
              brandRefs.current[index] = element;
            }}
            className={`${styles.brand} ${
              brand.tone === "orange"
                ? styles.orange
                : styles.blue
            }`}
            style={
              {
                "--entry-x": getEntryDirection(index),
                "--local-delay": `${(index % 4) * 85}ms`,
              } as CSSProperties
            }
          >
            <Image
              className={styles.background}
              src={brand.background}
              alt=""
              fill
              sizes="(max-width: 680px) 100vw, (max-width: 1080px) 50vw, 34vw"
              style={{
                objectPosition: brand.position ?? "center",
              }}
            />

            <span
              className={styles.chromaticOverlay}
              aria-hidden="true"
            />

            <span
              className={styles.baseShade}
              aria-hidden="true"
            />

            <span
              className={styles.hoverShade}
              aria-hidden="true"
            />

            <span
              className={styles.lightPass}
              aria-hidden="true"
            />

            <div className={styles.topInformation}>
              <span className={styles.category}>
                Marca distribuida
              </span>

              <span className={styles.index}>
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>

            <div className={styles.logoArea}>
              <div className={styles.logoFrame}>
                <Image
                  className={styles.logo}
                  src={brand.logo}
                  alt={`Logo ${brand.name}`}
                  fill
                  sizes="190px"
                />
              </div>
            </div>

            <div className={styles.bottomInformation}>
              <span className={styles.brandLabel}>
                Ferretería Río Loa
              </span>

              <h3>{brand.name}</h3>
            </div>

            <span
              className={styles.accentLine}
              aria-hidden="true"
            />
          </article>
        ))}
      </div>
    </section>
  );
}