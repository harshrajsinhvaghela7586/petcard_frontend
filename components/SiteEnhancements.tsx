"use client";

import { useEffect } from "react";

export default function SiteEnhancements() {
  useEffect(() => {
    const progress = document.createElement("div");
    progress.className = "scroll-progress";
    progress.setAttribute("aria-hidden", "true");

    const topButton = document.createElement("button");
    topButton.className = "back-to-top";
    topButton.type = "button";
    topButton.setAttribute("aria-label", "Back to top");
    topButton.innerHTML = '<span class="back-to-top-icon"></span>';

    const handleTopClick = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };

    topButton.addEventListener("click", handleTopClick);

    document.body.append(progress, topButton);

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
      targets.forEach((element) => observer.observe(element));
    } else {
      targets.forEach((element) => {
        element.classList.add("is-visible");
      });
    }

    const updateScrollUI = () => {
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;

      const progressValue =
        scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;

      progress.style.width = `${Math.min(
        100,
        Math.max(0, progressValue)
      )}%`;

      topButton.classList.toggle("show", window.scrollY > 520);
    };

    updateScrollUI();

    window.addEventListener("scroll", updateScrollUI, {
      passive: true,
    });

    window.addEventListener("resize", updateScrollUI, {
      passive: true,
    });

    return () => {
      observer?.disconnect();

      window.removeEventListener("scroll", updateScrollUI);
      window.removeEventListener("resize", updateScrollUI);

      topButton.removeEventListener("click", handleTopClick);

      progress.remove();
      topButton.remove();
    };
  }, []);

  return null;
}