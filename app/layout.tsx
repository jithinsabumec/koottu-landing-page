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
  manifest: "/site.webmanifest"
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

        {/* Optional: if you also have a Safari pinned icon */}
        {/* <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#000000" /> */}
      </Head>

      <body>{children}</body>
    </html>
  );
}
