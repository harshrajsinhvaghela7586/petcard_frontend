import type { Metadata } from "next";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SiteEnhancements from "../components/SiteEnhancements";

export const metadata: Metadata = {
  title: "PetCard — Everything Your Pet Needs. All in One Card.",
  description:
    "PET CARD is your pet's digital companion for identity, daily care, health records, memories, rewards and more.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <SiteEnhancements />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
