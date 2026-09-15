"use client";

import {
  Bell,
  PawPrint,
  Send,
  Heart,
} from "lucide-react";

import styles from "./LaunchBanner.module.css";
import { usePathname } from "next/navigation";

export default function LaunchBanner() {
  const pathname = usePathname();

const shouldHide =
  pathname === "/login" ||
  pathname.startsWith("/admin") ||
  pathname === "/signup" ||
  pathname === "/forgot-password" ||
  pathname === "/verify-otp" ||
  pathname === "/resend-otp";

if (shouldHide) {
  return null;
}
  return (
    <div className={styles.banner}>
      <div className={styles.inner}>
        {/* Left message */}
        <div className={styles.message}>
          

          <strong>
            We&apos;re building something paw-some!
          </strong>

          <span className={styles.separator} />

          <span className={styles.messageText}>
            PetCard app is under development and will be
            launching soon.
          </span>

          <span className={styles.separator} />

          <span className={styles.stayTuned}>
            Stay tuned!
          </span>

          <Heart
            className={styles.heart}
            size={17}
            fill="currentColor"
          />
        </div>

        {/* Notify form */}
        <div className={styles.notifyForm}>
          <div className={styles.inputWrap}>
            <input
              type="email"
              placeholder="Enter your email"
              aria-label="Email address"
            />
          </div>

          <button
            type="button"
            className="btn btn-primary"
          >
            <span>Notify Me</span>
            <Send size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}