import type { Metadata } from "next";

import "./globals.css";

import SiteEnhancements from "../components/SiteEnhancements";
import ConditionalSiteLayout from "../components/layout/ConditionalSiteLayout";

export const metadata: Metadata = {
  title: "PetCard — Everything Your Pet Needs. All in One Card.",

  description:
    "PET CARD is your pet's digital companion for identity, daily care, health records, memories, rewards and more.",

  icons: {
    icon: "/images/fevicon.png",
    shortcut: "/images/fevicon.png",
    apple: "/images/fevicon.png",
  },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                

                <ConditionalSiteLayout>
                    {children}

                </ConditionalSiteLayout>
            </body>
        </html>
    );
}