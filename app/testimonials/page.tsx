"use client";

import {
  ArrowRight,
  Heart,
  Pen,
  Quote,
  Star,
  X,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";

import styles from "./Testimonials.module.css";

interface Testimonial {
  _id: string;
  name: string;
  email?: string;
  role: string;
  rating: number;
  text: string;
  photo?: string;
  isActive: boolean;
  status?: "pending" | "approved" | "rejected";
}

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000/api";

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<
    Testimonial[]
  >([]);

  const [loading, setLoading] = useState(true);

  /* =========================================================
     REVIEW MODAL STATE
     ========================================================= */

  const [reviewOpen, setReviewOpen] = useState(false);

  const [reviewSuccess, setReviewSuccess] =
    useState(false);

  const [reviewSubmitting, setReviewSubmitting] =
    useState(false);

  const [reviewError, setReviewError] = useState("");

  const [reviewForm, setReviewForm] = useState({
    email: "",
    name: "",
    role: "Pet Parent",
    rating: 5,
    text: "",
  });

  const [reviewPhoto, setReviewPhoto] =
    useState<File | null>(null);

  const [reviewPhotoPreview, setReviewPhotoPreview] =
    useState("");

  /* =========================================================
     FETCH TESTIMONIALS
     ========================================================= */

  useEffect(() => {
    const controller = new AbortController();

    const fetchTestimonials = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `${API_URL}/testimonials`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
            },
            signal: controller.signal,
            cache: "no-store",
          }
        );

        if (!response.ok) {
          throw new Error(
            "Failed to fetch testimonials"
          );
        }

        const data = await response.json();

        const testimonialList = Array.isArray(data)
          ? data
          : Array.isArray(data.testimonials)
            ? data.testimonials
            : [];

        /*
         * Public website par sirf:
         * approved + active testimonials
         * show honge.
         */
        const approvedTestimonials =
          testimonialList.filter(
            (item: Testimonial) =>
              item.isActive === true &&
              item.status === "approved"
          );

        setTestimonials(approvedTestimonials);
      } catch (error) {
        if (
          error instanceof DOMException &&
          error.name === "AbortError"
        ) {
          return;
        }

        console.error(
          "Error fetching testimonials:",
          error
        );

        setTestimonials([]);
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchTestimonials();

    return () => {
      controller.abort();
    };
  }, []);

  /* =========================================================
     INFINITE SLIDER
     ========================================================= */

  const loopedTestimonials = [
    ...testimonials,
    ...testimonials,
  ];

  /* =========================================================
     IMAGE URL
     ========================================================= */

  const getImageUrl = (photo?: string) => {
    if (!photo) return "";

    if (
      photo.startsWith("http://") ||
      photo.startsWith("https://")
    ) {
      return photo;
    }

    const baseUrl = API_URL.replace(/\/api\/?$/, "");

    return `${baseUrl}${
      photo.startsWith("/")
        ? photo
        : `/${photo}`
    }`;
  };

  /* =========================================================
     INITIALS
     ========================================================= */

  const getInitials = (name: string) => {
    return name
      .trim()
      .split(/\s+/)
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  /* =========================================================
     AVERAGE RATING
     ========================================================= */

  const averageRating =
    testimonials.length > 0
      ? (
          testimonials.reduce(
            (sum, item) => sum + item.rating,
            0
          ) / testimonials.length
        ).toFixed(1)
      : "0.0";

  /* =========================================================
     OPEN REVIEW MODAL
     ========================================================= */

  const openReviewModal = () => {
    setReviewOpen(true);
    setReviewSuccess(false);
    setReviewError("");

    setReviewForm({
      email: "",
      name: "",
      role: "Pet Parent",
      rating: 5,
      text: "",
    });

    setReviewPhoto(null);
    setReviewPhotoPreview("");
  };

  /* =========================================================
     CLOSE REVIEW MODAL
     ========================================================= */

  const closeReviewModal = () => {
    if (reviewSubmitting) {
      return;
    }

    setReviewOpen(false);
    setReviewSuccess(false);
    setReviewError("");

    setReviewForm({
      email: "",
      name: "",
      role: "Pet Parent",
      rating: 5,
      text: "",
    });

    setReviewPhoto(null);
    setReviewPhotoPreview("");
  };

  /* =========================================================
     REVIEW PHOTO CHANGE
     ========================================================= */

  const handleReviewPhotoChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      setReviewError(
        "Only JPG, PNG and WEBP images are allowed."
      );

      event.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setReviewError(
        "Photo size must be less than 5MB."
      );

      event.target.value = "";
      return;
    }

    setReviewError("");

    setReviewPhoto(file);

    setReviewPhotoPreview(
      URL.createObjectURL(file)
    );
  };

  /* =========================================================
     SUBMIT REVIEW
     ========================================================= */

  const handleReviewSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setReviewError("");

    /* ---------- FRONTEND VALIDATION ---------- */

    if (!reviewForm.email.trim()) {
      setReviewError(
        "Please enter your email address."
      );
      return;
    }

    if (!reviewForm.name.trim()) {
      setReviewError("Please enter your name.");
      return;
    }

    if (!reviewForm.role.trim()) {
      setReviewError(
        "Please enter your role or details."
      );
      return;
    }

    if (
      reviewForm.rating < 1 ||
      reviewForm.rating > 5
    ) {
      setReviewError(
        "Please select a rating between 1 and 5."
      );
      return;
    }

    if (!reviewForm.text.trim()) {
      setReviewError(
        "Please write your testimonial."
      );
      return;
    }

    try {
      setReviewSubmitting(true);

      /* ---------- FORM DATA ---------- */

      const formData = new FormData();

      formData.append(
        "email",
        reviewForm.email.trim()
      );

      formData.append(
        "name",
        reviewForm.name.trim()
      );

      formData.append(
        "role",
        reviewForm.role.trim()
      );

      formData.append(
        "rating",
        String(reviewForm.rating)
      );

      formData.append(
        "text",
        reviewForm.text.trim()
      );

      if (reviewPhoto) {
        formData.append(
          "photo",
          reviewPhoto
        );
      }

      /* ---------- API REQUEST ---------- */

      const response = await fetch(
        `${API_URL}/testimonials/submit`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      /* ---------- API ERROR ---------- */

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Failed to submit your review."
        );
      }

      /*
       * IMPORTANT:
       * Thank-you state sirf successful API response
       * ke baad show hoga.
       */

      setReviewSuccess(true);
      setReviewError("");

      /*
       * 2.5 seconds ke baad modal automatically close.
       */
      setTimeout(() => {
        setReviewOpen(false);
        setReviewSuccess(false);

        setReviewForm({
          email: "",
          name: "",
          role: "Pet Parent",
          rating: 5,
          text: "",
        });

        setReviewPhoto(null);
        setReviewPhotoPreview("");
        setReviewError("");
      }, 2500);
    } catch (error) {
      console.error(
        "Failed to submit testimonial:",
        error
      );

      /*
       * Error hone par THANK YOU state nahi aayegi.
       */
      setReviewSuccess(false);

      setReviewError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setReviewSubmitting(false);
    }
  };

  /* =========================================================
     RENDER
     ========================================================= */

  return (
    <main className={styles.page}>
      {/* =====================================================
          HERO
          ===================================================== */}

      <section className={styles.hero}>
        <div className={styles.heroGlow} />

        <div className={styles.container}>
          <div className={styles.heroContent}>
            <h1>
              Good care feels better{" "}
              <span>
                when it comes together.
              </span>
            </h1>

            <p>
              A few perspectives from pet parents
              showing how PetCard can fit into
              everyday pet care, organization,
              and the little moments that matter.
            </p>
          </div>

          <div className={styles.heroStats}>
            {/* AVERAGE RATING */}

            <div className={styles.heroStat}>
              <strong>
                {averageRating}
              </strong>

              <div className={styles.heroStars}>
                {Array.from({
                  length: 5,
                }).map((_, index) => (
                  <Star
                    key={index}
                    size={15}
                    fill="currentColor"
                  />
                ))}
              </div>

              <span>
                {testimonials.length > 0
                  ? "Average rating"
                  : "No ratings yet"}
              </span>
            </div>

            {/* STORIES */}

            <div className={styles.heroStat}>
              <strong>
                {testimonials.length}
              </strong>

              <span>
                {testimonials.length === 1
                  ? "Pet Parent Story"
                  : "Pet Parent Stories"}
              </span>
            </div>

            {/* PET WORLD */}

            <div className={styles.heroStat}>
              <strong>1</strong>

              <span>
                Pet world in one place
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          TESTIMONIALS
          ===================================================== */}

      <section
        className={
          styles.testimonialSection
        }
      >
        <div className={styles.container}>
          <div
            className={
              styles.sectionHeading
            }
          >
            <h2>
              Why Pet Parents{" "}
              <span>
                choose PetCard.
              </span>
            </h2>

            <p>
              See what pet parents have to
              say about the PetCard experience.
            </p>
          </div>

          {/* =================================================
              LOADING
              ================================================= */}

          {loading && (
            <div
              className={
                styles.emptyState
              }
            >
              <p>
                Loading testimonials...
              </p>
            </div>
          )}

          {/* =================================================
              NO TESTIMONIALS
              ================================================= */}

          {!loading &&
            testimonials.length === 0 && (
              <div
                className={
                  styles.emptyState
                }
              >
                <Quote size={28} />

                <h3>
                  No testimonials yet
                </h3>

                <p>
                  Customer testimonials will
                  appear here once they are
                  approved by our team.
                </p>
              </div>
            )}

          {/* =================================================
              TESTIMONIAL SLIDER
              ================================================= */}

          {!loading &&
            testimonials.length > 0 && (
              <div
                className={
                  styles.sliderViewport
                }
                aria-label="PetCard customer testimonials"
              >
                <div
                  className={
                    styles.sliderTrack
                  }
                >
                  {loopedTestimonials.map(
                    (item, index) => {
                      const imageUrl =
                        getImageUrl(
                          item.photo
                        );

                      return (
                        <article
                          className={
                            styles.testimonialCard
                          }
                          key={`${item._id}-${index}`}
                        >
                          {/* CARD TOP */}

                          <div
                            className={
                              styles.cardTop
                            }
                          >
                            <div
                              className={
                                styles.quoteIcon
                              }
                            >
                              <Quote
                                size={18}
                                fill="currentColor"
                              />
                            </div>

                            <div
                              className={
                                styles.rating
                              }
                              aria-label={`${item.rating} out of 5 stars`}
                            >
                              {Array.from({
                                length: item.rating,
                              }).map(
                                (_, starIndex) => (
                                  <Star
                                    key={
                                      starIndex
                                    }
                                    size={13}
                                    fill="currentColor"
                                  />
                                )
                              )}
                            </div>
                          </div>

                          {/* TESTIMONIAL TEXT */}

                          <p
                            className={
                              styles.testimonialText
                            }
                          >
                            “{item.text}”
                          </p>

                          {/* AUTHOR */}

                          <div
                            className={
                              styles.cardBottom
                            }
                          >
                            <div
                              className={
                                styles.avatar
                              }
                            >
                              {imageUrl ? (
                                <img
                                  src={
                                    imageUrl
                                  }
                                  alt={`${item.name}'s profile`}
                                />
                              ) : (
                                getInitials(
                                  item.name
                                )
                              )}
                            </div>

                            <div
                              className={
                                styles.author
                              }
                            >
                              <strong>
                                {item.name}
                              </strong>

                              <span>
                                {item.role}
                              </span>
                            </div>

                            <Heart
                              className={
                                styles.authorHeart
                              }
                              size={17}
                              fill="currentColor"
                            />
                          </div>
                        </article>
                      );
                    }
                  )}
                </div>
              </div>
            )}
        </div>
      </section>

      {/* =====================================================
          FINAL DOWNLOAD / REVIEW CTA
          ===================================================== */}

      <section
        className={`${styles.finalDownload} ${styles.homeReveal}`}
        id="download-app"
        data-home-reveal="download"
      >
        <div
          className={`${styles.container} container ${styles.finalDownloadCard}`}
        >
          {/* ================= PETS ================= */}

          <div
            className={styles.finalPets}
          >
            <Image
              src="/images/HowItWorksFooter.png"
              alt="PETCARD pets"
              fill
              priority
              className={
                styles.finalPetsImage
              }
            />
          </div>

          {/* ================= COPY ================= */}

          <div
            className={styles.finalCopy}
          >
            <h2>
              Now You Know How It All
              Comes Together.
            </h2>

            <p>
              Have thoughts after exploring
              PETCARD?
              <br
                className={
                  styles.desktopBreak
                }
              />
              We'd love to hear what you
              think.
            </p>
          </div>

          {/* ================= BUTTONS ================= */}

          <div
            className={
              styles.finalButtons
            }
          >
            <Link
  href="#write-review"
  className="btn btn-outline"
  onClick={(e) => {
    e.preventDefault();
    openReviewModal();
  }}
