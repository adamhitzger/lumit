import type { Metadata } from "next";
import { Geist,  Instrument_Serif } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Toaster } from "react-hot-toast";
import { Suspense } from "react";
import WhatsAppButton from "@/components/whatsapp";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const inSerif = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: ["400"]
})

export const metadata: Metadata = {
  title: "Autobazar Lumit s.r.o. Havlíčkův Brod | Prodej a výkup vozů",
  description:
    "Autobazar Lumit s.r.o. v Havlíčkově Brodě – specializujeme se na prodej, výkup a protiúčet osobních i užitkových automobilů. Nabízíme prověřené vozy, férové ceny a profesionální přístup.",
  icons: {
    icon: "/logo.png",
  },
  applicationName: "Lumit Autobazar",
  generator: "Next.ts",
  authors: [
    { name: "Adam Hitzger" },
    { name: "Michal Teplý" }
  ],
  keywords: [
    "autobazar Havlíčkův Brod",
    "prodej ojetých vozů",
    "výkup automobilů",
    "protiúčet auta",
    "ojeté vozy Havlíčkův Brod",
    "Lumit s.r.o.",
    "osobní auta",
    "užitkové vozy",
    "prodej aut",
    "koupě auta"
  ],
  creator: "Adam Hitzger",
  publisher: "Adam Hitzger",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Autobazar Lumit s.r.o. Havlíčkův Brod | Prověřené ojeté vozy",
    description:
      "Navštivte Autobazar Lumit s.r.o. v Havlíčkově Brodě. Nabízíme široký výběr prověřených ojetých vozů, možnost výkupu a protiúčtu. Férové ceny a osobní přístup.",
    url: "https://auto-mt.com",
    siteName: "Autobazar Lumit s.r.o. Havlíčkův Brod",
    locale: "cs_CZ",
    type: "website",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${inSerif.variable} antialiased bg-gray-200 overflow-x-hidden`}
      >
        <Suspense>
        <Navbar/>
        {children}
        <WhatsAppButton/>
        <Footer/>
        </Suspense>
        <Toaster
        />
      </body>
    </html>
  );
}
