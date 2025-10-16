import type { Metadata } from "next";
import { cooper, geist } from './fonts'
import './globals.css'

export const metadata: Metadata = {
  title: "koottu - Landing Page",
  description: "Landing page for koottu",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${cooper.variable} ${geist.variable}`}>
      <body>{children}</body>
    </html>
  )
}
