"use client";

import { useEffect, useState } from "react";
import { KeyboardButton } from "../keyboard/KeyboardButton";

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
    <KeyboardButton variant="f4" className="intro-f4" onPress={pressF4} aria-label="Presionar F4 para entrar" autoFocus />
    <p className="intro-hint">Enciende tu próxima experiencia</p>
  </div>;
}
