"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, Home, PawPrint, Search } from "lucide-react";
import styles from "./NotFound.module.css";

export default function NotFound() {
  return (
    <main className={styles.page}>
      {/* Decorative background */}
      <div className={styles.backgroundGlow} aria-hidden="true" />
      <div className={styles.backgroundGlowTwo} aria-hidden="true" />

      <div className={styles.pawOne} aria-hidden="true">
        <PawPrint size={72} fill="currentColor" />
      </div>

      <div className={styles.pawTwo} aria-hidden="true">
        <PawPrint size={48} fill="currentColor" />
      </div>

      <div className={styles.pawThree} aria-hidden="true">
        <PawPrint size={38} fill="currentColor" />
      </div>

      <div className={styles.container}>
        <section className={styles.errorSection}>
          {/* Left content */}
          <div className={styles.content}>
            <div className={styles.eyebrow}>
              <PawPrint
                size={14}
                fill="currentColor"
              />
              Lost in PetCard
            </div>

            <div className={styles.errorNumber}>
              <span>4</span>

              <div className={styles.errorPaw}>
                <PawPrint
                  size={86}
                  strokeWidth={1.8}
                  fill="currentColor"
                />
              </div>

              <span>4</span>
            </div>

            <h1>
              Oops! This page
              <span> wandered off.</span>
            </h1>

            <p>
              Looks like the page you&apos;re looking for
              has gone on a little adventure. Don&apos;t
              worry — we&apos;ll help you find your way back
              home.
            </p>

            <div className={styles.actions}>
              <Link
                href="/"
                className="btn btn-primary"
              >
                <Home size={17} />
                Back Home
              </Link>

              <Link
                href="/features"
                className="btn btn-outline"
              >
                Explore Features
                <ArrowRight size={17} />
              </Link>
            </div>

            <Link
              href="/"
              className={styles.backLink}
            >
              <ArrowLeft size={15} />
              Return to PetCard
            </Link>
          </div>

          {/* Right visual */}
          <div className={styles.visual}>
            <div className={styles.visualGlow} />

            <div className={styles.dashedRing} />
            <div className={styles.dashedRingSmall} />

            {/* Floating paw */}
            <div
              className={`${styles.floatingPaw} ${styles.floatingPawTop}`}
            >
              <PawPrint
                size={24}
                fill="currentColor"
              />
            </div>

            <div
              className={`${styles.floatingPaw} ${styles.floatingPawRight}`}
            >
              <PawPrint
                size={19}
                fill="currentColor"
              />
            </div>

            {/* Pet card */}
            <div className={styles.petCard}>
              <div className={styles.petCardTop}>
                <span>PetCard</span>

                <span className={styles.status}>
                  <span />
                  Searching...
                </span>
              </div>

              <div className={styles.petImageArea}>
                <div className={styles.petCircle}>
                  <span className={styles.petEmoji}>
                    🐶
                  </span>
                </div>

                <div className={styles.searchBubble}>
                  <Search size={16} />
                </div>
              </div>

              <div className={styles.petInfo}>
                <span className={styles.petLabel}>
                  PAGE NOT FOUND
                </span>

                <h2>
                  Where did this page go?
                </h2>

                <p>
                  Our little explorer couldn&apos;t find the
                  page either.
                </p>
              </div>

              <div className={styles.petFooter}>
                <div>
                  <PawPrint
                    size={14}
                    fill="currentColor"
                  />
                  <span>
                    Let&apos;s get you home
                  </span>
                </div>

                <ArrowRight size={16} />
              </div>
            </div>

            {/* Small floating mini cards */}
            <div
              className={`${styles.miniCard} ${styles.miniCardOne}`}
            >
              <PawPrint
                size={15}
                fill="currentColor"
              />
              <span>PetCard</span>
            </div>

            <div
              className={`${styles.miniCard} ${styles.miniCardTwo}`}
            >
              <span className={styles.miniDot} />
              <span>Searching...</span>
            </div>
          </div>
        </section>

        {/* Bottom quick links */}
        <section className={styles.quickSection}>
          <div className={styles.quickHeading}>
            <span>Need somewhere to go?</span>
          </div>

          <div className={styles.quickLinks}>
            <Link
              href="/features"
              className={styles.quickCard}
            >
              <div className={styles.quickIcon}>
                <PawPrint
                  size={20}
                  fill="currentColor"
                />
              </div>

              <div>
                <strong>
                  Explore Features
                </strong>

                <span>
                  Discover the PetCard experience
                </span>
              </div>

              <ArrowRight size={17} />
            </Link>

            <Link
              href="/how-it-works"
              className={styles.quickCard}
            >
              <div className={styles.quickIcon}>
                <Search size={19} />
              </div>

              <div>
                <strong>
                  How It Works
                </strong>

                <span>
                  See how PetCard works
                </span>
              </div>

              <ArrowRight size={17} />
            </Link>

            <Link
              href="/contact"
              className={styles.quickCard}
            >
              <div className={styles.quickIcon}>
                <Home size={19} />
              </div>

              <div>
                <strong>
                  Contact Us
                </strong>

                <span>
                  Need a little help?
                </span>
              </div>

              <ArrowRight size={17} />
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}