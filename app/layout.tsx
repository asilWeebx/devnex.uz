import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./context/ThemeContext";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Devnex — IT Yechimlar | CRM, ERP, Mobile, Web, DevOps",
  description: "Devnex — biznesingiz uchun CRM, ERP, Mobile ilovalar, Web saytlar, DevOps va Backend API yechimlari. Toshkent, O'zbekiston.",
  keywords: "CRM, ERP, mobile ilovalar, web sayt, DevOps, cloud, backend api, IT kompaniya, Toshkent",
  openGraph: {
    title: "Devnex — IT Yechimlar",
    description: "Biznesingizni raqamlashtirish bizning ishimiz",
    locale: "uz_UZ",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uz" className={inter.variable} suppressHydrationWarning>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
