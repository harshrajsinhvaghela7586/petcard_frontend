"use client";

import { Bell, Menu, LogOut } from "lucide-react";
import styles from "./AdminNavbar.module.css";

interface AdminNavbarProps {
    onMenuClick: () => void;
}

export default function AdminNavbar({ onMenuClick }: AdminNavbarProps) {
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

    return (
        <header className={styles.navbar}>
            <div className={styles.left}>
                <button
                    className={styles.menuButton}
                    onClick={onMenuClick}
                    aria-label="Open menu"
                >
                    <Menu size={22} />
                </button>

                <div className={styles.pageTitle}>
                    <h1>Dashboard</h1>
                    <span>Welcome back, Admin</span>
                </div>
            </div>

            <div className={styles.right}>
                <button
                    className={styles.notification}
                    aria-label="Notifications"
                >
                    <Bell size={21} />
                    <span className={styles.notificationDot} />
                </button>

                <div className={styles.divider} />

                <div className={styles.profile}>
                    <div className={styles.avatar}>A</div>

                    <div className={styles.profileInfo}>
                        <strong>Admin</strong>
                        <span>Super Administrator</span>
                    </div>
                </div>

                <button
                    className={styles.logoutButton}
                    onClick={handleLogout}
                    title="Logout"
                >
                    <LogOut size={19} />
                </button>
            </div>
        </header>
    );
}