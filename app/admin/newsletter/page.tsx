"use client";

import dynamic from "next/dynamic";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Mail,
  RefreshCw,
  Search,
  Send,
  Trash2,
  Users,
  X,
  Eye,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import styles from "./NewsletterAdmin.module.css";

const JoditEditor = dynamic(
  () => import("jodit-react"),
  {
    ssr: false,
  }
);

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000/api";

const ITEMS_PER_PAGE = 10;

interface Subscriber {
  _id: string;
  email: string;
  isActive: boolean;
  subscribedAt: string;
  unsubscribedAt?: string | null;
  createdAt?: string;
}

interface Stats {
  total: number;
  active: number;
  inactive: number;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

interface NewsletterForm {
  subject: string;
  preheader: string;
  heading: string;
  content: string;
  ctaText: string;
  ctaUrl: string;
}

const initialForm: NewsletterForm = {
  subject: "",
  preheader: "",
  heading: "",
  content: "",
  ctaText: "",
  ctaUrl: "",
};

export default function NewsletterAdminPage() {
  const [subscribers, setSubscribers] = useState<
    Subscriber[]
  >([]);

  const [stats, setStats] = useState<Stats>({
    total: 0,
    active: 0,
    inactive: 0,
  });

  const [pagination, setPagination] =
    useState<Pagination>({
      page: 1,
      limit: ITEMS_PER_PAGE,
      total: 0,
      totalPages: 0,
    });
const [composerOpen, setComposerOpen] =
  useState(false);
  const [page, setPage] = useState(1);

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] =
    useState("");

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] =
    useState(false);

  const [error, setError] = useState("");

  const [deleteId, setDeleteId] = useState<
    string | null
  >(null);

  const [deleting, setDeleting] = useState(false);

  const [form, setForm] =
    useState<NewsletterForm>(initialForm);

  const [sending, setSending] = useState(false);

  const [sendMessage, setSendMessage] =
    useState("");

  const [sendError, setSendError] =
    useState("");

  const [previewOpen, setPreviewOpen] =
    useState(false);

  const editorRef = useRef<any>(null);

  /*
   * =====================================================
   * SEARCH DEBOUNCE
   * =====================================================
   */

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  /*
   * =====================================================
   * FETCH SUBSCRIBERS
   * =====================================================
   */

  const fetchSubscribers = useCallback(
    async (showRefresh = false) => {
      try {
        if (showRefresh) {
          setRefreshing(true);
        } else {
          setLoading(true);
        }

        setError("");

        const params = new URLSearchParams({
          page: String(page),
          limit: String(ITEMS_PER_PAGE),
        });

        if (debouncedSearch.trim()) {
          params.set(
            "search",
            debouncedSearch.trim()
          );
        }

        const response = await fetch(
          `${API_URL}/newsletter/admin?${params.toString()}`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data?.message ||
              "Failed to fetch newsletter subscribers."
          );
        }

        setSubscribers(data.subscribers || []);

        setStats(
          data.stats || {
            total: 0,
            active: 0,
            inactive: 0,
          }
        );

        setPagination(
          data.pagination || {
            page,
            limit: ITEMS_PER_PAGE,
            total: 0,
            totalPages: 0,
          }
        );
      } catch (err) {
        console.error(
          "Newsletter subscribers fetch error:",
          err
        );

        setError(
          err instanceof Error
            ? err.message
            : "Something went wrong."
        );
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [page, debouncedSearch]
  );

  useEffect(() => {
    fetchSubscribers();
  }, [fetchSubscribers]);

  /*
   * =====================================================
   * DELETE
   * =====================================================
   */

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      setDeleting(true);

      const response = await fetch(
        `${API_URL}/newsletter/admin/${deleteId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.message ||
            "Failed to delete subscriber."
        );
      }

      setDeleteId(null);

      /*
       * If last item on page gets deleted,
       * go back one page.
       */
      if (
        subscribers.length === 1 &&
        page > 1
      ) {
        setPage((current) => current - 1);
      } else {
        await fetchSubscribers(true);
      }
    } catch (err) {
      console.error(
        "Delete newsletter subscriber error:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Failed to delete subscriber."
      );
    } finally {
      setDeleting(false);
    }
  };

  /*
   * =====================================================
   * EXPORT CSV
   * =====================================================
   */

  const handleExport = async () => {
    try {
      const response = await fetch(
        `${API_URL}/newsletter/admin/export`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (!response.ok) {
        const data = await response.json();

        throw new Error(
          data?.message ||
            "Failed to export subscribers."
        );
      }

      const blob = await response.blob();

      const url =
        window.URL.createObjectURL(blob);

      const link =
        document.createElement("a");

      link.href = url;
      link.download =
        "petcard-newsletter-subscribers.csv";

      document.body.appendChild(link);

      link.click();

      link.remove();

      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(
        "Newsletter export error:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Failed to export subscribers."
      );
    }
  };

  /*
   * =====================================================
   * FORM
   * =====================================================
   */

  const updateForm = (
    field: keyof NewsletterForm,
    value: string
  ) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));

    setSendMessage("");
    setSendError("");
  };

  /*
   * =====================================================
   * JODIT CONFIG
   * =====================================================
   */

  const editorConfig = useMemo(
    () => ({
      readonly: false,
      height: 420,
      placeholder:
        "Write your newsletter content here...",
      toolbarAdaptive: false,
      buttons: [
        "bold",
        "italic",
        "underline",
        "|",
        "paragraph",
        "fontsize",
        "|",
        "ul",
        "ol",
        "|",
        "align",
        "|",
        "link",
        "|",
        "undo",
        "redo",
        "|",
        "hr",
        "eraser",
        "fullsize",
      ],
      showCharsCounter: false,
      showWordsCounter: false,
      showXPathInStatusbar: false,
      uploader: {
        insertImageAsBase64URI: false,
      },
      style: {
        fontFamily:
          "Arial, Helvetica, sans-serif",
        fontSize: "15px",
      },
    }),
    []
  );

  /*
   * =====================================================
   * VALIDATION
   * =====================================================
   */

  const validateNewsletter = () => {
    if (!form.subject.trim()) {
      return "Subject is required.";
    }

    if (!form.heading.trim()) {
      return "Heading is required.";
    }

    if (!form.content.trim()) {
      return "Newsletter content is required.";
    }

    if (
      form.ctaText.trim() &&
      !form.ctaUrl.trim()
    ) {
      return "CTA link is required when CTA text is provided.";
    }

    if (
      form.ctaUrl.trim() &&
      !/^https?:\/\/.+/i.test(
        form.ctaUrl.trim()
      )
    ) {
      return "CTA link must be a valid HTTP or HTTPS URL.";
    }

    return "";
  };

  /*
   * =====================================================
   * PREVIEW
   * =====================================================
   */

  const handlePreview = () => {
    const validation =
      validateNewsletter();

    if (validation) {
      setSendError(validation);
      return;
    }

    setSendError("");
    setPreviewOpen(true);
  };

  /*
   * =====================================================
   * EMAIL PREVIEW HTML
   * =====================================================
   */

  const previewHtml = useMemo(() => {
    const content =
      form.content ||
      "<p>Your newsletter content will appear here.</p>";

    const cta =
      form.ctaText.trim() &&
      form.ctaUrl.trim()
        ? `
          <div style="text-align:center;margin:30px 0 5px;">
            <a
              href="${form.ctaUrl}"
              style="
                display:inline-block;
                padding:14px 26px;
                background:#ff7a00;
                color:#ffffff;
                text-decoration:none;
                border-radius:12px;
                font-size:13px;
                font-weight:700;
              "
            >
              ${form.ctaText} →
            </a>
          </div>
        `
        : "";

    return `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>

<body
  style="
    margin:0;
    padding:0;
    background:#fff8f2;
    font-family:Arial,Helvetica,sans-serif;
    color:#381b0e;
  "
>

<div
  style="
    display:none;
    max-height:0;
    overflow:hidden;
    opacity:0;
  "
>
  ${form.preheader}
</div>

<table
  width="100%"
  cellpadding="0"
  cellspacing="0"
  border="0"
  style="
    background:#fff8f2;
    padding:30px 12px;
  "
>
<tr>
<td align="center">

<table
  width="100%"
  cellpadding="0"
  cellspacing="0"
  border="0"
  style="
    max-width:650px;
    background:#ffffff;
    border-radius:22px;
    overflow:hidden;
    border:1px solid #f0e2d7;
  "
>

<tr>
<td
  style="
    padding:30px 35px;
    background:#fff3e7;
    border-bottom:1px solid #f1dfd0;
  "
>

<table width="100%" cellpadding="0" cellspacing="0">
<tr>

<td>

<div
  style="
    font-size:28px;
    font-weight:800;
  "
>
<span style="color:#381b0e;">PET</span>
<span style="color:#ff7a00;">CARD</span>
</div>

<div
  style="
    margin-top:5px;
    font-size:10px;
    letter-spacing:1.5px;
    font-weight:700;
    color:#8b7569;
  "
>
WORLD'S FIRST AI-ENABLED PET ID
</div>

</td>

<td
  align="right"
  style="font-size:30px;"
>
🐾
</td>

</tr>
</table>

</td>
</tr>

<tr>
<td
  style="
    padding:38px 35px 36px;
  "
>

<p
  style="
    margin:0 0 8px;
    font-size:11px;
    font-weight:800;
    letter-spacing:1px;
    color:#ff7a00;
  "
>
PETCARD NEWSLETTER
</p>

<h1
  style="
    margin:0 0 24px;
    font-size:29px;
    line-height:1.3;
    color:#381b0e;
  "
>
${form.heading || "Newsletter Heading"}
</h1>

<div
  style="
    font-size:15px;
    line-height:1.8;
    color:#6f625c;
  "
>
${content}
</div>

${cta}

</td>
</tr>

<tr>
<td
  style="
    padding:25px 35px;
    background:#381b0e;
  "
>

<p
  style="
    margin:0 0 8px;
    color:#ffffff;
    font-size:16px;
    font-weight:800;
  "
>
PET<span style="color:#ff9b2f;">CARD</span>
</p>

<p
  style="
    margin:0 0 14px;
    color:#d8cbc4;
    font-size:12px;
    line-height:1.6;
  "
>
Everything your pet needs.
All in one card.
</p>

<p
  style="
    margin:0;
    font-size:11px;
    color:#a99991;
  "
>
© ${new Date().getFullYear()}
PetCard. All rights reserved.
</p>

<p
  style="
    margin:8px 0 0;
    font-size:11px;
  "
>
<a
  href="https://petcard.in"
  style="
    color:#ff9b2f;
    text-decoration:none;
  "
>
petcard.in
</a>
</p>

</td>
</tr>

</table>

</td>
</tr>
</table>

</body>
</html>
`;
  }, [form]);

  /*
   * =====================================================
   * SEND NEWSLETTER
   * =====================================================
   */

  const handleSendNewsletter = async () => {
    const validation =
      validateNewsletter();

    if (validation) {
      setSendError(validation);
      return;
    }

    

    try {
      setSending(true);
      setSendError("");
      setSendMessage("");

      const response = await fetch(
        `${API_URL}/newsletter/admin/send`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            subject: form.subject.trim(),
            preheader:
              form.preheader.trim(),
            heading: form.heading.trim(),
            content: form.content,
            ctaText:
              form.ctaText.trim(),
            ctaUrl:
              form.ctaUrl.trim(),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.message ||
            "Failed to send newsletter."
        );
      }

      setSendMessage(
        data?.message ||
          "Newsletter sent successfully."
      );
      
      setForm(initialForm);
setComposerOpen(false);
    } catch (err) {
      console.error(
        "Send newsletter error:",
        err
      );

      setSendError(
        err instanceof Error
          ? err.message
          : "Failed to send newsletter."
      );
    } finally {
      setSending(false);
    }
  };

  /*
   * =====================================================
   * PAGINATION
   * =====================================================
   */

  const totalPages =
    pagination.totalPages || 0;

  const paginationItems = useMemo(() => {
    if (totalPages <= 5) {
      return Array.from(
        { length: totalPages },
        (_, index) => index + 1
      );
    }

    if (page <= 3) {
      return [1, 2, 3, 4, 5];
    }

    if (page >= totalPages - 2) {
      return [
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }

    return [
      page - 2,
      page - 1,
      page,
      page + 1,
      page + 2,
    ];
  }, [page, totalPages]);

  /*
   * =====================================================
   * DATE
   * =====================================================
   */

  const formatDate = (
    date?: string | null
  ) => {
    if (!date) return "—";

    return new Intl.DateTimeFormat(
      "en-GB",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    ).format(new Date(date));
  };

  return (
    <main className={styles.page}>
      {/* =================================================
          HEADER
      ================================================= */}

      <div className={styles.pageHeader}>
        <div>
          <div className={styles.breadcrumb}>
            Communication
            <span>/</span>
            Newsletter
          </div>

          <h1 className={styles.pageTitle}>
            Newsletter
          </h1>

          <p className={styles.pageSubtitle}>
            Manage subscribers and send
            branded PetCard updates.
          </p>
        </div>

        <div className={styles.headerActions}>
          <button
            type="button"
            className={styles.secondaryButton}
            onClick={() =>
              fetchSubscribers(true)
            }
            disabled={refreshing}
          >
            <RefreshCw
              size={17}
              className={
                refreshing
                  ? styles.spin
                  : ""
              }
            />

            Refresh
          </button>

          <button
  type="button"
  className={styles.primaryButton}
  onClick={() => {
    setComposerOpen(true);
    setSendError("");
    setSendMessage("");
  }}
>
  <Send size={17} />
  Create Newsletter
</button>
        </div>
      </div>

      {/* =================================================
          ERROR
      ================================================= */}

      {error && (
        <div className={styles.errorBanner}>
          <AlertCircle size={18} />

          <span>{error}</span>

          <button
            type="button"
            onClick={() =>
              setError("")
            }
          >
            <X size={17} />
          </button>
        </div>
      )}

      {/* =================================================
          STATS
      ================================================= */}

      <section className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div
            className={`${styles.statIcon} ${styles.statIconTotal}`}
          >
            <Users size={21} />
          </div>

          <div>
            <span className={styles.statLabel}>
              Total Subscribers
            </span>

            <strong className={styles.statValue}>
              {stats.total}
            </strong>
          </div>
        </div>

        <div className={styles.statCard}>
          <div
            className={`${styles.statIcon} ${styles.statIconActive}`}
          >
            <Mail size={21} />
          </div>

          <div>
            <span className={styles.statLabel}>
              Active Subscribers
            </span>

            <strong className={styles.statValue}>
              {stats.active}
            </strong>
          </div>
        </div>

        <div className={styles.statCard}>
          <div
            className={`${styles.statIcon} ${styles.statIconInactive}`}
          >
            <Mail size={21} />
          </div>

          <div>
            <span className={styles.statLabel}>
              Unsubscribed
            </span>

            <strong className={styles.statValue}>
              {stats.inactive}
            </strong>
          </div>
        </div>
      </section>

      {/* =================================================
          SUBSCRIBERS
      ================================================= */}

      <section className={styles.card}>
        <div className={styles.cardHeader}>
          <div>
            <h2 className={styles.cardTitle}>
              Subscribers
            </h2>

            <p className={styles.cardDescription}>
              View and manage newsletter
              subscribers.
            </p>
          </div>

          <button
            type="button"
            className={styles.exportButton}
            onClick={handleExport}
          >
            <Download size={17} />
            Export CSV
          </button>
        </div>

        <div className={styles.toolbar}>
          <div className={styles.searchBox}>
            <Search size={18} />

            <input
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search subscribers by email..."
            />

            {search && (
              <button
                type="button"
                className={styles.clearSearch}
                onClick={() =>
                  setSearch("")
                }
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Email</th>
                <th>Status</th>
                <th>Subscribed</th>
                <th className={styles.actionHeader}>
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                Array.from(
                  { length: 5 },
                  (_, index) => (
                    <tr
                      key={`skeleton-${index}`}
                    >
                      <td colSpan={4}>
                        <div
                          className={
                            styles.skeletonRow
                          }
                        />
                      </td>
                    </tr>
                  )
                )
              ) : subscribers.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className={
                      styles.emptyCell
                    }
                  >
                    <div
                      className={
                        styles.emptyState
                      }
                    >
                      <div
                        className={
                          styles.emptyIcon
                        }
                      >
                        <Mail size={24} />
                      </div>

                      <h3>
                        No subscribers found
                      </h3>

                      <p>
                        {debouncedSearch
                          ? "Try a different search term."
                          : "Newsletter subscribers will appear here."}
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                subscribers.map(
                  (subscriber) => (
                    <tr
                      key={
                        subscriber._id
                      }
                    >
                      <td>
                        <div
                          className={
                            styles.emailCell
                          }
                        >
                          <div
                            className={
                              styles.emailIcon
                            }
                          >
                            <Mail
                              size={16}
                            />
                          </div>

                          <span>
                            {
                              subscriber.email
                            }
                          </span>
                        </div>
                      </td>

                      <td>
                        <span
                          className={`${styles.statusBadge} ${
                            subscriber.isActive
                              ? styles.statusActive
                              : styles.statusInactive
                          }`}
                        >
                          <span />
                          {subscriber.isActive
                            ? "Active"
                            : "Unsubscribed"}
                        </span>
                      </td>

                      <td>
                        <span
                          className={
                            styles.dateText
                          }
                        >
                          {formatDate(
                            subscriber.subscribedAt
                          )}
                        </span>
                      </td>

                      <td
                        className={
                          styles.actionCell
                        }
                      >
                        <button
                          type="button"
                          className={
                            styles.deleteButton
                          }
                          onClick={() =>
                            setDeleteId(
                              subscriber._id
                            )
                          }
                          aria-label={`Delete ${subscriber.email}`}
                        >
                          <Trash2
                            size={17}
                          />
                        </button>
                      </td>
                    </tr>
                  )
                )
              )}
            </tbody>
          </table>
        </div>

        {/* =================================================
            PAGINATION
        ================================================= */}

        {!loading &&
          subscribers.length > 0 &&
          totalPages > 1 && (
            <div
              className={
                styles.pagination
              }
            >
              <span
                className={
                  styles.paginationInfo
                }
              >
                Page {page} of{" "}
                {totalPages}
              </span>

              <div
                className={
                  styles.paginationControls
                }
              >
                <button
                  type="button"
                  disabled={page <= 1}
                  onClick={() =>
                    setPage(
                      (current) =>
                        Math.max(
                          current - 1,
                          1
                        )
                    )
                  }
                >
                  <ChevronLeft
                    size={17}
                  />
                </button>

                {paginationItems.map(
                  (item) => (
                    <button
                      type="button"
                      key={item}
                      className={
                        item === page
                          ? styles.pageActive
                          : ""
                      }
                      onClick={() =>
                        setPage(item)
                      }
                    >
                      {item}
                    </button>
                  )
                )}

                <button
                  type="button"
                  disabled={
                    page >= totalPages
                  }
                  onClick={() =>
                    setPage(
                      (current) =>
                        Math.min(
                          current + 1,
                          totalPages
                        )
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


      {/* =================================================
          DELETE MODAL
      ================================================= */}

      {deleteId && (
        <div
          className={styles.modalOverlay}
          onClick={() =>
            !deleting &&
            setDeleteId(null)
          }
        >
          <div
            className={
              styles.confirmModal
            }
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <button
              type="button"
              className={
                styles.modalClose
              }
              onClick={() =>
                !deleting &&
                setDeleteId(null)
              }
              disabled={deleting}
            >
              <X size={19} />
            </button>

            <div
              className={
                styles.confirmIcon
              }
            >
              <Trash2 size={22} />
            </div>

            <h3>
              Delete Subscriber?
            </h3>

            <p>
              This subscriber will be
              permanently removed from
              your newsletter list.
            </p>

            <div
              className={
                styles.modalActions
              }
            >
              <button
                type="button"
                className={
                  styles.cancelButton
                }
                onClick={() =>
                  setDeleteId(null)
                }
                disabled={deleting}
              >
                Cancel
              </button>

              <button
                type="button"
                className={
                  styles.dangerButton
                }
                onClick={handleDelete}
                disabled={deleting}
              >
                <Trash2 size={16} />

                {deleting
                  ? "Deleting..."
                  : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
{/* =================================================
    CREATE NEWSLETTER MODAL
================================================= */}

{composerOpen && (
  <div
    className={styles.modalOverlay}
    onClick={() => {
      if (!sending) {
        setComposerOpen(false);
      }
    }}
  >
    <div
      className={`${styles.newsletterModal} ${styles.composerModal}`}
      onClick={(event) =>
        event.stopPropagation()
      }
    >
      {/* HEADER */}

      <div className={styles.newsletterModalHeader}>
        <div>
         

          <h2>
            Create Newsletter
          </h2>

          <p>
            Create a branded update for your
            active subscribers.
          </p>
        </div>

        <button
          type="button"
          className={styles.modalClose}
          onClick={() => {
            if (!sending) {
              setComposerOpen(false);
            }
          }}
          disabled={sending}
          aria-label="Close"
        >
          <X size={20} />
        </button>
      </div>

      {/* BODY */}

      <div className={styles.newsletterModalBody}>
        {sendMessage && (
          <div
            className={
              styles.successBanner
            }
          >
            <CheckCircle2 size={18} />

            <span>{sendMessage}</span>

            <button
              type="button"
              onClick={() =>
                setSendMessage("")
              }
            >
              <X size={17} />
            </button>
          </div>
        )}

        {sendError && (
          <div
            className={
              styles.errorBanner
            }
          >
            <AlertCircle size={18} />

            <span>{sendError}</span>

            <button
              type="button"
              onClick={() =>
                setSendError("")
              }
            >
              <X size={17} />
            </button>
          </div>
        )}

        <div className={styles.formGrid}>
          {/* SUBJECT */}

          <div
            className={`${styles.formGroup} ${styles.fullWidth}`}
          >
            <label htmlFor="subject">
              Subject
              <span>*</span>
            </label>

            <input
              id="subject"
              type="text"
              value={form.subject}
              onChange={(event) =>
                updateForm(
                  "subject",
                  event.target.value
                )
              }
              placeholder="e.g. 5 Simple Ways to Keep Your Pet Happy"
            />
          </div>

          {/* PREHEADER */}

          <div
            className={`${styles.formGroup} ${styles.fullWidth}`}
          >
            <label htmlFor="preheader">
              Preheader
            </label>

            <input
              id="preheader"
              type="text"
              value={form.preheader}
              onChange={(event) =>
                updateForm(
                  "preheader",
                  event.target.value
                )
              }
              placeholder="Short text shown beside the subject in the inbox"
            />
          </div>

          {/* HEADING */}

          <div
            className={`${styles.formGroup} ${styles.fullWidth}`}
          >
            <label htmlFor="heading">
              Heading
              <span>*</span>
            </label>

            <input
              id="heading"
              type="text"
              value={form.heading}
              onChange={(event) =>
                updateForm(
                  "heading",
                  event.target.value
                )
              }
              placeholder="Your newsletter heading"
            />
          </div>

          {/* CONTENT */}

          <div
            className={`${styles.formGroup} ${styles.fullWidth}`}
          >
            <label>
              Content
              <span>*</span>
            </label>

            <div
              className={
                styles.editorWrapper
              }
            >
              <JoditEditor
                ref={editorRef}
                value={form.content}
                config={editorConfig}
                onBlur={(value) =>
                  updateForm(
                    "content",
                    value
                  )
                }
              />
            </div>
          </div>

          {/* CTA TEXT */}

          <div className={styles.formGroup}>
            <label htmlFor="ctaText">
              CTA Text
            </label>

            <input
              id="ctaText"
              type="text"
              value={form.ctaText}
              onChange={(event) =>
                updateForm(
                  "ctaText",
                  event.target.value
                )
              }
              placeholder="Read More"
            />
          </div>

          {/* CTA URL */}

          <div className={styles.formGroup}>
            <label htmlFor="ctaUrl">
              CTA Link
            </label>

            <input
              id="ctaUrl"
              type="url"
              value={form.ctaUrl}
              onChange={(event) =>
                updateForm(
                  "ctaUrl",
                  event.target.value
                )
              }
              placeholder="https://petcard.in/blogs/..."
            />
          </div>
        </div>
      </div>

      {/* FOOTER */}

      <div
        className={
          styles.newsletterModalFooter
        }
      >
        <div className={styles.recipientInfo}>
          <Users size={16} />

          <span>
            This newsletter will be sent to{" "}
            <strong>
              {stats.active}
            </strong>{" "}
            active subscriber
            {stats.active === 1
              ? ""
              : "s"}
          </span>
        </div>

        <div
          className={
            styles.composerActions
          }
        >
          <button
            type="button"
            className={
              styles.secondaryButton
            }
            onClick={handlePreview}
          >
            <Eye size={17} />
            Preview
          </button>

          <button
            type="button"
            className={
              styles.primaryButton
            }
            onClick={
              handleSendNewsletter
            }
            disabled={
              sending ||
              stats.active === 0
            }
          >
            <Send size={17} />

            {sending
              ? "Sending..."
              : "Send Newsletter"}
          </button>
        </div>
      </div>
    </div>
  </div>
)}
      {/* =================================================
          PREVIEW MODAL
      ================================================= */}

      {previewOpen && (
        <div
          className={
            styles.previewOverlay
          }
          onClick={() =>
            setPreviewOpen(false)
          }
        >
          <div
            className={
              styles.previewModal
            }
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <div
              className={
                styles.previewHeader
              }
            >
              <div>
                <span>
                  Email Preview
                </span>

                <h3>
                  {form.subject}
                </h3>
              </div>

              <button
                type="button"
                onClick={() =>
                  setPreviewOpen(false)
                }
              >
                <X size={20} />
              </button>
            </div>

            <div
              className={
                styles.previewBody
              }
            >
              <iframe
                title="Newsletter Preview"
                srcDoc={previewHtml}
                className={
                  styles.previewFrame
                }
                sandbox=""
              />
            </div>

            <div
              className={
                styles.previewFooter
              }
            >
              <button
                type="button"
                className={
                  styles.secondaryButton
                }
                onClick={() =>
                  setPreviewOpen(false)
                }
              >
                Close Preview
              </button>

              <button
                type="button"
                className={
                  styles.primaryButton
                }
                onClick={() => {
                  setPreviewOpen(false);
                  handleSendNewsletter();
                }}
                disabled={
                  sending ||
                  stats.active === 0
                }
              >
                <Send size={17} />

                Send Newsletter
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}