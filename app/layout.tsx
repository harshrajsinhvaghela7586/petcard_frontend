import type { Metadata } from "next";

import "./globals.css";

import Header from "../components/layout/Header/Header";
import Footer from "../components/layout/Footer/Footer";
import SiteEnhancements from "../components/SiteEnhancements";
import LaunchBanner from "../components/layout/LaunchBanner/LaunchBanner";
import ComingSoonPage from "./comming-soon/page";

export const metadata: Metadata = {
  title:
    "PetCard — Everything Your Pet Needs. All in One Card.",

  description:
    "PET CARD is your pet's digital companion for identity, daily care, health records, memories, rewards and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SiteEnhancements />

        {/* Global coming-soon announcement */}
        <LaunchBanner />

        <Header />

<ComingSoonPage/>

        <main>
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}