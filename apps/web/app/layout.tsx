import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import { Inter, PT_Serif } from "next/font/google";
import { SiteHeader } from "../_components/home/navbar";
import { SiteFooter } from "../_components/home/footer";
import { PageTransition } from "../_components/ui/page-transition";
import { ToastProvider } from "../_components/ui/toast";
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

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3001";
const SITE_NAME = "БСОН";
const DEFAULT_TITLE = "БСОН — Бизнесийн сургуулийн оюутны нэгдэл | МУИС";
const DEFAULT_DESCRIPTION =
  "МУИС-ийн Бизнесийн сургуулийн оюутны нэгдэл. Судалгаа, манлайлал, мэргэжлийн туршлага дээр суурилсан оюутны байгууллага.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: DEFAULT_TITLE,
  description: DEFAULT_DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/images/favicon-32.png",
    shortcut: "/images/favicon-16.png",
    apple: "/images/apple-icon-180.png",
  },
  openGraph: {
    type: "website",
    locale: "mn_MN",
    url: "/",
    siteName: SITE_NAME,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [{ url: "/images/hero.jpg", width: 1600, height: 1104 }],
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: ["/images/hero.jpg"],
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
        <ToastProvider>
          <div className="min-h-screen bg-background">
            <SiteHeader />
            <main>
              <PageTransition>{children}</PageTransition>
            </main>
            <SiteFooter />
          </div>
        </ToastProvider>
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}
