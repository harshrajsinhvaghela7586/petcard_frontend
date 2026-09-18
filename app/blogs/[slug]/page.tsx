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
    intro?: string;
    content?: string;
    sections?: {
        heading: string;
        paragraphs: string[];
    }[];
    takeaways?: string[];
    note?: string;
    views?: number;
    isActive?: boolean;
    isFeatured?: boolean;
    isPopular?: boolean;
};

const API_URL =
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:5000/api";

const BACKEND_URL = API_URL.replace(/\/api\/?$/, "");

const formatBlogDate = (date: string) => {
  if (!date) return "";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return date;
  }

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(parsedDate);
};

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
                                   <span>{formatBlogDate(blog.date)}</span>
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
                            {blog.content ? (
                                <div
                                    className={styles.articleContent}
                                    dangerouslySetInnerHTML={{
                                        __html: blog.content,
                                    }}
                                />
                            ) : (
                                <>
                                    {blog.intro && (
                                        <p className={styles.articleIntro}>
                                            {blog.intro}
                                        </p>
                                    )}

                                    <div className={styles.articleDivider} />

                                    {blog.sections?.map((section, index) => (
                                        <section
                                            className={styles.articleBlock}
                                            key={`${section.heading}-${index}`}
                                        >
                                            <div className={styles.blockNumber}>
                                                {String(index + 1).padStart(2, "0")}
                                            </div>

                                            <div>
                                                <h2>{section.heading}</h2>

                                                {section.paragraphs.map(
                                                    (paragraph, paragraphIndex) => (
                                                        <p
                                                            key={`${section.heading}-${paragraphIndex}`}
                                                        >
                                                            {paragraph}
                                                        </p>
                                                    )
                                                )}
                                            </div>
                                        </section>
                                    ))}
                                </>
                            )}

                           

                            <div
                                className={styles.articleEnd}
                                id="article-end"
                            >
                                <div className={styles.endIcon}>
                                   <img src="/images/paw.png" width={25} height={30}/>
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
                          

                            <h2>
                                More stories for{" "}
                                <strong>pet parents.</strong>
                            </h2>
                        </div>

                        <Link href="/blogs">
                            View All Articles
                           
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

                                        
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
           
        </main>
    );
}