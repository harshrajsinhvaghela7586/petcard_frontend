"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  [
    "What is PetCard?",
    "PetCard is a digital pet information platform designed to help pet parents keep important details about their pets organized and accessible.",
  ],
  [
    "What information can I keep in PetCard?",
    "You can organize relevant pet information such as profile details, health information, vaccination records, reminders and other useful notes, depending on the features available in the app.",
  ],
  [
    "Can I manage multiple pets?",
    "Yes, PetCard is designed to support pet parents who have more than one pet.",
  ],
  [
    "Can I set reminders?",
    "PetCard can help you keep track of important pet-related tasks and reminders.",
  ],
  [
    "Is my information secure?",
    "PetCard is designed with privacy and responsible handling of user information in mind. Final privacy details should be updated from the official product policy before launch.",
  ],
  [
    "Will PetCard be available on Android and iOS?",
    "The mobile app is currently under development. Store links can be added here once the app is officially launched.",
  ],
  [
    "How can I contact PetCard?",
    "Use the Contact Us page to reach the PetCard team through the official contact details provided there.",
  ],
  [
    "Can I share feedback or suggest a feature?",
    "Yes. Pet parents can use the contact channel to share feedback and product suggestions.",
  ],
];

export default function FAQList() {
  const [open, setOpen] = useState<number>(0);

  const toggleFAQ = (index: number) => {
    setOpen((current) => (current === index ? -1 : index));
  };

  return (
    <div className="faq-list">
      {faqs.map(([question, answer], index) => {
        const isOpen = open === index;

        return (
          <div
            className={`faq-item ${isOpen ? "is-open" : ""}`}
            key={question}
          >
            <button
              type="button"
              className="faq-q"
              onClick={() => toggleFAQ(index)}
              aria-expanded={isOpen}
            >
              <span>{question}</span>

              <span className="faq-icon">
                <ChevronDown
                  size={18}
                  strokeWidth={2.2}
                />
              </span>
            </button>

            <div
              className="faq-answer-wrap"
              aria-hidden={!isOpen}
            >
              <div className="faq-a">
                {answer}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}