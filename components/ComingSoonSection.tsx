"use client";
import {
  ArrowRight,
  Bell,
  Heart,
  PawPrint,
  Send,
} from "lucide-react";

import { FormEvent, useState } from "react";
import styles from "./ComingSoon.module.css";
import { usePathname } from "next/navigation";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000/api";

export default function ComingSoonSection() {
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
    }
  };

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
    <main className={styles.page}>
      {/* =====================================================
          HERO
          ===================================================== */}

      <section className={styles.hero}>
        <div className={styles.backgroundGlow} />

        <div className={styles.container}>
          <div className={styles.heroGrid}>
            {/* =================================================
                LEFT CONTENT
                ================================================= */}

            <div className={styles.content}>
            
              <h1>
                Something
                <br />
                Amazing is
                <br />
                on the{" "}
                <span>Way!</span>

                
              </h1>

              <p className={styles.description}>
                PetCard is your all-in-one app for
                digital pet identity, daily care,
                health records, memories and more —
                with AI by your side.
              </p>

              <div className={styles.launchText}>
                Launching Soon!

                
              </div>

              {/* Email CTA */}
              <form
                className={styles.emailForm}
                onSubmit={handleSubmit}
                noValidate
              >
                <div className={styles.emailInput}>
                  <Send size={17} />

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
                  {submitting ? "Sending..." : "Notify Me"}
                  <Send size={15} />
                </button>
              </form>

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

              <div className={styles.notifyHint}>
                <Bell size={17} />

                <span>
                  Be the first to know when we launch.
                </span>

              
              </div>
            </div>

            {/* =================================================
                RIGHT IMAGE
                ================================================= */}

            <div className={styles.visual}>
              <div className={styles.visualLight} />

              <div className={styles.imageWrapper}>
                <img
                  src="/images/comming-soon.png"
                  alt="PetCard coming soon"
                />
              </div>

              <div
                className={`${styles.floatingPaw} ${styles.floatingPawOne}`}
              >
               
              </div>

              <div
                className={`${styles.floatingPaw} ${styles.floatingPawTwo}`}
              >
                <PawPrint
                  size={19}
                  fill="currentColor"
                />
              </div>

              <div className={styles.heartDecoration}>
                ♡
              </div>
            </div>
          </div>
        </div>
      </section>
     
    </main>
  );
}