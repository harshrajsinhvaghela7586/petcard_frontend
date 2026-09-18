"use client";

import ContactForm from "../../components/ContactForm";
import CTA from "../../components/CTA";

import {
  Clock,
  Heart,
  Mail,
  CheckCircle2,
  MapPin,
  Phone,
  ShieldCheck,
} from "lucide-react";

import styles from "./Contact.module.css";
import Image from "next/image";
import { useState } from "react";

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

const storeBadges = (
  <>
    <div className={styles.storeBadge}>
      <img
        src="/images/apple-logo.png"
        alt="Apple"
        className={styles.storeIconImage}
      />

      <span className={styles.storeText}>
        <small>Download on the</small>
        <b>App Store</b>
      </span>
    </div>

    <div className={`${styles.storeBadge} ${styles.googleBadge}`}>
      <img
        src="/images/google-play.png"
        alt="Google Play"
        className={styles.storeIconImage}
      />

      <span className={styles.storeText}>
        <small>GET IT ON</small>
        <b>Google Play</b>
      </span>
    </div>
  </>
);

export default function Contact() {
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubmitting, setNewsletterSubmitting] = useState(false);
  const [newsletterError, setNewsletterError] = useState("");

  const API_URL =
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:5000/api";

  const closeNewsletterModal = () => {
    setShowEmailForm(false);
    setIsSubscribed(false);
    setNewsletterEmail("");
    setNewsletterError("");
    setNewsletterSubmitting(false);
  };
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

              </a>


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
                  <img src="/images/AboutFooter.png" />
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
                Email us
              </div>

              <div
                className={`${styles.floatingChip} ${styles.chipTwo}`}
              >
                Pet-first support
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


      {/* =====================================================
    FINAL DOWNLOAD
    ===================================================== */}

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
              Have Something to Share? We're All Ears.
            </h2>

            <p>
              Questions, ideas, feedback, or simply want to connect? We'd love to hear from you.
            </p>

          </div>


          {/* ================= STORE BADGES ================= */}

          <div className={styles.finalButtons}>

            <button
              type="button"
              className="btn btn-outline"
              onClick={() => {
                document
                  .getElementById("contact-form")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Get in Touch
            </button>
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => {
                setIsSubscribed(false);
                setShowEmailForm(true);
              }}
            >
              Get PETCARD Updates
            </button>
          </div>

        </div>

        {/* MODAL — OUTSIDE finalDownloadCard */}
        {showEmailForm && (
          <div
            className={styles.emailModalOverlay}
           onClick={closeNewsletterModal}
          >
            <div
              className={styles.emailModal}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className={styles.emailModalClose}
                onClick={() => {
                  setShowEmailForm(false);
                  setIsSubscribed(false);
                }}
                aria-label="Close"
              >
                ×
              </button>

              {!isSubscribed ? (
                <>
                  <div className={styles.emailModalIcon}>
                    <img src="/images/paw.png" height={24} width={24} alt="PETCARD" />
                  </div>

                  <h3>Get PETCARD Updates</h3>

                  <p>
                    Stay updated with the latest PETCARD news,
                    features, and pet-care tips.
                  </p>

                <form
  className={styles.emailForm}
  onSubmit={async (e) => {
    e.preventDefault();

    const email = newsletterEmail.trim().toLowerCase();

    if (!email) {
      setNewsletterError("Email is required.");
      return;
    }

    setNewsletterSubmitting(true);
    setNewsletterError("");

    try {
      const response = await fetch(
        `${API_URL}/newsletter/subscribe`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setNewsletterError(
          data?.message ||
            "This email could not be subscribed."
        );
        return;
      }

      setIsSubscribed(true);

      setTimeout(() => {
        closeNewsletterModal();
      }, 3000);
    } catch (error) {
      console.error(
        "Newsletter subscription error:",
        error
      );

      setNewsletterError(
        "Something went wrong. Please try again."
      );
    } finally {
      setNewsletterSubmitting(false);
    }
  }}
>
  <div className={styles.emailInput}>
    <Mail size={18} />

    <input
      type="email"
      placeholder="Enter your email address"
      value={newsletterEmail}
      onChange={(e) => {
        setNewsletterEmail(e.target.value);
        setNewsletterError("");
      }}
      disabled={newsletterSubmitting}
      required
    />
  </div>

  {newsletterError && (
    <p className={styles.emailError}>
      {newsletterError}
    </p>
  )}

  <button
    type="submit"
    className={`${styles.notifyButton} btn btn-primary`}
    disabled={newsletterSubmitting}
  >
    {newsletterSubmitting
      ? "Subscribing..."
      : "Get PETCARD Updates"}
  </button>
</form>
                </>
              ) : (
                <div className={styles.emailSuccess}>
                  <div className={styles.emailSuccessIcon}>
                    <CheckCircle2 size={34} strokeWidth={2.4} />
                  </div>

                  <h3>Subscription Successful!</h3>

                  <p>
                    You&apos;re all set! Thank you for joining the PETCARD community.
                    We&apos;ll keep you updated with the latest news, features, and pet-care tips.
                  </p>

                 
                </div>
              )}
            </div>
          </div>
        )}
      </section>

    </main>
  );
}