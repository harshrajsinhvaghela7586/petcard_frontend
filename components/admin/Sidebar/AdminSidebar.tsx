"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Images,
    CircleHelp,
    MessageSquareQuote,
    FileText,
    Mail,
    UserRound,
    LockKeyhole,
    LogOut,
    X,
    Settings,
} from "lucide-react";

import styles from "./AdminSidebar.module.css";

interface AdminSidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

const contentItems = [
    {
        label: "Hero Slider",
        href: "/admin/hero-slider",
        icon: Images,
    },
    {
        label: "FAQs",
        href: "/admin/faqs",
        icon: CircleHelp,
    },
    {
        label: "Testimonials",
        href: "/admin/testimonials",
        icon: MessageSquareQuote,
    },
    {
        label: "Blogs",
        href: "/admin/blogs",
        icon: FileText,
    },
];

const communicationItems = [
    {
        label: "Contacts",
        href: "/admin/contacts",
        icon: Mail,
    },
];

const settingsItems = [
    {
        label: "Profile",
        href: "/admin/profile",
        icon: UserRound,
    },
];

export default function AdminSidebar({
    isOpen,
    onClose,
}: AdminSidebarProps) {
    const pathname = usePathname();

    const isActive = (href: string) => {
        if (href === "/admin") {
            return pathname === "/admin";
        }

        return pathname.startsWith(href);
    };

    const handleLogout = async () => {
        try {
            await fetch(
                `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"}/auth/logout`,
                {
                    method: "POST",
                    credentials: "include",
                }
            );

            window.location.href = "/login";
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    const renderItem = (
        item: {
            label: string;
            href: string;
            icon: React.ElementType;
        }
    ) => {
        const Icon = item.icon;

        return (
            <Link
                key={item.href}
                href={item.href}
                className={`${styles.navItem} ${
                    isActive(item.href) ? styles.active : ""
                }`}
                onClick={onClose}
            >
                <Icon size={19} strokeWidth={1.9} />
                <span>{item.label}</span>
            </Link>
        );
    };

    return (
        <>
            {isOpen && (
                <div
                    className={styles.overlay}
                    onClick={onClose}
                />
            )}

            <aside
                className={`${styles.sidebar} ${
                    isOpen ? styles.open : ""
                }`}
            >
                <div className={styles.sidebarHeader}>
                    <Link href="/admin" className={styles.brand}>
                        <img
                            src="/images/brand/dog.png"
                            alt="Petcard"
                            className={styles.logo}
                        />

                        <div className={styles.brandText}>
                            <h2>
                                <span>PET</span>
                                <strong>CARD</strong>
                            </h2>
                            <p>ADMIN PANEL</p>
                        </div>
                    </Link>

                    <button
                        className={styles.closeButton}
                        onClick={onClose}
                        aria-label="Close sidebar"
                    >
                        <X size={21} />
                    </button>
                </div>

                <nav className={styles.navigation}>
                    <div className={styles.section}>
                        <span className={styles.sectionTitle}>
                            Overview
                        </span>

                        <Link
                            href="/admin"
                            className={`${styles.navItem} ${
                                isActive("/admin")
                                    ? styles.active
                                    : ""
                            }`}
                            onClick={onClose}
                        >
                            <LayoutDashboard
                                size={19}
                                strokeWidth={1.9}
                            />
                            <span>Dashboard</span>
                        </Link>
                    </div>

                    <div className={styles.section}>
                        <span className={styles.sectionTitle}>
                            Content Management
                        </span>

                        {contentItems.map(renderItem)}
                    </div>

                    <div className={styles.section}>
                        <span className={styles.sectionTitle}>
                            Communication
                        </span>

                        {communicationItems.map(renderItem)}
                    </div>

                    <div className={styles.section}>
                        <span className={styles.sectionTitle}>
                            Settings
                        </span>

                        {settingsItems.map(renderItem)}
                    </div>
                </nav>

                <div className={styles.sidebarBottom}>
                    <button
                        className={styles.logout}
                        onClick={handleLogout}
                    >
                        <LogOut size={19} />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>
        </>
    );
}