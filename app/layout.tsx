import type { Metadata } from "next";
import { Provider as JotaiProvider } from "jotai";
import "./globals.css";
import "./tiptap.css";

import { Inter } from 'next/font/google';
import { Toaster } from "sonner";
import TailwindSizeMarker from "./components/dev/TailwindSizeMarker";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <JotaiProvider>
        <Toaster richColors position="top-right" />
        <body
          className={`${inter.className} antialiased`}
        >
          {children}
          <TailwindSizeMarker />
        </body>
      </JotaiProvider>
    </html>
  );
}
