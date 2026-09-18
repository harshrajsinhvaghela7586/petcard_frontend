"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import styles from "../app/page.module.css";

interface Testimonial {
  _id: string;
  name: string;
  role: string;
  rating: number;
  text: string;
  photo?: string;
  isActive: boolean;
}

interface TestimonialsResponse {
  success: boolean;
  testimonials?: Testimonial[];
  message?: string;
}

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000/api";

const getImageUrl = (photo?: string) => {
  if (!photo) {
    return "";
  }

  if (
    photo.startsWith("http://") ||
    photo.startsWith("https://")
  ) {
    return photo;
  }

  const baseUrl = API_URL.replace(/\/api\/?$/, "");

  return `${baseUrl}${photo.startsWith("/") ? photo : `/${photo}`}`;
};

const getInitials = (name: string) => {
  return name
    .trim()
    .split(/\s+/)
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
};

function HomeTestimonialsPreview() {
  const [testimonials, setTestimonials] = useState<
    Testimonial[]
  >([]);

  const [loading, setLoading] = useState(true);

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
            `Testimonials API failed: ${response.status}`
          );
        }

        const data: TestimonialsResponse =
          await response.json();

        if (data.success) {
          const activeTestimonials = (
            data.testimonials || []
          ).filter(
            (testimonial) =>
              testimonial.isActive !== false
          );

          setTestimonials(activeTestimonials);
        } else {
          setTestimonials([]);
        }
      } catch (error) {
        if (
          error instanceof DOMException &&
          error.name === "AbortError"
        ) {
          return;
        }

        console.error(
          "Failed to fetch testimonials:",
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

  /*
   * Don't render the homepage section while loading
   * or when there are no active testimonials.
   */
  if (loading || testimonials.length === 0) {
    return null;
  }

  /*
   * Duplicate the list so the CSS marquee/track can
   * continue smoothly.
   */
  const slides = [
    ...testimonials,
    ...testimonials,
  ];

  return (
    <section
      className={`${styles.section} ${styles.homeTestimonials}`}
      id="testimonials"
      aria-labelledby="home-testimonials-title"
    >
      <div className={styles.container}>
        {/* ================================
            SECTION HEADING
        ================================= */}

        <div
          className={`${styles.sectionHeading} ${styles.center}`}
        >
          <h2
            id="home-testimonials-title"
            className={styles.sectionTitle}
          >
            Loved for the little things.{" "}
            <span>Built for everyday care.</span>
          </h2>

          <p className={styles.sectionSubtitle}>
            Hear from pet parents about their
            experience with PetCard.
          </p>
        </div>

        {/* ================================
            TESTIMONIAL SLIDER
        ================================= */}

        <div
          className={styles.homeTestimonialsViewport}
          aria-label="PetCard customer testimonials"
        >
          <div className={styles.homeTestimonialsTrack}>
            {slides.map((item, index) => {
              const imageUrl = getImageUrl(
                item.photo
              );

              return (
                <article
                  className={
                    styles.homeTestimonialCard
                  }
                  key={`${item._id}-${index}`}
                >
                  {/* ==========================
                      TOP
                  =========================== */}

                  <div
                    className={
                      styles.homeTestimonialTop
                    }
                  >
                    <span
                      className={styles.homeQuote}
                      aria-hidden="true"
                    >
                      “
                    </span>

                    <span
                      className={styles.homeStars}
                      aria-label={`${item.rating} out of 5 stars`}
                    >
                      {"★".repeat(
                        Math.max(
                          0,
                          Math.min(
                            5,
                            item.rating
                          )
                        )
                      )}
                    </span>
                  </div>

                  {/* ==========================
                      TESTIMONIAL TEXT
                  =========================== */}

                  <p>
                    {item.text}
                  </p>

                  {/* ==========================
                      AUTHOR
                  =========================== */}

                  <div
                    className={
                      styles.homeTestimonialAuthor
                    }
                  >
                    <span
                      className={
                        styles.homeTestimonialAvatar
                      }
                    >
                      {imageUrl ? (
                        <Image
                          src={imageUrl}
                          alt={`${item.name}'s profile`}
                          width={48}
                          height={48}
                          unoptimized
                        />
                      ) : (
                        getInitials(item.name)
                      )}
                    </span>

                    <div>
                      <b>{item.name}</b>

                      <small>{item.role}</small>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* ================================
            VIEW ALL
        ================================= */}

        <div
          className={
            styles.homePreviewLinkWrap
          }
        >
          <Link
            href="/testimonials"
            className="btn btn-primary"
          >
            View All Testimonials
          </Link>
        </div>
      </div>
    </section>
  );
}

export default HomeTestimonialsPreview;