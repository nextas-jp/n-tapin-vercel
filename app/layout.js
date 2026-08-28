import { Noto_Sans_JP, Inter } from "next/font/google";
import { siteConfig } from "@/constants";
import "./globals.css";


const notoSans = Noto_Sans_JP({
  variable: "--font-noto-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="ja"
      className={`${notoSans.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col suppressHydrationWarning">{children}</body>
    </html>
  );
}
