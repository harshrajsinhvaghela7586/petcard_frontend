"use client";

import { FormEvent, useState } from "react";
import styles from "./ContactForm.module.css";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000/api";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (error) {
      setError("");
    }
  };

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setError("");

    if (!form.name.trim()) {
      setError("Please enter your name.");
      return;
    }

    if (!form.email.trim()) {
      setError("Please enter your email.");
      return;
    }

    if (!form.message.trim()) {
      setError("Please enter your message.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          subject: form.subject.trim(),
          message: form.message.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Unable to send your message."
        );
      }

      setSent(true);

      setForm({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Contact form error:", error);

      setError(
        error instanceof Error
          ? error.message
          : "Unable to send your message. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className={styles.formCard}
      onSubmit={handleSubmit}
    >
      <h2>
        Send us a{" "}
        <span>message</span>
      </h2>

      <div className={styles.formGrid}>
        {/* NAME */}

        <div className={styles.field}>
          <label htmlFor="contact-name">
            Name <span>*</span>
          </label>

          <input
            id="contact-name"
            name="name"
            type="text"
            placeholder="Your name"
            value={form.name}
            onChange={handleChange}
            disabled={loading}
            required
          />
        </div>

        {/* EMAIL */}

        <div className={styles.field}>
          <label htmlFor="contact-email">
            Email <span>*</span>
          </label>

          <input
            id="contact-email"
            name="email"
            type="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={handleChange}
            disabled={loading}
            required
          />
        </div>

        {/* SUBJECT */}

        <div className={`${styles.field} ${styles.full}`}>
          <label htmlFor="contact-subject">
            Subject
          </label>

          <input
            id="contact-subject"
            name="subject"
            type="text"
            placeholder="How can we help?"
            value={form.subject}
            onChange={handleChange}
            disabled={loading}
          />
        </div>

        {/* MESSAGE */}

        <div className={`${styles.field} ${styles.full}`}>
          <label htmlFor="contact-message">
            Message <span>*</span>
          </label>

          <textarea
            id="contact-message"
            name="message"
            rows={6}
            placeholder="Write your message..."
            value={form.message}
            onChange={handleChange}
            disabled={loading}
            required
          />
        </div>
      </div>

      {/* ERROR */}

      {error && (
        <div className={styles.error}>
          {error}
        </div>
      )}

      {/* SUCCESS */}

      {sent && !error && (
        <div className={styles.success}>
          Your message has been sent successfully.
        </div>
      )}

      {/* BUTTON */}

      <button
        className="btn btn-primary"
        type="submit"
        disabled={loading}
      >
        {loading
          ? "Sending..."
          : sent
            ? "Message Sent"
            : "Send Message"}

        <img
          src="/images/paw-white.png"
          width={30}
          height={30}
          alt=""
        />
      </button>
    </form>
  );
}