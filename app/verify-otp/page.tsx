"use client";

import { FormEvent, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Loader2 } from "lucide-react";

import styles from "./VerifyOtp.module.css";

const API_URL =
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:5000/api";

export default function VerifyOtpPage() {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");

    const [loading, setLoading] = useState(false);
    const [resending, setResending] = useState(false);

    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const [resendTimer, setResendTimer] = useState(60);

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

    useEffect(() => {
        if (resendTimer <= 0) return;

        const timer = setInterval(() => {
            setResendTimer((previous) =>
                previous > 0 ? previous - 1 : 0
            );
        }, 1000);

        return () => clearInterval(timer);
    }, [resendTimer]);

    const handleSubmit = async (
        event: FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        setError("");
        setMessage("");

        if (!email || !/^\d{6}$/.test(otp)) {
            setError(
                "Please enter the valid 6-digit OTP."
            );
            return;
        }

        try {
            setLoading(true);

            const response = await fetch(
                `${API_URL}/auth/verify-forgot-password-otp`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify({
                        email,
                        otp,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok || !data.success) {
                setError(
                    data.message ||
                        "Invalid OTP. Please try again."
                );
                return;
            }

            /*
             * Backend should set the reset authorization
             * as an HttpOnly cookie.
             */
            setMessage(
                "OTP verified successfully."
            );

            setTimeout(() => {
                window.location.href =
                    "/change-password";
            }, 600);
        } catch (error) {
            console.error(
                "Verify OTP error:",
                error
            );

            setError(
                "Unable to connect to the server. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    const handleResend = async () => {
        if (resendTimer > 0 || resending || !email) {
            return;
        }

        setError("");
        setMessage("");

        try {
            setResending(true);

            const response = await fetch(
                `${API_URL}/auth/resend-forgot-password-otp`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify({
                        email,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok || !data.success) {
                setError(
                    data.message ||
                        "Unable to resend OTP."
                );

                if (data.retryAfterSeconds) {
                    setResendTimer(
                        data.retryAfterSeconds
                    );
                }

                return;
            }

            setOtp("");
            setResendTimer(
                data.resendAvailableInSeconds || 60
            );

            setMessage(
                "A new OTP has been sent to your email."
            );
        } catch (error) {
            console.error(
                "Resend OTP error:",
                error
            );

            setError(
                "Unable to connect to the server. Please try again."
            );
        } finally {
            setResending(false);
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
                    <h2>Verify OTP</h2>

                    <p>
                        Enter the 6-digit OTP sent to
                        <br />
                        <strong>{email}</strong>
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
                        <label htmlFor="otp">
                            Verification Code
                        </label>

                        <input
                            id="otp"
                            type="text"
                            inputMode="numeric"
                            maxLength={6}
                            placeholder="Enter 6-digit OTP"
                            value={otp}
                            onChange={(event) =>
                                setOtp(
                                    event.target.value.replace(
                                        /\D/g,
                                        ""
                                    )
                                )
                            }
                            autoComplete="one-time-code"
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
                                Verifying...
                            </>
                        ) : (
                            "Verify OTP"
                        )}
                    </button>
                </form>

                <div className={styles.resend}>
                    <span>Didn&apos;t receive the OTP?</span>

                    <button
                        type="button"
                        onClick={handleResend}
                        disabled={
                            resendTimer > 0 ||
                            resending
                        }
                    >
                        {resending
                            ? "Sending..."
                            : resendTimer > 0
                            ? `Resend OTP in ${resendTimer}s`
                            : "Resend OTP"}
                    </button>
                </div>

                <div className={styles.backLink}>
                    <Link href="/forgot-password">
                        <ArrowLeft size={15} />
                        Change Email
                    </Link>
                </div>
            </section>
        </main>
    );
}