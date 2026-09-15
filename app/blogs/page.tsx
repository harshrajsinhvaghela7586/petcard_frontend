"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import {
  Clock3,
  Heart,
  Search,
  Star,
} from "lucide-react";

import styles from "./Blogs.module.css";
import Image from "next/image";

/* =========================================================
   API
========================================================= */

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000/api";

const BACKEND_URL = API_URL.replace(
  /\/api\/?$/,
  ""
);

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
   BLOG TYPE
========================================================= */

interface Blog {
  _id: string;

  title: string;
  slug: string;
  category: string;
  excerpt: string;

  author: string;
  readTime: string;
  date: string;

  image?: string;

  intro?: string;

  sections?: {
    heading: string;
    paragraphs: string[];
  }[];

  takeaways?: string[];

  note?: string;

  isFeatured: boolean;
  isPopular: boolean;
  isActive: boolean;

  likes?: number;
  views?: number;

  createdAt: string;
  updatedAt?: string;
}

/* =========================================================
   HERO PETS
========================================================= */

const heroDog = "/images/huchiko2.png";
const heroCat = "/images/about/cat.png";
const heroPet = "/images/about/rabbit.png";

/* =========================================================
   IMAGE URL HELPER
========================================================= */

const getImageUrl = (image?: string) => {
  if (!image) {
    return "";
  }

  if (
    image.startsWith("http://") ||
    image.startsWith("https://")
  ) {
    return image;
  }

  return `${BACKEND_URL}${image}`;
};

/* =========================================================
   DATE HELPER
========================================================= */

const storeBadges = (
  <>
    <div className={styles.storeBadge}>
      <img
        src="/images/apple-logo.png"
        alt="Apple"
        className={styles.storeIconImage}
      />

      <span className={styles.storeText}>
        <small>Download on the</small>
        <b>App Store</b>
      </span>
    </div>

    <div className={`${styles.storeBadge} ${styles.googleBadge}`}>
      <img
        src="/images/google-play.png"
        alt="Google Play"
        className={styles.storeIconImage}
      />

      <span className={styles.storeText}>
        <small>GET IT ON</small>
        <b>Google Play</b>
      </span>
    </div>
  </>
);

const getBlogDate = (blog: Blog) => {
  if (blog.date) {
    const date = new Date(blog.date);

    if (!Number.isNaN(date.getTime())) {
      return date.getTime();
    }
  }

  if (blog.createdAt) {
    const date = new Date(blog.createdAt);

    if (!Number.isNaN(date.getTime())) {
      return date.getTime();
    }
  }

  return 0;
};

/* =========================================================
   DISPLAY CATEGORY
========================================================= */

const getCategoryLabel = (
  category?: string
) => {
  if (!category) {
    return "";
  }

  return category.toUpperCase();
};

/* =========================================================
   BLOG PAGE
========================================================= */

export default function Blogs() {
  const [blogs, setBlogs] = useState<Blog[]>(
    []
  );

  const [loading, setLoading] =
    useState(true);

  /* =====================================================
     FETCH BLOGS
  ===================================================== */

  useEffect(() => {
    const controller =
      new AbortController();

    const fetchBlogs = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `${API_URL}/blogs`,
          {
            method: "GET",
            signal: controller.signal,
            cache: "no-store",
          }
        );

        if (!response.ok) {
          throw new Error(
            "Failed to fetch blogs."
          );
        }

        const data =
          await response.json();

        /*
         * Backend normally returns:
         * {
         *   success: true,
         *   blogs: [...]
         * }
         *
         * This also safely handles
         * direct array response.
         */

        const blogList: Blog[] =
          Array.isArray(data)
            ? data
            : Array.isArray(data?.blogs)
            ? data.blogs
            : [];

        /*
         * Only active blogs should be visible
         * on public website.
         *
         * If backend already filters active blogs,
         * this simply keeps them unchanged.
         */

        const activeBlogs =
          blogList.filter(
            (blog) =>
              blog.isActive !== false
          );

        setBlogs(activeBlogs);
      } catch (error) {
        if (
          error instanceof DOMException &&
          error.name === "AbortError"
        ) {
          return;
        }

        console.error(
          "Failed to fetch blogs:",
          error
        );

        setBlogs([]);
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchBlogs();

    return () => {
      controller.abort();
    };
  }, []);

  /* =====================================================
     FEATURED BLOG
     
     DB:
     isFeatured = true
     
     Only one should exist because admin
     already limits Featured to 1.
  ===================================================== */

  const featuredBlog =
    useMemo(() => {
      return (
        blogs.find(
          (blog) =>
            blog.isFeatured === true
        ) || null
      );
    }, [blogs]);

  /* =====================================================
     POPULAR BLOGS
     
     DB:
     isPopular = true
     
     Maximum 4 are allowed from admin.
  ===================================================== */

  const popularBlogs =
    useMemo(() => {
      return blogs
        .filter(
          (blog) =>
            blog.isPopular === true
        )
        .sort(
          (a, b) =>
            getBlogDate(b) -
            getBlogDate(a)
        )
        .slice(0, 4);
    }, [blogs]);

  /* =====================================================
     FRESH READS
     
     Latest active blogs based on:
     1. date
     2. createdAt fallback
     
     Featured/Popular status does not matter here.
  ===================================================== */
