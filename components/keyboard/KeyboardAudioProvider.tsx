"use client";

import { useEffect } from "react";
import { primeKeyboardAudio } from "./audio-manager";

export function KeyboardAudioProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  useEffect(() => {
    primeKeyboardAudio();
  }, []);

  return children;
}
