"use client";

import { FormEvent, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    ArrowLeft,
    Eye,
    EyeOff,
    Loader2,
} from "lucide-react";

import styles from "./ChangePassword.module.css";

const API_URL =
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:5000/api";

export default function ChangePasswordPage() {
    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] =
        useState("");

    const [showPassword, setShowPassword] =
        useState(false);

    const [showConfirmPassword, setShowConfirmPassword] =
        useState(false);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        const storedEmail =
            sessionStorage.getItem(
                "passwordResetEmail"
            );

        if (!storedEmail) {
            window.location.href = "/forgot-password";
            return;
        }

        setEmail(storedEmail);
    }, []);

    const handleSubmit = async (
        event: FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        setError("");
        setMessage("");

        if (!password || !confirmPassword) {
            setError(
                "Please enter and confirm your new password."
            );
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            setLoading(true);

            /*
             * Reset authorization is sent automatically
             * through the HttpOnly cookie set by backend.
             */
            const response = await fetch(
                `${API_URL}/auth/reset-password`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify({
                        password,
                        confirmPassword,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok || !data.success) {
                setError(
                    data.message ||
                        "Unable to change password."
                );
                return;
            }

            setMessage(
                "Password changed successfully. Redirecting to login..."
            );

            sessionStorage.removeItem(
                "passwordResetEmail"
            );

            setTimeout(() => {
                window.location.href = "/login";
            }, 1200);
        } catch (error) {
            console.error(
                "Change password error:",
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
                    <h2>Change Password</h2>

                    <p>
                        Create a new secure password for
                        your Petcard account.
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
                    {/* NEW PASSWORD */}
                    <div className={styles.field}>
                        <label htmlFor="password">
                            New Password
                        </label>

                        <div
                            className={
                                styles.passwordWrapper
                            }
                        >
                            <input
                                id="password"
                                type={
                                    showPassword
                                        ? "text"
                                        : "password"
                                }
                                placeholder="Enter new password"
                                value={password}
                                onChange={(event) =>
                                    setPassword(
                                        event.target.value
                                    )
                                }
                                autoComplete="new-password"
                                disabled={loading}
                                required
                            />

                            <button
                                type="button"
                                className={
                                    styles.passwordToggle
                                }
                                onClick={() =>
                                    setShowPassword(
                                        (previous) =>
                                            !previous
                                    )
                                }
                                aria-label={
                                    showPassword
                                        ? "Hide password"
                                        : "Show password"
                                }
                                disabled={loading}
                            >
                                {showPassword ? (
                                    <EyeOff size={18} />
                                ) : (
                                    <Eye size={18} />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* CONFIRM PASSWORD */}
                    <div className={styles.field}>
                        <label htmlFor="confirmPassword">
                            Confirm Password
                        </label>

                        <div
                            className={
                                styles.passwordWrapper
                            }
                        >
                            <input
                                id="confirmPassword"
                                type={
                                    showConfirmPassword
                                        ? "text"
                                        : "password"
                                }
                                placeholder="Confirm new password"
                                value={confirmPassword}
                                onChange={(event) =>
                                    setConfirmPassword(
                                        event.target.value
                                    )
                                }
                                autoComplete="new-password"
                                disabled={loading}
                                required
                            />

                            <button
                                type="button"
                                className={
                                    styles.passwordToggle
                                }
                                onClick={() =>
                                    setShowConfirmPassword(
                                        (previous) =>
                                            !previous
                                    )
                                }
                                aria-label={
                                    showConfirmPassword
                                        ? "Hide password"
                                        : "Show password"
                                }
                                disabled={loading}
                            >
                                {showConfirmPassword ? (
                                    <EyeOff size={18} />
                                ) : (
                                    <Eye size={18} />
                                )}
                            </button>
                        </div>
                    </div>

                    <div className={styles.passwordHint}>
                        Password must contain at least 8
                        characters, including uppercase,
                        lowercase, number and special
                        character.
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
                                Changing Password...
                            </>
                        ) : (
                            "Change Password"
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