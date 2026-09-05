import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aurum Genève | Fine Timepieces",
  description: "Experience the pinnacle of horological excellence with Aurum Genève. Explore our exclusive collection of luxury timepieces crafted for precision and elegance.",
  keywords: ["Aurum Genève", "luxury watches", "fine timepieces", "swiss watches", "horology", "chronograph", "mechanical watches"],
  openGraph: {
    title: "Aurum Genève | Fine Timepieces",
    description: "Experience the pinnacle of horological excellence with Aurum Genève.",
    url: "https://aurumgeneve.com",
    siteName: "Aurum Genève",
    images: [
      {
        url: "/assets/craftsmanship.jpg",
        width: 1200,
        height: 630,
        alt: "Aurum Genève Craftsmanship",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aurum Genève | Fine Timepieces",
    description: "Mastery in every moment. Explore our exclusive collection.",
    images: ["/assets/craftsmanship.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} antialiased`}
    >
      <body className="bg-black text-white">{children}</body>
    </html>
  );
}
