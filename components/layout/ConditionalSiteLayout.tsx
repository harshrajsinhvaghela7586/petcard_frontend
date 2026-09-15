"use client";

import { usePathname } from "next/navigation";

import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import LaunchBanner from "./LaunchBanner/LaunchBanner";
import ComingSoonPage from "../../app/comming-soon/page";

interface ConditionalSiteLayoutProps {
    children: React.ReactNode;
}

export default function ConditionalSiteLayout({
    children,
}: ConditionalSiteLayoutProps) {
    const pathname = usePathname();

    const isAdminRoute = pathname.startsWith("/admin");

    if (isAdminRoute) {
        return <>{children}</>;
    }

    return (
        <>
            <LaunchBanner />

            <Header />

            <ComingSoonPage />

            <main>{children}</main>

            <Footer />
        </>
    );
}