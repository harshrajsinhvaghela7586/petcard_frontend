"use client";

import { useEffect, useState } from "react";
import {
    User,
    Mail,
    ShieldCheck,
    LockKeyhole,
    Check,
    X,
    Eye,
    EyeOff,
    Save,
    Loader2,
} from "lucide-react";

import styles from "./Profile.module.css";

const API_URL =
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:5000/api";


interface AdminUser {
    _id: string;
    name: string;
    email: string;
    role: string;
}


interface PasswordChecks {
    length: boolean;
    uppercase: boolean;
    lowercase: boolean;
    number: boolean;
    special: boolean;
}


const getPasswordChecks = (
    password: string
): PasswordChecks => ({
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /\d/.test(password),
    special: /[^A-Za-z\d]/.test(password),
});


export default function AdminProfile() {
    const [user, setUser] =
        useState<AdminUser | null>(null);

    const [name, setName] = useState("");
    const [password, setPassword] =
        useState("");

    const [showPassword, setShowPassword] =
        useState(false);

    const [loading, setLoading] =
        useState(true);

    const [saving, setSaving] =
        useState(false);

    const [error, setError] =
        useState("");

    const [success, setSuccess] =
        useState("");


    /* =====================================================
       FETCH PROFILE
    ===================================================== */

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await fetch(
                    `${API_URL}/auth/admin/profile`,
                    {
                        credentials: "include",
                    }
                );

                if (!response.ok) {
                    if (response.status === 401) {
                        window.location.href =
                            "/login";
                        return;
                    }

                    throw new Error(
                        "Failed to load profile."
                    );
                }

                const data =
                    await response.json();

                if (!data.success) {
                    throw new Error(
                        data.message ||
                            "Failed to load profile."
                    );
                }

                setUser(data.user);
                setName(data.user.name);
            } catch (error) {
                console.error(
                    "Profile Error:",
                    error
                );

                setError(
                    "Unable to load profile."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);


    /* =====================================================
       PASSWORD VALIDATION
    ===================================================== */

    const passwordChecks =
        getPasswordChecks(password);

    const passwordIsValid =
        password.length > 0 &&
        Object.values(passwordChecks).every(
            Boolean
        );


    /* =====================================================
       SUBMIT
    ===================================================== */

    const handleSubmit = async (
        event: React.FormEvent
    ) => {
        event.preventDefault();

        setError("");
        setSuccess("");

        const trimmedName = name.trim();

        if (!trimmedName) {
            setError("Name is required.");
            return;
        }

        if (
            password &&
            !passwordIsValid
        ) {
            setError(
                "Please meet all password requirements."
            );
            return;
        }

        setSaving(true);

        try {
            const response = await fetch(
                `${API_URL}/auth/admin/profile`,
                {
                    method: "PUT",
                    credentials: "include",
                    headers: {
                        "Content-Type":
                            "application/json",
                    },
                    body: JSON.stringify({
                        name: trimmedName,
                        password:
                            password || undefined,
                    }),
                }
            );

            const data =
                await response.json();

            if (!response.ok || !data.success) {
                throw new Error(
                    data.message ||
                        "Failed to update profile."
                );
            }

            setUser(data.user);
            setName(data.user.name);
            setPassword("");

            setSuccess(
                "Profile updated successfully."
            );
        setTimeout(() => {
    window.location.href = "/admin";
}, 800);
        } catch (error) {
            console.error(
                "Update Profile Error:",
                error
            );

            setError(
                error instanceof Error
                    ? error.message
                    : "Failed to update profile."
            );
        } finally {
            setSaving(false);
        }
    };


    /* =====================================================
       LOADING
    ===================================================== */

    if (loading) {
        return (
            <div
                className={
                    styles.loadingScreen
                }
            >
                <Loader2
                    size={30}
                    className={styles.spinner}
                />

                <p>
                    Loading profile...
                </p>
            </div>
        );
    }


    if (!user) {
        return (
            <div
                className={
                    styles.errorScreen
                }
            >
                <p>
                    Unable to load admin profile.
                </p>
            </div>
        );
    }


    return (
        <div className={styles.page}>
            {/* =================================================
                HEADER
            ================================================= */}

            <div className={styles.pageHeader}>
                <div>
                    <span
                        className={
                            styles.eyebrow
                        }
                    >
                        ACCOUNT SETTINGS
                    </span>

                    <h1>
                        Admin Profile
                    </h1>

                    <p>
                        Manage your admin
                        information and account
                        password.
                    </p>
                </div>
            </div>


            {/* =================================================
                ALERTS
            ================================================= */}

            {error && (
                <div
                    className={
                        styles.errorAlert
                    }
                >
                    <X size={17} />
                    <span>{error}</span>
                </div>
            )}

            {success && (
                <div
                    className={
                        styles.successAlert
                    }
                >
                    <Check size={17} />
                    <span>{success}</span>
                </div>
            )}


            {/* =================================================
                PROFILE CARD
            ================================================= */}

            <form
                className={styles.profileCard}
                onSubmit={handleSubmit}
            >
                {/* PROFILE INTRO */}

                <div
                    className={
                        styles.profileIntro
                    }
                >
                    <div
                        className={
                            styles.avatar
                        }
                    >
                        {user.name
                            ?.charAt(0)
                            ?.toUpperCase()}
                    </div>

                    <div>
                        <h2>
                            {user.name}
                        </h2>

                        <p>
                            Super Administrator
                        </p>
                    </div>
                </div>


                <div
                    className={
                        styles.divider
                    }
                />


                {/* =================================================
                    BASIC INFORMATION
                ================================================= */}

                <section
                    className={
                        styles.section
                    }
                >
                    <div
                        className={
                            styles.sectionHeader
                        }
                    >
                        <div
                            className={
                                styles.sectionIcon
                            }
                        >
                            <User size={18} />
                        </div>

                        <div>
                            <h3>
                                Basic Information
                            </h3>

                            <p>
                                Update your admin
                                profile details.
                            </p>
                        </div>
                    </div>


                    <div
                        className={
                            styles.formGrid
                        }
                    >
                        {/* NAME */}

                        <div
                            className={
                                styles.field
                            }
                        >
                            <label htmlFor="name">
                                Full Name
                            </label>

                            <div
                                className={
                                    styles.inputWrapper
                                }
                            >
                                <User
                                    size={17}
                                />

                                <input
                                    id="name"
                                    type="text"
                                    value={name}
                                    onChange={(
                                        event
                                    ) =>
                                        setName(
                                            event
                                                .target
                                                .value
                                        )
                                    }
                                    placeholder="Enter your name"
                                />
                            </div>
                        </div>


                        {/* EMAIL */}

                        <div
                            className={
                                styles.field
                            }
                        >
                            <label htmlFor="email">
                                Email Address
                            </label>

                            <div
                                className={`${styles.inputWrapper} ${styles.disabledInput}`}
                            >
                                <Mail
                                    size={17}
                                />

                                <input
                                    id="email"
                                    type="email"
                                    value={
                                        user.email
                                    }
                                    disabled
                                    readOnly
                                />
                            </div>

                            <small>
                                Email address cannot
                                be changed.
                            </small>
                        </div>


                        {/* ROLE */}

                        <div
                            className={
                                styles.field
                            }
                        >
                            <label htmlFor="role">
                                Account Role
                            </label>

                            <div
                                className={`${styles.inputWrapper} ${styles.disabledInput}`}
                            >
                                <ShieldCheck
                                    size={17}
                                />

                                <input
                                    id="role"
                                    type="text"
                                    value="Super Administrator"
                                    disabled
                                    readOnly
                                />
                            </div>
                        </div>
                    </div>
                </section>


                <div
                    className={
                        styles.divider
                    }
                />


                {/* =================================================
                    PASSWORD
                ================================================= */}

                <section
                    className={
                        styles.section
                    }
                >
                    <div
                        className={
                            styles.sectionHeader
                        }
                    >
                        <div
                            className={
                                styles.sectionIcon
                            }
                        >
                            <LockKeyhole
                                size={18}
                            />
                        </div>

                        <div>
                            <h3>
                                Change Password
                            </h3>

                            <p>
                                Set a strong password
                                for your admin
                                account.
                            </p>
                        </div>
                    </div>


                    <div
                        className={
                            styles.passwordSection
                        }
                    >
                        <div
                            className={
                                styles.field
                            }
                        >
                            <label htmlFor="password">
                                New Password
                            </label>

                            <div
                                className={
                                    styles.inputWrapper
                                }
                            >
                                <LockKeyhole
                                    size={17}
                                />

                                <input
                                    id="password"
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    value={password}
                                    onChange={(
                                        event
                                    ) =>
                                        setPassword(
                                            event
                                                .target
                                                .value
                                        )
                                    }
                                    placeholder="Enter new password"
                                    autoComplete="new-password"
                                />

                                <button
                                    type="button"
                                    className={
                                        styles.passwordToggle
                                    }
                                    onClick={() =>
                                        setShowPassword(
                                            (
                                                previous
                                            ) =>
                                                !previous
                                        )
                                    }
                                    aria-label={
                                        showPassword
                                            ? "Hide password"
                                            : "Show password"
                                    }
                                >
                                    {showPassword ? (
                                        <EyeOff
                                            size={
                                                17
                                            }
                                        />
                                    ) : (
                                        <Eye
                                            size={
                                                17
                                            }
                                        />
                                    )}
                                </button>
                            </div>
                        </div>


                        {/* PASSWORD REQUIREMENTS */}

                        {password && (
                            <div
                                className={
                                    styles.passwordRequirements
                                }
                            >
                                <span
                                    className={
                                        styles.requirementTitle
                                    }
                                >
                                    Password requirements
                                </span>

                                <div
                                    className={
                                        styles.requirementsGrid
                                    }
                                >
                                    <PasswordRequirement
                                        valid={
                                            passwordChecks.length
                                        }
                                        text="At least 8 characters"
                                    />

                                    <PasswordRequirement
                                        valid={
                                            passwordChecks.uppercase
                                        }
                                        text="1 uppercase letter"
                                    />

                                    <PasswordRequirement
                                        valid={
                                            passwordChecks.lowercase
                                        }
                                        text="1 lowercase letter"
                                    />

                                    <PasswordRequirement
                                        valid={
                                            passwordChecks.number
                                        }
                                        text="1 number"
                                    />

                                    <PasswordRequirement
                                        valid={
                                            passwordChecks.special
                                        }
                                        text="1 special character"
                                    />
                                </div>
                            </div>
                        )}

                        {!password && (
                            <p
                                className={
                                    styles.passwordHint
                                }
                            >
                                Leave this field empty
                                if you don't want to
                                change your password.
                            </p>
                        )}
                    </div>
                </section>


                {/* =================================================
                    SAVE
                ================================================= */}

                <div
                    className={
                        styles.formFooter
                    }
                >
                    <div>
                        <span
                            className={
                                styles.securityNote
                            }
                        >
                            <ShieldCheck
                                size={15}
                            />

                            Your password is securely
                            encrypted before being saved.
                        </span>
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={
                            saving ||
                            !name.trim() ||
                            (password.length > 0 &&
                                !passwordIsValid)
                        }
                    >
                        {saving ? (
                            <>
                                <Loader2
                                    size={17}
                                    className={
                                        styles.buttonSpinner
                                    }
                                />

                                Saving...
                            </>
                        ) : (
                            <>
                                <Save size={17} />

                                Save Changes
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}


/* =========================================================
   PASSWORD REQUIREMENT COMPONENT
========================================================= */

function PasswordRequirement({
    valid,
    text,
}: {
    valid: boolean;
    text: string;
}) {
    return (
        <div
            className={`${styles.requirement} ${
                valid
                    ? styles.requirementValid
                    : styles.requirementInvalid
            }`}
        >
            {valid ? (
                <Check size={13} />
            ) : (
                <X size={13} />
            )}

            <span>{text}</span>
        </div>
    );
}