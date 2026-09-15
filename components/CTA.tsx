"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef } from "react";

import styles from "./CTA.module.css";

interface CTAProps {
  title?: string;
  text?: string;
}

export default function CTA({
  title = "Give Your Pet a Smarter Identity",
  text = "Discover PetCard and keep your pet's important information organized.",
}: CTAProps) {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotion) {
      section.classList.add(styles.isVisible);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        section.classList.add(styles.isVisible);
        observer.unobserve(section);
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
  <section
    ref={sectionRef}
    className={styles.section}
  >
    <div className="container">
      <div className={styles.cta}>

        {/* Decorative glow */}
        <div
          className={styles.glow}
          aria-hidden="true"
        />

        {/* LEFT — PET IMAGE */}
        <div
          className={styles.ctaPet}
          aria-hidden="true"
        >
          <div className={styles.ctaPetGlow} />

          <img
            src="/images/footer/pets.png"
            alt=""
            width={220}
            height={220}
          />
        </div>

        {/* CENTER — CONTENT */}
        <div className={styles.content}>
          <h2>{title}</h2>

          <p>{text}</p>
        </div>

        {/* RIGHT — BUTTON */}
        <Link
          className={`btn btn-outline ${styles.button}`}
          href="#download-app"
        >
          Download Our App

          <img
            src="/images/paw.png"
            width={20}
            height={20}
            alt=""
            aria-hidden="true"
          />
        </Link>

      </div>
    </div>
  </section>
);
}