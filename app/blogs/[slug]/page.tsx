import Link from "next/link";
import { notFound } from "next/navigation";
import {
    ArrowLeft,
    ArrowRight,
    CalendarDays,
    Clock3,
    Heart,
    Mail,
    PawPrint,
    Share2,
    UserRound,
} from "lucide-react";

import styles from "./BlogDetail.module.css";

type Blog = {
    _id?: string;
    slug: string;
    category: string;
    title: string;
    excerpt: string;
    author: string;
    readTime: string;
    date: string;
    image?: string;
    intro: string;
    sections: {
        heading: string;
        paragraphs: string[];
    }[];
    takeaways: string[];
    note?: string;
    isActive?: boolean;
    isFeatured?: boolean;
    isPopular?: boolean;
};

const API_URL =
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:5000/api";

const BACKEND_URL = API_URL.replace(/\/api\/?$/, "");

const getImageUrl = (image?: string) => {
    if (!image) return "";

    if (
        image.startsWith("http://") ||
        image.startsWith("https://")
    ) {
        return image;
    }

    return `${BACKEND_URL}${image.startsWith("/") ? "" : "/"}${image}`;
};

const getBlogDate = (date: string) => {
    const timestamp = new Date(date).getTime();
    return Number.isNaN(timestamp) ? 0 : timestamp;
};

const getBlogs = async (): Promise<Blog[]> => {
    try {
        const response = await fetch(`${API_URL}/blogs`, {
            cache: "no-store",
        });

        if (!response.ok) {
            return [];
        }

        const data = await response.json();

        const blogs = Array.isArray(data)
            ? data
            : data?.blogs || [];

        return blogs.filter(
            (blog: Blog) => blog && blog.isActive !== false
        );
    } catch (error) {
        console.error("Blog Detail API Error:", error);
        return [];
    }
};

