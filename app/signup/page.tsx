"use client";

import { FormEvent, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

import styles from "./Signup.module.css";

const API_URL =
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:5000/api";

interface SignupStatusResponse {
    success: boolean;
    canSignup: boolean;
    adminExists: boolean;
}

interface SignupResponse {
    success: boolean;
    message: string;
    email?: string;
    code?: string;
    otpExpiresInSeconds?: number;
    resendAvailableInSeconds?: number;
}

export default function SignupPage() {
    const router = useRouter();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] =
        useState("");

    const [showPassword, setShowPassword] =
        useState(false);

    const [showConfirmPassword, setShowConfirmPassword] =
        useState(false);

    const [loading, setLoading] = useState(false);
    const [checkingStatus, setCheckingStatus] =
        useState(true);

    const [error, setError] = useState("");

    useEffect(() => {
        const checkSignupStatus = async () => {
            try {
                const response = await fetch(
                    `${API_URL}/auth/signup-status`,
                    {
                        method: "GET",
                        credentials: "include",
                        cache: "no-store",
                    }
                );

                const data: SignupStatusResponse =
                    await response.json();

                if (
                    !response.ok ||
                    !data.success
                ) {
                    router.replace("/login");
                    return;
                }

                /*
                 * IMPORTANT:
                 * If admin already exists, signup page
                 * should never remain accessible.
                 */
                if (!data.canSignup) {
                    router.replace("/login");
                    return;
                }
            } catch (error) {
                console.error(
                    "Signup status error:",
                    error
                );

                router.replace("/login");
            } finally {
                setCheckingStatus(false);
            }
        };

        checkSignupStatus();
    }, [router]);

    const handleSubmit = async (
        event: FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        setError("");

        const trimmedName = name.trim();
        const trimmedEmail = email.trim();

        if (
            !trimmedName ||
            !trimmedEmail ||
            !password ||
            !confirmPassword
        ) {
            setError(
                "Please fill in all required fields."
            );
            return;
        }

        if (password !== confirmPassword) {
            setError(
                "Password and confirm password do not match."
            );
            return;
        }

        if (password.length < 8) {
            setError(
                "Password must be at least 8 characters."
            );
            return;
        }

        try {
            setLoading(true);

            const response = await fetch(
                `${API_URL}/auth/signup`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json",
                    },

                    credentials: "include",

                    body: JSON.stringify({
                        name: trimmedName,
                        email: trimmedEmail,
                        password,
                        confirmPassword,
                    }),
                }
            );

            const data: SignupResponse =
                await response.json();

            /*
             * Another admin could have been created
             * between status check and signup.
             */
            if (
                data.code === "ADMIN_EXISTS"
            ) {
                router.replace("/login");
                return;
            }

            if (
                !response.ok ||
                !data.success
            ) {
                setError(
                    data.message ||
                        "Unable to create account."
                );

                return;
            }

            /*
             * OTP page will use this email.
             *
             * No password is stored in localStorage,
             * sessionStorage or cookies.
             */
            router.push(
                `/verify-otp?email=${encodeURIComponent(
                    data.email || trimmedEmail
                )}`
            );
        } catch (error) {
            console.error(
                "Signup error:",
                error
            );

            setError(
                "Unable to connect to the server. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    if (checkingStatus) {
        return (
            <main className={styles.signupPage}>
                <section className={styles.signupCard}>
                    <div className={styles.pageLoader}>
                        <Loader2
                            size={28}
                            className={styles.spinner}
                        />

                        <span>
                            Checking signup availability...
                        </span>
                    </div>
                </section>
            </main>
        );
    }

    return (
        <main className={styles.signupPage}>
            <section className={styles.signupCard}>

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
                    <h2>
                        Create Your Account
                    </h2>

                    <p>
                        Join Petcard and keep everything
                        about your pet in one place.
                    </p>
                </div>

                {/* ERROR */}
                {error && (
                    <div
                        className={styles.errorMessage}
                        role="alert"
                    >
                        {error}
                    </div>
                )}

                {/* FORM */}
                <form
                    className={styles.form}
                    onSubmit={handleSubmit}
                >
                    {/* NAME */}
                    <div className={styles.field}>
                        <label htmlFor="name">
                            Full Name
                        </label>

                        <input
                            id="name"
                            type="text"
                            placeholder="Enter your full name"
                            value={name}
                            onChange={(event) =>
                                setName(
                                    event.target.value
                                )
                            }
                            autoComplete="name"
                            disabled={loading}
                            required
                        />
                    </div>

                    {/* EMAIL */}
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
                                setEmail(
                                    event.target.value
                                )
                            }
                            autoComplete="email"
                            disabled={loading}
                            required
                        />
                    </div>

                    {/* PASSWORD */}
                    <div className={styles.field}>
                        <label htmlFor="password">
                            Password
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
                                placeholder="Create a password"
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
                                        (value) => !value
                                    )
                                }
                                disabled={loading}
                                aria-label={
                                    showPassword
                                        ? "Hide password"
                                        : "Show password"
                                }
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
                                placeholder="Confirm your password"
                                value={
                                    confirmPassword
                                }
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
                                        (value) => !value
                                    )
                                }
                                disabled={loading}
                                aria-label={
                                    showConfirmPassword
                                        ? "Hide password"
                                        : "Show password"
                                }
                            >
                                {showConfirmPassword ? (
                                    <EyeOff size={18} />
                                ) : (
                                    <Eye size={18} />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* TERMS */}
                    <label className={styles.terms}>
                        <input
                            type="checkbox"
                            required
                            disabled={loading}
                        />

                        <span>
                            I agree to the{" "}
                            <Link href="/terms">
                                Terms & Conditions
                            </Link>{" "}
                            and{" "}
                            <Link href="/privacy">
                                Privacy Policy
                            </Link>
                            .
                        </span>
                    </label>

                    {/* SUBMIT */}
                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <Loader2
                                    size={18}
                                    className={
                                        styles.spinner
                                    }
                                />

                                Creating Account...
                            </>
                        ) : (
                            "Create Account"
                        )}
                    </button>
                </form>

                {/* LOGIN */}
                <div className={styles.loginLink}>
                    <span>
                        Already have an account?
                    </span>

                    <Link href="/login">
                        Login
                    </Link>
                </div>

            </section>
        </main>
    );
}