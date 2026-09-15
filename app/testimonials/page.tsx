"use client";

import {
  ArrowRight,
  Heart,
  Quote,
  Star,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./Testimonials.module.css";

interface Testimonial {
  _id: string;
  name: string;
  role: string;
  rating: number;
  text: string;
  photo?: string;
  isActive: boolean;
}

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch(`${API_URL}/testimonials`);

        if (!response.ok) {
          throw new Error("Failed to fetch testimonials");
        }

        const data = await response.json();

        const testimonialList = Array.isArray(data)
          ? data
          : Array.isArray(data.testimonials)
            ? data.testimonials
            : [];

        const activeTestimonials = testimonialList.filter(
          (item: Testimonial) => item.isActive === true
        );

        setTestimonials(activeTestimonials);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
        setTestimonials([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  /*
   * Infinite slider ke liye testimonials ko duplicate kar rahe hain.
   * Agar 1-2 testimonials hon tab bhi animation smoothly chalega.
   */
  const loopedTestimonials = [
    ...testimonials,
    ...testimonials,
  ];

  // Backend ke local uploaded photo ko full URL me convert karega
  const getImageUrl = (photo?: string) => {
    if (!photo) return "";

    if (photo.startsWith("http")) {
      return photo;
    }

    return `${API_URL.replace("/api", "")}${photo}`;
  };

  // Initials fallback
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  // Average rating calculate
  const averageRating =
    testimonials.length > 0
      ? (
        testimonials.reduce(
          (sum, item) => sum + item.rating,
          0
        ) / testimonials.length
      ).toFixed(1)
      : "0.0";

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
              <span>when it comes together.</span>
            </h1>

            <p>
              A few perspectives from pet parents showing how
              PetCard can fit into everyday pet care, organization,
              and the little moments that matter.
            </p>
          </div>

          <div className={styles.heroStats}>
            <div className={styles.heroStat}>
              <strong>{averageRating}</strong>

              <div className={styles.heroStars}>
                {Array.from({ length: 5 }).map((_, index) => (
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

            <div className={styles.heroStat}>
              <strong>{testimonials.length}</strong>
              <span>
                {testimonials.length === 1
                  ? "Pet Parent Story"
                  : "Pet Parent Stories"}
              </span>
            </div>

            <div className={styles.heroStat}>
              <strong>1</strong>
              <span>Pet world in one place</span>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          INFINITE TESTIMONIALS
          ===================================================== */}

      <section className={styles.testimonialSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeading}>
           

            <h2>
              Why Pet Parents{" "}
              <span>choose PetCard.</span>
            </h2>

            <p>
              See what pet parents have to say about the
              PetCard experience.
            </p>
          </div>

          {/* Loading */}
          {loading && (
            <div className={styles.emptyState}>
              <p>Loading testimonials...</p>
            </div>
          )}

          {/* No testimonials */}
          {!loading && testimonials.length === 0 && (
            <div className={styles.emptyState}>
              <Quote size={28} />

              <h3>No testimonials yet</h3>

              <p>
                Customer testimonials will appear here once
                they are added from the admin panel.
              </p>
            </div>
          )}

          {/* Testimonials */}
          {!loading && testimonials.length > 0 && (
            <div className={styles.sliderViewport}>
              <div className={styles.sliderTrack}>
                {loopedTestimonials.map((item, index) => {
                  const imageUrl = getImageUrl(item.photo);

                  return (
                    <article
                      className={styles.testimonialCard}
                      key={`${item._id}-${index}`}
                    >
                      <div className={styles.cardTop}>
                        <div className={styles.quoteIcon}>
                          <Quote
                            size={18}
                            fill="currentColor"
                          />
                        </div>

                        <div className={styles.rating}>
                          {Array.from({
                            length: item.rating,
                          }).map((_, starIndex) => (
                            <Star
                              key={starIndex}
                              size={13}
                              fill="currentColor"
                            />
                          ))}
                        </div>
                      </div>

                      <p className={styles.testimonialText}>
                        “{item.text}”
                      </p>

                      <div className={styles.cardBottom}>
                        <div className={styles.avatar}>
                          {imageUrl ? (
                            <img
                              src={imageUrl}
                              alt={item.name}
                            />
                          ) : (
                            getInitials(item.name)
                          )}
                        </div>

                        <div className={styles.author}>
                          <strong>{item.name}</strong>
                          <span>{item.role}</span>
                        </div>

                        <Heart
                          className={styles.authorHeart}
                          size={17}
                          fill="currentColor"
                        />
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* =====================================================
          CTA
          ===================================================== */}

      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <div className={styles.ctaCard}>
            <div>
              <div className={styles.eyebrow}>
                Made for every little paw
              </div>

              <h2>
                Your pet&apos;s story deserves{" "}
                <span>its own place.</span>
              </h2>

              <p>
                Keep identity, care, health, memories, and
                rewards together with PetCard.
              </p>
            </div>


            <Link
              href="/#download-app"
              className="btn btn-primary"
            >
              Explore PetCard

              <img
                src="/images/paw-white.png"
                width={37}
                height={37}
                alt=""
              />
            </Link>
            <img src="/images/footer/pets.png"
height={200}
width={200}/>
          </div>
        </div>
      </section>
    </main>
  );
}