export default async function BlogDetail({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    const blogs = await getBlogs();
    const blog = blogs.find((item) => item.slug === slug);

    if (!blog) {
        notFound();
    }

    const relatedBlogs = blogs
        .filter((item) => item.slug !== blog.slug)
        .sort((a, b) => getBlogDate(b.date) - getBlogDate(a.date))
        .slice(0, 3);

    const imageUrl = getImageUrl(blog.image);

    return (
        <main className={styles.page}>
            {/* =====================================================
          HERO
          ===================================================== */}

            <section className={styles.hero}>
                <div className={styles.heroGlow} />

                <div className={styles.container}>
                    <Link
                        href="/blogs"
                        className={styles.backLink}
                    >
                        <ArrowLeft size={15} />
                        Back to Blogs
                    </Link>

                    <div className={styles.heroGrid}>
                        <div className={styles.heroContent}>
                            <div className={styles.category}>
                                <PawPrint
                                    size={13}
                                    fill="currentColor"
                                />
                                {blog.category}
                            </div>

                            <h1>{blog.title}</h1>

                            <p className={styles.excerpt}>
                                {blog.excerpt}
                            </p>

                            <div className={styles.meta}>
                                <div>
                                    <UserRound size={15} />
                                    <span>{blog.author}</span>
                                </div>

                                <div>
                                    <Clock3 size={15} />
                                    <span>{blog.readTime}</span>
                                </div>

                                <div>
                                    <CalendarDays size={15} />
                                    <span>{blog.date}</span>
                                </div>
                            </div>
                        </div>

                        <div className={styles.heroImageWrap}>
                            <div className={styles.imageGlow} />

                            <div className={styles.heroImage}>
                                <img
                                    src={imageUrl}
                                    alt={blog.title}
                                />
                            </div>

                            <div className={styles.imagePaw}>
                                <PawPrint
                                    size={25}
                                    fill="currentColor"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* =====================================================
          ARTICLE
          ===================================================== */}

            <section className={styles.articleSection}>
                <div className={styles.container}>
                    <div className={styles.articleLayout}>
                        <aside className={styles.articleSide}>
                            <div className={styles.sideCard}>
                                <span>PetCard Journal</span>

                                <strong>
                                    Read, learn & care better.
                                </strong>

                                <div className={styles.sideDivider} />

                                <a href="#article-end">
                                    Jump to Related Reads
                                    <ArrowRight size={14} />
                                </a>
                            </div>

                            <div className={styles.shareCard}>
                                <span>Share</span>

                                <a
                                    href={`mailto:?subject=${encodeURIComponent(
                                        blog.title
                                    )}&body=${encodeURIComponent(
                                        `${blog.excerpt}\n\nRead more: ${blog.slug}`
                                    )}`}
                                    className={styles.shareButton}
                                    aria-label="Share article by email"
                                >
                                    <Share2 size={17} />
                                </a>

                                <button
                                    type="button"
                                    aria-label="Save article"
                                    className={styles.saveButton}
                                >
                                    <Heart size={17} />
                                </button>
                            </div>
                        </aside>

                        <article className={styles.article}>
                            <p className={styles.articleIntro}>
                                {blog.intro}
                            </p>

                            <div className={styles.articleDivider} />

                            {blog.sections.map(
                                (section, index) => (
                                    <section
                                        className={styles.articleBlock}
                                        key={section.heading}
                                    >
                                        <div className={styles.blockNumber}>
                                            {String(index + 1).padStart(
                                                2,
                                                "0"
                                            )}
                                        </div>

                                        <div>
                                            <h2>
                                                {section.heading}
                                            </h2>

                                            {section.paragraphs.map(
                                                (paragraph) => (
                                                    <p key={paragraph}>
                                                        {paragraph}
                                                    </p>
                                                )
                                            )}
                                        </div>
                                    </section>
                                )
                            )}

                            <div
                                className={styles.takeawayCard}
                            >
                                <div className={styles.takeawayIcon}>
                                    <PawPrint
                                        size={22}
                                        fill="currentColor"
                                    />
                                </div>

                                <div>
                                    <span>
                                        Quick Takeaway
                                    </span>

                                    <h2>
                                        What to remember
                                    </h2>

                                    <div
                                        className={
                                            styles.takeawayList
                                        }
                                    >
                                        {blog.takeaways.map(
                                            (item) => (
                                                <div
                                                    key={item}
                                                >
                                                    <span>✓</span>
                                                    <p>{item}</p>
                                                </div>
                                            )
                                        )}
                                    </div>
                                </div>
                            </div>

                            {blog.note && (
                                <div className={styles.noteCard}>
                                    <strong>
                                        Important Note
                                    </strong>

                                    <p>
                                        {blog.note}
                                    </p>
                                </div>
                            )}

                            <div
                                className={styles.articleEnd}
                                id="article-end"
                            >
                                <div className={styles.endIcon}>
                                    <PawPrint
                                        size={22}
                                        fill="currentColor"
                                    />
                                </div>

                                <h2>
                                    Better care starts with
                                    small everyday choices.
                                </h2>

                                <p>
                                    Keep learning, keep noticing the
                                    little things and make your pet's
                                    everyday routine a little more
                                    thoughtful.
                                </p>
                            </div>
                        </article>
                    </div>
                </div>
            </section>

            {/* =====================================================
          RELATED POSTS
          ===================================================== */}

            <section className={styles.relatedSection}>
                <div className={styles.container}>
                    <div className={styles.relatedHeader}>
                        <div>
                            <span>Keep Reading</span>

                            <h2>
                                More stories for{" "}
                                <strong>pet parents.</strong>
                            </h2>
                        </div>

                        <Link href="/blogs">
                            View All Articles
                            <ArrowRight size={16} />
                        </Link>
                    </div>

                    <div className={styles.relatedGrid}>
                        {relatedBlogs.map((item) => (
                            <Link
                                href={`/blogs/${item.slug}`}
                                className={styles.relatedCard}
                                key={item.slug}
                            >
                                <div className={styles.relatedImage}>
                                    <img
                                        src={getImageUrl(item.image)}
                                        alt={item.title}
                                    />

                                    <span>
                                        {item.category}
                                    </span>
                                </div>

                                <div className={styles.relatedBody}>
                                    <h3>{item.title}</h3>

                                    <p>
                                        {item.excerpt}
                                    </p>

                                    <div
                                        className={
                                            styles.relatedMeta
                                        }
                                    >
                                        <span>
                                            <Clock3 size={13} />
                                            {item.readTime}
                                        </span>

                                        <ArrowRight size={16} />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* =====================================================
          NEWSLETTER
          ===================================================== */}

            <section className={styles.newsletterSection}>
                <div className={styles.container}>
                    <div className={styles.newsletter}>
                        <div className={styles.newsletterPaw}>
                            <PawPrint
                                size={70}
                                fill="currentColor"
                            />
                        </div>

                        <div className={styles.newsletterContent}>
                            <span>
                                <Mail size={13} />
                                PetCard Journal
                            </span>

                            <h2>
                                Pawsome updates,
                                straight to your inbox.
                            </h2>

                            <p>
                                Get practical pet-care tips,
                                thoughtful stories and helpful
                                ideas delivered without the noise.
                            </p>
                        </div>

                        <div className={styles.newsletterForm}>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                aria-label="Email address"
                            />

                            <button type="button">
                                Subscribe
                                <ArrowRight size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}