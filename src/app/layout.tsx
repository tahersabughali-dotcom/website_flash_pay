import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { settingsData } from "@/data/settingsData";
import { PlatformLayout } from "@/components/layout/PlatformLayout";
import { buildPageMetadata } from "@/lib/seo";
import { getTextDirection } from "@/lib/i18n";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = buildPageMetadata(settingsData);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const lang = settingsData.defaultLanguage;
  const dir = getTextDirection(lang);

  if (settingsData.maintenanceMode) {
    return (
      <html lang={lang} dir={dir} className={`${geistSans.variable} ${geistMono.variable} h-full`}>
        <body className="flex min-h-full items-center justify-center bg-flash-surface p-8 text-center">
          <p className="text-lg text-flash-text">
            {lang === "ar"
              ? "المنصة قيد الصيانة. سنعود قريباً."
              : "Platform under maintenance. We will be back soon."}
          </p>
        </body>
      </html>
    );
  }

  return (
    <html
      lang={lang}
      dir={dir}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <PlatformLayout>{children}</PlatformLayout>
      </body>
    </html>
  );
}