const freshReads = useMemo(() => {
    return [...blogs]
        .filter((blog) => blog.isFeatured === false && blog.isPopular === false)
        .sort(
            (a, b) =>
                getBlogDate(b) -
                getBlogDate(a)
        )
        .slice(0, 3);
}, [blogs]);

  /* =====================================================
     SCROLL REVEAL
  ===================================================== */

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
            if (
              !entry.isIntersecting
            ) {
              return;
            }

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
            <div
              className={styles.heroContent}
            >
              <h1>
                Stories, tips & love
                <br />
                for{" "}
                <span>
                  happier paws.
                </span>
              </h1>

              <p>
                Helpful tips,
                heartwarming stories,
                and expert advice to
                help you care better
                and love stronger.
              </p>

              <form
                className={
                  styles.searchBar
                }
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

            <div
              className={styles.heroPets}
            >
             

              <div
                className={styles.heroDog}
              >
                <img
                  src="/images/BlogHero.png"
                  alt="Golden retriever"
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
          <div
            className={
              styles.categoryLayout
            }
          >
            <div
              className={
                styles.categories
              }
            >
              {categories.map(
                (category, index) => (
                  <button
                    key={
                      category.title
                    }
                    type="button"
                    className={`${styles.categoryButton} ${
                      index === 0
                        ? styles.categoryButtonActive
                        : ""
                    }`}
                  >
                   
                    <small>
                      {
                        category.title
                      }
                    </small>
                  </button>
                )
              )}
            </div>

            <div
              className={
                styles.shareStory
              }
            >
              <div
                className={
                  styles.shareStoryPet
                }
              >
                <img
                  src="/images/slider/huchiko.png"
                  alt="Pet"
                />
              </div>

              <div>
                <strong>
                  Got a story to share?
                </strong>

                <span>
                  We&apos;d love to
                  feature you!
                </span>

                <Link href="/contact" className="btn btn-primary">
                  Share Your Story
                  <img
                    src="/images/paw-white.png"
                    width={20}
                    height={20}
                    alt=""
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
          <div
            className={
              styles.featuredGrid
            }
          >
            {/* =================================================
                FEATURED ARTICLE
            ================================================= */}

            <div
              className={
                styles.featuredColumn
              }
            >
              <div
                className={
                  styles.sectionLabel
                }
              >
              

                FEATURED ARTICLE
              </div>

              {featuredBlog ? (
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
                    {featuredBlog.image ? (
                      <img
                        src={getImageUrl(
                          featuredBlog.image
                        )}
                        alt={
                          featuredBlog.title
                        }
                      />
                    ) : (
                      <img
                        src="/images/brand/dog.png"
                        alt={
                          featuredBlog.title
                        }
                      />
                    )}

                    <span>
                      {getCategoryLabel(
                        featuredBlog.category
                      )}
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
                        {getCategoryLabel(
                          featuredBlog.category
                        )}
                      </span>

                      <span>
                        <Clock3
                          size={13}
                        />

                        {
                          featuredBlog.readTime
                        }
                      </span>
                    </div>

                    <h2>
                      {
                        featuredBlog.title
                      }
                    </h2>

                    <p>
                      {
                        featuredBlog.excerpt
                      }
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
                        {featuredBlog.author
                          ?.charAt(0)
                          .toUpperCase() ||
                          "P"}
                      </div>

                      <div>
                        <strong>
                          {
                            featuredBlog.author
                          }
                        </strong>

                        <span>
                          PetCard Journal
                        </span>
                      </div>

                      <Link
                        href={`/blogs/${featuredBlog.slug}`}
                        className={
                          styles.circleArrow
                        }
                        aria-label="Read featured article"
                      >
                        <img
                          src="/images/paw.png"
                          width={20}
                          height={20}
                          alt=""
                        />
                      </Link>
                    </div>
                  </div>
                </article>
              ) : (
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
                      src="/images/brand/dog.png"
                      alt="Featured blog"
                    />

                    <span>
                      PETCARD
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
                        FEATURED ARTICLE
                      </span>
                    </div>

                    <h2>
                      {loading
                        ? "Loading featured article..."
                        : "No featured article yet"}
                    </h2>

                    <p>
                      {loading
                        ? "Please wait while we load the latest PetCard articles."
                        : "A featured article will appear here once it is selected from the admin panel."}
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
                        P
                      </div>

                      <div>
                        <strong>
                          PetCard Journal
                        </strong>

                        <span>
                          PetCard
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              )}
            </div>

            {/* =================================================
                POPULAR POSTS
            ================================================= */}

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
                 
                  Popular Posts
                </h2>
              </div>

              <div
                className={
                  styles.popularList
                }
              >
                {popularBlogs.length >
                0 ? (
                  popularBlogs.map(
                    (post) => (
                      <Link
                        href={`/blogs/${post.slug}`}
                        className={
                          styles.popularPost
                        }
                        key={post._id}
                      >
                        <div
                          className={
                            styles.popularImage
                          }
                        >
                          {post.image ? (
                            <img
                              src={getImageUrl(
                                post.image
                              )}
                              alt={
                                post.title
                              }
                            />
                          ) : (
                            <img
                              src="/images/brand/dog.png"
                              alt={
                                post.title
                              }
                            />
                          )}
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
                            <Clock3
                              size={12}
                            />

                            {
                              post.readTime
                            }

                            <b>•</b>

                            🐾
                          </span>
                        </div>
                      </Link>
                    )
                  )
                ) : (
                  <div
                    className={
                      styles.popularPost
                    }
                  >
                    <div
                      className={
                        styles.popularImage
                      }
                    >
                      <img
                        src="/images/brand/dog.png"
                        alt="PetCard"
                      />
                    </div>

                    <div
                      className={
                        styles.popularContent
                      }
                    >
                      <h3>
                        {loading
                          ? "Loading popular posts..."
                          : "No popular posts yet"}
                      </h3>

                      <span>
                        <Clock3
                          size={12}
                        />

                        {loading
                          ? "Please wait"
                          : "Select popular blogs from admin"}

                        <b>•</b>

                        🐾
                      </span>
                    </div>
                  </div>
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
          <div
            className={
              styles.storyBanner
            }
          >
            <div
              className={
                styles.storyPet
              }
            >
              <img
                src="/images/blogContent.png"
                alt="Happy pet"
              />
            </div>

            <div
              className={
                styles.storyCopy
              }
            >
              <strong>
                Share your pet&apos;s
                story!
              </strong>

              <p>
                Every pet has a unique
                story.
                <br />
                We&apos;d love to feature
                yours.
              </p>

              <Link href="/contact" className="btn btn-primary">
                Share Your Story
                <img
                  src="/images/paw-white.png"
                  width={25}
                  height={25}
                  alt=""
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
                Fresh Reads for Pet
                Parents
              </h2>
            </div>
          </div>

          <div
            className={
              styles.readsGrid
            }
          >
            {freshReads.length > 0 ? (
              freshReads.map(
                (post) => (
                  <Link
                    href={`/blogs/${post.slug}`}
                    className={
                      styles.readCard
                    }
                    key={post._id}
                  >
                    <div
                      className={
                        styles.readImage
                      }
                    >
                      {post.image ? (
                        <img
                          src={getImageUrl(
                            post.image
                          )}
                          alt={
                            post.title
                          }
                        />
                      ) : (
                        <img
                          src="/images/brand/dog.png"
                          alt={
                            post.title
                          }
                        />
                      )}

                      <span>
                        {getCategoryLabel(
                          post.category
                        )}
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
                        {post.excerpt}
                      </p>

                      <div
                        className={
                          styles.readFooter
                        }
                      >
                        <span>
                          <Clock3
                            size={13}
                          />

                          {
                            post.readTime
                          }
                        </span>

                        <span>
                          <Heart
                            size={13}
                          />

                          {typeof post.likes ===
                          "number"
                            ? post.likes
                            : "🐾"}
                        </span>
                      </div>
                    </div>
                  </Link>
                )
              )
            ) : (
              <>
                {loading ? (
                  Array.from({
                    length: 3,
                  }).map(
                    (_, index) => (
                      <article
                        className={
                          styles.readCard
                        }
                        key={index}
                      >
                        <div
                          className={
                            styles.readImage
                          }
                        >
                          <img
                            src="/images/brand/dog.png"
                            alt="Loading"
                          />

                          <span>
                            LOADING
                          </span>
                        </div>

                        <div
                          className={
                            styles.readContent
                          }
                        >
                          <h3>
                            Loading
                            article...
                          </h3>

                          <p>
                            Loading the
                            latest
                            PetCard
                            articles.
                          </p>

                          <div
                            className={
                              styles.readFooter
                            }
                          >
                            <span>
                              <Clock3
                                size={
                                  13
                                }
                              />
                              Please
                              wait
                            </span>

                            <span>
                              <Heart
                                size={
                                  13
                                }
                              />
                              🐾
                            </span>
                          </div>
                        </div>
                      </article>
                    )
                  )
                ) : (
                  <article
                    className={
                      styles.readCard
                    }
                  >
                    <div
                      className={
                        styles.readImage
                      }
                    >
                      <img
                        src="/images/brand/dog.png"
                        alt="PetCard"
                      />

                      <span>
                        PETCARD
                      </span>
                    </div>

                    <div
                      className={
                        styles.readContent
                      }
                    >
                      <h3>
                        No fresh reads
                        yet
                      </h3>

                      <p>
                        New articles will
                        appear here once
                        they are added from
                        the admin panel.
                      </p>

                      <div
                        className={
                          styles.readFooter
                        }
                      >
                        <span>
                          <Clock3
                            size={13}
                          />
                          PetCard Journal
                        </span>

                        <span>
                          <Heart
                            size={13}
                          />
                          🐾
                        </span>
                      </div>
                    </div>
                  </article>
                )}
              </>
            )}
          </div>
        </div>
      </section>


       {/* =====================================================
    FINAL DOWNLOAD
    ===================================================== */}

      <section
        className={`${styles.finalDownload} ${styles.homeReveal}`}
        id="download-app"
        data-home-reveal="download"
      >
        <div className={`${styles.container} container ${styles.finalDownloadCard}`}>

          {/* ================= PETS ================= */}

          <div className={styles.finalPets}>
            <Image
              src="/images/BlogsFooter.png"
              alt="PETCARD pets"
              fill
              priority

              className={styles.finalPetsImage}
            />
          </div>


          {/* ================= COPY ================= */}

          <div className={styles.finalCopy}>

            <h2>
              Pawsome updates straight
                to your inbox!
            </h2>

            <p>
              Subscribe to get the
                best pet care tips,
                stories, and exclusive
                updates.
            </p>

          </div>


          {/* ================= STORE BADGES ================= */}

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

              <button type="submit" className="btn btn-primary">
                Subscribe
                <img
                  src="/images/paw-white.png"
                  width={25}
                  height={25}
                  alt=""
                />
              </button>
            </form>
        </div>
      </section>
    </main>
  );
}