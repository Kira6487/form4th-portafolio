import Image from "next/image";
import Link from "next/link";
import { Approach, HomeProjects, HomeServices, Pillars } from "@/components/sections";

export default function Home() {
  return <main className="site-main">
    <section className="hero"><div className="container"><div className="hero-meta"><strong>FORM4TH</strong><span>Digital Product Studio</span></div><div className="hero-grid"><div><h1 className="display reveal">Tu empresa ya es<br />profesional.<br /><em>Hagamos que<br />se vea así.</em></h1></div><div className="hero-copy reveal"><p>Diseñamos productos digitales para empresas que quieren mejorar su presencia, organizar sus procesos y crecer con tecnología.</p><div className="hero-actions"><a className="button button-orange" href="https://wa.me/51912227953" target="_blank" rel="noopener noreferrer">Cotiza tu proyecto</a><Link className="button button-light" href="/proyectos">Ver nuestro trabajo</Link></div></div></div><div className="hero-orbit" aria-hidden="true"><Image src="/images/perfil-profesional.jpeg" alt="" width={300} height={300} priority /><span className="orbit-tag">PRESENCE / CONTROL</span></div><div className="hero-scroll"><i /> Scroll to explore</div></div><div className="marquee"><div className="marquee-inner"><span>Websites</span><b>✳</b><span>Catálogos</span><b>✳</b><span>Sistemas</span><b>✳</b><span>Automatización</span><b>✳</b><span>Websites</span><b>✳</b><span>Catálogos</span><b>✳</b><span>Sistemas</span><b>✳</b><span>Automatización</span><b>✳</b></div></div></section>
    <section className="intro"><div className="container"><div className="intro-line"><span className="eyebrow">Un estudio para lo que sigue</span><h2>La web de tu empresa no es un adorno. <span>Es el lugar donde tu negocio empieza a trabajar mejor.</span></h2></div></div></section>
    <HomeServices /><HomeProjects /><Pillars /><Approach />
    <section className="cta-strip"><div className="container cta-strip-inner"><h2>¿Construimos<br />algo similar?</h2><a className="button" href="https://wa.me/51912227953" target="_blank" rel="noopener noreferrer">Cotiza tu proyecto</a></div></section>
  </main>;
}
