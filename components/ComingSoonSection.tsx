import Link from "next/link";

import {
  ArrowRight,
  Bell,
  Heart,
  PawPrint,
  Send,
} from "lucide-react";

import styles from "./ComingSoon.module.css";

export default function ComingSoonSection() {
  return (
    <main className={styles.page}>
      {/* =====================================================
          HERO
          ===================================================== */}

      <section className={styles.hero}>
        <div className={styles.backgroundGlow} />

        <div className={styles.container}>
          <div className={styles.heroGrid}>
            {/* =================================================
                LEFT CONTENT
                ================================================= */}

            <div className={styles.content}>
            
              <h1>
                Something
                <br />
                Amazing is
                <br />
                on the{" "}
                <span>Way!</span>

                
              </h1>

              <p className={styles.description}>
                PetCard is your all-in-one app for
                digital pet identity, daily care,
                health records, memories and more —
                with AI by your side.
              </p>

              <div className={styles.launchText}>
                Launching Soon!

                
              </div>

              {/* Email CTA */}
              <div className={styles.emailForm}>
                <div className={styles.emailInput}>
                  <Send size={17} />

                  <input
                    type="email"
                    placeholder="Enter your email"
                    aria-label="Email address"
                  />
                </div>

                <button
                  type="button"
                  className="btn btn-primary"
                >
                  Notify Me
                  <Send size={15} />
                </button>
              </div>

              <div className={styles.notifyHint}>
                <Bell size={17} />

                <span>
                  Be the first to know when we launch.
                </span>

              
              </div>
            </div>

            {/* =================================================
                RIGHT IMAGE
                ================================================= */}

            <div className={styles.visual}>
              <div className={styles.visualLight} />

              <div className={styles.imageWrapper}>
                <img
                  src="/images/comming-soon.png"
                  alt="PetCard coming soon"
                />
              </div>

              <div
                className={`${styles.floatingPaw} ${styles.floatingPawOne}`}
              >
                <PawPrint
                  size={26}
                  fill="currentColor"
                />
              </div>

              <div
                className={`${styles.floatingPaw} ${styles.floatingPawTwo}`}
              >
                <PawPrint
                  size={19}
                  fill="currentColor"
                />
              </div>

              <div className={styles.heartDecoration}>
                ♡
              </div>
            </div>
          </div>
        </div>
      </section>
     
    </main>
  );
}