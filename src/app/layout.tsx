import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import { RootLayoutClient } from "@/components/layout/RootLayoutClient";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PRG Property Group | South Florida Real Estate, Redefined",
  description: "High-end real estate agency based in Miami, Florida.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${dmSans.variable} antialiased`}
      >
        <RootLayoutClient>
          {children}
        </RootLayoutClient>
      </body>
    </html>
  );
}
