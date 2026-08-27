"use client";

import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  ChevronRight,
  Clock3,
  Heart,
  Search,
  Star,
} from "lucide-react";

import styles from "./Blogs.module.css";

const categories = [
  {
    icon: "🐾",
    title: "All Posts",
  },
  {
    icon: "🍖",
    title: "Care Tips",
  },
  {
    icon: "🩺",
    title: "Health",
  },
  {
    icon: "🎓",
    title: "Training",
  },
  {
    icon: "🥕",
    title: "Nutrition",
  },
  {
    icon: "❤️",
    title: "Stories",
  },
  {
    icon: "🌿",
    title: "Lifestyle",
  },
];

const popularPosts = [
  {
    image:
      "/images/reward/home-dog.png",
    title: "How Often Should You Bathe Your Dog?",
    readTime: "4 min read",
  },
  {
    image:
      "/images/reward/zuzu.png",
    title: "Understanding Your Cat's Body Language",
    readTime: "6 min read",
  },
  {
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=700&q=85",
    title: "Easy Homemade Meals Your Pet Will Love",
    readTime: "5 min read",
  },
  {
    image:
      "https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&w=700&q=85",
    title: "Fun Indoor Games to Keep Pets Active at Home",
    readTime: "4 min read",
  },
];

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
  },
];

const heroDog =
  "/images/about/dog.png";

const heroCat =
  "/images/about/cat.png";

const heroPet =
  "/images/about/rabbit.png";

