"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Loader2, ArrowLeft, Mail } from "lucide-react";

import styles from "./ForgotPassword.module.css";

const API_URL =
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:5000/api";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (
        event: FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        setError("");
        setMessage("");

        const trimmedEmail = email.trim();

        if (!trimmedEmail) {
            setError("Please enter your email address.");
            return;
        }

        try {
            setLoading(true);

            const response = await fetch(
                `${API_URL}/auth/forgot-password`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify({
                        email: trimmedEmail,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok || !data.success) {
                setError(
                    data.message ||
                        "Unable to send OTP. Please try again."
                );
                return;
            }

            /*
             * Keep email only for the current
             * password-reset flow.
             */
            sessionStorage.setItem(
                "passwordResetEmail",
                trimmedEmail
            );

            setMessage(
                "If an account exists with this email, an OTP has been sent."
            );

            setTimeout(() => {
                window.location.href = "/verify-otp";
            }, 800);
        } catch (error) {
            console.error(
                "Forgot password error:",
                error
            );

            setError(
                "Unable to connect to the server. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className={styles.loginPage}>
            <section className={styles.loginCard}>

                {/* BRAND */}
                <div className={styles.brand}>
                    <Image
                        src="/images/brand/dog.png"
                        alt="Petcard"
                        width={70}
                        height={70}
                        priority
                        className={styles.brandLogo}
                    />

                    <div className={styles.brandContent}>
                        <h1>
                            <span className={styles.pet}>
                                PET
                            </span>
                            <span className={styles.card}>
                                CARD
                            </span>
                        </h1>

                        <p>
                            WORLD&apos;S FIRST AI-ENABLED PET ID
                        </p>
                    </div>
                </div>

                {/* HEADING */}
                <div className={styles.heading}>
                    <div className={styles.icon}>
                        <Mail size={22} />
                    </div>

                    <h2>Forgot Password?</h2>

                    <p>
                        Enter your email address and we&apos;ll
                        send you an OTP to reset your password.
                    </p>
                </div>

                {error && (
                    <div
                        className={styles.errorMessage}
                        role="alert"
                    >
                        {error}
                    </div>
                )}

                {message && (
                    <div
                        className={styles.successMessage}
                        role="status"
                    >
                        {message}
                    </div>
                )}

                <form
                    className={styles.form}
                    onSubmit={handleSubmit}
                >
                    <div className={styles.field}>
                        <label htmlFor="email">
                            Email Address
                        </label>

                        <input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(event) =>
                                setEmail(event.target.value)
                            }
                            autoComplete="email"
                            disabled={loading}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <Loader2
                                    size={18}
                                    className={styles.spinner}
                                />
                                Sending OTP...
                            </>
                        ) : (
                            "Send OTP"
                        )}
                    </button>
                </form>

                <div className={styles.backLink}>
                    <Link href="/login">
                        <ArrowLeft size={15} />
                        Back to Login
                    </Link>
                </div>
            </section>
        </main>
    );
}