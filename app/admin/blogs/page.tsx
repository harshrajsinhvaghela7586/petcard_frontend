"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  BookOpen,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock3,
  FileText,
  Flame,
  ImagePlus,
  Loader2,
  Pencil,
  Plus,
  Search,
  Star,
  Trash2,
  X,
} from "lucide-react";

import styles from "./BlogsAdmin.module.css";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000/api";

const BACKEND_URL = API_URL.replace(/\/api\/?$/, "");

const CATEGORIES = [
  "Care Tips",
  "Health",
  "Training",
  "Nutrition",
  "Stories",
  "Lifestyle",
];

type BlogSection = {
  heading: string;
  paragraphs: string[];
};

type Blog = {
  _id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  author: string;
  readTime: string;
  date: string;
  image?: string;
  intro: string;
  sections: BlogSection[];
  takeaways: string[];
  note?: string;
  isFeatured: boolean;
  isPopular: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt?: string;
};

type Stats = {
  total: number;
  active: number;
  inactive: number;
  featured: number;
  popular: number;
};

type Pagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

type BlogForm = {
  title: string;
  category: string;
  excerpt: string;
  author: string;
  readTime: string;
  date: string;
  intro: string;
  sections: BlogSection[];
  takeaways: string[];
  note: string;
  isFeatured: boolean;
  isPopular: boolean;
  isActive: boolean;
};

const getInitialForm = (): BlogForm => ({
  title: "",
  category: "Care Tips",
  excerpt: "",
  author: "PetCard Care Team",
  readTime: "5 min read",
  date: new Date().toISOString().split("T")[0],
  intro: "",
  sections: [
    {
      heading: "",
      paragraphs: [""],
    },
  ],
  takeaways: [""],
  note: "",
  isFeatured: false,
  isPopular: false,
  isActive: true,
});

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

