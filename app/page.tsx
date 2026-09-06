import Image from "next/image";
import { HomeProjects, HomeServices, StudioNote } from "@/components/sections";
import { KeyboardButton } from "@/components/keyboard/KeyboardButton";

export default function Home() {
  return <main className="site-main">
    <section className="hero"><div className="container"><div className="hero-meta"><strong>FORM4TH</strong><span>Digital Product Studio / Perú</span></div><div className="hero-grid"><div className="hero-headline"><h1 className="display reveal"><span>Tu empresa ya es profesional.</span><em>Hagamos que se vea así.</em></h1></div><div className="hero-copy reveal"><div className="hero-orbit" aria-hidden="true"><Image src="/images/perfil-profesional.jpeg" alt="" width={300} height={300} priority /><span className="orbit-tag">PRESENCE / CONTROL</span></div><p>Diseñamos productos digitales para empresas que quieren verse mejor y trabajar con más claridad.</p><div className="hero-actions"><KeyboardButton variant="space" size="lg" className="button-orange" href="https://wa.me/51912227953" external label="Cotiza tu proyecto" /><KeyboardButton variant="space" size="sm" className="button-light" href="/proyectos" label="Ver proyectos" /></div></div></div><div className="hero-scroll"><i /> Scroll to explore</div></div><div className="marquee"><div className="marquee-inner"><span>Websites</span><b>✳</b><span>Catálogos</span><b>✳</b><span>Sistemas</span><b>✳</b><span>Automatización</span><b>✳</b><span>Websites</span><b>✳</b><span>Catálogos</span><b>✳</b><span>Sistemas</span><b>✳</b><span>Automatización</span><b>✳</b></div></div></section>
    <HomeServices /><HomeProjects /><StudioNote />
    <section className="cta-strip"><div className="container cta-strip-inner"><h2>Tu próximo<br /><span>movimiento.</span></h2><KeyboardButton variant="normal" size="sm" href="https://wa.me/51912227953" external label="Hablemos" /></div></section>
  </main>;
}
