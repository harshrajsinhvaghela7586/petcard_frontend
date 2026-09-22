"use client";

import { usePathname } from "next/navigation";

import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import LaunchBanner from "./LaunchBanner/LaunchBanner";
import ComingSoonPage from "../../app/comming-soon/page";
import Chatbot from "../chatbot/Chatbot";

interface ConditionalSiteLayoutProps {
    children: React.ReactNode;
}

export default function ConditionalSiteLayout({
    children,
}: ConditionalSiteLayoutProps) {
    const pathname = usePathname();

    const isAdminRoute = pathname.startsWith("/admin") || pathname.startsWith("/login");

    if (isAdminRoute) {
        return <>{children}</>;
    }

    return (
        <>
            <LaunchBanner />

            <Header />

            <ComingSoonPage />
<Chatbot/>
            <main>{children}</main>

            <Footer />
        </>
    );
}