const formatDate = (date?: string) => {
  if (!date) {
    return "—";
  }

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
};

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  const [stats, setStats] = useState<Stats>({
    total: 0,
    active: 0,
    inactive: 0,
    featured: 0,
    popular: 0,
  });

  const [pagination, setPagination] =
    useState<Pagination>({
      page: 1,
      limit: 10,
      total: 0,
      totalPages: 1,
    });

  const [page, setPage] = useState(1);

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] =
    useState("");

  const [typeFilter, setTypeFilter] =
    useState("all");

  const [categoryFilter, setCategoryFilter] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("all");

  const [loading, setLoading] = useState(true);
  const [searchWaiting, setSearchWaiting] =
    useState(false);

  const [error, setError] = useState("");

  const [modalOpen, setModalOpen] =
    useState(false);

  const [editingBlog, setEditingBlog] =
    useState<Blog | null>(null);

  const [form, setForm] =
    useState<BlogForm>(getInitialForm());

  const [image, setImage] =
    useState<File | null>(null);

  const [imagePreview, setImagePreview] =
    useState("");

  const [saving, setSaving] = useState(false);
  const [formError, setFormError] =
    useState("");

  const [deleteBlog, setDeleteBlog] =
    useState<Blog | null>(null);

  const [deleting, setDeleting] =
    useState(false);

  const [statusLoadingId, setStatusLoadingId] =
    useState("");

  const firstSearchRender = useRef(true);

  /* =====================================================
     SEARCH DEBOUNCE - 3 SECONDS
  ===================================================== */

  useEffect(() => {
    if (firstSearchRender.current) {
      firstSearchRender.current = false;
      return;
    }

    setSearchWaiting(true);

    const timer = window.setTimeout(() => {
      setDebouncedSearch(search.trim());
      setPage(1);
      setSearchWaiting(false);
    }, 3000);

    return () => {
      window.clearTimeout(timer);
    };
  }, [search]);

  /* =====================================================
     FETCH BLOGS
  ===================================================== */

  const fetchBlogs = useCallback(
    async (signal?: AbortSignal) => {
      try {
        setLoading(true);
        setError("");

        const params = new URLSearchParams({
          page: String(page),
          limit: "10",
          type: typeFilter,
          status: statusFilter,
        });

        if (debouncedSearch) {
          params.set(
            "search",
            debouncedSearch
          );
        }

        if (categoryFilter) {
          params.set(
            "category",
            categoryFilter
          );
        }

        const response = await fetch(
          `${API_URL}/blogs/admin?${params.toString()}`,
          {
            method: "GET",
            credentials: "include",
            signal,
          }
        );

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(
            data.message ||
              "Failed to load blogs."
          );
        }

        setBlogs(data.blogs || []);

        setStats(
          data.stats || {
            total: 0,
            active: 0,
            inactive: 0,
            featured: 0,
            popular: 0,
          }
        );

        setPagination(
          data.pagination || {
            page,
            limit: 10,
            total: 0,
            totalPages: 1,
          }
        );
      } catch (err) {
        if (
          err instanceof DOMException &&
          err.name === "AbortError"
        ) {
          return;
        }

        setError(
          err instanceof Error
            ? err.message
            : "Failed to load blogs."
        );
      } finally {
        if (!signal?.aborted) {
          setLoading(false);
        }
      }
    },
    [
      page,
      typeFilter,
      categoryFilter,
      statusFilter,
      debouncedSearch,
    ]
  );

  useEffect(() => {
    const controller =
      new AbortController();

    fetchBlogs(controller.signal);

    return () => {
      controller.abort();
    };
  }, [fetchBlogs]);

  /* =====================================================
     MODAL
  ===================================================== */

  const openCreateModal = () => {
    setEditingBlog(null);
    setForm(getInitialForm());
    setImage(null);
    setImagePreview("");
    setFormError("");
    setModalOpen(true);
  };

  const openEditModal = (blog: Blog) => {
    setEditingBlog(blog);

    setForm({
      title: blog.title,
      category: blog.category,
      excerpt: blog.excerpt,
      author: blog.author,
      readTime: blog.readTime,
      date: blog.date
        ? new Date(blog.date)
            .toISOString()
            .split("T")[0]
        : "",
      intro: blog.intro,
      sections:
        blog.sections?.length > 0
          ? blog.sections.map(
              (section) => ({
                heading:
                  section.heading,
                paragraphs: [
                  ...section.paragraphs,
                ],
              })
            )
          : [
              {
                heading: "",
                paragraphs: [""],
              },
            ],
      takeaways:
        blog.takeaways?.length > 0
          ? [...blog.takeaways]
          : [""],
      note: blog.note || "",
      isFeatured: blog.isFeatured,
      isPopular: blog.isPopular,
      isActive: blog.isActive,
    });

    setImage(null);
    setImagePreview(
      getImageUrl(blog.image)
    );
    setFormError("");
    setModalOpen(true);
  };

  const closeModal = () => {
    if (saving) {
      return;
    }

    setModalOpen(false);
    setEditingBlog(null);
    setImage(null);
    setImagePreview("");
    setFormError("");
  };

  /* =====================================================
     IMAGE
  ===================================================== */

  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file =
      event.target.files?.[0];

    if (!file) {
      return;
    }

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      setFormError(
        "Only JPG, PNG and WEBP images are allowed."
      );
      event.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setFormError(
        "Image must be smaller than 5MB."
      );
      event.target.value = "";
      return;
    }

    setFormError("");
    setImage(file);

    const preview =
      URL.createObjectURL(file);

    setImagePreview(preview);
  };

  /* =====================================================
     FEATURED / POPULAR
  ===================================================== */

  const featuredUnavailable =
    !form.isFeatured &&
    stats.featured >= 1;

  const popularUnavailable =
    !form.isPopular &&
    stats.popular >= 4;

  const handleFeaturedChange = () => {
    if (
      featuredUnavailable ||
      form.isPopular
    ) {
      return;
    }

    setForm((current) => ({
      ...current,
      isFeatured:
        !current.isFeatured,
      isPopular: false,
    }));
  };

  const handlePopularChange = () => {
    if (
      popularUnavailable ||
      form.isFeatured
    ) {
      return;
    }

    setForm((current) => ({
      ...current,
      isPopular:
        !current.isPopular,
      isFeatured: false,
    }));
  };

  /* =====================================================
     SECTIONS
  ===================================================== */

  const addSection = () => {
    setForm((current) => ({
      ...current,
      sections: [
        ...current.sections,
        {
          heading: "",
          paragraphs: [""],
        },
      ],
    }));
  };

  const removeSection = (
    sectionIndex: number
  ) => {
    setForm((current) => ({
      ...current,
      sections:
        current.sections.filter(
          (_, index) =>
            index !== sectionIndex
        ),
    }));
  };

  const updateSectionHeading = (
    sectionIndex: number,
    value: string
  ) => {
    setForm((current) => ({
      ...current,
      sections:
        current.sections.map(
          (section, index) =>
            index === sectionIndex
              ? {
                  ...section,
                  heading: value,
                }
              : section
        ),
    }));
  };

  const addParagraph = (
    sectionIndex: number
  ) => {
    setForm((current) => ({
      ...current,
      sections:
        current.sections.map(
          (section, index) =>
            index === sectionIndex
              ? {
                  ...section,
                  paragraphs: [
                    ...section.paragraphs,
                    "",
                  ],
                }
              : section
        ),
    }));
  };

  const updateParagraph = (
    sectionIndex: number,
    paragraphIndex: number,
    value: string
  ) => {
    setForm((current) => ({
      ...current,
      sections:
        current.sections.map(
          (section, index) => {
            if (
              index !== sectionIndex
            ) {
              return section;
            }

            return {
              ...section,
              paragraphs:
                section.paragraphs.map(
                  (
                    paragraph,
                    index
                  ) =>
                    index ===
                    paragraphIndex
                      ? value
                      : paragraph
                ),
            };
          }
        ),
    }));
  };

  const removeParagraph = (
    sectionIndex: number,
    paragraphIndex: number
  ) => {
    setForm((current) => ({
      ...current,
      sections:
        current.sections.map(
          (section, index) => {
            if (
              index !== sectionIndex
            ) {
              return section;
            }

            return {
              ...section,
              paragraphs:
                section.paragraphs.filter(
                  (_, index) =>
                    index !==
                    paragraphIndex
                ),
            };
          }
        ),
    }));
  };

  /* =====================================================
     TAKEAWAYS
  ===================================================== */

  const addTakeaway = () => {
    setForm((current) => ({
      ...current,
      takeaways: [
        ...current.takeaways,
        "",
      ],
    }));
  };

  const updateTakeaway = (
    index: number,
    value: string
  ) => {
    setForm((current) => ({
      ...current,
      takeaways:
        current.takeaways.map(
          (item, itemIndex) =>
            itemIndex === index
              ? value
              : item
        ),
    }));
  };

  const removeTakeaway = (
    index: number
  ) => {
    setForm((current) => ({
      ...current,
      takeaways:
        current.takeaways.filter(
          (_, itemIndex) =>
            itemIndex !== index
        ),
    }));
  };

  /* =====================================================
     SAVE
  ===================================================== */

  const handleSubmit = async (
    event: React.FormEvent
  ) => {
    event.preventDefault();

    setFormError("");

    if (!form.title.trim()) {
      setFormError(
        "Blog title is required."
      );
      return;
    }

    if (!form.excerpt.trim()) {
      setFormError(
        "Excerpt is required."
      );
      return;
    }

    if (!form.intro.trim()) {
      setFormError(
        "Article intro is required."
      );
      return;
    }

    const cleanedSections =
      form.sections
        .map((section) => ({
          heading:
            section.heading.trim(),
          paragraphs:
            section.paragraphs
              .map((item) =>
                item.trim()
              )
              .filter(Boolean),
        }))
        .filter(
          (section) =>
            section.heading &&
            section.paragraphs.length >
              0
        );

    if (
      cleanedSections.length === 0
    ) {
      setFormError(
        "Add at least one complete article section."
      );
      return;
    }

    const cleanedTakeaways =
      form.takeaways
        .map((item) => item.trim())
        .filter(Boolean);

    if (
      cleanedTakeaways.length === 0
    ) {
      setFormError(
        "Add at least one takeaway."
      );
      return;
    }

    if (
      form.isFeatured &&
      form.isPopular
    ) {
      setFormError(
        "A blog cannot be both Featured and Popular."
      );
      return;
    }

    if (
      !editingBlog &&
      !image
    ) {
      setFormError(
        "Blog image is required."
      );
      return;
    }

    try {
      setSaving(true);

      const formData =
        new FormData();

      formData.append(
        "title",
        form.title.trim()
      );

      formData.append(
        "category",
        form.category
      );

      formData.append(
        "excerpt",
        form.excerpt.trim()
      );

      formData.append(
        "author",
        form.author.trim()
      );

      formData.append(
        "readTime",
        form.readTime.trim()
      );

      formData.append(
        "date",
        form.date
      );

      formData.append(
        "intro",
        form.intro.trim()
      );

      formData.append(
        "sections",
        JSON.stringify(
          cleanedSections
        )
      );

      formData.append(
        "takeaways",
        JSON.stringify(
          cleanedTakeaways
        )
      );

      formData.append(
        "note",
        form.note.trim()
      );

      formData.append(
        "isFeatured",
        String(form.isFeatured)
      );

      formData.append(
        "isPopular",
        String(form.isPopular)
      );

      formData.append(
        "isActive",
        String(form.isActive)
      );

      if (image) {
        formData.append(
          "image",
          image
        );
      }

      const url = editingBlog
        ? `${API_URL}/blogs/${editingBlog._id}`
        : `${API_URL}/blogs`;

      const response = await fetch(
        url,
        {
          method: editingBlog
            ? "PUT"
            : "POST",
          credentials: "include",
          body: formData,
        }
      );

      const data =
        await response.json();

      if (
        !response.ok ||
        !data.success
      ) {
        throw new Error(
          data.message ||
            "Failed to save blog."
        );
      }

      closeModal();

      if (!editingBlog) {
        setPage(1);
      }

      await fetchBlogs();
    } catch (err) {
      setFormError(
        err instanceof Error
          ? err.message
          : "Failed to save blog."
      );
    } finally {
      setSaving(false);
    }
  };

  /* =====================================================
     STATUS
  ===================================================== */

  const handleToggleStatus = async (
    blog: Blog
  ) => {
    try {
      setStatusLoadingId(blog._id);

      const response = await fetch(
        `${API_URL}/blogs/${blog._id}/status`,
        {
          method: "PATCH",
          credentials: "include",
        }
      );

      const data =
        await response.json();

      if (
        !response.ok ||
        !data.success
      ) {
        throw new Error(
          data.message ||
            "Failed to update status."
        );
      }

      await fetchBlogs();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to update status."
      );
    } finally {
      setStatusLoadingId("");
    }
  };

  /* =====================================================
     DELETE
  ===================================================== */

  const handleDelete = async () => {
    if (!deleteBlog) {
      return;
    }

    try {
      setDeleting(true);

      const response = await fetch(
        `${API_URL}/blogs/${deleteBlog._id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const data =
        await response.json();

      if (
        !response.ok ||
        !data.success
      ) {
        throw new Error(
          data.message ||
            "Failed to delete blog."
        );
      }

      setDeleteBlog(null);

      if (
        blogs.length === 1 &&
        page > 1
      ) {
        setPage(
          (current) => current - 1
        );
      } else {
        await fetchBlogs();
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to delete blog."
      );
    } finally {
      setDeleting(false);
    }
  };

  /* =====================================================
     PAGINATION
  ===================================================== */

  const getPageNumbers = () => {
    const total =
      pagination.totalPages;

    if (total <= 5) {
      return Array.from(
        { length: total },
        (_, index) => index + 1
      );
    }

    const start = Math.max(
      1,
      Math.min(page - 2, total - 4)
    );

    return Array.from(
      { length: 5 },
      (_, index) => start + index
    );
  };

  return (
    <div className={styles.page}>
      {/* HEADER */}

      <div className={styles.pageHeader}>
        <div
          className={styles.headingGroup}
        >
          <div
            className={styles.headingIcon}
          >
            <FileText size={25} />
          </div>

          <div>
            <span
              className={
                styles.eyebrow
              }
            >
              CONTENT MANAGEMENT
            </span>

            <h1>Blogs</h1>

            <p>
              Create and manage pet-care
              articles displayed on the
              PetCard website.
            </p>
          </div>
        </div>

        <button
          type="button"
          className="btn btn-primary"
          onClick={openCreateModal}
        >
          <Plus size={18} />
          Add Blog
        </button>
      </div>

      {/* STATS */}

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <BookOpen size={22} />
          </div>

          <div>
            <span>Total Blogs</span>
            <strong>{stats.total}</strong>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <Check size={22} />
          </div>

          <div>
            <span>Active Blogs</span>
            <strong>
              {stats.active}
            </strong>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <Star size={22} />
          </div>

          <div>
            <span>Featured</span>
            <strong>
              {stats.featured}/1
            </strong>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <Flame size={22} />
          </div>

          <div>
            <span>Popular</span>
            <strong>
              {stats.popular}/4
            </strong>
          </div>
        </div>
      </div>

      {/* FILTERS */}

      <div
        className={styles.toolbar}
      >
        <div
          className={
            styles.searchWrapper
          }
        >
          {searchWaiting ? (
            <Loader2
              size={18}
              className={
                styles.spinner
              }
            />
          ) : (
            <Search size={18} />
          )}

          <input
            type="text"
            value={search}
            placeholder="Search blogs by title, author..."
            onChange={(event) =>
              setSearch(
                event.target.value
              )
            }
          />

          {search && (
            <button
              type="button"
              className={
                styles.clearSearch
              }
              onClick={() => {
                setSearch("");
                setDebouncedSearch("");
                setPage(1);
              }}
            >
              <X size={16} />
            </button>
          )}
        </div>

        <div
          className={
            styles.filterGroup
          }
        >
          <select
            value={categoryFilter}
            onChange={(event) => {
              setCategoryFilter(
                event.target.value
              );
              setPage(1);
            }}
          >
            <option value="">
              All Categories
            </option>

            {CATEGORIES.map(
              (category) => (
                <option
                  key={category}
                  value={category}
                >
                  {category}
                </option>
              )
            )}
          </select>

          <select
            value={statusFilter}
            onChange={(event) => {
              setStatusFilter(
                event.target.value
              );
              setPage(1);
            }}
          >
            <option value="all">
              All Status
            </option>
            <option value="active">
              Active
            </option>
            <option value="inactive">
              Inactive
            </option>
          </select>
        </div>
      </div>

      <div
        className={styles.typeTabs}
      >
        {[
          ["all", "All"],
          ["featured", "Featured"],
          ["popular", "Popular"],
          ["normal", "Normal"],
        ].map(([value, label]) => (
          <button
            type="button"
            key={value}
            className={
              typeFilter === value
                ? styles.activeTab
                : ""
            }
            onClick={() => {
              setTypeFilter(value);
              setPage(1);
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* TABLE */}

      <section
        className={styles.tableCard}
      >
        <div
          className={
            styles.tableHeader
          }
        >
          <div>
            <h2>All Blogs</h2>

            <p>
              {pagination.total}{" "}
              {pagination.total === 1
                ? "article"
                : "articles"}
            </p>
          </div>

          {(loading ||
            searchWaiting) && (
            <div
              className={
                styles.loadingLabel
              }
            >
              <Loader2
                size={16}
                className={
                  styles.spinner
                }
              />
              Loading...
            </div>
          )}
        </div>

        {error && (
          <div
            className={
              styles.errorBanner
            }
          >
            {error}
          </div>
        )}

        <div
          className={
            styles.tableScroll
          }
        >
          <table>
            <thead>
              <tr>
                <th>Blog</th>
                <th>Category</th>
                <th>Type</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                Array.from({
                  length: 5,
                }).map((_, index) => (
                  <tr key={index}>
                    <td colSpan={6}>
                      <div
                        className={
                          styles.skeleton
                        }
                      />
                    </td>
                  </tr>
                ))
              ) : blogs.length ===
                0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className={
                      styles.emptyCell
                    }
                  >
                    <FileText
                      size={35}
                    />

                    <strong>
                      No blogs found
                    </strong>

                    <span>
                      Try changing your
                      search or filters.
                    </span>
                  </td>
                </tr>
              ) : (
                blogs.map((blog) => (
                  <tr key={blog._id}>
                    <td>
                      <div
                        className={
                          styles.blogInfo
                        }
                      >
                        <div
                          className={
                            styles.thumbnail
                          }
                        >
                          {blog.image ? (
                            <img
                              src={getImageUrl(
                                blog.image
                              )}
                              alt={
                                blog.title
                              }
                            />
                          ) : (
                            <ImagePlus
                              size={21}
                            />
                          )}
                        </div>

                        <div>
                          <strong>
                            {blog.title}
                          </strong>

                          <span>
                            <Clock3
                              size={13}
                            />
                            {
                              blog.readTime
                            }
                          </span>
                        </div>
                      </div>
                    </td>

                    <td>
                      <span
                        className={
                          styles.categoryBadge
                        }
                      >
                        {blog.category}
                      </span>
                    </td>

                    <td>
                      {blog.isFeatured ? (
                        <span
                          className={`${styles.typeBadge} ${styles.featuredBadge}`}
                        >
                          <Star
                            size={13}
                          />
                          Featured
                        </span>
                      ) : blog.isPopular ? (
                        <span
                          className={`${styles.typeBadge} ${styles.popularBadge}`}
                        >
                          <Flame
                            size={13}
                          />
                          Popular
                        </span>
                      ) : (
                        <span
                          className={`${styles.typeBadge} ${styles.normalBadge}`}
                        >
                          Normal
                        </span>
                      )}
                    </td>

                    <td>
                      <button
                        type="button"
                        className={`${styles.statusButton} ${
                          blog.isActive
                            ? styles.activeStatus
                            : styles.inactiveStatus
                        }`}
                        disabled={
                          statusLoadingId ===
                          blog._id
                        }
                        onClick={() =>
                          handleToggleStatus(
                            blog
                          )
                        }
                      >
                        {statusLoadingId ===
                        blog._id ? (
                          <Loader2
                            size={13}
                            className={
                              styles.spinner
                            }
                          />
                        ) : (
                          <span />
                        )}

                        {blog.isActive
                          ? "Active"
                          : "Inactive"}
                      </button>
                    </td>

                    <td
                      className={
                        styles.dateCell
                      }
                    >
                      {formatDate(
                        blog.date
                      )}
                    </td>

                    <td>
                      <div
                        className={
                          styles.actions
                        }
                      >
                        <button
                          type="button"
                          aria-label="Edit blog"
                          onClick={() =>
                            openEditModal(
                              blog
                            )
                          }
                        >
                          <Pencil
                            size={16}
                          />
                        </button>

                        <button
                          type="button"
                          aria-label="Delete blog"
                          className={
                            styles.deleteAction
                          }
                          onClick={() =>
                            setDeleteBlog(
                              blog
                            )
                          }
                        >
                          <Trash2
                            size={16}
                          />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}

        {!loading &&
          pagination.totalPages >
            1 && (
            <div
              className={
                styles.pagination
              }
            >
              <span>
                Showing{" "}
                {(page - 1) * 10 +
                  1}
                –
                {Math.min(
                  page * 10,
                  pagination.total
                )}{" "}
                of{" "}
                {pagination.total}
              </span>

              <div>
                <button
                  type="button"
                  disabled={page <= 1}
                  onClick={() =>
                    setPage(
                      (current) =>
                        current - 1
                    )
                  }
                >
                  <ChevronLeft
                    size={17}
                  />
                </button>

                {getPageNumbers().map(
                  (pageNumber) => (
                    <button
                      type="button"
                      key={pageNumber}
                      className={
                        page ===
                        pageNumber
                          ? styles.activePage
                          : ""
                      }
                      onClick={() =>
                        setPage(
                          pageNumber
                        )
                      }
                    >
                      {pageNumber}
                    </button>
                  )
                )}

                <button
                  type="button"
                  disabled={
                    page >=
                    pagination.totalPages
                  }
                  onClick={() =>
                    setPage(
                      (current) =>
                        current + 1
                    )
                  }
                >
                  <ChevronRight
                    size={17}
                  />
                </button>
              </div>
            </div>
          )}
      </section>

      {/* ADD / EDIT MODAL */}

      {modalOpen && (
        <div
          className={styles.overlay}
          onMouseDown={(event) => {
            if (
              event.target ===
              event.currentTarget
            ) {
              closeModal();
            }
          }}
        >
          <div
            className={
              styles.blogModal
            }
          >
            <div
              className={
                styles.modalHeader
              }
            >
              <div>
                <span>
                  CONTENT MANAGEMENT
                </span>

                <h2>
                  {editingBlog
                    ? "Edit Blog"
                    : "Add New Blog"}
                </h2>

                <p>
                  Create complete article
                  content for the PetCard
                  Journal.
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                disabled={saving}
              >
                <X size={21} />
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
            >
              <div
                className={
                  styles.modalBody
                }
              >
                {formError && (
                  <div
                    className={
                      styles.formError
                    }
                  >
                    {formError}
                  </div>
                )}

                {/* BASIC INFO */}

                <div
                  className={
                    styles.formSection
                  }
                >
                  <div
                    className={
                      styles.sectionTitle
                    }
                  >
                    <span>01</span>

                    <div>
                      <h3>
                        Basic Information
                      </h3>
                      <p>
                        Main information
                        displayed on blog
                        cards.
                      </p>
                    </div>
                  </div>

                  <div
                    className={
                      styles.formGrid
                    }
                  >
                    <div
                      className={`${styles.field} ${styles.fullField}`}
                    >
                      <label>
                        Blog Title *
                      </label>

                      <input
                        value={
                          form.title
                        }
                        onChange={(
                          event
                        ) =>
                          setForm(
                            (
                              current
                            ) => ({
                              ...current,
                              title:
                                event
                                  .target
                                  .value,
                            })
                          )
                        }
                        placeholder="Enter blog title"
                      />
                    </div>

                    <div
                      className={
                        styles.field
                      }
                    >
                      <label>
                        Category *
                      </label>

                      <select
                        value={
                          form.category
                        }
                        onChange={(
                          event
                        ) =>
                          setForm(
                            (
                              current
                            ) => ({
                              ...current,
                              category:
                                event
                                  .target
                                  .value,
                            })
                          )
                        }
                      >
                        {CATEGORIES.map(
                          (
                            category
                          ) => (
                            <option
                              key={
                                category
                              }
                            >
                              {
                                category
                              }
                            </option>
                          )
                        )}
                      </select>
                    </div>

                    <div
                      className={
                        styles.field
                      }
                    >
                      <label>
                        Author *
                      </label>

                      <input
                        value={
                          form.author
                        }
                        onChange={(
                          event
                        ) =>
                          setForm(
                            (
                              current
                            ) => ({
                              ...current,
                              author:
                                event
                                  .target
                                  .value,
                            })
                          )
                        }
                      />
                    </div>

                    <div
                      className={
                        styles.field
                      }
                    >
                      <label>
                        Read Time *
                      </label>

                      <input
                        value={
                          form.readTime
                        }
                        onChange={(
                          event
                        ) =>
                          setForm(
                            (
                              current
                            ) => ({
                              ...current,
                              readTime:
                                event
                                  .target
                                  .value,
                            })
                          )
                        }
                        placeholder="5 min read"
                      />
                    </div>

                    <div
                      className={
                        styles.field
                      }
                    >
                      <label>
                        Publish Date *
                      </label>

                      <input
                        type="date"
                        value={
                          form.date
                        }
                        onChange={(
                          event
                        ) =>
                          setForm(
                            (
                              current
                            ) => ({
                              ...current,
                              date:
                                event
                                  .target
                                  .value,
                            })
                          )
                        }
                      />
                    </div>

                    <div
                      className={`${styles.field} ${styles.fullField}`}
                    >
                      <label>
                        Excerpt *
                      </label>

                      <textarea
                        rows={3}
                        value={
                          form.excerpt
                        }
                        onChange={(
                          event
                        ) =>
                          setForm(
                            (
                              current
                            ) => ({
                              ...current,
                              excerpt:
                                event
                                  .target
                                  .value,
                            })
                          )
                        }
                        placeholder="Short description displayed on blog cards..."
                      />
                    </div>
                  </div>
                </div>

                {/* IMAGE */}

                <div
                  className={
                    styles.formSection
                  }
                >
                  <div
                    className={
                      styles.sectionTitle
                    }
                  >
                    <span>02</span>

                    <div>
                      <h3>
                        Featured Image
                      </h3>
                      <p>
                        JPG, PNG or WEBP.
                        Maximum 5MB.
                      </p>
                    </div>
                  </div>

                  <div
                    className={
                      styles.imageUpload
                    }
                  >
                    <div
                      className={
                        styles.imagePreview
                      }
                    >
                      {imagePreview ? (
                        <img
                          src={
                            imagePreview
                          }
                          alt="Blog preview"
                        />
                      ) : (
                        <div>
                          <ImagePlus
                            size={30}
                          />
                          <span>
                            No image
                            selected
                          </span>
                        </div>
                      )}
                    </div>

                    <div
                      className={
                        styles.uploadContent
                      }
                    >
                      <strong>
                        Upload blog image
                      </strong>

                      <p>
                        Recommended wide
                        image suitable for
                        blog cards and
                        article hero.
                      </p>

                      <label
                        htmlFor="blog-image"
                        className={
                          styles.uploadButton
                        }
                      >
                        <ImagePlus
                          size={16}
                        />
                        Choose Image
                      </label>

                      <input
                        id="blog-image"
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        className={
                          styles.hiddenInput
                        }
                        onChange={
                          handleImageChange
                        }
                      />

                      {image && (
                        <span
                          className={
                            styles.fileName
                          }
                        >
                          {image.name}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* DISPLAY TYPE */}

                <div
                  className={
                    styles.formSection
                  }
                >
                  <div
                    className={
                      styles.sectionTitle
                    }
                  >
                    <span>03</span>

                    <div>
                      <h3>
                        Display Settings
                      </h3>
                      <p>
                        Choose where this
                        article should
                        appear.
                      </p>
                    </div>
                  </div>

                  <div
                    className={
                      styles.settingsGrid
                    }
                  >
                    <button
                      type="button"
                      disabled={
                        featuredUnavailable ||
                        form.isPopular
                      }
                      className={`${styles.settingCard} ${
                        form.isFeatured
                          ? styles.selectedSetting
                          : ""
                      }`}
                      onClick={
                        handleFeaturedChange
                      }
                    >
                      <div>
                        <Star
                          size={20}
                        />
                      </div>

                      <strong>
                        Featured
                      </strong>

                      <span>
                        Maximum 1 featured
                        blog.
                      </span>

                      <b>
                        {stats.featured}/1
                        used
                      </b>
                    </button>

                    <button
                      type="button"
                      disabled={
                        popularUnavailable ||
                        form.isFeatured
                      }
                      className={`${styles.settingCard} ${
                        form.isPopular
                          ? styles.selectedSetting
                          : ""
                      }`}
                      onClick={
                        handlePopularChange
                      }
                    >
                      <div>
                        <Flame
                          size={20}
                        />
                      </div>

                      <strong>
                        Popular
                      </strong>

                      <span>
                        Maximum 4 popular
                        blogs.
                      </span>

                      <b>
                        {stats.popular}/4
                        used
                      </b>
                    </button>

                    <button
                      type="button"
                      className={`${styles.settingCard} ${
                        form.isActive
                          ? styles.selectedSetting
                          : ""
                      }`}
                      onClick={() =>
                        setForm(
                          (current) => ({
                            ...current,
                            isActive:
                              !current.isActive,
                          })
                        )
                      }
                    >
                      <div>
                        <Check
                          size={20}
                        />
                      </div>

                      <strong>
                        Active
                      </strong>

                      <span>
                        Show this blog on
                        the website.
                      </span>

                      <b>
                        {form.isActive
                          ? "Enabled"
                          : "Disabled"}
                      </b>
                    </button>
                  </div>

                  <div
                    className={
                      styles.ruleNotice
                    }
                  >
                    <Star size={16} />

                    <span>
                      Featured and Popular
                      cannot be selected
                      together. Featured is
                      limited to 1 article
                      and Popular to 4.
                    </span>
                  </div>
                </div>

                {/* ARTICLE */}

                <div
                  className={
                    styles.formSection
                  }
                >
                  <div
                    className={
                      styles.sectionTitle
                    }
                  >
                    <span>04</span>

                    <div>
                      <h3>
                        Article Content
                      </h3>
                      <p>
                        This content is
                        displayed on the
                        blog detail page.
                      </p>
                    </div>
                  </div>

                  <div
                    className={
                      styles.field
                    }
                  >
                    <label>
                      Article Intro *
                    </label>

                    <textarea
                      rows={5}
                      value={form.intro}
                      onChange={(
                        event
                      ) =>
                        setForm(
                          (current) => ({
                            ...current,
                            intro:
                              event.target
                                .value,
                          })
                        )
                      }
                      placeholder="Opening paragraph of the article..."
                    />
                  </div>

                  <div
                    className={
                      styles.sectionsList
                    }
                  >
                    {form.sections.map(
                      (
                        section,
                        sectionIndex
                      ) => (
                        <div
                          className={
                            styles.articleSectionCard
                          }
                          key={
                            sectionIndex
                          }
                        >
                          <div
                            className={
                              styles.sectionCardHeader
                            }
                          >
                            <strong>
                              Section{" "}
                              {String(
                                sectionIndex +
                                  1
                              ).padStart(
                                2,
                                "0"
                              )}
                            </strong>

                            {form
                              .sections
                              .length >
                              1 && (
                              <button
                                type="button"
                                onClick={() =>
                                  removeSection(
                                    sectionIndex
                                  )
                                }
                              >
                                <Trash2
                                  size={
                                    15
                                  }
                                />
                                Remove
                              </button>
                            )}
                          </div>

                          <div
                            className={
                              styles.field
                            }
                          >
                            <label>
                              Heading *
                            </label>

                            <input
                              value={
                                section.heading
                              }
                              onChange={(
                                event
                              ) =>
                                updateSectionHeading(
                                  sectionIndex,
                                  event
                                    .target
                                    .value
                                )
                              }
                              placeholder="Section heading"
                            />
                          </div>

                          <div
                            className={
                              styles.paragraphs
                            }
                          >
                            {section.paragraphs.map(
                              (
                                paragraph,
                                paragraphIndex
                              ) => (
                                <div
                                  key={
                                    paragraphIndex
                                  }
                                  className={
                                    styles.paragraphRow
                                  }
                                >
                                  <div
                                    className={
                                      styles.field
                                    }
                                  >
                                    <label>
                                      Paragraph{" "}
                                      {paragraphIndex +
                                        1}
                                    </label>

                                    <textarea
                                      rows={
                                        4
                                      }
                                      value={
                                        paragraph
                                      }
                                      onChange={(
                                        event
                                      ) =>
                                        updateParagraph(
                                          sectionIndex,
                                          paragraphIndex,
                                          event
                                            .target
                                            .value
                                        )
                                      }
                                      placeholder="Write paragraph..."
                                    />
                                  </div>

                                  {section
                                    .paragraphs
                                    .length >
                                    1 && (
                                    <button
                                      type="button"
                                      className={
                                        styles.removeSmallButton
                                      }
                                      onClick={() =>
                                        removeParagraph(
                                          sectionIndex,
                                          paragraphIndex
                                        )
                                      }
                                    >
                                      <X
                                        size={
                                          16
                                        }
                                      />
                                    </button>
                                  )}
                                </div>
                              )
                            )}

                            <button
                              type="button"
                              className={
                                styles.addInlineButton
                              }
                              onClick={() =>
                                addParagraph(
                                  sectionIndex
                                )
                              }
                            >
                              <Plus
                                size={15}
                              />
                              Add Paragraph
                            </button>
                          </div>
                        </div>
                      )
                    )}
                  </div>

                  <button
                    type="button"
                    className={
                      styles.addSectionButton
                    }
                    onClick={addSection}
                  >
                    <Plus size={17} />
                    Add Article Section
                  </button>
                </div>

                {/* TAKEAWAYS */}

                <div
                  className={
                    styles.formSection
                  }
                >
                  <div
                    className={
                      styles.sectionTitle
                    }
                  >
                    <span>05</span>

                    <div>
                      <h3>
                        Quick Takeaways
                      </h3>
                      <p>
                        Points displayed
                        inside the “What to
                        remember” card.
                      </p>
                    </div>
                  </div>

                  <div
                    className={
                      styles.takeawayList
                    }
                  >
                    {form.takeaways.map(
                      (
                        takeaway,
                        index
                      ) => (
                        <div
                          className={
                            styles.takeawayRow
                          }
                          key={index}
                        >
                          <span>
                            {index + 1}
                          </span>

                          <input
                            value={
                              takeaway
                            }
                            onChange={(
                              event
                            ) =>
                              updateTakeaway(
                                index,
                                event
                                  .target
                                  .value
                              )
                            }
                            placeholder="Enter takeaway..."
                          />

                          {form
                            .takeaways
                            .length >
                            1 && (
                            <button
                              type="button"
                              onClick={() =>
                                removeTakeaway(
                                  index
                                )
                              }
                            >
                              <X
                                size={16}
                              />
                            </button>
                          )}
                        </div>
                      )
                    )}
                  </div>

                  <button
                    type="button"
                    className={
                      styles.addInlineButton
                    }
                    onClick={
                      addTakeaway
                    }
                  >
                    <Plus size={15} />
                    Add Takeaway
                  </button>

                  <div
                    className={
                      styles.noteField
                    }
                  >
                    <label>
                      Important Note
                      <span>
                        Optional
                      </span>
                    </label>

                    <textarea
                      rows={4}
                      value={form.note}
                      onChange={(
                        event
                      ) =>
                        setForm(
                          (current) => ({
                            ...current,
                            note:
                              event.target
                                .value,
                          })
                        )
                      }
                      placeholder="Optional note displayed below the article..."
                    />
                  </div>
                </div>
              </div>

              <div
                className={
                  styles.modalFooter
                }
              >
                <button
                  type="button"
                  className={
                    styles.cancelButton
                  }
                  onClick={closeModal}
                  disabled={saving}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={saving}
                >
                  {saving ? (
                    <>
                      <Loader2
                        size={17}
                        className={
                          styles.spinner
                        }
                      />
                      Saving...
                    </>
                  ) : editingBlog ? (
                    <>
                      <Check
                        size={17}
                      />
                      Update Blog
                    </>
                  ) : (
                    <>
                      <Plus
                        size={17}
                      />
                      Create Blog
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE MODAL */}

      {deleteBlog && (
        <div
          className={styles.overlay}
        >
          <div
            className={
              styles.deleteModal
            }
          >
            <div
              className={
                styles.deleteIcon
              }
            >
              <Trash2 size={24} />
            </div>

            <h2>Delete Blog?</h2>

            <p>
              Are you sure you want to
              delete{" "}
              <strong>
                {deleteBlog.title}
              </strong>
              ? This action cannot be
              undone.
            </p>

            <div
              className={
                styles.deleteButtons
              }
            >
              <button
                type="button"
                className={
                  styles.cancelButton
                }
                disabled={deleting}
                onClick={() =>
                  setDeleteBlog(null)
                }
              >
                Cancel
              </button>

              <button
                type="button"
                className={
                  styles.confirmDelete
                }
                disabled={deleting}
                onClick={
                  handleDelete
                }
              >
                {deleting ? (
                  <Loader2
                    size={17}
                    className={
                      styles.spinner
                    }
                  />
                ) : (
                  <Trash2
                    size={17}
                  />
                )}

                {deleting
                  ? "Deleting..."
                  : "Delete Blog"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}