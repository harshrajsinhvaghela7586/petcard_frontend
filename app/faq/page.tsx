import Link from "next/link";
import FAQList from "../../components/FAQList";
import styles from "./FAQ.module.css";
import Image from "next/image";

export default function FAQ() {
  return (
    <>
      {/* =====================================================
          FAQ HERO
          ===================================================== */}

      <section className={styles.hero}>
        <div className={styles.heroGlow} />

        <div className={`${styles.container} ${styles.heroInner}`}>
         
          <h1>
            Everything you need to know{" "}
            <span>about PetCard.</span>
          </h1>

          <p>
            Find answers to common questions about PetCard,
            its features, and how the platform is designed
            to make everyday pet care easier.
          </p>

         
        </div>
      </section>

      {/* =====================================================
          FAQ LIST
          ===================================================== */}

      <section className={styles.faqSection}>
        <div className={styles.container}>
          <div className={styles.faqHeader}>
            <div>
             

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

          </div>
      </section>

        <section
        className={`${styles.finalDownload} ${styles.homeReveal}`}
        id="download-app"
        data-home-reveal="download"
      >
        <div className={`${styles.container} container ${styles.finalDownloadCard}`}>

          {/* ================= PETS ================= */}

          <div className={styles.finalPets}>
            <Image
              src="/images/HowItWorksFooter.png"
              alt="PETCARD pets"
              fill
              priority

              className={styles.finalPetsImage}
            />
          </div>


          {/* ================= COPY ================= */}

          <div className={styles.finalCopy}>

            <h2>
             Still have a question?
            </h2>

            <p>
               We&apos;re here to help you understand the
              <br className={styles.desktopBreak} />
            PetCard experience better.
            </p>

          </div>


          {/* ================= STORE BADGES ================= */}

          <div className={styles.finalButtons}>
            <Link href="/contact#contact-form" className="btn btn-outline">
              Get In Touch
            </Link>

            <Link href="/features#feature-overview" className="btn btn-outline">
             Explore PETCARD
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}