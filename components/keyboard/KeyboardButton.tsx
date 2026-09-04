"use client";

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { useCallback, useState, type AnchorHTMLAttributes, type ButtonHTMLAttributes, type ReactNode } from "react";
import { playKeyboardSound, type KeyboardSound } from "./audio-manager";
import normalKey from "../../images/tecla-normal.png";
import enterKey from "../../images/boton-enter.png";
import spaceKey from "../../images/barra-espacio.png";
import f4Key from "../../images/boton-f4-principal.png";

export type KeyboardVariant = "normal" | "enter" | "space" | "f4";

type CommonProps = {
  variant?: KeyboardVariant;
  label?: string;
  children?: ReactNode;
  icon?: ReactNode;
  external?: boolean;
  className?: string;
  onPress?: () => void;
};

type KeyboardButtonProps = CommonProps &
  (ButtonHTMLAttributes<HTMLButtonElement> | AnchorHTMLAttributes<HTMLAnchorElement>) & {
    href?: string;
  };

const assets: Record<KeyboardVariant, StaticImageData> = {
  normal: normalKey,
  enter: enterKey,
  space: spaceKey,
  f4: f4Key,
};

const sounds: Record<KeyboardVariant, KeyboardSound> = {
  normal: "general",
  enter: "enter",
  space: "space",
  f4: "general",
};

export function KeyboardButton({
  variant = "normal",
  label,
  children,
  icon,
  external,
  className = "",
  onPress,
  href,
  onClick,
  onPointerDown,
  onPointerUp,
  onPointerLeave,
  onKeyDown,
  ...rest
}: KeyboardButtonProps) {
  const [pressed, setPressed] = useState(false);
  const asset = assets[variant];
  const content = children ?? label;

  const release = useCallback(() => {
    setPressed(false);
  }, []);

  const common = {
    ...rest,
    className: `keyboard-button keyboard-button--${variant} ${pressed ? "is-pressed" : ""} ${className}`.trim(),
    "aria-label": rest["aria-label"] ?? (typeof content === "string" ? content : label),
    onPointerDown: (event: React.PointerEvent<HTMLButtonElement | HTMLAnchorElement>) => {
      setPressed(true);
      onPointerDown?.(event as never);
    },
    onPointerUp: (event: React.PointerEvent<HTMLButtonElement | HTMLAnchorElement>) => {
      release();
      onPointerUp?.(event as never);
    },
    onPointerLeave: (event: React.PointerEvent<HTMLButtonElement | HTMLAnchorElement>) => {
      release();
      onPointerLeave?.(event as never);
    },
    onKeyDown: (event: React.KeyboardEvent<HTMLButtonElement | HTMLAnchorElement>) => {
      if ((event.key === "Enter" || event.key === " ") && !event.repeat) {
        setPressed(true);
      }
      onKeyDown?.(event as never);
    },
    onKeyUp: release,
    onClick: (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
      // Click is the single activation event for audio. Native keyboard
      // activation and touch/pointer input both converge here once.
      playKeyboardSound(sounds[variant]);
      onPress?.();
      onClick?.(event as never);
    },
  };

  const visual = <>
    <Image className="keyboard-button__image" src={asset} alt="" aria-hidden="true" sizes={variant === "space" ? "(max-width: 700px) 85vw, 360px" : "160px"} />
    <span className="keyboard-button__content">{icon}{content}</span>
  </>;

  if (href) {
    const linkProps = { ...common, href } as unknown as AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };
    if (!external && href.startsWith("/")) return <Link {...linkProps}>{visual}</Link>;
    return <a {...linkProps}>{visual}</a>;
  }

  return <button {...(common as unknown as ButtonHTMLAttributes<HTMLButtonElement>)} type={(rest as ButtonHTMLAttributes<HTMLButtonElement>).type ?? "button"}>{visual}</button>;
}
