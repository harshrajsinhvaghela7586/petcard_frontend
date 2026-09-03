import ContactForm from "../../components/ContactForm";
import CTA from "../../components/CTA";

import {
  ArrowRight,
  Clock,
  Heart,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
} from "lucide-react";

import styles from "./Contact.module.css";

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    description: "info@petcard.in",
    href: "mailto:info@petcard.in",
  },
  {
    icon: Phone,
    title: "Phone",
    description: "Official phone number will be added here",
  },
  {
    icon: MapPin,
    title: "Location",
    description: "Official business address will be added here",
  },
  {
    icon: Clock,
    title: "Hours",
    description: "Official working hours will be added here",
  },
];

export default function Contact() {
  return (
    <main className={styles.page}>
      {/* =====================================================
          HERO
          ===================================================== */}

      <section className={styles.hero}>
        <div className={styles.heroGlow} />

        <div
          className={`${styles.heroPaw} ${styles.heroPawOne}`}
          aria-hidden="true"
        >
          🐾
        </div>

        <div
          className={`${styles.heroPaw} ${styles.heroPawTwo}`}
          aria-hidden="true"
        >
          ✦
        </div>

        <div className="container">
          <div className={styles.heroGrid}>
            <div className={styles.heroContent}>
             

              <h1>
                We&apos;d love to{" "}
                <span>hear from you.</span>
              </h1>

              <p>
                Have a question, suggestion or feedback about PetCard?
                Send us a message and reach out to us at{" "}
                <a
                  href="mailto:info@petcard.in"
                  className={styles.emailLink}
                >
                  info@petcard.in
                </a>
                .
              </p>

              <a
                href="#contact-form"
                className="btn btn-primary"
                style={{ marginTop: 26 }}
              >
                Send Us a Message
                <ArrowRight size={17} />
              </a>

              <div className={styles.heroTrust}>
                <ShieldCheck size={16} />

                <span>
                  Questions · Feedback · Support
                </span>
              </div>
            </div>

            {/* =================================================
                HERO VISUAL
                ================================================= */}

            <div className={styles.heroVisual}>
              <div className={styles.contactOrb} />

              <div className={styles.contactCard}>
                <div className={styles.contactCardTop}>
                  <span>PetCard</span>

                  <Heart
                    size={16}
                    fill="currentColor"
                  />
                </div>

                <div className={styles.contactAvatar}>
                  🐶
                </div>

                <h3>
                  We&apos;re here to help
                </h3>

                <span className={styles.contactSubtitle}>
                  Questions · Feedback · Support
                </span>

                <div className={styles.contactMiniRows}>
                  <div>
                    <span>Email</span>
                    <b>→</b>
                  </div>

                  <div>
                    <span>Support</span>
                    <b>→</b>
                  </div>

                  <div>
                    <span>Feedback</span>
                    <b>→</b>
                  </div>
                </div>

                <div className={styles.contactCardFooter}>
                  <span>We&apos;re listening</span>

                  <span className={styles.onlineDot} />
                </div>
              </div>

              <div
                className={`${styles.floatingChip} ${styles.chipOne}`}
              >
                💌 Email us
              </div>

              <div
                className={`${styles.floatingChip} ${styles.chipTwo}`}
              >
                🐾 Pet-first support
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          CONTACT AREA
          ===================================================== */}

      <section
        className={styles.contactSection}
        id="contact-form"
      >
        <div className="container">
          <div className={styles.contactGrid}>
            {/* FORM */}

            <div className={styles.formWrap}>
             

              <h2 className={styles.sectionTitle}>
                Tell us{" "}
                <span>what&apos;s on your mind.</span>
              </h2>

              <p className={styles.sectionSubtitle}>
                Whether you have a question, suggestion, feedback or
                something you would like to share, we&apos;d love to hear
                from you.
              </p>

              <div className={styles.formContainer}>
                <ContactForm />
              </div>
            </div>

            {/* CONTACT INFO */}

            <aside className={styles.infoCard}>
              <div className={styles.infoHeader}>
                <div className={styles.infoIcon}>
                  <Heart
                    size={19}
                    fill="currentColor"
                  />
                </div>

                <div>
                  <span className={styles.infoLabel}>
                    Get in Touch
                  </span>

                  <h2>
                    We&apos;re{" "}
                    <span>here for you.</span>
                  </h2>
                </div>
              </div>

              <p className={styles.infoDescription}>
                Have something to ask, share or suggest? Reach out
                through any of the channels below.
              </p>

              <div className={styles.infoList}>
                {contactInfo.map(
                  ({
                    icon: Icon,
                    title,
                    description,
                    href,
                  }) => (
                    <div
                      className={styles.infoItem}
                      key={title}
                    >
                      <div className={styles.infoItemIcon}>
                        <Icon size={20} />
                      </div>

                      <div className={styles.infoItemContent}>
                        <strong>{title}</strong>

                        {href ? (
                          <a
                            href={href}
                            className={styles.infoEmail}
                          >
                            {description}
                          </a>
                        ) : (
                          <span>
                            {description}
                          </span>
                        )}
                      </div>
                    </div>
                  )
                )}
              </div>

              <div className={styles.infoFooter}>
                <Heart
                  size={15}
                  fill="currentColor"
                />

                <span>
                  We&apos;re always happy to hear your questions,
                  suggestions and feedback about PetCard.
                </span>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* =====================================================
          CTA
          ===================================================== */}

      <section className={styles.ctaSection}>
        <CTA
          title="Still have questions?"
          text="You can also check our FAQ section for common PetCard questions."
        />
      </section>
    </main>
  );
}