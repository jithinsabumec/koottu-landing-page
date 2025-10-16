import type { Metadata } from "next";
import { cooper, geist } from "./fonts";
import "./globals.css";
import Head from "next/head";

import { Analytics } from "@vercel/analytics/next"

export const metadata: Metadata = {
  title: "koottu – Rent Out Your Room to Verified Students",
  description: "List your spare room safely and reach genuine students — no clutter, no spam. koottu connects homeowners and students directly through verified WhatsApp listings.",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png", 
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "koottu – Rent Out Your Room to Verified Students",
    description: "List your spare room safely and reach genuine students — no clutter, no spam. koottu connects homeowners and students directly through verified WhatsApp listings.",
    url: "https://koottu.vercel.app",
    siteName: "koottu",
    images: [
      {
        url: "https://koottu.vercel.app/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "koottu – Find trusted student tenants near you",
      },
    ],
    locale: "en_IE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "koottu – Rent Out Your Room to Verified Students",
    description: "List your spare room safely and reach genuine students — no clutter, no spam. koottu connects homeowners and students directly through verified WhatsApp listings.",
    images: ["https://koottu.vercel.app/og-image.jpg"],
  },
  other: {
    'og:image:width': '1200',
    'og:image:height': '630',
    'og:image:alt': 'koottu – Find trusted student tenants near you',
    'twitter:image:alt': 'koottu – Find trusted student tenants near you',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cooper.variable} ${geist.variable}`}>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Favicon and app icons */}
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />

        {/* Open Graph / Facebook Meta Tags */}
        <meta property="og:url" content="https://koottu.vercel.app" />
        <meta property="og:type" content="website" />
        <meta 
          property="og:title" 
          content="koottu – Rent Out Your Room to Verified Students" 
        />
        <meta
          property="og:description"
          content="List your spare room safely and reach genuine students — no clutter, no spam. koottu connects homeowners and students directly through verified WhatsApp listings."
        />
        <meta
          property="og:image"
          content="https://koottu.vercel.app/og-image.jpg"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta
          property="og:image:alt"
          content="koottu – Find trusted student tenants near you"
        />
        <meta property="og:site_name" content="koottu" />
        <meta property="og:locale" content="en_IE" />

        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta 
          name="twitter:title" 
          content="koottu – Rent Out Your Room to Verified Students" 
        />
        <meta
          name="twitter:description"
          content="List your spare room safely and reach genuine students — no clutter, no spam. koottu connects homeowners and students directly through verified WhatsApp listings."
        />
        <meta
          name="twitter:image"
          content="https://koottu.vercel.app/og-image.jpg"
        />
        <meta 
          name="twitter:image:alt" 
          content="koottu – Find trusted student tenants near you" 
        />
      </Head>

      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}