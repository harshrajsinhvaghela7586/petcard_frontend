"use client";

import { useEffect, useState, FormEvent } from "react";
import {
    Plus,
    Search,
    Pencil,
    Trash2,
    X,
    Star,
    Power,
    MessageSquareQuote,
    ImagePlus,
} from "lucide-react";

import styles from "./TestimonialsAdmin.module.css";

interface Testimonial {
    _id: string;
    name: string;
    role: string;
    rating: number;
    text: string;
    photo?: string;
    isActive: boolean;
    createdAt?: string;
}

interface FormData {
    name: string;
    role: string;
    rating: number;
    text: string;
    isActive: boolean;
}

const API_URL =
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:5000/api";

const initialForm: FormData = {
    name: "",
    role: "Pet Parent",
    rating: 5,
    text: "",
    isActive: true,
};

export default function TestimonialsAdmin() {
    const [testimonials, setTestimonials] = useState<
        Testimonial[]
    >([]);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [search, setSearch] = useState("");

    const [modalOpen, setModalOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(
        null
    );

    const [form, setForm] = useState<FormData>(initialForm);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const fetchTestimonials = async () => {
        try {
            setLoading(true);

            const response = await fetch(
                `${API_URL}/testimonials/admin`,
                {
                    credentials: "include",
                }
            );

            if (response.status === 401) {
                window.location.href = "/login";
                return;
            }

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(
                    data.message ||
                        "Failed to fetch testimonials."
                );
            }

            setTestimonials(data.testimonials || []);
        } catch (err) {
            console.error(err);

            setError(
                err instanceof Error
                    ? err.message
                    : "Failed to fetch testimonials."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTestimonials();
    }, []);
const [photo, setPhoto] =
    useState<File | null>(null);

const [photoPreview, setPhotoPreview] =
    useState("");

   const openAddModal = () => {
    setEditingId(null);
    setForm(initialForm);

    setPhoto(null);
    setPhotoPreview("");

    setError("");
    setModalOpen(true);
};

    const openEditModal = (
    testimonial: Testimonial
) => {
    setEditingId(testimonial._id);

    setForm({
        name: testimonial.name,
        role: testimonial.role,
        rating: testimonial.rating,
        text: testimonial.text,
        isActive: testimonial.isActive,
    });

    setPhoto(null);
    setPhotoPreview(
        testimonial.photo
            ? `${API_URL.replace("/api", "")}${testimonial.photo}`
            : ""
    );

    setError("");
    setModalOpen(true);
};


  const closeModal = () => {
    if (saving) return;

    setModalOpen(false);
    setEditingId(null);
    setForm(initialForm);

    setPhoto(null);
    setPhotoPreview("");

    setError("");
};

const handlePhotoChange = (
    event: React.ChangeEvent<HTMLInputElement>
) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
        setError(
            "Only JPG, PNG and WEBP images are allowed."
        );
        return;
    }

    if (file.size > 5 * 1024 * 1024) {
        setError(
            "Photo size must be less than 5MB."
        );
        return;
    }

    setError("");
    setPhoto(file);

    setPhotoPreview(
        URL.createObjectURL(file)
    );
};

    const handleSubmit = async (
        event: FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        setError("");
        setSuccess("");

        if (!form.name.trim()) {
            setError("Please enter the name.");
            return;
        }

        if (!form.text.trim()) {
            setError(
                "Please enter the testimonial."
            );
            return;
        }

        try {
            setSaving(true);

            const url = editingId
                ? `${API_URL}/testimonials/${editingId}`
                : `${API_URL}/testimonials`;

            const method = editingId ? "PUT" : "POST";

            const formData = new FormData();

formData.append(
    "name",
    form.name.trim()
);

formData.append(
    "role",
    form.role.trim() || "Pet Parent"
);

formData.append(
    "rating",
    String(form.rating)
);

formData.append(
    "text",
    form.text.trim()
);

formData.append(
    "isActive",
    String(form.isActive)
);

if (photo) {
    formData.append("photo", photo);
}

const response = await fetch(url, {
    method,
    credentials: "include",
    body: formData,
});

            if (response.status === 401) {
                window.location.href = "/login";
                return;
            }

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(
                    data.message ||
                        "Failed to save testimonial."
                );
            }

            await fetchTestimonials();

            setSuccess(
                editingId
                    ? "Testimonial updated successfully."
                    : "Testimonial added successfully."
            );

            closeModal();

            setTimeout(() => {
                setSuccess("");
            }, 3000);
        } catch (err) {
            console.error(err);

            setError(
                err instanceof Error
                    ? err.message
                    : "Something went wrong."
            );
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id: string) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this testimonial?"
        );

        if (!confirmed) return;

        try {
            setError("");
            setSuccess("");

            const response = await fetch(
                `${API_URL}/testimonials/${id}`,
                {
                    method: "DELETE",
                    credentials: "include",
                }
            );

            if (response.status === 401) {
                window.location.href = "/login";
                return;
            }

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(
                    data.message ||
                        "Failed to delete testimonial."
                );
            }

            setTestimonials((current) =>
                current.filter(
                    (item) => item._id !== id
                )
            );

            setSuccess(
                "Testimonial deleted successfully."
            );

            setTimeout(() => {
                setSuccess("");
            }, 3000);
        } catch (err) {
            console.error(err);

            setError(
                err instanceof Error
                    ? err.message
                    : "Failed to delete testimonial."
            );
        }
    };

    const toggleStatus = async (
        testimonial: Testimonial
    ) => {
        try {
            setError("");

            const response = await fetch(
                `${API_URL}/testimonials/${testimonial._id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify({
                        isActive: !testimonial.isActive,
                    }),
                }
            );

            if (response.status === 401) {
                window.location.href = "/login";
                return;
            }

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(
                    data.message ||
                        "Failed to update status."
                );
            }

            setTestimonials((current) =>
                current.map((item) =>
                    item._id === testimonial._id
                        ? {
                              ...item,
                              isActive:
                                  !item.isActive,
                          }
                        : item
                )
            );
        } catch (err) {
            console.error(err);

            setError(
                err instanceof Error
                    ? err.message
                    : "Failed to update status."
            );
        }
    };

    const filteredTestimonials =
        testimonials.filter((item) => {
            const query = search
                .trim()
                .toLowerCase();

            if (!query) return true;

            return (
                item.name
                    .toLowerCase()
                    .includes(query) ||
                item.role
                    .toLowerCase()
                    .includes(query) ||
                item.text
                    .toLowerCase()
                    .includes(query)
            );
        });

    return (
        <div className={styles.page}>
            <div className={styles.pageHeader}>
                <div>
                    <div className={styles.titleRow}>
                        <div className={styles.titleIcon}>
                            <MessageSquareQuote
                                size={22}
                            />
                        </div>

                        <div>
                          

                            <h1>Testimonials</h1>
                        </div>
                    </div>

                    <p>
                        Manage the testimonials displayed
                        on the PetCard website.
                    </p>
                </div>

                <button
                    className={styles.addButton}
                    onClick={openAddModal}
                >
                    <Plus size={18} />
                    Add Testimonial
                </button>
            </div>

            {success && (
                <div className={styles.success}>
                    {success}
                </div>
            )}

            {error && !modalOpen && (
                <div className={styles.error}>
                    {error}
                </div>
            )}

            <div className={styles.toolbar}>
                <div className={styles.searchBox}>
                    <Search size={17} />

                    <input
                        type="text"
                        placeholder="Search testimonials..."
                        value={search}
                        onChange={(event) =>
                            setSearch(
                                event.target.value
                            )
                        }
                    />

                    {search && (
                        <button
                            onClick={() =>
                                setSearch("")
                            }
                        >
                            <X size={15} />
                        </button>
                    )}
                </div>

                <div className={styles.total}>
                    <strong>
                        {filteredTestimonials.length}
                    </strong>

                    <span>
                        {filteredTestimonials.length === 1
                            ? "testimonial"
                            : "testimonials"}
                    </span>
                </div>
            </div>

            <div className={styles.tableCard}>
                {loading ? (
                    <div className={styles.loading}>
                        <div
                            className={styles.spinner}
                        />
                        <span>
                            Loading testimonials...
                        </span>
                    </div>
                ) : filteredTestimonials.length ===
                  0 ? (
                    <div className={styles.empty}>
                        <div
                            className={
                                styles.emptyIcon
                            }
                        >
                            <MessageSquareQuote
                                size={25}
                            />
                        </div>

                        <h3>
                            {search
                                ? "No testimonials found"
                                : "No testimonials yet"}
                        </h3>

                        <p>
                            {search
                                ? "Try a different search term."
                                : "Add your first testimonial to get started."}
                        </p>

                        {!search && (
                            <button
                                className={
                                    styles.addButton
                                }
                                onClick={
                                    openAddModal
                                }
                            >
                                <Plus size={17} />
                                Add Testimonial
                            </button>
                        )}
                    </div>
                ) : (
                    <div className={styles.tableWrapper}>
                        <table>
                            <thead>
                                <tr>
                                    <th>TESTIMONIAL</th>
                                    <th>RATING</th>
                                    <th>STATUS</th>
                                    <th>DATE</th>
                                    <th>ACTIONS</th>
                                </tr>
                            </thead>

                            <tbody>
                                {filteredTestimonials.map(
                                    (item) => (
                                        <tr
                                            key={
                                                item._id
                                            }
                                        >
                                            <td>
                                                <div
                                                    className={
                                                        styles.testimonialInfo
                                                    }
                                                >
                                                  <div className={styles.avatar}>
    {item.photo ? (
        <img
            src={`${API_URL.replace(
                "/api",
                ""
            )}${item.photo}`}
            alt={item.name}
        />
    ) : (
        item.name
            .split(" ")
            .map((word) => word[0])
            .join("")
            .slice(0, 2)
    )}
</div>
                                                    <div>
                                                        <strong>
                                                            {
                                                                item.name
                                                            }
                                                        </strong>

                                                        <span>
                                                            {
                                                                item.role
                                                            }
                                                        </span>

                                                        <p>
                                                            {
                                                                item.text
                                                            }
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>

                                            <td>
                                                <div
                                                    className={
                                                        styles.rating
                                                    }
                                                >
                                                    {Array.from(
                                                        {
                                                            length: 5,
                                                        }
                                                    ).map(
                                                        (
                                                            _,
                                                            index
                                                        ) => (
                                                            <Star
                                                                key={
                                                                    index
                                                                }
                                                                size={
                                                                    14
                                                                }
                                                                fill={
                                                                    index <
                                                                    item.rating
                                                                        ? "currentColor"
                                                                        : "none"
                                                                }
                                                            />
                                                        )
                                                    )}
                                                </div>
                                            </td>

                                            <td>
                                                <button
                                                    className={`${styles.status} ${
                                                        item.isActive
                                                            ? styles.active
                                                            : styles.inactive
                                                    }`}
                                                    onClick={() =>
                                                        toggleStatus(
                                                            item
                                                        )
                                                    }
                                                >
                                                    <span />
                                                    {item.isActive
                                                        ? "Active"
                                                        : "Inactive"}
                                                </button>
                                            </td>

                                            <td>
                                                <span
                                                    className={
                                                        styles.date
                                                    }
                                                >
                                                    {item.createdAt
                                                        ? new Date(
                                                              item.createdAt
                                                          ).toLocaleDateString(
                                                              "en-IN",
                                                              {
                                                                  day: "2-digit",
                                                                  month: "short",
                                                                  year: "numeric",
                                                              }
                                                          )
                                                        : "—"}
                                                </span>
                                            </td>

                                            <td>
                                                <div
                                                    className={
                                                        styles.actions
                                                    }
                                                >
                                                    <button
                                                        className={
                                                            styles.editButton
                                                        }
                                                        onClick={() =>
                                                            openEditModal(
                                                                item
                                                            )
                                                        }
                                                        title="Edit"
                                                    >
                                                        <Pencil
                                                            size={
                                                                16
                                                            }
                                                        />
                                                    </button>

                                                    <button
                                                        className={
                                                            styles.deleteButton
                                                        }
                                                        onClick={() =>
                                                            handleDelete(
                                                                item._id
                                                            )
                                                        }
                                                        title="Delete"
                                                    >
                                                        <Trash2
                                                            size={
                                                                16
                                                            }
                                                        />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {modalOpen && (
                <div
                    className={styles.modalOverlay}
                    onMouseDown={(event) => {
                        if (
                            event.target ===
                            event.currentTarget
                        ) {
                            closeModal();
                        }
                    }}
                >
                    <div className={styles.modal}>
                        <div
                            className={
                                styles.modalHeader
                            }
                        >
                            <div>
                                <span
                                    className={
                                        styles.eyebrow
                                    }
                                >
                                    TESTIMONIAL
                                </span>

                                <h2>
                                    {editingId
                                        ? "Edit Testimonial"
                                        : "Add Testimonial"}
                                </h2>
                            </div>

                            <button
                                className={
                                    styles.closeButton
                                }
                                onClick={closeModal}
                                disabled={saving}
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {error && (
                            <div
                                className={
                                    styles.modalError
                                }
                            >
                                {error}
                            </div>
                        )}

                        <form
                            className={styles.form}
                            onSubmit={handleSubmit}
                        >
                            <div
                                className={
                                    styles.formGrid
                                }
                            >
                                <div
                                    className={
                                        styles.field
                                    }
                                >
                                    <label htmlFor="name">
                                        Name
                                    </label>

                                    <input
                                        id="name"
                                        type="text"
                                        placeholder="Enter name"
                                        value={form.name}
                                        onChange={(
                                            event
                                        ) =>
                                            setForm(
                                                (
                                                    current
                                                ) => ({
                                                    ...current,
                                                    name: event
                                                        .target
                                                        .value,
                                                })
                                            )
                                        }
                                        required
                                    />
                                </div>

                                <div
                                    className={
                                        styles.field
                                    }
                                >
                                    <label htmlFor="role">
                                        Role
                                    </label>

                                    <input
                                        id="role"
                                        type="text"
                                        placeholder="Pet Parent"
                                        value={form.role}
                                        onChange={(
                                            event
                                        ) =>
                                            setForm(
                                                (
                                                    current
                                                ) => ({
                                                    ...current,
                                                    role: event
                                                        .target
                                                        .value,
                                                })
                                            )
                                        }
                                    />
                                </div>
                            </div>

<div className={styles.field}>
    <label htmlFor="photo">
        Profile Photo
    </label>

    <div className={styles.photoUpload}>
        <div className={styles.photoPreviewBox}>
            {photoPreview ? (
                <img
                    src={photoPreview}
                    alt="Profile preview"
                    className={styles.photoPreview}
                />
            ) : (
                <div
                    className={
                        styles.photoPlaceholder
                    }
                >
                    <ImagePlus size={25} />

                    <span>
                        No photo
                    </span>
                </div>
            )}
        </div>

        <div className={styles.photoInfo}>
            <label
                htmlFor="photo"
                className={
                    styles.choosePhotoButton
                }
            >
                <ImagePlus size={16} />
                Choose Photo
            </label>

            <input
                id="photo"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handlePhotoChange}
                className={
                    styles.hiddenFileInput
                }
            />

            <span>
                JPG, PNG or WEBP · Max 5MB
            </span>

            {photo && (
                <strong>
                    {photo.name}
                </strong>
            )}
        </div>
    </div>
</div>

                            <div
                                className={
                                    styles.field
                                }
                            >
                                <label>Rating</label>

                                <div
                                    className={
                                        styles.ratingSelector
                                    }
                                >
                                    {Array.from({
                                        length: 5,
                                    }).map(
                                        (_, index) => {
                                            const rating =
                                                index +
                                                1;

                                            return (
                                                <button
                                                    type="button"
                                                    key={
                                                        rating
                                                    }
                                                    className={
                                                        rating <=
                                                        form.rating
                                                            ? styles.selectedStar
                                                            : styles.unselectedStar
                                                    }
                                                    onClick={() =>
                                                        setForm(
                                                            (
                                                                current
                                                            ) => ({
                                                                ...current,
                                                                rating,
                                                            })
                                                        )
                                                    }
                                                >
                                                    <Star
                                                        size={
                                                            24
                                                        }
                                                        fill={
                                                            rating <=
                                                            form.rating
                                                                ? "currentColor"
                                                                : "none"
                                                        }
                                                    />
                                                </button>
                                            );
                                        }
                                    )}
                                </div>
                            </div>

                            <div
                                className={
                                    styles.field
                                }
                            >
                                <label htmlFor="text">
                                    Testimonial
                                </label>

                                <textarea
                                    id="text"
                                    rows={6}
                                    placeholder="Enter testimonial..."
                                    value={form.text}
                                    onChange={(
                                        event
                                    ) =>
                                        setForm(
                                            (current) => ({
                                                ...current,
                                                text: event
                                                    .target
                                                    .value,
                                            })
                                        )
                                    }
                                    required
                                />
                            </div>

                            <label
                                className={
                                    styles.activeToggle
                                }
                            >
                                <input
                                    type="checkbox"
                                    checked={
                                        form.isActive
                                    }
                                    onChange={(event) =>
                                        setForm(
                                            (current) => ({
                                                ...current,
                                                isActive:
                                                    event
                                                        .target
                                                        .checked,
                                            })
                                        )
                                    }
                                />

                                <div>
                                    <strong>
                                        Publish testimonial
                                    </strong>

                                    <span>
                                        Active testimonials
                                        are displayed on the
                                        website.
                                    </span>
                                </div>

                                <Power
                                    size={18}
                                />
                            </label>

                            <div
                                className={
                                    styles.modalActions
                                }
                            >
                                <button
                                    type="button"
                                    className={
                                        styles.cancelButton
                                    }
                                    onClick={
                                        closeModal
                                    }
                                    disabled={saving}
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    disabled={saving}
                                >
                                    {saving ? (
                                        <>
                                            <span
                                                className={
                                                    styles.buttonSpinner
                                                }
                                            />
                                            Saving...
                                        </>
                                    ) : editingId ? (
                                        "Update Testimonial"
                                    ) : (
                                        "Add Testimonial"
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}