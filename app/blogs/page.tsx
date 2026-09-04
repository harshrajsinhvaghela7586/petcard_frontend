"use client";

import Link from "next/link";
import { useEffect } from "react";

import {
  Clock3,
  Heart,
  Search,
  Star,
} from "lucide-react";

import styles from "./Blogs.module.css";

/* =========================================================
   CATEGORIES
   ========================================================= */

const categories = [
  { icon: "🐾", title: "All Posts" },
  { icon: "🍖", title: "Care Tips" },
  { icon: "🩺", title: "Health" },
  { icon: "🎓", title: "Training" },
  { icon: "🥕", title: "Nutrition" },
  { icon: "❤️", title: "Stories" },
  { icon: "🌿", title: "Lifestyle" },
];

/* =========================================================
   POPULAR POSTS
   ========================================================= */

const popularPosts = [
  {
    image: "/images/reward/home-dog.png",
    title: "How Often Should You Bathe Your Dog?",
    readTime: "4 min read",
    slug: "how-often-should-you-bathe-your-dog",
  },
  {
    image: "/images/reward/zuzu.png",
    title: "Understanding Your Cat's Body Language",
    readTime: "6 min read",
    slug: "understanding-your-cats-body-language",
  },
  {
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=700&q=85",
    title: "Easy Homemade Meals Your Pet Will Love",
    readTime: "5 min read",
    slug: "easy-homemade-meals-your-pet-will-love",
  },
  {
    image:
      "https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&w=700&q=85",
    title: "Fun Indoor Games to Keep Pets Active at Home",
    readTime: "4 min read",
    slug: "fun-indoor-games-to-keep-pets-active-at-home",
  },
];

/* =========================================================
   FRESH READS
   ========================================================= */

const freshReads = [
  {
    category: "STORY",
    image:
      "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=900&q=85",
    title: "A Bond Like No Other: Milo's Forever Home",
    description:
      "A heartwarming rescue story about trust, patience and finding a forever family.",
    readTime: "3 min read",
    likes: "1.2K",
    slug: "a-bond-like-no-other-milos-forever-home",
  },
  {
    category: "HEALTH",
    image:
      "https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?auto=format&fit=crop&w=900&q=85",
    title: "Vaccination Guide: What Every Pet Parent Should Know",
    description:
      "Keep your furry friend protected with the right vaccination routine.",
    readTime: "6 min read",
    likes: "980",
    slug: "vaccination-guide-what-every-pet-parent-should-know",
  },
  {
    category: "TRAINING",
    image:
      "https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&w=900&q=85",
    title: "5 Positive Reinforcement Tips That Actually Work",
    description:
      "Train with patience, consistency and rewards your pet understands.",
    readTime: "4 min read",
    likes: "760",
    slug: "5-positive-reinforcement-tips-that-actually-work",
  },
];

/* =========================================================
   HERO PETS
   ========================================================= */

const heroDog = "/images/about/dog.png";
const heroCat = "/images/about/cat.png";
const heroPet = "/images/about/rabbit.png";

/* =========================================================
   BLOG PAGE
   ========================================================= */

