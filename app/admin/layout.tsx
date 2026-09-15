"use client";

import { useState } from "react";

import AdminNavbar from "../../components/admin/Navbar/AdminNavbar";
import AdminSidebar from "../../components/admin/Sidebar/AdminSidebar";

import styles from "./AdminLayout.module.css";

export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className={styles.adminLayout}>
            <AdminSidebar
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />

            <div className={styles.mainWrapper}>
                <AdminNavbar
                    onMenuClick={() =>
                        setSidebarOpen(true)
                    }
                />

                <main className={styles.content}>
                    {children}
                </main>
            </div>
        </div>
    );
}