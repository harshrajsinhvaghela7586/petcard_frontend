"use client";

import { FormEvent, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff, Loader2 } from "lucide-react";

import styles from "./Login.module.css";

interface LoginResponse {
    success: boolean;
    message: string;
    user?: {
        id: string;
        name: string;
        email: string;
        role: string;
    };
}

interface SignupStatusResponse {
    success: boolean;
    canSignup: boolean;
    adminExists: boolean;
}

const API_URL =
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:5000/api";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);

    const [loading, setLoading] = useState(false);
    const [checkingSignup, setCheckingSignup] = useState(true);

    const [canSignup, setCanSignup] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const checkSignupStatus = async () => {
            try {
                const response = await fetch(
                    `${API_URL}/auth/signup-status`,
                    {
                        method: "GET",

                        headers: {
                            "Content-Type": "application/json",
                        },

                        credentials: "include",

                        cache: "no-store",
                    }
                );

                const data: SignupStatusResponse =
                    await response.json();

                if (response.ok && data.success) {
                    setCanSignup(data.canSignup);
                } else {
                    setCanSignup(false);
                }
            } catch (error) {
                console.error(
                    "Signup status error:",
                    error
                );

                setCanSignup(false);
            } finally {
                setCheckingSignup(false);
            }
        };

        checkSignupStatus();
    }, []);

    const handleSubmit = async (
        event: FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        setError("");

        const trimmedEmail = email.trim();

        if (!trimmedEmail || !password) {
            setError(
                "Please enter your email and password."
            );

            return;
        }

        try {
            setLoading(true);

            const response = await fetch(
                `${API_URL}/auth/login`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json",
                    },

                    /*
                     * Required because backend sends
                     * JWT as HttpOnly cookie.
                     */
                    credentials: "include",

                    body: JSON.stringify({
                        email: trimmedEmail,
                        password,
                    }),
                }
            );

            const data: LoginResponse =
                await response.json();

            if (
                !response.ok ||
                !data.success
            ) {
                setError(
                    data.message ||
                        "Unable to login. Please try again."
                );

                return;
            }

            if (
                !data.user ||
                data.user.role !== "admin"
            ) {
                setError(
                    "You are not authorized to access the admin panel."
                );

                return;
            }

            /*
             * JWT is NOT stored in:
             * - localStorage
             * - sessionStorage
             * - JavaScript cookies
             *
             * Backend has already set the JWT
             * inside an HttpOnly cookie.
             */

            window.location.href = "/admin";
        } catch (error) {
            console.error(
                "Login error:",
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
                    <h2>Welcome Back!</h2>

                    <p>
                        Login to your Petcard account
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

                {/* LOGIN FORM */}
                <form
                    className={styles.form}
                    onSubmit={handleSubmit}
                >
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
                                placeholder="Enter your password"
                                value={password}
                                onChange={(event) =>
                                    setPassword(
                                        event.target.value
                                    )
                                }
                                autoComplete="current-password"
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

                    {/* OPTIONS */}
                    <div
                        className={
                            styles.formOptions
                        }
                    >
                        <label
                            className={
                                styles.remember
                            }
                        >
                            <input
                                type="checkbox"
                                disabled={loading}
                            />

                            <span>
                                Remember me
                            </span>
                        </label>

                        <Link
                            href="/forgot-password"
                            className={styles.forgot}
                        >
                            Forgot Password?
                        </Link>
                    </div>

                    {/* LOGIN BUTTON */}
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

                                Logging in...
                            </>
                        ) : (
                            "Login"
                        )}
                    </button>
                </form>

                {/* SIGNUP */}
                {!checkingSignup &&
                    canSignup && (
                        <div
                            className={
                                styles.signupLink
                            }
                        >
                            <span>
                                Don&apos;t have an
                                account?
                            </span>

                            <Link href="/signup">
                                Sign up now
                            </Link>
                        </div>
                    )}

            </section>
        </main>
    );
}