export default function Blogs() {
  useEffect(() => {
    const sections =
      document.querySelectorAll<HTMLElement>(
        `.${styles.revealSection}`
      );

    const reducedMotion =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

    if (reducedMotion) {
      sections.forEach((section) => {
        section.classList.add(
          styles.isVisible
        );
      });

      return;
    }

    const observer =
      new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            entry.target.classList.add(
              styles.isVisible
            );

            observer.unobserve(
              entry.target
            );
          });
        },
        {
          threshold: 0.12,
          rootMargin:
            "0px 0px -70px 0px",
        }
      );

    sections.forEach((section) =>
      observer.observe(section)
    );

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <main className={styles.blogPage}>
      {/* =====================================================
          HERO
          ===================================================== */}

      <section
        className={`${styles.hero} ${styles.revealSection}`}
      >
        <div className={styles.heroGlow} />

        <div className="container">
          <div className={styles.heroGrid}>
            <div className={styles.heroContent}>
              <h1>
                Stories, tips & love
                <br />
                for{" "}
                <span>
                  happier paws.
                </span>
              </h1>

              <p>
                Helpful tips, heartwarming stories,
                and expert advice to help you care
                better and love stronger.
              </p>

              <form
                className={styles.searchBar}
                onSubmit={(event) =>
                  event.preventDefault()
                }
              >
                <input
                  type="search"
                  placeholder="Search blogs, tips, topics..."
                  aria-label="Search blogs"
                />

                <button
                  type="submit"
                  aria-label="Search blogs"
                >
                  <Search size={21} />
                </button>
              </form>
            </div>

            <div className={styles.heroPets}>
              <div
                className={styles.heroPawOne}
                aria-hidden="true"
              >
                🐾
              </div>

              <div
                className={styles.heroPawTwo}
                aria-hidden="true"
              >
                ✦
              </div>

              <div className={styles.heroDog}>
                <img
                  src={heroDog}
                  alt="Golden retriever"
                />
              </div>

              <div className={styles.heroCat}>
                <img
                  src={heroCat}
                  alt="Cat"
                />
              </div>

              <div className={styles.heroPet}>
                <img
                  src={heroPet}
                  alt="Happy pet"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          CATEGORIES
          ===================================================== */}

      <section
        className={`${styles.categoriesSection} ${styles.revealSection}`}
      >
        <div className="container">
          <div className={styles.categoryLayout}>
            <div className={styles.categories}>
              {categories.map(
                (category, index) => (
                  <button
                    key={category.title}
                    type="button"
                    className={`${styles.categoryButton} ${
                      index === 0
                        ? styles.categoryButtonActive
                        : ""
                    }`}
                  >
                    <span>
                      {category.icon}
                    </span>

                    <small>
                      {category.title}
                    </small>
                  </button>
                )
              )}
            </div>

            <div className={styles.shareStory}>
              <div
                className={
                  styles.shareStoryPet
                }
              >
                <img
                  src={heroDog}
                  alt="Pet"
                />
              </div>

              <div>
                <strong>
                  Got a story to share?
                </strong>

                <span>
                  We&apos;d love to feature you!
                </span>

                <Link href="/contact">
                  Share Your Story
                 <img
                 src="/images/paw-white.png"
                 width={20}
                 height={20}
                 />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          FEATURED + POPULAR
          ===================================================== */}

      <section
        className={`${styles.featuredSection} ${styles.revealSection}`}
      >
        <div className="container">
          <div className={styles.featuredGrid}>
            <div className={styles.featuredColumn}>
              <div className={styles.sectionLabel}>
                <Star
                  size={13}
                  fill="currentColor"
                />

                FEATURED ARTICLE
              </div>

              <article
                className={
                  styles.featuredCard
                }
              >
                <div
                  className={
                    styles.featuredImage
                  }
                >
                  <img
                    src="/images/reward/huchiko.png"
                    alt="Dog enjoying the outdoors"
                  />

                  <span>
                    CARE TIPS
                  </span>
                </div>

                <div
                  className={
                    styles.featuredContent
                  }
                >
                  <div
                    className={
                      styles.articleTop
                    }
                  >
                    <span>
                      CARE TIPS
                    </span>

                    <span>
                      <Clock3 size={13} />
                      5 min read
                    </span>
                  </div>

                  <h2>
                    10 Daily Habits That Make
                    Your Dog Happier &
                    Healthier
                  </h2>

                  <p>
                    Small changes, big impact!
                    Simple daily habits that build
                    a stronger bond and a healthier
                    life for your pup.
                  </p>

                  <div
                    className={
                      styles.authorRow
                    }
                  >
                    <div
                      className={
                        styles.authorAvatar
                      }
                    >
                      A
                    </div>

                    <div>
                      <strong>
                        Pet Care Expert
                      </strong>

                      <span>
                        PetCard Journal
                      </span>
                    </div>

                    <Link
                      href="/blogs/10-daily-habits-that-make-your-dog-happier-healthier"
                      className={
                        styles.circleArrow
                      }
                      aria-label="Read featured article"
                    >
                      <img
                 src="/images/paw-white.png"
                 width={20}
                 height={20}
                 />
                    </Link>
                  </div>
                </div>
              </article>
            </div>

            <aside
              className={
                styles.popularColumn
              }
            >
              <div
                className={
                  styles.popularHeading
                }
              >
                <h2>
                  <span>🔥</span>
                  Popular Posts
                </h2>
              </div>

              <div
                className={
                  styles.popularList
                }
              >
                {popularPosts.map(
                  (post) => (
                    <Link
                      href={`/blogs/${post.slug}`}
                      className={
                        styles.popularPost
                      }
                      key={post.title}
                    >
                      <div
                        className={
                          styles.popularImage
                        }
                      >
                        <img
                          src={post.image}
                          alt={post.title}
                        />
                      </div>

                      <div
                        className={
                          styles.popularContent
                        }
                      >
                        <h3>
                          {post.title}
                        </h3>

                        <span>
                          <Clock3 size={12} />
                          {post.readTime}
                          <b>•</b>
                          🐾
                        </span>
                      </div>
                    </Link>
                  )
                )}
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* =====================================================
          STORY STRIP
          ===================================================== */}

      <section
        className={`${styles.storySection} ${styles.revealSection}`}
      >
        <div className="container">
          <div className={styles.storyBanner}>
            <div
              className={
                styles.storyPet
              }
            >
              <img
                src={heroDog}
                alt="Happy pet"
              />
            </div>

            <div
              className={
                styles.storyCopy
              }
            >
              <strong>
                Share your pet&apos;s story!
              </strong>

              <p>
                Every pet has a unique story.
                <br />
                We&apos;d love to feature yours.
              </p>

              <Link href="/contact">
                Share Your Story
               <img
                 src="/images/paw-white.png"
                 width={20}
                 height={20}
                 />
              </Link>
            </div>

            <div
              className={
                styles.polaroids
              }
            >
              <div
                className={
                  styles.polaroid
                }
              >
                <img
                  src={heroDog}
                  alt="Bruno"
                />

                <span>
                  Bruno ♡
                </span>
              </div>

              <div
                className={
                  styles.polaroid
                }
              >
                <img
                  src={heroCat}
                  alt="Luna"
                />

                <span>
                  Luna ♡
                </span>
              </div>

              <div
                className={
                  styles.polaroid
                }
              >
                <img
                  src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=700&q=85"
                  alt="Milo"
                />

                <span>
                  Milo ♡
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          FRESH READS
          ===================================================== */}

      <section
        className={`${styles.readsSection} ${styles.revealSection}`}
      >
        <div className="container">
          <div
            className={
              styles.readsHeading
            }
          >
            <div>
              <h2>
                Fresh Reads for Pet Parents
              </h2>
            </div>
          </div>

          <div
            className={
              styles.readsGrid
            }
          >
            {freshReads.map(
              (post) => (
                <Link
                  href={`/blogs/${post.slug}`}
                  className={
                    styles.readCard
                  }
                  key={post.title}
                >
                  <div
                    className={
                      styles.readImage
                    }
                  >
                    <img
                      src={post.image}
                      alt={post.title}
                    />

                    <span>
                      {post.category}
                    </span>
                  </div>

                  <div
                    className={
                      styles.readContent
                    }
                  >
                    <h3>
                      {post.title}
                    </h3>

                    <p>
                      {post.description}
                    </p>

                    <div
                      className={
                        styles.readFooter
                      }
                    >
                      <span>
                        <Clock3 size={13} />
                        {post.readTime}
                      </span>

                      <span>
                        <Heart size={13} />
                        {post.likes}
                      </span>
                    </div>
                  </div>
                </Link>
              )
            )}
          </div>
        </div>
      </section>

      {/* =====================================================
          NEWSLETTER
          ===================================================== */}

      <section
        className={`${styles.newsletterSection} ${styles.revealSection}`}
      >
        <div className="container">
          <div
            className={
              styles.newsletter
            }
          >
            <div
              className={
                styles.newsletterPet
              }
            >
              <img
                src={heroDog}
                alt="Pet parent companion"
              />
            </div>

            <div
              className={
                styles.newsletterCopy
              }
            >
              <h2>
                Pawsome updates straight to your inbox!
              </h2>

              <p>
                Subscribe to get the best pet care tips,
                stories, and exclusive updates.
              </p>
            </div>

            <form
              className={
                styles.newsletterForm
              }
              onSubmit={(event) =>
                event.preventDefault()
              }
            >
              <input
                type="email"
                placeholder="Enter your email"
                aria-label="Email address"
                required
              />

              <button type="submit">
                Subscribe
               <img
                 src="/images/paw-white.png"
                 width={20}
                 height={20}
                 />
              </button>
            </form>

            <div
              className={
                styles.envelopeDecoration
              }
            >
              ✉️
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}