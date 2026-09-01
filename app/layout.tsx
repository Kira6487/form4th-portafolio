import type { Metadata } from "next";
import { Space_Grotesk, DM_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { Footer } from "@/components/footer";

const space = Space_Grotesk({ subsets: ["latin"], variable: "--font-space" });
const mono = DM_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono" });

export const metadata: Metadata = {
  metadataBase: new URL("https://form4th.com"),
  alternates: { canonical: "/" },
  title: { default: "FORM4TH — Digital Product Studio", template: "%s — FORM4TH" },
  description: "Diseñamos productos digitales para empresas que quieren mejorar su presencia, organizar sus procesos y crecer con tecnología.",
  openGraph: { title: "FORM4TH — Digital Product Studio", description: "Shape your presence. Own your systems.", type: "website" },
  twitter: { card: "summary_large_image", title: "FORM4TH — Digital Product Studio", description: "Shape your presence. Own your systems." },
  icons: { icon: "/images/logo-f4.jpeg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es"><body className={`${space.variable} ${mono.variable}`}><SiteHeader />{children}<Footer /></body></html>;
}
