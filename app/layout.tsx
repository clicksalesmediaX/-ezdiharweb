import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "إزدهار ويب | خدمات النمو الرقمي",
  description: "خدمات تسويقية احترافية بجودة عالمية وأسعار تنافسية. مواقع، متاجر، وإعلانات جوجل مصممة لتحويل كل ريال تدفعه إلى أرباح حقيقية.",
  icons: {
    icon: "/ezdiharfav.png",
    shortcut: "/ezdiharfav.png",
    apple: "/ezdiharfav.png",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
