"use client";

import {
  Bell,
  PawPrint,
  Send,
  Heart,
} from "lucide-react";

import styles from "./LaunchBanner.module.css";

export default function LaunchBanner() {
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