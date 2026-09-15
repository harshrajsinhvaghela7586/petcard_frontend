"use client";

import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import styles from "./FAQList.module.css";
interface FAQ {
  _id: string;
  question: string;
  answer: string;
  isActive: boolean;
}

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export default function FAQList() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const response = await fetch(`${API_URL}/faqs`, {
          method: "GET",
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error(
            `Failed to fetch FAQs: ${response.status}`
          );
        }

        const data = await response.json();

        console.log("FAQ API Response:", data);

        const faqList = Array.isArray(data)
          ? data
          : Array.isArray(data.faqs)
            ? data.faqs
            : [];

        // All active FAQs — no slice here
        const activeFaqs = faqList.filter(
          (item: FAQ) => item.isActive === true
        );

        setFaqs(activeFaqs);
      } catch (error) {
        console.error("Error fetching FAQs:", error);
        setFaqs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFaqs();
  }, []);

  if (loading) {
    return (
      <div className={styles.state}>
        <p>Loading FAQs...</p>
      </div>
    );
  }

  if (faqs.length === 0) {
    return (
      <div className={styles.state}>
        <p>No FAQs available at the moment.</p>
      </div>
    );
  }

  return (
    <div className={styles.list}>
      {faqs.map((faq) => (
        <details
          className={styles.item}
          key={faq._id}
        >
          <summary>
            <span>{faq.question}</span>

            <ChevronRight size={19} />
          </summary>

          <div className={styles.answer}>
            <p>{faq.answer}</p>
          </div>
        </details>
      ))}
    </div>
  );
}