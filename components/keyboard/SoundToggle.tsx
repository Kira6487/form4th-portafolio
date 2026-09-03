"use client";

import { useEffect, useState } from "react";
import { getSoundEnabled, setSoundEnabled } from "./audio-manager";
import { KeyboardButton } from "./KeyboardButton";

export function SoundToggle() {
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    setEnabled(getSoundEnabled());
  }, []);

  const toggle = () => {
    const next = !enabled;
    setEnabled(next);
    setSoundEnabled(next);
  };

  return <KeyboardButton
    variant="normal"
    className="sound-toggle"
    label={enabled ? "SOUND ON" : "SOUND OFF"}
    aria-pressed={enabled}
    onPress={toggle}
  />;
}
