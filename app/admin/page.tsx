"use client";

import { useEffect, useState } from "react";
import {
    Images,
    CircleHelp,
    MessageSquareQuote,
    FileText,
    Mail,
    ArrowUpRight,
} from "lucide-react";

import styles from "./Admin.module.css";

const API_URL =
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:5000/api";

interface DashboardStats {
    heroSlides: number;
    faqs: number;
    testimonials: number;
    blogs: number;
    contacts: number;
    unreadContacts: number;
    repliedContacts: number;
}

interface LatestContact {
    _id: string;
    fullName: string;
    email: string;
    subject?: string;
    message: string;
    isRead: boolean;
    isReplied: boolean;
    createdAt: string;
}

export default function AdminDashboard() {
    const [checkingAuth, setCheckingAuth] = useState(true);

    const [stats, setStats] = useState<DashboardStats>({
        heroSlides: 0,
        faqs: 0,
        testimonials: 0,
        blogs: 0,
        contacts: 0,
        unreadContacts: 0,
        repliedContacts: 0,
    });

    const [latestContacts, setLatestContacts] = useState<
        LatestContact[]
    >([]);

    const [loadingDashboard, setLoadingDashboard] =
        useState(true);

    useEffect(() => {
        const loadDashboard = async () => {
            try {
                const response = await fetch(
                    `${API_URL}/dashboard`,
                    {
                        credentials: "include",
                    }
                );

                if (!response.ok) {
                    window.location.href = "/login";
                    return;
                }

                const data = await response.json();

                if (
                    !data.success
                ) {
                    window.location.href = "/login";
                    return;
                }

                setStats(data.stats);

                setLatestContacts(
                    data.latestContacts || []
                );

                setCheckingAuth(false);
            } catch (error) {
                console.error(
                    "Dashboard Error:",
                    error
                );

                window.location.href = "/login";
            } finally {
                setLoadingDashboard(false);
            }
        };

        loadDashboard();
    }, []);

    const statCards = [
       
        {
            title: "FAQs",
            value: stats.faqs,
            icon: CircleHelp,
            href: "/admin/faqs",
        },
        {
            title: "Testimonials",
            value: stats.testimonials,
            icon: MessageSquareQuote,
            href: "/admin/testimonials",
        },
        {
            title: "Blogs",
            value: stats.blogs,
            icon: FileText,
            href: "/admin/blogs",
        },
        {
            title: "Contacts",
            value: stats.contacts,
            icon: Mail,
            href: "/admin/contacts",
        },
    ];

    if (checkingAuth) {
        return (
            <div className={styles.loadingScreen}>
                <div className={styles.loader} />

                <p>
                    Loading Admin Panel...
                </p>
            </div>
        );
    }

    return (
        <div className={styles.page}>
            {/* =========================
                WELCOME
            ========================= */}

            <div className={styles.welcome}>
                <div>
                    <span className={styles.eyebrow}>
                        ADMIN PANEL
                    </span>

                    <h2>
                        Dashboard Overview
                    </h2>

                    <p>
                        Manage your Petcard website
                        content from one place.
                    </p>
                </div>
            </div>

            {/* =========================
                STATS
            ========================= */}
<section className={styles.statsGrid}>
    {statCards.map((stat, index) => {
        const Icon = stat.icon;

        return (
            <a
                key={stat.href}
                href={stat.href}
                className={styles.statCard}
                style={
                    {
                        "--card-index": index,
                    } as React.CSSProperties
                }
            >
                {/* TOP */}
                <div className={styles.statTop}>
                    <div className={styles.statIcon}>
                        <Icon size={21} />
                    </div>

                    <ArrowUpRight
                        size={18}
                        className={styles.arrow}
                    />
                </div>

                {/* BOTTOM CONTENT */}
                <div className={styles.statBottom}>
                    <div className={styles.statTitle}>
                        <span>
                            {stat.title}
                        </span>

                        <small>
                            Manage {stat.title.toLowerCase()}
                        </small>
                    </div>

                    <div className={styles.statCount}>
                        <strong>
                            {loadingDashboard
                                ? "..."
                                : stat.value}
                        </strong>
                    </div>
                </div>
            </a>
        );
    })}
</section>

            {/* =========================
                LOWER GRID
            ========================= */}

            <section
                className={
                    styles.dashboardGrid
                }
            >
                {/* =====================
                    QUICK ACTIONS
                ===================== */}

                <div className={styles.card}>
                    <div
                        className={
                            styles.cardHeader
                        }
                    >
                        <div>
                            <span>
                                CONTENT MANAGEMENT
                            </span>

                            <h3>
                                Quick Actions
                            </h3>
                        </div>
                    </div>

                    <div
                        className={
                            styles.quickActions
                        }
                    >
                        <a href="/admin/hero-slider">
                            <Images size={20} />

                            <div>
                                <strong>
                                    Manage Hero Slider
                                </strong>

                                <span>
                                    Add and manage
                                    homepage slides
                                </span>
                            </div>

                            <ArrowUpRight size={17} />
                        </a>

                        <a href="/admin/blogs">
                            <FileText size={20} />

                            <div>
                                <strong>
                                    Manage Blogs
                                </strong>

                                <span>
                                    Create and update
                                    blog content
                                </span>
                            </div>

                            <ArrowUpRight size={17} />
                        </a>

                        <a href="/admin/faqs">
                            <CircleHelp size={20} />

                            <div>
                                <strong>
                                    Manage FAQs
                                </strong>

                                <span>
                                    Update frequently
                                    asked questions
                                </span>
                            </div>

                            <ArrowUpRight size={17} />
                        </a>

                        <a href="/admin/testimonials">
                            <MessageSquareQuote
                                size={20}
                            />

                            <div>
                                <strong>
                                    Manage Testimonials
                                </strong>

                                <span>
                                    Manage customer
                                    reviews
                                </span>
                            </div>

                            <ArrowUpRight size={17} />
                        </a>
                    </div>
                </div>

                {/* =====================
                    LATEST CONTACTS
                ===================== */}

                <div className={styles.card}>
                    <div
                        className={
                            styles.cardHeader
                        }
                    >
                        <div>
                            <span>
                                COMMUNICATION
                            </span>

                            <h3>
                                Latest Contacts
                            </h3>
                        </div>

                        <a
                            href="/admin/contacts"
                            className={
                                styles.headerLink
                            }
                        >
                            View All
                            <ArrowUpRight size={15} />
                        </a>
                    </div>

                    <div
                        className={
                            styles.latestContacts
                        }
                    >
                        {loadingDashboard ? (
                            <div
                                className={
                                    styles.contactLoading
                                }
                            >
                                <div
                                    className={
                                        styles.loader
                                    }
                                />

                                <span>
                                    Loading contacts...
                                </span>
                            </div>
                        ) : latestContacts.length ===
                          0 ? (
                            <div
                                className={
                                    styles.emptyState
                                }
                            >
                                <div
                                    className={
                                        styles.emptyIcon
                                    }
                                >
                                    <Mail size={24} />
                                </div>

                                <h4>
                                    No Contacts Yet
                                </h4>

                                <p>
                                    Contact form
                                    submissions will
                                    appear here.
                                </p>
                            </div>
                        ) : (
                            latestContacts.map(
                                (contact) => (
                                    <a
                                        key={
                                            contact._id
                                        }
                                        href={`/admin/contacts?id=${contact._id}`}
                                        className={
                                            styles.contactItem
                                        }
                                    >
                                        <div
                                            className={
                                                styles.contactAvatar
                                            }
                                        >
                                            {contact.fullName
                                                ?.charAt(
                                                    0
                                                )
                                                ?.toUpperCase()}
                                        </div>

                                        <div
                                            className={
                                                styles.contactInfo
                                            }
                                        >
                                            <strong>
                                                {
                                                    contact.fullName
                                                }
                                            </strong>

                                            <span>
                                                {contact.subject ||
                                                    "Contact enquiry"}
                                            </span>

                                            <small>
                                                {
                                                    contact.email
                                                }
                                            </small>
                                        </div>

                                        <div
                                            className={
                                                styles.contactMeta
                                            }
                                        >
                                            {!contact.isRead && (
                                                <span
                                                    className={
                                                        styles.unreadDot
                                                    }
                                                />
                                            )}

                                            <ArrowUpRight
                                                size={16}
                                            />
                                        </div>
                                    </a>
                                )
                            )
                        )}
                    </div>

                    <div
                        className={
                            styles.contactFooter
                        }
                    >
                        <div>
                            <strong>
                                {stats.unreadContacts}
                            </strong>

                            <span>
                                Unread
                            </span>
                        </div>

                        <div>
                            <strong>
                                {stats.repliedContacts}
                            </strong>

                            <span>
                                Replied
                            </span>
                        </div>

                        <a href="/admin/contacts">
                            View Contacts
                           <img src="/images/paw.png" width={15} height={15} />
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}