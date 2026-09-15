"use client";

import { useEffect, useState, type FormEvent } from "react";
import {
  ChevronDown,
  Edit3,
  HelpCircle,
  Plus,
  Search,
  Trash2,
  X,
} from "lucide-react";
import styles from "./FAQ.module.css";

interface FAQ {
  _id: string;
  question: string;
  answer: string;
  isActive: boolean;
  createdAt: string;
  updatedAt?: string;
}

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export default function FAQAdminPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState<FAQ | null>(null);

  const [form, setForm] = useState({
    question: "",
    answer: "",
    isActive: true,
  });

  const [submitting, setSubmitting] = useState(false);

  // =====================================================
  // FETCH FAQS
  // =====================================================

  const fetchFaqs = async () => {
    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/faqs/admin`, {
        method: "GET",
        credentials: "include",
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch FAQs");
      }

      const data = await response.json();

      const faqList = Array.isArray(data)
        ? data
        : Array.isArray(data.faqs)
          ? data.faqs
          : [];

      setFaqs(faqList);
    } catch (error) {
      console.error("Error fetching FAQs:", error);
      setFaqs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  // =====================================================
  // OPEN ADD MODAL
  // =====================================================

  const openAddModal = () => {
    setEditingFaq(null);

    setForm({
      question: "",
      answer: "",
      isActive: true,
    });

    setModalOpen(true);
  };

  // =====================================================
  // OPEN EDIT MODAL
  // =====================================================

  const openEditModal = (faq: FAQ) => {
    setEditingFaq(faq);

    setForm({
      question: faq.question,
      answer: faq.answer,
      isActive: faq.isActive,
    });

    setModalOpen(true);
  };

  // =====================================================
  // CLOSE MODAL
  // =====================================================

  const closeModal = () => {
    if (submitting) return;

    setModalOpen(false);
    setEditingFaq(null);

    setForm({
      question: "",
      answer: "",
      isActive: true,
    });
  };

  // =====================================================
  // SUBMIT
  // =====================================================

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.question.trim()) {
      alert("Please enter a question.");
      return;
    }

    if (!form.answer.trim()) {
      alert("Please enter an answer.");
      return;
    }

    try {
      setSubmitting(true);

      const url = editingFaq
        ? `${API_URL}/faqs/${editingFaq._id}`
        : `${API_URL}/faqs`;

      const response = await fetch(url, {
        method: editingFaq ? "PUT" : "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: form.question.trim(),
          answer: form.answer.trim(),
          isActive: form.isActive,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Something went wrong."
        );
      }

      closeModal();
      await fetchFaqs();
    } catch (error) {
      console.error("FAQ save error:", error);

      alert(
        error instanceof Error
          ? error.message
          : "Failed to save FAQ."
      );
    } finally {
      setSubmitting(false);
    }
  };

  // =====================================================
  // DELETE
  // =====================================================

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this FAQ?"
    );

    if (!confirmed) return;

    try {
      const response = await fetch(`${API_URL}/faqs/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to delete FAQ."
        );
      }

      setFaqs((prev) =>
        prev.filter((item) => item._id !== id)
      );
    } catch (error) {
      console.error("Delete FAQ error:", error);

      alert(
        error instanceof Error
          ? error.message
          : "Failed to delete FAQ."
      );
    }
  };

  // =====================================================
  // TOGGLE ACTIVE
  // =====================================================

  const toggleStatus = async (faq: FAQ) => {
    try {
      const response = await fetch(
        `${API_URL}/faqs/${faq._id}`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            isActive: !faq.isActive,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to update status."
        );
      }

      setFaqs((prev) =>
        prev.map((item) =>
          item._id === faq._id
            ? {
                ...item,
                isActive: !item.isActive,
              }
            : item
        )
      );
    } catch (error) {
      console.error("Toggle FAQ error:", error);

      alert(
        error instanceof Error
          ? error.message
          : "Failed to update FAQ status."
      );
    }
  };

  // =====================================================
  // SEARCH
  // =====================================================

  const filteredFaqs = faqs.filter((faq) => {
    const query = search.toLowerCase().trim();

    if (!query) return true;

    return (
      faq.question.toLowerCase().includes(query) ||
      faq.answer.toLowerCase().includes(query)
    );
  });

  return (
    <div className={styles.page}>
      {/* =================================================
          HEADER
          ================================================= */}

      <div className={styles.pageHeader}>
        <div>
          <div className={styles.titleRow}>
            <div className={styles.titleIcon}>
              <HelpCircle size={22} />
            </div>

            <div>
              <h1>FAQ</h1>
              <p>
                Manage frequently asked questions displayed
                on the website.
              </p>
            </div>
          </div>
        </div>

        <button
          type="button"
          className={styles.addButton}
          onClick={openAddModal}
        >
          <Plus size={18} />
          Add FAQ
        </button>
      </div>

      {/* =================================================
          STATS
          ================================================= */}

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <HelpCircle size={19} />
          </div>

          <div>
            <span>Total FAQs</span>
            <strong>{faqs.length}</strong>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <span className={styles.activeDot} />
          </div>

          <div>
            <span>Active FAQs</span>
            <strong>
              {faqs.filter((item) => item.isActive).length}
            </strong>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <span className={styles.inactiveDot} />
          </div>

          <div>
            <span>Inactive FAQs</span>
            <strong>
              {faqs.filter((item) => !item.isActive).length}
            </strong>
          </div>
        </div>
      </div>

      {/* =================================================
          TABLE CARD
          ================================================= */}

      <div className={styles.tableCard}>
        <div className={styles.tableHeader}>
          <div>
            <h2>All FAQs</h2>
            <p>
              {filteredFaqs.length}{" "}
              {filteredFaqs.length === 1
                ? "question"
                : "questions"}
            </p>
          </div>

          <div className={styles.searchBox}>
            <Search size={17} />

            <input
              type="text"
              placeholder="Search FAQs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
              >
                <X size={15} />
              </button>
            )}
          </div>
        </div>

        {/* =================================================
            LOADING
            ================================================= */}

        {loading ? (
          <div className={styles.emptyState}>
            <div className={styles.loader} />
            <p>Loading FAQs...</p>
          </div>
        ) : filteredFaqs.length === 0 ? (
          /* =================================================
             EMPTY
             ================================================= */

          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>
              <HelpCircle size={28} />
            </div>

            <h3>
              {search
                ? "No FAQs found"
                : "No FAQs yet"}
            </h3>

            <p>
              {search
                ? "Try changing your search keyword."
                : "Add your first FAQ to get started."}
            </p>

            {!search && (
              <button
                type="button"
                className={styles.emptyAddButton}
                onClick={openAddModal}
              >
                <Plus size={17} />
                Add FAQ
              </button>
            )}
          </div>
        ) : (
          /* =================================================
             TABLE
             ================================================= */

          <div className={styles.tableWrapper}>
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Question</th>
                  <th>Answer</th>
                  <th>Status</th>
                  <th>Created</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredFaqs.map((faq, index) => (
                  <tr key={faq._id}>
                    <td>
                      <span className={styles.rowNumber}>
                        {index + 1}
                      </span>
                    </td>

                    <td>
                      <div className={styles.questionCell}>
                        <div className={styles.questionIcon}>
                          <HelpCircle size={16} />
                        </div>

                        <strong>{faq.question}</strong>
                      </div>
                    </td>

                    <td>
                      <p className={styles.answerCell}>
                        {faq.answer}
                      </p>
                    </td>

                    <td>
                      <button
                        type="button"
                        className={`${styles.statusBadge} ${
                          faq.isActive
                            ? styles.active
                            : styles.inactive
                        }`}
                        onClick={() =>
                          toggleStatus(faq)
                        }
                        title="Click to change status"
                      >
                        <span />
                        {faq.isActive
                          ? "Active"
                          : "Inactive"}
                      </button>
                    </td>

                    <td>
                      <span className={styles.date}>
                        {new Date(
                          faq.createdAt
                        ).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </td>

                    <td>
                      <div className={styles.actions}>
                        <button
                          type="button"
                          className={styles.editButton}
                          onClick={() =>
                            openEditModal(faq)
                          }
                          title="Edit FAQ"
                        >
                          <Edit3 size={16} />
                        </button>

                        <button
                          type="button"
                          className={styles.deleteButton}
                          onClick={() =>
                            handleDelete(faq._id)
                          }
                          title="Delete FAQ"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* =================================================
          MODAL
          ================================================= */}

      {modalOpen && (
        <div
          className={styles.modalOverlay}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              closeModal();
            }
          }}
        >
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <div>
                <div className={styles.modalIcon}>
                  <HelpCircle size={20} />
                </div>

                <div>
                  <h2>
                    {editingFaq
                      ? "Edit FAQ"
                      : "Add New FAQ"}
                  </h2>

                  <p>
                    {editingFaq
                      ? "Update the FAQ details."
                      : "Add a new frequently asked question."}
                  </p>
                </div>
              </div>

              <button
                type="button"
                className={styles.closeButton}
                onClick={closeModal}
                disabled={submitting}
              >
                <X size={19} />
              </button>
            </div>

            <form
              className={styles.form}
              onSubmit={handleSubmit}
            >
              {/* QUESTION */}

              <div className={styles.field}>
                <label htmlFor="question">
                  Question
                  <span>*</span>
                </label>

                <input
                  id="question"
                  type="text"
                  placeholder="Enter FAQ question"
                  value={form.question}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      question: e.target.value,
                    }))
                  }
                  maxLength={250}
                  required
                />

                <small>
                  {form.question.length}/250
                </small>
              </div>

              {/* ANSWER */}

              <div className={styles.field}>
                <label htmlFor="answer">
                  Answer
                  <span>*</span>
                </label>

                <textarea
                  id="answer"
                  placeholder="Enter FAQ answer"
                  value={form.answer}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      answer: e.target.value,
                    }))
                  }
                  rows={6}
                  maxLength={1000}
                  required
                />

                <small>
                  {form.answer.length}/1000
                </small>
              </div>

              {/* ACTIVE */}

              <div className={styles.statusField}>
                <div>
                  <strong>Display on website</strong>
                  <span>
                    Inactive FAQs will not appear on the
                    public website.
                  </span>
                </div>

                <button
                  type="button"
                  className={`${styles.toggle} ${
                    form.isActive
                      ? styles.toggleOn
                      : ""
                  }`}
                  onClick={() =>
                    setForm((prev) => ({
                      ...prev,
                      isActive: !prev.isActive,
                    }))
                  }
                  aria-label="Toggle FAQ status"
                >
                  <span />
                </button>
              </div>

              {/* ACTIONS */}

              <div className={styles.modalActions}>
                <button
                  type="button"
                  className={styles.cancelButton}
                  onClick={closeModal}
                  disabled={submitting}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={submitting}
                >
                  {submitting
                    ? "Saving..."
                    : editingFaq
                      ? "Update FAQ"
                      : "Add FAQ"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}