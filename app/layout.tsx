import React from "react";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import Header from "./_components/Header";
import Footer from "./_components/Footer";
// import { APIProvider } from "./_contexts/APIContext";
import { InboxProvider } from "./_contexts/InboxContext";
import { Flowbite } from "flowbite-react";
import { customTheme } from "./_ui/theme";
import "./globals.css";
import Alerts from "./_components/Alerts";
import { APIProvider } from "_contexts/APIContext";

// import { Inter } from "next/font/google";

// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Reelview",
  description: "An app thing",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="dark" lang="en">
      <body>
        <Flowbite theme={{ mode: "dark", theme: customTheme }}>
          <Header />
          <InboxProvider>
            <APIProvider>
              <Alerts />
              <main>{children}</main>
            </APIProvider>
          </InboxProvider>
          <Footer />
        </Flowbite>
        <Analytics />
      </body>
    </html>
  );
}
