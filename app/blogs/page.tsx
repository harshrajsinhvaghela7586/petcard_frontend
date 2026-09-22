"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

import {
  Clock3,
  Heart,
  PenIcon,
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

const JoditEditor = dynamic(
  () => import("jodit-react"),
  { ssr: false }
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
  content?: string;

  author: string;
  email?: string;
  readTime: string;
  date: string;

  status?: "pending" | "approved" | "rejected";
  source?: "admin" | "user";

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
     SHARE YOUR PET WISDOM
     Public user submission → pending approval
     ===================================================== */
  const [isWisdomModalOpen, setIsWisdomModalOpen] =
    useState(false);

  const [wisdomStep, setWisdomStep] =
    useState<"email" | "blog" | "success">("email");

  const [wisdomEmail, setWisdomEmail] =
    useState("");

  const [wisdomImagePreview, setWisdomImagePreview] =
    useState("");

  const [wisdomSubmitting, setWisdomSubmitting] =
    useState(false);

  const [wisdomError, setWisdomError] =
    useState("");

  const [wisdomContent, setWisdomContent] =
    useState("");

  const [wisdomForm, setWisdomForm] = useState({
    authorName: "",
    title: "",
    excerpt: "",
    category: "",
    readTime: "5 min read",
    image: null as File | null,
  });

  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  const wisdomEditorConfig = useMemo(
    () => ({
      readonly: false,
      height: 500,
      placeholder:
        "Write your complete blog content here...",
      toolbarAdaptive: false,
      buttons: [
        "bold",
        "italic",
        "underline",
        "|",
        "ul",
        "ol",
        "|",
        "font",
        "fontsize",
        "|",
        "paragraph",
        "|",
        "image",
        "table",
        "link",
        "|",
        "align",
        "|",
        "undo",
        "redo",
        "|",
        "hr",
        "fullsize",
        "source",
      ],
      uploader: {
        insertImageAsBase64URI: true,
      },
    }),
    []
  );

  const [newsletterEmail, setNewsletterEmail] =
    useState("");

  const [newsletterSubmitting, setNewsletterSubmitting] =
    useState(false);

  const [newsletterMessage, setNewsletterMessage] =
    useState("");

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
              blog.isActive !== false &&
              blog.status !== "pending" &&
              blog.status !== "rejected"
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

  const resetWisdomForm = () => {
    setWisdomStep("email");
    setWisdomEmail("");
    setWisdomImagePreview("");
    setWisdomError("");
    setWisdomSubmitting(false);
    setWisdomContent("");

    setWisdomForm({
      authorName: "",
      title: "",
      excerpt: "",
      category: "",
      readTime: "5 min read",
      image: null,
    });
  };

  const openWisdomModal = () => {
    resetWisdomForm();
    setIsWisdomModalOpen(true);
  };

  const closeWisdomModal = () => {
    setIsWisdomModalOpen(false);
    resetWisdomForm();
  };

  useEffect(() => {
    if (!isWisdomModalOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeWisdomModal();
      }
    };

    document.body.style.overflow = "hidden";
    document.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, [isWisdomModalOpen]);

  const handleWisdomFieldChange = (
    event: ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement |
      HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;

    setWisdomForm((current) => ({
      ...current,
      [name]: value,
    }));

    setWisdomError("");
  };

  const handleWisdomImageChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const file =
      event.target.files?.[0] || null;

    setWisdomError("");

    if (!file) {
      setWisdomForm((current) => ({
        ...current,
        image: null,
      }));
      setWisdomImagePreview("");
      return;
    }

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      setWisdomError(
        "Only JPG, PNG and WEBP images are allowed."
      );
      event.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setWisdomError(
        "Image size must be less than 5MB."
      );
      event.target.value = "";
      return;
    }

    setWisdomForm((current) => ({
      ...current,
      image: file,
    }));

    setWisdomImagePreview(
      URL.createObjectURL(file)
    );
  };

  const handleWisdomEmailContinue = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setWisdomError("");

    const email =
      wisdomEmail.trim().toLowerCase();

    if (!email) {
      setWisdomError(
        "Please enter your email address."
      );
      return;
    }

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setWisdomError(
        "Please enter a valid email address."
      );
      return;
    }

    setWisdomEmail(email);
    setWisdomStep("blog");
  };

  const handleWisdomSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (wisdomSubmitting) {
      return;
    }

    setWisdomError("");

    if (!wisdomForm.authorName.trim()) {
      setWisdomError("Please enter your name.");
      return;
    }

    if (!wisdomForm.title.trim()) {
      setWisdomError(
        "Please enter a blog title."
      );
      return;
    }

    if (!wisdomForm.category) {
      setWisdomError(
        "Please select a category."
      );
      return;
    }

    if (!wisdomForm.excerpt.trim()) {
      setWisdomError(
        "Please enter a blog excerpt."
      );
      return;
    }

    if (!wisdomContent.trim()) {
      setWisdomError(
        "Please write your blog content."
      );
      return;
    }

    if (!wisdomForm.image) {
      setWisdomError(
        "Please upload a blog image."
      );
      return;
    }

    try {
      setWisdomSubmitting(true);

      const formData = new FormData();

      formData.append(
        "title",
        wisdomForm.title.trim()
      );

      formData.append(
        "category",
        wisdomForm.category
      );

      formData.append(
        "excerpt",
        wisdomForm.excerpt.trim()
      );

      /*
       * Jodit returns HTML.
       * The backend stores this directly in content.
       */
      formData.append(
        "content",
        wisdomContent
      );

      formData.append(
        "author",
        wisdomForm.authorName.trim()
      );

      formData.append(
        "email",
        wisdomEmail.trim().toLowerCase()
      );

      formData.append(
        "readTime",
        wisdomForm.readTime.trim() ||
        "5 min read"
      );

      formData.append(
        "image",
        wisdomForm.image
      );

      const response = await fetch(
        `${API_URL}/blogs/submit`,
        {
          method: "POST",
          body: formData,
        }
      );

      let data: {
        success?: boolean;
        message?: string;
      } = {};

      try {
        data = await response.json();
      } catch {
        data = {};
      }

      if (!response.ok) {
        throw new Error(
          data.message ||
          "Unable to submit your blog."
        );
      }

      setWisdomStep("success");
    } catch (error) {
      console.error(
        "Blog submission failed:",
        error
      );

      setWisdomError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setWisdomSubmitting(false);
    }
  };

  const handleNewsletterSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (newsletterSubmitting) {
      return;
    }

    setNewsletterMessage("");

    const email =
      newsletterEmail.trim().toLowerCase();

    if (!email) {
      setNewsletterMessage(
        "Please enter your email address."
      );
      return;
    }

    try {
      setNewsletterSubmitting(true);

      const response = await fetch(
        `${API_URL}/newsletter/subscribe`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      let data: {
        success?: boolean;
        message?: string;
      } = {};

      try {
        data = await response.json();
      } catch {
        data = {};
      }

      if (!response.ok) {
        throw new Error(
          data.message ||
          "Unable to subscribe right now."
        );
      }
      setNewsletterEmail("");
      setNewsletterMessage("");
      setNewsletterSuccess(true);

      setTimeout(() => {
        setNewsletterSuccess(false);
      }, 3000);

    } catch (error) {
      console.error(
        "Newsletter subscription failed:",
        error
      );

      setNewsletterMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setNewsletterSubmitting(false);
    }
  };

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
                    className={`${styles.categoryButton} `}
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
                <Link
                  href={`/blogs/${featuredBlog.slug}`}

                  aria-label="Read featured article"
                >
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


                      </div>
                    </div>
                  </article> </Link>
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
                styles.shareStory
              }
            >
              <div
                className={
                  styles.shareStoryPet
                }
              >
                <img
                  src="/images/AboutFooter.png"
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
                  Explore More Stories

                </Link>

                <button
                  type="button"
                  className={`${styles.shareWisdomBtn} btn btn-outline`}
                  onClick={openWisdomModal}
                >
                  Share Your Pet Wisdom <PenIcon />
                </button>
              </div>
            </div>



            <div className={styles.polaroids}>
              {/* rabbit */}
              <div className={styles.polaroid}>
                <img
                  src="https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=700&q=85"
                  alt="Browny"
                />
                <span>
                  Browny ♡
                </span>
              </div>

              {/* Cat */}
              <div className={styles.polaroid}>
                <img
                  src="https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&w=700&q=85"
                  alt="Oreo"
                />

                <span>
                  Oreo ♡
                </span>
              </div>

              {/* dog */}
              <div className={styles.polaroid}>
                <img
                  src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=700&q=85"
                  alt="Huchiko"
                />

                <span>
                  Huchiko ♡
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>


      {isWisdomModalOpen && (
        <div
          className={styles.wisdomModalOverlay}
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeWisdomModal();
            }
          }}
        >
          <div
            className={styles.wisdomModal}
            role="dialog"
            aria-modal="true"
            aria-labelledby="wisdom-modal-title"
          >
            <button
              type="button"
              className={styles.wisdomModalClose}
              onClick={closeWisdomModal}
              aria-label="Close"
            >
              ×
            </button>

            {wisdomStep === "email" && (
              <div className={styles.wisdomEmailStep}>

                <h2 id="wisdom-modal-title">
                  Let&apos;s start with your email
                </h2>
                <p>
                  Enter your email first, then you can share your story with the PetCard community.
                </p>

                <form onSubmit={handleWisdomEmailContinue}>
                  <label htmlFor="wisdom-email">Email address</label>
                  <input
                    id="wisdom-email"
                    type="email"
                    value={wisdomEmail}
                    onChange={(event) => setWisdomEmail(event.target.value)}
                    placeholder="Enter your email"
                    autoComplete="email"
                    required
                  />
                  <button type="submit" className={`${styles.wisdomPrimaryBtn} btn btn-primary`}>
                    Continue
                  </button>
                </form>
              </div>
            )}

            {wisdomStep === "blog" && (
              <div className={styles.wisdomBlogStep}>
                <div className={styles.wisdomModalHeader}>

                  <h2 id="wisdom-modal-title">Write your story</h2>
                  <p>
                    Share something useful, personal, or heartwarming. Our team will review it before publishing.
                  </p>
                </div>

                <form onSubmit={handleWisdomSubmit}>
                  {wisdomError && (
                    <div
                      className={styles.wisdomError}
                      role="alert"
                    >
                      {wisdomError}
                    </div>
                  )}

                  <div
                    className={styles.wisdomFormGrid}
                  >
                    <div className={styles.wisdomField}>
                      <label htmlFor="wisdom-authorName">
                        Author name
                      </label>
                      <input
                        id="wisdom-authorName"
                        name="authorName"
                        type="text"
                        value={wisdomForm.authorName}
                        onChange={handleWisdomFieldChange}
                        placeholder="Your name"
                        autoComplete="name"
                        required
                      />
                    </div>

                    <div className={styles.wisdomField}>
                      <label htmlFor="wisdom-category">
                        Category
                      </label>
                      <select
                        id="wisdom-category"
                        name="category"
                        value={wisdomForm.category}
                        onChange={handleWisdomFieldChange}
                        required
                      >
                        <option value="">
                          Select category
                        </option>
                        <option value="Care Tips">
                          Care Tips
                        </option>
                        <option value="Health">
                          Health
                        </option>
                        <option value="Training">
                          Training
                        </option>
                        <option value="Nutrition">
                          Nutrition
                        </option>
                        <option value="Stories">
                          Stories
                        </option>
                        <option value="Lifestyle">
                          Lifestyle
                        </option>
                      </select>
                    </div>

                    <div className={styles.wisdomField}>
                      <label htmlFor="wisdom-title">
                        Blog title
                      </label>
                      <input
                        id="wisdom-title"
                        name="title"
                        type="text"
                        value={wisdomForm.title}
                        onChange={handleWisdomFieldChange}
                        placeholder="Give your story a title"
                        required
                      />
                    </div>

                    <div className={styles.wisdomField}>
                      <label htmlFor="wisdom-readTime">
                        Read time
                      </label>
                      <input
                        id="wisdom-readTime"
                        name="readTime"
                        type="text"
                        value={wisdomForm.readTime}
                        onChange={handleWisdomFieldChange}
                        placeholder="e.g. 5 min read"
                        required
                      />
                    </div>

                    <div
                      className={`${styles.wisdomField} ${styles.wisdomFieldFull}`}
                    >
                      <label htmlFor="wisdom-excerpt">
                        Excerpt
                      </label>
                      <textarea
                        id="wisdom-excerpt"
                        name="excerpt"
                        value={wisdomForm.excerpt}
                        onChange={handleWisdomFieldChange}
                        placeholder="A short description of your blog"
                        rows={3}
                        required
                      />
                    </div>

                    <div
                      className={`${styles.wisdomField} ${styles.wisdomFieldFull}`}
                    >
                      <label htmlFor="wisdom-image">
                        Blog image
                      </label>

                      <input
                        id="wisdom-image"
                        type="file"
                        accept="image/png,image/jpeg,image/webp"
                        onChange={handleWisdomImageChange}
                        required
                      />

                      <small>
                        JPG, PNG or WEBP • Maximum 5MB
                      </small>

                      {wisdomImagePreview && (
                        <div
                          className={
                            styles.wisdomImagePreview
                          }
                        >
                          <img
                            src={wisdomImagePreview}
                            alt="Blog preview"
                          />
                        </div>
                      )}
                    </div>

                    <div
                      className={`${styles.wisdomField} ${styles.wisdomFieldFull}`}
                    >
                      <label htmlFor="wisdom-content">
                        Blog content
                      </label>

                      <div
                        className={styles.wisdomEditor}
                      >
                        <JoditEditor
                          value={wisdomContent}
                          config={wisdomEditorConfig}
                          onBlur={(newContent) => {
                            setWisdomContent(newContent);
                          }}
                          onChange={(newContent) => {
                            setWisdomContent(newContent);
                            setWisdomError("");
                          }}
                        />
                      </div>

                      <small>
                        Write your complete article using
                        the rich text editor.
                      </small>
                    </div>
                  </div>

                  <div
                    className={styles.wisdomSubmitRow}
                  >
                    <button
                      type="button"
                      className={styles.wisdomBackBtn}
                      onClick={() =>
                        setWisdomStep("email")
                      }
                      disabled={wisdomSubmitting}
                    >
                      Back
                    </button>

                    <button
                      type="submit"
                      className={`${styles.wisdomPrimaryBtn} btn btn-primary`}
                      disabled={wisdomSubmitting}
                    >
                      {wisdomSubmitting
                        ? "Submitting..."
                        : "Submit for review"}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {wisdomStep === "success" && (
              <div className={styles.wisdomSuccessStep}>
                <div className={styles.wisdomSuccessIcon}>✓</div>
                <span className={styles.wisdomModalEyebrow}>
                  SUBMITTED FOR REVIEW
                </span>
                <h2>Thanks for sharing!</h2>
                <p>
                  Your blog has been submitted for review.
                </p>
                <button
                  type="button"
                  className={`${styles.wisdomPrimaryBtn} btn btn-primary`}
                  onClick={closeWisdomModal}
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}

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

                     
                    </div>

                    <div
                      className={
                        styles.readContent
                      }
                    >
                       <span className={styles.span1}>
                        {getCategoryLabel(
                          post.category
                        )}
                      </span>

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
              Keep the Paw-sitive Vibes Coming!
            </h2>

            <p>
              Get pet-care tips, fresh ideas, heartwarming reads, and the latest from PETCARD, straight to your inbox.
            </p>

          </div>


          {/* ================= STORE BADGES ================= */}

          <form
            className={styles.newsletterForm}
            onSubmit={handleNewsletterSubmit}
          >
            {newsletterSuccess ? (
              <div className={styles.newsletterSuccess}>
                <span className={styles.successCheck}>✓</span>

                <div>
                  <strong>Successfully subscribed!</strong>
                  <span>Thanks for joining PetCard updates.</span>
                </div>
              </div>
            ) : (
              <>
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email"
                  aria-label="Email address"
                  disabled={newsletterSubmitting}
                />

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={newsletterSubmitting}
                >
                  {newsletterSubmitting ? "Subscribing..." : "Subscribe"}
                </button>

                
              </>
            )}
          </form>

        </div>
      </section>
    </main>
  );
}