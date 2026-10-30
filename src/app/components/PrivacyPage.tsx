import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { BUSINESS, PRIVACY_DOCUMENTS, PRIVACY_UPDATED, RIGHTS_EMAIL } from "@/lib/privacy";
import styles from "./PrivacyPage.module.css";

type PrivacyPageProps = {
  title: string;
  intro: string;
  current: string;
  children: ReactNode;
};

export default function PrivacyPage({ title, intro, current, children }: PrivacyPageProps) {
  return (
    <div className={styles.page}>
      <a href="#contenido" className={styles.skip}>Saltar al contenido</a>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <Link href="/" aria-label="Ferretería Río Loa, volver al inicio">
            <Image src="/logo-rio-loa-menu.webp" alt="Ferretería Río Loa" width={208} height={93} sizes="(max-width: 600px) 158px, 208px" className={styles.logo} />
          </Link>
          <Link href="/" className={styles.back}>Volver al sitio</Link>
        </div>
      </header>

      <main id="contenido" className={styles.main}>
        <section className={styles.hero} aria-labelledby="privacy-title">
          <div className={styles.heroInner}>
            <p className={styles.eyebrow}>Privacidad y transparencia</p>
            <h1 id="privacy-title">{title}</h1>
            <p className={styles.intro}>{intro}</p>
            <p className={styles.updated}>Actualizado el {PRIVACY_UPDATED}</p>
          </div>
        </section>

        <div className={styles.layout}>
          <aside className={styles.sidebar} aria-label="Información de privacidad">
            <nav aria-label="Documentos de privacidad" className={styles.navigation}>
              <p>Información para usted</p>
              {PRIVACY_DOCUMENTS.map((document) => (
                <Link key={document.href} href={document.href} aria-current={current === document.href ? "page" : undefined}>
                  {document.label}
                </Link>
              ))}
            </nav>
            <div className={styles.help}>
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M12 3 4 6v5c0 5 8 10 8 10s8-5 8-10V6l-8-3Z" /><path d="m8.5 11.5 2.5 2.5 4.5-5" /></svg>
              <h2>Sus datos, su decisión.</h2>
              <p>Contamos con un canal directo para consultas y solicitudes sobre sus datos personales.</p>
              <a href={RIGHTS_EMAIL}>Contactar sobre mis datos</a>
            </div>
          </aside>

          <article className={styles.article}>{children}</article>
        </div>

        <section className={styles.contact} aria-labelledby="privacy-contact-title">
          <div>
            <p className={styles.contactEyebrow}>Atención directa</p>
            <h2 id="privacy-contact-title">Conversemos sobre sus datos.</h2>
            <p>Envíe su consulta al equipo de Ferretería Río Loa.</p>
          </div>
          <a href={RIGHTS_EMAIL}>{BUSINESS.email}</a>
        </section>
      </main>

      <footer className={styles.footer}>
        <div><strong>Ferretería Río Loa</strong><span>{BUSINESS.address}</span></div>
        <nav aria-label="Enlaces del pie de página legal">
          <Link href="/">Inicio</Link><Link href="/#contacto">Contacto y cotizaciones</Link>
        </nav>
        <p>© 2026 Ferretería Río Loa.</p>
      </footer>
    </div>
  );
}
