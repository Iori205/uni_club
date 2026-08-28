import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import { Inter, PT_Serif } from "next/font/google";
import { SiteHeader } from "../_components/home/navbar";
import { SiteFooter } from "../_components/home/footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

const ptSerif = PT_Serif({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "700"],
  variable: "--font-pt-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "БСОН — Бизнесийн сургуулийн оюутны нэгдэл | МУИС",
  description:
    "МУИС-ийн Бизнесийн сургуулийн оюутны нэгдэл. Судалгаа, манлайлал, мэргэжлийн туршлага дээр суурилсан оюутны байгууллага.",
  icons: {
    icon: "/images/logo.png",
    apple: "/images/logo.png",
  },
};

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="mn" className={`light ${inter.variable} ${ptSerif.variable}`}>
      <body className="bg-background font-sans antialiased">
        <div className="min-h-screen bg-background">
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </div>
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}
