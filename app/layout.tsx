import type { Metadata } from "next";
import { cooper, geist } from "./fonts";
import "./globals.css";
import Head from "next/head";

export const metadata: Metadata = {
  title: "koottu - Rent Out Your Room to Verified Students",
  description:
    "List your spare room safely and reach genuine students — no clutter, no spam. Our platform connects homeowners and students directly through verified WhatsApp listings.",
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
    description:
      "List your spare room safely and reach genuine students — no clutter, no spam. koottu connects homeowners and students directly through verified WhatsApp listings.",
    url: "https://koottu.vercel.app",
    siteName: "koottu",
    images: [
      {
        url: "https://koottu.vercel.app/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "koottu. – Find trusted student tenants near you",
      },
    ],
    locale: "en_IE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "koottu – Rent Out Your Room to Verified Students",
    description:
      "Connect homeowners and students safely through verified WhatsApp listings.",
    images: ["https://koottu.vercel.app/og-image.jpg"],
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
        {/* ✅ Favicon and app icons */}
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

        {/* ✅ Open Graph meta tags (explicit for WhatsApp compatibility) */}
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
        <meta property="og:url" content="https://koottu.vercel.app" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="koottu" />

        {/* ✅ Twitter fallback */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="koottu – Rent Out Your Room to Verified Students"
        />
        <meta
          name="twitter:description"
          content="Connect homeowners and students safely through verified WhatsApp listings."
        />
        <meta
          name="twitter:image"
          content="https://koottu.vercel.app/og-image.jpg"
        />
      </Head>

      <body>{children}</body>
    </html>
  );
}
