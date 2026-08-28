import FAQList from "../../components/FAQList";
import styles from "./FAQ.module.css";

export default function FAQ() {
  return (
    <>
      {/* =====================================================
          FAQ HERO
          ===================================================== */}

      <section className={styles.hero}>
        <div className={styles.heroGlow} />

        <div className={`${styles.container} ${styles.heroInner}`}>
          <div className={styles.eyebrow}>
            Frequently Asked Questions
          </div>

          <h1>
            Everything you need to know{" "}
            <span>about PetCard.</span>
          </h1>

          <p>
            Find answers to common questions about PetCard,
            its features, and how the platform is designed
            to make everyday pet care easier.
          </p>

          <div className={styles.heroPaws}>
            <span>🐾</span>
            <span>✦</span>
            <span>🐾</span>
          </div>
        </div>
      </section>

      {/* =====================================================
          FAQ LIST
          ===================================================== */}

      <section className={styles.faqSection}>
        <div className={styles.container}>
          <div className={styles.faqHeader}>
            <div>
              <div className={styles.sectionEyebrow}>
                Need Help?
              </div>

              <h2>
                Questions, answered{" "}
                <span>simply.</span>
              </h2>
            </div>

            <p>
              Browse through the common questions below to
              learn more about the PetCard experience.
            </p>
          </div>

          <div className={styles.faqBox}>
            <FAQList />
          </div>

          <div className={styles.helpCard}>
            <div className={styles.helpIcon}>🐾</div>

            <div className={styles.helpContent}>
              <strong>Still have a question?</strong>

              <p>
                We&apos;re here to help you understand the
                PetCard experience better.
              </p>
            </div>

            <a href="/contact">
              Contact Us
              <img
                src="/images/paw-white.png"
                width={27}
                height={27}
                alt=""
              />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}