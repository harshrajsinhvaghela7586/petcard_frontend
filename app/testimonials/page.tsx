import {
  ArrowRight,
  Heart,
  Quote,
  Star,
} from "lucide-react";
import Link from "next/link";
import styles from "./Testimonials.module.css";

const testimonials = [
  {
    name: "Arun Negi",
    role: "Sample Pet Parent",
    rating: 5,
    text:
      "PetCard brings the important parts of pet care together in one place. The overall experience feels simple, clear, and genuinely useful for everyday routines.",
  },
  {
    name: "Amber Fatima",
    role: "Sample Pet Parent",
    rating: 5,
    text:
      "The idea of keeping identity, health information, reminders, and memories connected makes pet care feel much more organized and easier to manage.",
  },
  {
    name: "Shailesh Kumar",
    role: "Sample Pet Parent",
    rating: 5,
    text:
      "I like the way PetCard combines practical information with a more playful experience. It feels designed around the real day-to-day needs of pet parents.",
  },
  {
    name: "Harshrajsinh Vaghela",
    role: "Sample Pet Parent",
    rating: 5,
    text:
      "A digital pet identity makes a lot of sense when profile details, records, care routines, and important information all need to stay easy to access.",
  },
  {
    name: "Sivam Bansal",
    role: "Sample Pet Parent",
    rating: 5,
    text:
      "The concept is clean and convenient. Having pet information, reminders, memories, and rewards connected in one experience can make everyday care more engaging.",
  },
];

const loopedTestimonials = [
  ...testimonials,
  ...testimonials,
];

export default function Testimonials() {
  return (
    <main className={styles.page}>
      {/* =====================================================
          HERO
          ===================================================== */}

      <section className={styles.hero}>
        <div className={styles.heroGlow} />

        <div className={styles.container}>
          <div className={styles.heroContent}>
            <div className={styles.eyebrow}>
              <Heart size={14} fill="currentColor" />
              Pet Parent Voices
            </div>

            <h1>
              Good care feels better{" "}
              <span>when it comes together.</span>
            </h1>

            <p>
              A few sample perspectives showing how PetCard can fit into
              everyday pet care, organization, and the little moments that
              matter.
            </p>
          </div>

          <div className={styles.heroStats}>
            <div className={styles.heroStat}>
              <strong>5.0</strong>
              <div className={styles.heroStars}>
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    size={15}
                    fill="currentColor"
                  />
                ))}
              </div>
              <span>Sample rating</span>
            </div>

            <div className={styles.heroStat}>
              <strong>∞</strong>
              <span>Stories that keep moving</span>
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
            <div className={styles.eyebrow}>
              <Quote size={14} />
              Testimonials
            </div>

            <h2>
              Why Pet Parents{" "}
              <span>choose PetCard.</span>
            </h2>

            <p>
              Sample testimonial content for the website design. Replace with
              approved customer feedback before production.
            </p>
          </div>

          <div className={styles.sliderViewport}>
            <div className={styles.sliderTrack}>
              {loopedTestimonials.map((item, index) => (
                <article
                  className={styles.testimonialCard}
                  key={`${item.name}-${index}`}
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
                      {item.name
                        .split(" ")
                        .map((word) => word[0])
                        .join("")
                        .slice(0, 2)}
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
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* =====================================================
          FEATURE STRIP
          ===================================================== */}

      <section className={styles.featureSection}>
        <div className={styles.container}>
          <div className={styles.featureGrid}>
            <div className={styles.featureItem}>
              <div className={styles.featureIcon}>🪪</div>
              <div>
                <strong>Digital Identity</strong>
                <span>One profile for your pet.</span>
              </div>
            </div>

            <div className={styles.featureItem}>
              <div className={styles.featureIcon}>🐾</div>
              <div>
                <strong>Everyday Care</strong>
                <span>Simple routines and reminders.</span>
              </div>
            </div>

            <div className={styles.featureItem}>
              <div className={styles.featureIcon}>🩺</div>
              <div>
                <strong>Health & Records</strong>
                <span>Important information at hand.</span>
              </div>
            </div>

            <div className={styles.featureItem}>
              <div className={styles.featureIcon}>⭐</div>
              <div>
                <strong>Rewards & Memories</strong>
                <span>Make caring more memorable.</span>
              </div>
            </div>
          </div>
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
                Keep identity, care, health, memories, and rewards together
                with PetCard.
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
          </div>
        </div>
      </section>
    </main>
  );
}