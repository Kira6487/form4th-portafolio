"use client";

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { useCallback, useState, type AnchorHTMLAttributes, type ButtonHTMLAttributes, type ReactNode } from "react";
import { playKeyboardSound, type KeyboardSound } from "./audio-manager";
import normalKey from "../../images/tecla-normal.png";
import spaceKey from "../../images/barra-grande.png";
import f4Key from "../../images/boton-f4-principal.png";

export type KeyboardVariant = "normal" | "space" | "f4";
export type KeyboardSize = "xs" | "sm" | "md" | "lg";

type CommonProps = {
  variant?: KeyboardVariant;
  size?: KeyboardSize;
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
  space: spaceKey,
  f4: f4Key,
};

const sounds: Record<KeyboardVariant, KeyboardSound> = {
  normal: "general",
  space: "space",
  f4: "general",
};

export function KeyboardButton({
  variant = "normal",
  size = "md",
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
  onPointerCancel,
  onPointerLeave,
  onBlur,
  onKeyDown,
  onKeyUp,
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
    className: `keyboard-button keyboard-button--${variant} keyboard-button--size-${size ?? "md"} ${pressed ? "is-pressed" : ""} ${className}`.trim(),
    "aria-label": rest["aria-label"] ?? (typeof content === "string" ? content : label),
    onPointerDown: (event: React.PointerEvent<HTMLButtonElement | HTMLAnchorElement>) => {
      setPressed(true);
      onPointerDown?.(event as never);
    },
    onPointerUp: (event: React.PointerEvent<HTMLButtonElement | HTMLAnchorElement>) => {
      release();
      onPointerUp?.(event as never);
    },
    onPointerCancel: (event: React.PointerEvent<HTMLButtonElement | HTMLAnchorElement>) => {
      release();
      onPointerCancel?.(event as never);
    },
    onPointerLeave: (event: React.PointerEvent<HTMLButtonElement | HTMLAnchorElement>) => {
      release();
      onPointerLeave?.(event as never);
    },
    onBlur: (event: React.FocusEvent<HTMLButtonElement | HTMLAnchorElement>) => {
      release();
      onBlur?.(event as never);
    },
    onKeyDown: (event: React.KeyboardEvent<HTMLButtonElement | HTMLAnchorElement>) => {
      if ((event.key === "Enter" || event.key === " ") && !event.repeat) {
        setPressed(true);
      }
      onKeyDown?.(event as never);
    },
    onKeyUp: (event: React.KeyboardEvent<HTMLButtonElement | HTMLAnchorElement>) => {
      release();
      onKeyUp?.(event as never);
    },
    onClick: (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
      // Click is the single activation event for audio. Native keyboard
      // activation and touch/pointer input both converge here once.
      playKeyboardSound(sounds[variant]);
      onPress?.();
      onClick?.(event as never);
    },
  };

  const visual = <>
    <Image fill className="keyboard-button__image" src={asset} alt="" aria-hidden="true" sizes={variant === "space" ? "(max-width: 700px) 88vw, 420px" : variant === "f4" ? "(max-width: 700px) 52vw, 360px" : "240px"} />
    <span className="keyboard-button__content">{icon}{content}</span>
  </>;

  if (href) {
    const linkProps = { ...common, href } as unknown as AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };
    if (!external && href.startsWith("/")) return <Link {...linkProps}>{visual}</Link>;
    return <a {...linkProps}>{visual}</a>;
  }

  return <button {...(common as unknown as ButtonHTMLAttributes<HTMLButtonElement>)} type={(rest as ButtonHTMLAttributes<HTMLButtonElement>).type ?? "button"}>{visual}</button>;
}
