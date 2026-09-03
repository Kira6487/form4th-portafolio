"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { playKeyboardSound } from "../keyboard/audio-manager";
import f4Key from "../../images/boton-f4-principal.png";

type IntroState = "visible" | "pressing" | "exiting" | "skipped";
const INTRO_STORAGE_KEY = "form4th-intro-seen";

export function Form4thIntro() {
  const [state, setState] = useState<IntroState>("visible");

  useEffect(() => {
    try {
      if (window.sessionStorage.getItem(INTRO_STORAGE_KEY) === "true") setState("skipped");
    } catch {
      // If storage is unavailable, the intro remains usable for this visit.
    }
  }, []);

  useEffect(() => {
    if (state !== "exiting") return;
    const timer = window.setTimeout(() => setState("skipped"), 720);
    return () => window.clearTimeout(timer);
  }, [state]);

  if (state === "skipped") return null;

  const pressF4 = () => {
    if (state !== "visible") return;
    playKeyboardSound("general");
    setState("pressing");
    window.setTimeout(() => {
      try { window.sessionStorage.setItem(INTRO_STORAGE_KEY, "true"); } catch { /* no-op */ }
      setState("exiting");
    }, 170);
  };

  return <div className={`intro-gate intro-gate--${state}`} role="dialog" aria-modal="true" aria-label="Activar FORM4TH">
    <div className="intro-ambient intro-ambient--one" aria-hidden="true" />
    <div className="intro-ambient intro-ambient--two" aria-hidden="true" />
    <div className="intro-grid" aria-hidden="true" />
    <div className="intro-copy"><span>FORM4TH / DIGITAL PRODUCT STUDIO</span><span>PRESS TO ENTER</span></div>
    <button className="intro-f4" onClick={pressF4} aria-label="Presionar F4 para entrar" autoFocus>
      <Image src={f4Key} alt="F4" priority sizes="clamp(180px, 26vw, 360px)" />
    </button>
    <p className="intro-hint">Enciende tu próxima experiencia</p>
  </div>;
}
