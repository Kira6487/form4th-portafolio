"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [["Inicio", "/"], ["Servicios", "/servicios"], ["Proyectos", "/proyectos"], ["Contacto", "/contacto"]];
const social = [["Instagram", "https://www.instagram.com/form4th"], ["Facebook", "https://www.facebook.com/form4th"], ["TikTok", "https://www.tiktok.com/@form4th"], ["Threads", "https://www.threads.com/@form4th"]];

export function SiteHeader() {
  const path = usePathname(); const [open, setOpen] = useState(false);
  useEffect(() => { setOpen(false); }, [path]);
  const dark = path === "/" || path === "/proyectos" || path.startsWith("/proyectos/");
  return <>
    <header className={`header ${dark ? "header-dark" : ""}`}>
      <Link className="header-logo" href="/" aria-label="FORM4TH, inicio"><span className="header-mark">F4</span> FORM4TH</Link>
      <nav className="nav" aria-label="Navegación principal">{links.map(([label, href]) => <Link key={href} href={href} aria-current={path === href || (href === "/proyectos" && path.startsWith("/proyectos/")) ? "page" : undefined}>{label}</Link>)}</nav>
      <a className="header-cta key-button" href="https://wa.me/51912227953" target="_blank" rel="noopener noreferrer"><span className="keycap">F4</span> Cotiza tu proyecto</a>
      <button className="menu-trigger" aria-label="Abrir menú" aria-expanded={open} onClick={() => setOpen(true)}><span /><span /></button>
    </header>
    <div className={`menu-overlay ${open ? "open" : ""}`} role="dialog" aria-modal="true" aria-label="Menú FORM4TH" aria-hidden={!open}>
      <button className="menu-close" aria-label="Cerrar menú" tabIndex={open ? 0 : -1} onClick={() => setOpen(false)}>×</button>
      <nav className="mobile-nav" aria-label="Navegación móvil">{links.map(([label, href], i) => <Link key={href} href={href} tabIndex={open ? 0 : -1}><span className="orange">0{i + 1}</span> {label}</Link>)}</nav>
      <div><a className="button button-orange key-button" tabIndex={open ? 0 : -1} href="https://wa.me/51912227953" target="_blank" rel="noopener noreferrer"><span className="keycap">F4</span> Cotiza tu proyecto</a><div className="mobile-social">{social.map(([label, href]) => <a key={label} href={href} target="_blank" rel="noopener noreferrer" tabIndex={open ? 0 : -1}>{label}</a>)}</div></div>
    </div>
  </>;
}
