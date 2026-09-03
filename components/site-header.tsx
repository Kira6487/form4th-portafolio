"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { KeyboardButton } from "./keyboard/KeyboardButton";
import { SoundToggle } from "./keyboard/SoundToggle";

const links = [["Inicio", "/"], ["Servicios", "/servicios"], ["Proyectos", "/proyectos"], ["Contacto", "/contacto"]] as const;
const social = [["Instagram", "https://www.instagram.com/form4th"], ["Facebook", "https://www.facebook.com/form4th"], ["TikTok", "https://www.tiktok.com/@form4th"], ["Threads", "https://www.threads.com/@form4th"]] as const;
const quoteHref = "https://wa.me/51912227953";

export function SiteHeader() {
  const path = usePathname(); const [open, setOpen] = useState(false);
  useEffect(() => { setOpen(false); }, [path]);
  const dark = path === "/" || path === "/proyectos" || path.startsWith("/proyectos/");
  return <>
    <header className={`header ${dark ? "header-dark" : ""}`}>
      <Link className="header-logo" href="/" aria-label="FORM4TH, inicio"><span className="header-mark">F4</span> FORM4TH</Link>
      <nav className="nav" aria-label="Navegación principal">{links.map(([label, href]) => <KeyboardButton key={href} variant="normal" className="nav-key" href={href} label={label} aria-current={path === href || (href === "/proyectos" && path.startsWith("/proyectos/")) ? "page" : undefined} />)}</nav>
      <div className="header-actions"><SoundToggle /><KeyboardButton variant="space" className="header-cta" href={quoteHref} external label="Cotiza tu proyecto" /><KeyboardButton variant="normal" className="menu-trigger" aria-label="Abrir menú" aria-expanded={open} onPress={() => setOpen(true)}><span className="menu-lines"><i /><i /></span></KeyboardButton></div>
    </header>
    <div className={`menu-overlay ${open ? "open" : ""}`} role="dialog" aria-modal="true" aria-label="Menú FORM4TH" aria-hidden={!open}>
      <KeyboardButton variant="normal" className="menu-close" label="CERRAR" tabIndex={open ? 0 : -1} onPress={() => setOpen(false)} />
      <nav className="mobile-nav" aria-label="Navegación móvil">{links.map(([label, href], i) => <KeyboardButton key={href} variant="enter" className="mobile-nav-key" href={href} label={`${String(i + 1).padStart(2, "0")} / ${label}`} tabIndex={open ? 0 : -1} />)}</nav>
      <div className="mobile-menu-bottom"><KeyboardButton variant="space" className="mobile-quote" href={quoteHref} external label="Cotiza tu proyecto" tabIndex={open ? 0 : -1} /><div className="mobile-social">{social.map(([label, href]) => <KeyboardButton key={label} variant="normal" className="mobile-social-key" href={href} external label={label} tabIndex={open ? 0 : -1} />)}<SoundToggle /></div></div>
    </div>
  </>;
}
