"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styles from "./Clients.module.css";

type ClientLogo = {
  name: string;
  image: string;
  isMunicipalidad?: boolean;
};

const clients: ClientLogo[] = [
  {
    name: "Cerro Nevado",
    image: "/cerro-nevado.webp",
  },
  {
    name: "Citexco",
    image: "/citexco.webp",
  },
  {
    name: "Tecnología Cobra",
    image: "/cobra.webp",
  },
  {
    name: "Cox",
    image: "/cox.webp",
  },
  {
    name: "Finning CAT",
    image: "/finning-cat.webp",
  },
  {
    name: "Ingeniería Civil Vicente",
    image: "/icv.webp",
  },
  {
    name: "Global ICE",
    image: "/logo-1024.webp",
  },
  {
    name: "Maxam",
    image: "/maxan-ok.webp",
  },
  {
    name: "Montecristo",
    image: "/consorcio.webp",
  },
  {
    name: "Municipalidad de Calama",
    image: "/logo_municipalidad_calama_350px.webp",
    isMunicipalidad: true,
  },
  {
    name: "Sigma",
    image: "/sigma.webp",
  },
];

function LogoGroup({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <div
      className={styles.logoGroup}
      aria-hidden={duplicate ? true : undefined}
    >
      {clients.map((client) => {
        const isMunicipalidad = client.isMunicipalidad === true;

        return (
          <div
            key={`${duplicate ? "duplicate" : "original"}-${client.name}`}
            className={`${styles.logoCard} ${
              isMunicipalidad ? styles.logoCardMunicipalidad : ""
            }`}
          >
            <div
              className={`${styles.logoWrapper} ${
                isMunicipalidad
                  ? styles.logoWrapperMunicipalidad
                  : ""
              }`}
            >
              <Image
                src={client.image}
                alt={duplicate ? "" : `Logo de ${client.name}`}
                fill
                sizes={
                  isMunicipalidad
                    ? "(max-width: 640px) 78px, (max-width: 900px) 86px, 90px"
                    : "(max-width: 640px) 124px, (max-width: 900px) 138px, 150px"
                }
                className={`${styles.logoImage} ${
                  isMunicipalidad
                    ? styles.logoImageMunicipalidad
                    : ""
                }`}
                quality={100}
                loading="lazy"
                draggable={false}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function Clients() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const fallback = window.setTimeout(() => {
      setIsVisible(true);
    }, 1200);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          window.clearTimeout(fallback);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    observer.observe(section);

    return () => {
      window.clearTimeout(fallback);
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="clientes"
      className={`${styles.clients} ${
        isVisible ? styles.isVisible : ""
      }`}
      aria-labelledby="clients-title"
    >
      <div className={styles.container}>
        <div className={styles.heading}>
          <div className={styles.headingContent}>
            <span className={styles.eyebrow}>
              Nuestros clientes
            </span>

            <h2
              id="clients-title"
              className={styles.title}
            >
              Empresas que confían en nuestro trabajo
            </h2>
          </div>

          <p className={styles.description}>
            Abastecemos a empresas e instituciones vinculadas a la
            minería, construcción, industria y sector público.
          </p>
        </div>
      </div>

      <div
        className={styles.carousel}
        role="region"
        aria-label="Clientes de Ferretería Río Loa"
      >
        <div
          className={styles.fadeLeft}
          aria-hidden="true"
        />

        <div className={styles.track}>
          <LogoGroup />
          <LogoGroup duplicate />
        </div>

        <div
          className={styles.fadeRight}
          aria-hidden="true"
        />
      </div>

      <div className={styles.container}>
        <div className={styles.sectors}>
          <span>Minería</span>
          <i aria-hidden="true" />

          <span>Construcción</span>
          <i aria-hidden="true" />

          <span>Industria</span>
          <i aria-hidden="true" />

          <span>Sector público</span>
        </div>
      </div>
    </section>
  );
}