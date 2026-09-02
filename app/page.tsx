import Image from "next/image";
import Link from "next/link";
import { HomeProjects, HomeServices, StudioNote } from "@/components/sections";

export default function Home() {
  return <main className="site-main">
    <section className="hero"><div className="container"><div className="hero-meta"><strong>FORM4TH</strong><span>Digital Product Studio / Perú</span></div><div className="hero-grid"><div><h1 className="display reveal">Tu empresa ya es<br />profesional.<br /><em>Hagamos que<br />se vea así.</em></h1></div><div className="hero-copy reveal"><p>Diseñamos productos digitales para empresas que quieren verse mejor y trabajar con más claridad.</p><div className="hero-actions"><a className="button button-orange key-button" href="https://wa.me/51912227953" target="_blank" rel="noopener noreferrer"><span className="keycap">F4</span> Cotiza tu proyecto</a><Link className="button button-light key-button" href="/proyectos"><span className="keycap">↘</span> Ver proyectos</Link></div></div></div><div className="hero-orbit" aria-hidden="true"><Image src="/images/perfil-profesional.jpeg" alt="" width={300} height={300} priority /><span className="orbit-tag">PRESENCE / CONTROL</span></div><div className="hero-scroll"><i /> Scroll to explore</div></div><div className="marquee"><div className="marquee-inner"><span>Websites</span><b>✳</b><span>Catálogos</span><b>✳</b><span>Sistemas</span><b>✳</b><span>Automatización</span><b>✳</b><span>Websites</span><b>✳</b><span>Catálogos</span><b>✳</b><span>Sistemas</span><b>✳</b><span>Automatización</span><b>✳</b></div></div></section>
    <HomeServices /><HomeProjects /><StudioNote />
    <section className="cta-strip"><div className="container cta-strip-inner"><h2>Tu próximo<br /><span>movimiento.</span></h2><a className="button key-button" href="https://wa.me/51912227953" target="_blank" rel="noopener noreferrer"><span className="keycap">ENTER ↵</span> Hablemos</a></div></section>
  </main>;
}
