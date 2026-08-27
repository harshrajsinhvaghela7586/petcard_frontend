import {
  Heart,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";

import CTA from "../../components/CTA";
import styles from "./About.module.css";

const stats = [
  {
    title: "Pet",
    text: "Focused experience",
  },
  {
    title: "Simple",
    text: "Designed for everyday use",
  },
  {
    title: "One",
    text: "Organized place",
  },
  {
    title: "Care",
    text: "At the center of the product",
  },
];

const beliefs = [
  {
    icon: Heart,
    title: "Love for Pets",
    text: "Every feature starts with making pet care a little easier.",
  },
  {
    icon: ShieldCheck,
    title: "Trust & Privacy",
    text: "We aim to treat pet and user information responsibly.",
  },
  {
    icon: Sparkles,
    title: "Simplicity",
    text: "Clear experiences without unnecessary complexity.",
  },
  {
    icon: Users,
    title: "Pet Parents First",
    text: "Designed around real everyday pet-care needs.",
  },
];

const missionItems = [
  "Care",
  "Organization",
  "Peace of mind",
];

export default function About() {
  return (
    <>
      {/* =====================================================
          HERO
          ===================================================== */}

      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroGrid}>
            {/* Hero Content */}
            <div className={styles.heroContent}>
              <div className={styles.eyebrow}>
                About PetCard
              </div>

              <h1 className={styles.heroTitle}>
                Making pet care feel{" "}
                <span>more organized.</span>
              </h1>

              <p className={styles.heroDescription}>
                PetCard is being built to give pet parents a
                simple place to organize important information
                about their pets and stay on top of everyday
                care.
              </p>
            </div>

            {/* Hero Visual */}
            <div className={styles.petVisual}>
              <div
                className={styles.petOrb}
                aria-hidden="true"
              />

              <div className={styles.petCard}>
                <div className={styles.screenTop}>
                  <span>PetCard</span>
                  <span>♥</span>
                </div>

                <div
                  className={styles.petAvatar}
                  aria-hidden="true"
                >
                  🐱
                </div>

                <h3>Our Mission</h3>

                <div className={styles.breed}>
                  Simple · Helpful · Pet-first
                </div>

                {missionItems.map((item) => (
                  <div
                    className={styles.miniRow}
                    key={item}
                  >
                    <span>{item}</span>
                    <b aria-hidden="true">✓</b>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          STATS
          ===================================================== */}

      <section className={styles.statsSection}>
        <div className="container">
          <div className={styles.stats}>
            {stats.map(({ title, text }) => (
              <article
                className={styles.stat}
                key={title}
              >
                <strong>{title}</strong>
                <span>{text}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          WHAT WE BELIEVE
          ===================================================== */}

      <section className={styles.beliefsSection}>
        <div className="container">
          <div className={styles.sectionHeading}>
            <div className={styles.eyebrow}>
              What We Believe
            </div>

            <h2 className={styles.sectionTitle}>
              Built around{" "}
              <span>pet parents.</span>
            </h2>

            <p className={styles.sectionSubtitle}>
              Until official company copy is finalized, this
              section intentionally uses broad brand messaging
              rather than invented founder or company claims.
            </p>
          </div>

          <div className={styles.beliefGrid}>
            {beliefs.map(
              ({
                icon: Icon,
                title,
                text,
              }) => (
                <article
                  className={styles.beliefCard}
                  key={title}
                >
                  <div className={styles.beliefIcon}>
                    <Icon size={24} />
                  </div>

                  <h3>{title}</h3>

                  <p>{text}</p>
                </article>
              )
            )}
          </div>
        </div>
      </section>

      {/* =====================================================
          CTA
          ===================================================== */}

      <CTA
        title="A simpler way to care for your pet."
        text="PetCard is being built with everyday pet parents in mind."
      />
    </>
  );
}