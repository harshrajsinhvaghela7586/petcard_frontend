"use client";

import {
  Bell,
  PawPrint,
  Send,
  Heart,
} from "lucide-react";

import { FormEvent, useState } from "react";
import styles from "./LaunchBanner.module.css";
import { usePathname } from "next/navigation";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000/api";

export default function LaunchBanner() {
  const pathname = usePathname();

  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const value = email.trim();

    if (!value) {
      setStatus({
        type: "error",
        text: "Please enter your email address.",
      });
      return;
    }

    // Clear the input on every submit (new, duplicate or error)
    setEmail("");

    try {
      setSubmitting(true);
      setStatus(null);

      const response = await fetch(
        `${API_URL}/newsletter/subscribe`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: value }),
        }
      );

      let data: { message?: string } = {};
      try {
        data = await response.json();
      } catch {
        data = {};
      }

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to subscribe right now."
        );
      }

      setStatus({
        type: "success",
        text: data.message || "You're on the list!",
      });
    } catch (error) {
      setStatus({
        type: "error",
        text:
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again.",
      });
    } finally {
      setSubmitting(false);
      setTimeout(() => setStatus(null), 4000);
    }
  };

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
        <form
          className={styles.notifyForm}
          onSubmit={handleSubmit}
          noValidate
        >
          <div className={styles.inputWrap}>
            <input
              type="email"
              placeholder="Enter your email"
              aria-label="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={submitting}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={submitting}
          >
            <span>
              {submitting ? "Sending..." : "Notify Me"}
            </span>
            <Send size={15} />
          </button>

          {status && (
            <p
              role="status"
              className={`${styles.formStatus} ${
                status.type === "success"
                  ? styles.formStatusSuccess
                  : styles.formStatusError
              }`}
            >
              {status.text}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}