>
  Write Your Review
  <Pen className={styles.PenIcon} />
</Link>

            <Link
              href="/faq"
              className="btn btn-outline"
            >
              See FAQS
            </Link>
          </div>
        </div>
      </section>

      {/* =====================================================
          WRITE A REVIEW MODAL
          ===================================================== */}

      {reviewOpen && (
        <div
          className={
            styles.reviewModalOverlay
          }
          onMouseDown={(event) => {
            if (
              event.target ===
              event.currentTarget
            ) {
              closeReviewModal();
            }
          }}
        >
          <div
            className={
              styles.reviewModal
            }
          >
            {/* =================================================
                CLOSE BUTTON
                ================================================= */}

            <button
              type="button"
              className={
                styles.reviewCloseButton
              }
              onClick={
                closeReviewModal
              }
              disabled={
                reviewSubmitting
              }
              aria-label="Close review form"
            >
              <X size={20} />
            </button>

            {/* =================================================
                SUCCESS STATE
                ================================================= */}

            {reviewSuccess ? (
              <div
                className={
                  styles.reviewSuccess
                }
              >
                <div
                  className={
                    styles.reviewSuccessIcon
                  }
                >
                  <Heart
                    size={30}
                    fill="currentColor"
                  />
                </div>

                <h2>
                  Thank you for your
                  review!
                </h2>

                <p>
                  Thank you for sharing
                  your experience with
                  PetCard. Your review has
                  been submitted and is
                  waiting for approval.
                </p>

                <span>
                  This window will close
                  automatically.
                </span>
              </div>
            ) : (
              <>
                {/* =================================================
                    HEADER
                    ================================================= */}

                <div
                  className={
                    styles.reviewModalHeader
                  }
                >
                 

                  <h2>
                    Write Your Review
                  </h2>

                  <p>
                    Your experience can
                    help other pet parents
                    discover PetCard.
                  </p>
                </div>

                {/* =================================================
                    ERROR
                    ================================================= */}

                {reviewError && (
                  <div
                    className={
                      styles.reviewModalError
                    }
                    role="alert"
                  >
                    {reviewError}
                  </div>
                )}

                {/* =================================================
                    REVIEW FORM
                    ================================================= */}

                <form
                  className={
                    styles.reviewForm
                  }
                  onSubmit={
                    handleReviewSubmit
                  }
                >
                  {/* EMAIL */}

                  <div
                    className={
                      styles.reviewField
                    }
                  >
                    <label htmlFor="review-email">
                      Email Address
                    </label>

                    <input
                      id="review-email"
                      type="email"
                      placeholder="Enter your email"
                      value={
                        reviewForm.email
                      }
                      onChange={(event) =>
                        setReviewForm(
                          (current) => ({
                            ...current,
                            email:
                              event.target
                                .value,
                          })
                        )
                      }
                      autoComplete="email"
                      required
                    />
                  </div>

                  {/* NAME + ROLE */}

                  <div
                    className={
                      styles.reviewFormGrid
                    }
                  >
                    <div
                      className={
                        styles.reviewField
                      }
                    >
                      <label htmlFor="review-name">
                        Name
                      </label>

                      <input
                        id="review-name"
                        type="text"
                        placeholder="Your name"
                        value={
                          reviewForm.name
                        }
                        onChange={(
                          event
                        ) =>
                          setReviewForm(
                            (current) => ({
                              ...current,
                              name:
                                event.target
                                  .value,
                            })
                          )
                        }
                        autoComplete="name"
                        required
                      />
                    </div>

                    <div
                      className={
                        styles.reviewField
                      }
                    >
                      <label htmlFor="review-role">
                        Role / Details
                      </label>

                      <input
                        id="review-role"
                        type="text"
                        placeholder="Pet Parent"
                        value={
                          reviewForm.role
                        }
                        onChange={(
                          event
                        ) =>
                          setReviewForm(
                            (current) => ({
                              ...current,
                              role:
                                event.target
                                  .value,
                            })
                          )
                        }
                      />
                    </div>
                  </div>

                  {/* RATING */}

                  <div
                    className={
                      styles.reviewField
                    }
                  >
                    <label>
                      Your Rating
                    </label>

                    <div
                      className={
                        styles.reviewRatingSelector
                      }
                    >
                      {Array.from({
                        length: 5,
                      }).map(
                        (_, index) => {
                          const rating =
                            index + 1;

                          return (
                            <button
                              type="button"
                              key={rating}
                              className={
                                rating <=
                                reviewForm.rating
                                  ? styles.reviewSelectedStar
                                  : styles.reviewUnselectedStar
                              }
                              onClick={() =>
                                setReviewForm(
                                  (
                                    current
                                  ) => ({
                                    ...current,
                                    rating,
                                  })
                                )
                              }
                              aria-label={`${rating} star`}
                            >
                              <Star
                                size={25}
                                fill={
                                  rating <=
                                  reviewForm.rating
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

                  {/* TESTIMONIAL */}

                  <div
                    className={
                      styles.reviewField
                    }
                  >
                    <label htmlFor="review-text">
                      Your Review
                    </label>

                    <textarea
                      id="review-text"
                      rows={5}
                      placeholder="Tell us about your experience..."
                      value={
                        reviewForm.text
                      }
                      onChange={(event) =>
                        setReviewForm(
                          (current) => ({
                            ...current,
                            text: event.target
                              .value,
                          })
                        )
                      }
                      required
                    />
                  </div>

                  {/* PHOTO */}

                  <div
                    className={
                      styles.reviewField
                    }
                  >
                    <label htmlFor="review-photo">
                      Profile Photo
                      <span>
                        Optional
                      </span>
                    </label>

                    <div
                      className={
                        styles.reviewPhotoUpload
                      }
                    >
                      <div
                        className={
                          styles.reviewPhotoPreview
                        }
                      >
                        {reviewPhotoPreview ? (
                          <img
                            src={
                              reviewPhotoPreview
                            }
                            alt="Profile preview"
                          />
                        ) : (
                          <Image
                            src="/images/brand/dog.png"
                            alt="PetCard"
                            width={42}
                            height={42}
                          />
                        )}
                      </div>

                      <div
                        className={
                          styles.reviewPhotoInfo
                        }
                      >
                        <label
                          htmlFor="review-photo"
                          className={
                            styles.reviewChoosePhoto
                          }
                        >
                          Choose Photo
                        </label>

                        <input
                          id="review-photo"
                          type="file"
                          accept="image/jpeg,image/png,image/webp"
                          onChange={
                            handleReviewPhotoChange
                          }
                          className={
                            styles.reviewHiddenFile
                          }
                        />

                        <span>
                          JPG, PNG or WEBP ·
                          Max 5MB
                        </span>

                        {reviewPhoto && (
                          <strong>
                            {
                              reviewPhoto.name
                            }
                          </strong>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* ACTIONS */}

                  <div
                    className={
                      styles.reviewModalActions
                    }
                  >
                    <button
                      type="button"
                      className={`${
                        styles.reviewCancelButton
                      } btn btn-outline`}
                      onClick={
                        closeReviewModal
                      }
                      disabled={
                        reviewSubmitting
                      }
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={
                        reviewSubmitting
                      }
                    >
                      {reviewSubmitting ? (
                        <>
                          <span
                            className={
                              styles.reviewButtonSpinner
                            }
                          />

                          Submitting...
                        </>
                      ) : (
                        <>
                          Submit Review
                         
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </main>
  );
}