export default function Blogs() {
  return (
    <main className={styles.blogPage}>
      {/* =====================================================
          HERO
          ===================================================== */}

      <section className={styles.hero}>
        <div className={styles.heroGlow} />

        <div className="container">
          <div className={styles.heroGrid}>
            <div className={styles.heroContent}>
              <div className={styles.blogBadge}>
                
                PET PARENT BLOG
                <Heart size={12} fill="currentColor" />
              </div>

              <h1>
                Stories, tips & love
                <br />
                for <span>happier paws.</span>
              </h1>

              <p>
                Helpful tips, heartwarming stories, and expert advice to help
                you care better and love stronger.
              </p>

              <form
                className={styles.searchBar}
                onSubmit={(event) => event.preventDefault()}
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
              <div className={styles.heroPawOne}>🐾</div>
              <div className={styles.heroPawTwo}>✦</div>

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

      <section className={styles.categoriesSection}>
        <div className="container">
          <div className={styles.categoryLayout}>
            <div className={styles.categories}>
              {categories.map((category, index) => (
                <button
                  key={category.title}
                  type="button"
                  className={`${styles.categoryButton} ${
                    index === 0
                      ? styles.categoryButtonActive
                      : ""
                  }`}
                >
                  <span>{category.icon}</span>
                  <small>{category.title}</small>
                </button>
              ))}
            </div>

            <div className={styles.shareStory}>
              <div className={styles.shareStoryPet}>
                <img
                  src={heroDog}
                  alt="Pet"
                />
              </div>

              <div>
                <strong>Got a story to share?</strong>
                <span>We&apos;d love to feature you!</span>

                <Link href="#">
                  Share Your Story
                  <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          FEATURED + POPULAR
          ===================================================== */}

      <section className={styles.featuredSection}>
        <div className="container">
          <div className={styles.featuredGrid}>
            {/* Featured */}
            <div className={styles.featuredColumn}>
              <div className={styles.sectionLabel}>
                <Star size={13} fill="currentColor" />
                FEATURED ARTICLE
              </div>

              <article className={styles.featuredCard}>
                <div className={styles.featuredImage}>
                  <img
                    src="/images/reward/huchiko.png"
                    alt="Dog enjoying the outdoors"
                  />

                  <span>CARE TIPS</span>
                </div>

                <div className={styles.featuredContent}>
                  <div className={styles.articleTop}>
                    <span>CARE TIPS</span>

                    <span>
                      <Clock3 size={13} />
                      5 min read
                    </span>
                  </div>

                  <h2>
                    10 Daily Habits That Make Your Dog Happier & Healthier
                  </h2>

                  <p>
                    Small changes, big impact! Simple daily habits that build
                    a stronger bond and a healthier life for your pup.
                  </p>

                  <div className={styles.authorRow}>
                    <div className={styles.authorAvatar}>
                      A
                    </div>

                    <div>
                      <strong>Pet Care Expert</strong>
                      <span>PetCard Journal</span>
                    </div>

                    <Link
                      href="#"
                      className={styles.circleArrow}
                      aria-label="Read featured article"
                    >
                      <ArrowRight size={17} />
                    </Link>
                  </div>
                </div>
              </article>

              <div className={styles.featuredDots}>
                <span className={styles.featuredDotActive} />
                <span />
                <span />
                <span />
              </div>
            </div>

            {/* Popular */}
            <aside className={styles.popularColumn}>
              <div className={styles.popularHeading}>
                <h2>
                  <span>🔥</span>
                  Popular Posts
                </h2>

                <Link href="#">
                  View All
                  <ChevronRight size={15} />
                </Link>
              </div>

              <div className={styles.popularList}>
                {popularPosts.map((post) => (
                  <Link
                    href="#"
                    className={styles.popularPost}
                    key={post.title}
                  >
                    <div className={styles.popularImage}>
                      <img
                        src={post.image}
                        alt={post.title}
                      />
                    </div>

                    <div className={styles.popularContent}>
                      <h3>{post.title}</h3>

                      <span>
                        <Clock3 size={12} />
                        {post.readTime}
                        <b>•</b>
                        🐾
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* =====================================================
          STORY STRIP
          ===================================================== */}

      <section className={styles.storySection}>
        <div className="container">
          <div className={styles.storyBanner}>
            <div className={styles.storyPet}>
              <img
                src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=700&q=90"
                alt="Happy pet"
              />
            </div>

            <div className={styles.storyCopy}>
              <strong>Share your pet&apos;s story!</strong>

              <p>
                Every pet has a unique story.
                <br />
                We&apos;d love to feature yours.
              </p>

              <Link href="#">
                Share Your Story
                <ArrowRight size={16} />
              </Link>
            </div>

            <div className={styles.polaroids}>
              <div className={styles.polaroid}>
                <img
                  src={heroDog}
                  alt="Bruno"
                />
                <span>Bruno ♡</span>
              </div>

              <div className={styles.polaroid}>
                <img
                  src={heroCat}
                  alt="Luna"
                />
                <span>Luna ♡</span>
              </div>

              <div className={styles.polaroid}>
                <img
                  src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=700&q=85"
                  alt="Pet"
                />
                <span>Milo ♡</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          FRESH READS
          ===================================================== */}

      <section className={styles.readsSection}>
        <div className="container">
          <div className={styles.readsHeading}>
            <div>
              <h2>
                Fresh Reads for Pet Parents
              </h2>
            </div>

            <Link href="#">
              View All Articles
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className={styles.readsGrid}>
            {freshReads.map((post) => (
              <article
                className={styles.readCard}
                key={post.title}
              >
                <div className={styles.readImage}>
                  <img
                    src={post.image}
                    alt={post.title}
                  />

                  <span>{post.category}</span>
                </div>

                <div className={styles.readContent}>
                  <h3>{post.title}</h3>

                  <p>{post.description}</p>

                  <div className={styles.readFooter}>
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
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          NEWSLETTER
          ===================================================== */}

      <section className={styles.newsletterSection}>
        <div className="container">
          <div className={styles.newsletter}>
            <div className={styles.newsletterPet}>
              <img
                src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=700&q=90"
                alt="Pet parent companion"
              />
            </div>

            <div className={styles.newsletterCopy}>
              <h2>
                Pawsome updates straight to your inbox!
              </h2>

              <p>
                Subscribe to get the best pet care tips,
                stories, and exclusive updates.
              </p>
            </div>

            <form
              className={styles.newsletterForm}
              onSubmit={(event) => event.preventDefault()}
            >
              <input
                type="email"
                placeholder="Enter your email"
                aria-label="Email address"
              />

              <button type="submit">
                Subscribe
                <ArrowRight size={17} />
              </button>
            </form>

            <div className={styles.envelopeDecoration}>
              ✉️
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}