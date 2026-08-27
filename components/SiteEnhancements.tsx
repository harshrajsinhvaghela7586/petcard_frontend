"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function SiteEnhancements() {
  const [showTopButton, setShowTopButton] = useState(false);

  useEffect(() => {
    /* =====================================================
       Scroll Progress
       ===================================================== */

    const progress = document.createElement("div");

    progress.className = "scroll-progress";
    progress.setAttribute("aria-hidden", "true");

    document.body.appendChild(progress);

    /* =====================================================
       Reveal on Scroll
       ===================================================== */

    const targets = document.querySelectorAll<HTMLElement>(
      ".section, .page-hero-grid, .feature-card, .step, .stat, .cta, .info-card, .form-card, .faq-item, .pet-card, [data-reveal]"
    );

    targets.forEach((element) => {
      element.classList.add("reveal-on-scroll");
    });

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const observer = reducedMotion
      ? null
      : new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");

                observer?.unobserve(entry.target);
              }
            });
          },
          {
            threshold: 0.08,
            rootMargin: "0px 0px -35px",
          }
        );

    if (observer) {
      targets.forEach((element) => {
        observer.observe(element);
      });
    } else {
      targets.forEach((element) => {
        element.classList.add("is-visible");
      });
    }

    /* =====================================================
       Scroll UI
       ===================================================== */

    const updateScrollUI = () => {
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;

      const progressValue =
        scrollable > 0
          ? (window.scrollY / scrollable) * 100
          : 0;

      progress.style.width = `${Math.min(
        100,
        Math.max(0, progressValue)
      )}%`;

      setShowTopButton(window.scrollY > 520);
    };

    updateScrollUI();

    window.addEventListener("scroll", updateScrollUI, {
      passive: true,
    });

    window.addEventListener("resize", updateScrollUI, {
      passive: true,
    });

    /* =====================================================
       Cleanup
       ===================================================== */

    return () => {
      observer?.disconnect();

      window.removeEventListener("scroll", updateScrollUI);
      window.removeEventListener("resize", updateScrollUI);

      progress.remove();
    };
  }, []);

  /* =======================================================
     Back To Top
     ======================================================= */

  const handleTopClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      type="button"
      className={`back-to-top ${
        showTopButton ? "show" : ""
      }`}
      aria-label="Back to top"
      onClick={handleTopClick}
    >
      <ArrowUp
        size={21}
        strokeWidth={2.5}
      />
    </button>
  );
}