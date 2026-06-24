import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://arman-ebadi.de"),
  title: "Psychologische Beratung online | Elbmind",
  description:
    "Klinisch-psychologisch fundierte Beratung für Einzelpersonen, Paare, Familien und Angehörige - zeitnah, kultursensibel und auf Deutsch, Englisch oder Dari/Farsi.",
  keywords: [
    "psychologische Beratung online",
    "psychologische Beratung Hamburg",
    "kultursensible Beratung",
    "Beratung Dari Farsi",
    "Paarberatung online",
    "Familienberatung online",
    "Angehörigenberatung",
    "Angst Grübeln Beratung",
    "depressives Erleben Beratung"
  ],
  openGraph: {
    title: "Psychologische Beratung online | Elbmind",
    description:
    "Zeitnahe, kultursensible und vertrauliche psychologische Beratung online per Video oder persönlich nach Absprache in Hamburg.",
    type: "website",
    locale: "de_DE"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className="scroll-smooth">
      <body className={`${inter.variable} ${instrument.variable}`}>{children}</body>
    </html>
  );
}
