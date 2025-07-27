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
  title: "Lumit Autobazar",
  description: "Autobazar Lumit s.r.o.",
  icons: {
    icon: "/logo.png"
  },
  applicationName: "Lumit",
  generator: "Next.ts",
  authors: [{name: "Adam Hitzger"}, {name: "Michal Teplý"}],
  keywords: [
    "správa portfolia ",
    "investice",
    "portfolio management",
    "investiční poradce",
    "finanční plánování",
    "osobní investice",
    " Havlíčkův Brod",
],
creator: "Adam Hitzger",
        publisher: "Adam Hitzger",
        formatDetection: {
            email: false,
            address: false,
            telephone: false,
          },
openGraph: {
  title: "Autobazar Lumit s.r.o. Havlíčkův Brod",
  description: "V oboru financí pracuji od roku 1998 tedy více jak 27 let. Specializuji se na investice a rizika v osobních financích. Na mém webu najdete články, ebook, newsletter a můžete si předplatit obsah.",
  url: "https://www.financehb.cz",
  siteName: "Autobazar Lumit s.r.o. Havlíčkův Brod",
  locale: "cs_CZ",
  type: "website"
}
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
