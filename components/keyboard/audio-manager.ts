export type KeyboardSound = "general" | "enter" | "space";

const SOUND_PATHS: Record<KeyboardSound, string> = {
  general: "/sound/sonido-tecla-general.mp3",
  enter: "/sound/sonido-tecla-enter.mp3",
  space: "/sound/sonido-espacio.mp3",
};

const POOL_SIZE = 4;
const VOLUME = 0.34;
const pools = new Map<KeyboardSound, HTMLAudioElement[]>();
const cursors = new Map<KeyboardSound, number>();

function isBrowser() {
  return typeof window !== "undefined" && typeof Audio !== "undefined";
}

function soundIsEnabled() {
  if (!isBrowser()) return true;
  return window.localStorage.getItem("form4th-sound-enabled") !== "false";
}

function getPool(sound: KeyboardSound) {
  const existing = pools.get(sound);
  if (existing) return existing;

  const pool = Array.from({ length: POOL_SIZE }, () => {
    const audio = new Audio(SOUND_PATHS[sound]);
    audio.preload = "auto";
    audio.volume = VOLUME;
    return audio;
  });
  pools.set(sound, pool);
  cursors.set(sound, 0);
  return pool;
}

export function primeKeyboardAudio() {
  if (!isBrowser()) return;
  (Object.keys(SOUND_PATHS) as KeyboardSound[]).forEach((sound) => {
    getPool(sound).forEach((audio) => audio.load());
  });
}

export function playKeyboardSound(sound: KeyboardSound) {
  if (!isBrowser() || !soundIsEnabled()) return;

  const pool = getPool(sound);
  const cursor = cursors.get(sound) ?? 0;
  const audio = pool[cursor % pool.length];
  cursors.set(sound, (cursor + 1) % pool.length);
  audio.currentTime = 0;
  void audio.play().catch(() => undefined);
}

export function getSoundEnabled() {
  return soundIsEnabled();
}

export function setSoundEnabled(enabled: boolean) {
  if (!isBrowser()) return;
  window.localStorage.setItem("form4th-sound-enabled", String(enabled));
}
