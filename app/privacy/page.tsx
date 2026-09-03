"use client";

import {
  ArrowDown,
  ArrowRight,
  CheckCircle2,
  Database,
  FileText,
  Eye,
  LockKeyhole,
  Mail,
  PawPrint,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { useEffect, useState } from "react";

import styles from "./Privacy.module.css";

const sections = [
  {
    number: "01",
    icon: Database,
    title: "Information We Collect",
    intro:
      "PetCard may collect information that helps us provide, maintain and improve the website and app experience.",
    items: [
      "Account and profile information such as name, email address and other details provided during registration.",
      "Pet information such as pet name, profile details, health-related information, vaccination records, reminders and other information you choose to add.",
      "Information submitted through forms, support requests, feedback or other direct interactions with PetCard.",
      "Technical and device information such as browser type, device information, usage activity and diagnostic information where applicable.",
      "Analytics and performance information used to understand how the website and app are used and to improve the overall experience.",
    ],
  },
  {
    number: "02",
    icon: UserRound,
    title: "How We Use Information",
    intro:
      "Information may be used to operate the PetCard experience, support users and improve our products and services.",
    items: [
      "To create and manage user accounts and pet profiles.",
      "To provide features such as digital pet identity, health records, reminders, pet information and related services.",
      "To respond to questions, support requests, feedback and other communications.",
      "To maintain, secure, troubleshoot and improve the website, application and overall user experience.",
      "To understand product usage and improve features, performance and reliability.",
      "To meet applicable legal, security and operational requirements where required.",
    ],
  },
  {
    number: "03",
    icon: LockKeyhole,
    title: "Data Security",
    intro:
      "PetCard aims to handle user and pet information responsibly and to apply reasonable measures to protect information from unauthorized access, misuse or loss.",
    items: [
      "Access to information should be limited to authorized systems, personnel or service providers where necessary.",
      "Reasonable technical and organizational safeguards may be used to help protect information.",
      "No online service can guarantee absolute security, so users should also take reasonable steps to protect account credentials and access.",
    ],
  },
  {
    number: "04",
    icon: ShieldCheck,
    title: "Sharing & Disclosure",
    intro:
      "PetCard does not intend to use or disclose personal information beyond what is reasonably required to operate the service, support users and meet applicable obligations.",
    items: [
      "Information may be shared with trusted service providers when necessary to host, operate, secure, analyze or support the PetCard service.",
      "Information may be disclosed when required by applicable law, regulation, legal process or to protect the rights, safety and security of users or the service.",
      "Where third-party services are used, their handling of information may also be subject to their own privacy terms and policies.",
    ],
  },
  {
    number: "05",
    icon: FileText,
    title: "Your Choices & Rights",
    intro:
      "Depending on applicable law and the final PetCard product policy, users may have choices regarding the information they provide and how it is handled.",
    items: [
      "You may be able to review or update certain profile and pet information through the product.",
      "You may contact PetCard regarding questions, corrections or requests relating to your information.",
      "You may choose not to provide certain optional information, although some features may require specific information to function.",
      "Requests relating to account deletion or data removal will be handled according to the final PetCard data-retention and deletion policy and applicable law.",
    ],
  },
  {
    number: "06",
    icon: Mail,
    title: "Contact",
    intro:
      "For privacy-related questions, requests or concerns, please contact the PetCard team using the official support email below.",
    items: [
      "Email: info@petcard.in",
      "For account, privacy or data-related requests, please include enough information for the PetCard team to understand and process your request.",
      "The final production version of this page should include any additional official legal contact details required by PetCard.",
    ],
  },
];

export default function Privacy() {
  const [openSection, setOpenSection] = useState<string>("01");
  const [activeSection, setActiveSection] = useState<string>("01");

  useEffect(() => {
    const revealElements =
      document.querySelectorAll<HTMLElement>(
        `.${styles.reveal}`
      );

    const sectionElements =
      document.querySelectorAll<HTMLElement>(
        `.${styles.policySection}`
      );

    const reducedMotion =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

    if (reducedMotion) {
      revealElements.forEach((element) =>
        element.classList.add(styles.visible)
      );
    } else {
      const revealObserver =
        new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (!entry.isIntersecting) return;

              entry.target.classList.add(
                styles.visible
              );

              revealObserver.unobserve(
                entry.target
              );
            });
          },
          {
            threshold: 0.12,
            rootMargin:
              "0px 0px -60px 0px",
          }
        );

      revealElements.forEach((element) =>
        revealObserver.observe(element)
      );

      return () => {
        revealObserver.disconnect();
      };
    }

    const activeObserver =
      new IntersectionObserver(
        (entries) => {
          const visibleEntries =
            entries
              .filter(
                (entry) =>
                  entry.isIntersecting
              )
              .sort(
                (a, b) =>
                  b.intersectionRatio -
                  a.intersectionRatio
              );

          const visible =
            visibleEntries[0];

          if (!visible) return;

          const id =
            (visible.target as HTMLElement)
              .dataset.section;

          if (id) {
            setActiveSection(id);
          }
        },
        {
          threshold: [
            0.15,
            0.35,
            0.55,
          ],
          rootMargin:
            "-12% 0px -50% 0px",
        }
      );

    sectionElements.forEach((element) =>
      activeObserver.observe(element)
    );

    return () => {
      activeObserver.disconnect();
    };
  }, []);

  const scrollToSection = (
    number: string
  ) => {
    document
      .getElementById(
        `privacy-${number}`
      )
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

    setOpenSection(number);
  };

  return (
    <main className={styles.page}>
      {/* ==================================================
          BACKGROUND DECOR
          ================================================== */}

      <div
        className={styles.glowOne}
        aria-hidden="true"
      />

      <div
        className={styles.glowTwo}
        aria-hidden="true"
      />

      <div
        className={styles.pawWatermark}
        aria-hidden="true"
      >
        <PawPrint
          size={150}
          fill="currentColor"
        />
      </div>

      <div className={styles.container}>
        {/* ==================================================
            HERO
            ================================================== */}

        <header
          className={`${styles.hero} ${styles.reveal}`}
        >
          
          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
             

              <h1>
                Privacy,
                <br />
                made{" "}
                <span>simple.</span>
              </h1>

              <p>
                PetCard is committed to building a simple,
                useful and responsible pet-care experience.
                This page explains the types of information
                that may be handled through the PetCard
                website and application and the general
                purposes for which that information may be
                used.
              </p>

              <div className={styles.heroActions}>
                <button
                  type="button"
                  onClick={() =>
                    scrollToSection("01")
                  }
                  className="btn btn-primary"
                >
                  Explore Privacy
                  <img src="/images/paw-white.png"
                 height={35}
                 width={35}/>
                </button>

                <a
                  href="mailto:info@petcard.in"
                  className="btn btn-outline"
                >
                  Ask a question
                  <ArrowRight size={14} />
                </a>
              </div>
            </div>

            {/* TRUST CARD */}
            <div className={styles.trustArea}>
              <div
                className={styles.trustHalo}
                aria-hidden="true"
              />

              <div className={styles.trustCard}>
                <div className={styles.trustHeader}>
                  <div
                    className={
                      styles.trustIcon
                    }
                  >
                    <ShieldCheck size={26} />
                  </div>

                  <div>
                    <span>
                      PETCARD
                    </span>
                    <strong>
                      TRUST CENTER
                    </strong>
                  </div>
                </div>

                <div
                  className={
                    styles.trustHeadline
                  }
                >
                  Your privacy
                  <br />
                  <span>
                    matters.
                  </span>
                </div>

                <div
                  className={
                    styles.trustStats
                  }
                >
                  <div>
                    <strong>
                      06
                    </strong>
                    <span>
                      Policy
                      sections
                    </span>
                  </div>

                  <div>
                    <strong>
                      18
                    </strong>
                    <span>
                      Key
                      points
                    </span>
                  </div>

                  <div>
                    <strong>
                      01
                    </strong>
                    <span>
                      Support
                      email
                    </span>
                  </div>
                </div>

                <div
                  className={
                    styles.trustFooter
                  }
                >
                  <CheckCircle2
                    size={15}
                  />

                  <span>
                    Clear information
                    practices
                  </span>
                </div>

                <div
                  className={
                    styles.trustPaw
                  }
                >
                  <PawPrint
                    size={75}
                    fill="currentColor"
                  />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* ==================================================
            IMPORTANT NOTICE
            ================================================== */}

        <section
          className={`${styles.notice} ${styles.reveal}`}
        >
          <div
            className={styles.noticeIcon}
          >
            <Eye size={19} />
          </div>

          <div>
            <span>
              Important Notice
            </span>

            <p>
              This page currently contains draft
              promotional-site content. Before production
              launch, it should be replaced or reviewed
              against the officially approved PetCard
              Privacy Policy, including the final data
              practices, legal requirements, retention
              periods, third-party services and user
              rights applicable to the product.
            </p>
          </div>

          <PawPrint
            className={styles.noticePaw}
            size={45}
            fill="currentColor"
          />
        </section>

        {/* ==================================================
            MOBILE SECTION NAV
            ================================================== */}

        <div
          className={`${styles.mobileNav} ${styles.reveal}`}
        >
          {sections.map((section) => (
            <button
              key={section.number}
              type="button"
              className={
                activeSection ===
                section.number
                  ? styles.mobileNavActive
                  : ""
              }
              onClick={() =>
                scrollToSection(
                  section.number
                )
              }
            >
              {section.number}
            </button>
          ))}
        </div>

        {/* ==================================================
            POLICY AREA
            ================================================== */}

        <section
          className={`${styles.policyArea} ${styles.reveal}`}
        >
          {/* TIMELINE */}
          <aside
            className={styles.timeline}
          >
            <div
              className={
                styles.timelineTitle
              }
            >
              <PawPrint
                size={15}
                fill="currentColor"
              />

              <span>
                Privacy journey
              </span>
            </div>

            <div
              className={
                styles.timelineItems
              }
            >
              <div
                className={
                  styles.timelineLine
                }
              />

              {sections.map(
                (section) => {
                  const isActive =
                    activeSection ===
                    section.number;

                  return (
                    <button
                      key={
                        section.number
                      }
                      type="button"
                      className={`${styles.timelineItem} ${
                        isActive
                          ? styles.timelineActive
                          : ""
                      }`}
                      onClick={() =>
                        scrollToSection(
                          section.number
                        )
                      }
                    >
                      <span
                        className={
                          styles.timelineDot
                        }
                      />

                      <span
                        className={
                          styles.timelineNumber
                        }
                      >
                        {section.number}
                      </span>

                      <span
                        className={
                          styles.timelineName
                        }
                      >
                        {
                          section.title
                        }
                      </span>
                    </button>
                  );
                }
              )}
            </div>
          </aside>

          {/* CONTENT */}
          <div className={styles.cards}>
            {sections.map(
              (
                section,
                index
              ) => {
                const Icon =
                  section.icon;

                const isOpen =
                  openSection ===
                  section.number;

                return (
                  <article
                    id={`privacy-${section.number}`}
                    data-section={
                      section.number
                    }
                    className={`${styles.policySection} ${styles.reveal}`}
                    style={
                      {
                        "--delay": `${index * 70}ms`,
                      } as React.CSSProperties
                    }
                    key={
                      section.number
                    }
                  >
                    <div
                      className={
                        styles.pawConnector
                      }
                    >
                      <PawPrint
                        size={18}
                        fill="currentColor"
                      />
                    </div>

                    <button
                      type="button"
                      className={
                        styles.cardHeader
                      }
                      onClick={() =>
                        setOpenSection(
                          isOpen
                            ? ""
                            : section.number
                        )
                      }
                    >
                      <div
                        className={
                          styles.sectionNumber
                        }
                      >
                        {section.number}
                      </div>

                      <div
                        className={
                          styles.sectionIcon
                        }
                      >
                        <Icon
                          size={21}
                        />
                      </div>

                      <div
                        className={
                          styles.sectionHeading
                        }
                      >
                        

                        <h2>
                          {
                            section.title
                          }
                        </h2>
                      </div>

                      <div
                        className={`${styles.expandIcon} ${
                          isOpen
                            ? styles.expandIconOpen
                            : ""
                        }`}
                      >
                        <ArrowDown
                          size={17}
                        />
                      </div>
                    </button>

                    <div
                      className={`${styles.expandArea} ${
                        isOpen
                          ? styles.expandAreaOpen
                          : ""
                      }`}
                    >
                      <div
                        className={
                          styles.cardContent
                        }
                      >
                        <p
                          className={
                            styles.intro
                          }
                        >
                          {
                            section.intro
                          }
                        </p>

                        <div
                          className={
                            styles.detailGrid
                          }
                        >
                          {section.items.map(
                            (
                              item,
                              itemIndex
                            ) => (
                              <div
                                className={
                                  styles.detailItem
                                }
                                key={
                                  item
                                }
                              >
                                <div
                                  className={
                                    styles.detailIcon
                                  }
                                >
                                  <CheckCircle2
                                    size={15}
                                  />
                                </div>

                                <div>
                                  <span
                                    className={
                                      styles.detailNumber
                                    }
                                  >
                                    0
                                    {itemIndex +
                                      1}
                                  </span>

                                  <p>
                                    {
                                      item
                                    }
                                  </p>
                                </div>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  </article>
                );
              }
            )}

            {/* =================================================
                CONTACT
                ================================================= */}

            <section
              className={`${styles.contactCard} ${styles.reveal}`}
            >
              <div
                className={
                  styles.contactPaws
                }
              >
                <PawPrint
                  size={90}
                  fill="currentColor"
                />
              </div>

              <div
                className={
                  styles.contactIcon
                }
              >
                <Mail size={23} />
              </div>

              <div
                className={
                  styles.contactCopy
                }
              >
                <span>
                  Privacy Support
                </span>

                <h2>
                  Still have a
                  question?
                  <strong>
                    {" "}
                    Talk to us.
                  </strong>
                </h2>

                <p>
                  For privacy-related questions
                  or requests, reach out to the
                  PetCard team using the official
                  support email.
                </p>
              </div>

              <a
                href="mailto:info@petcard.in"
                className={
                  styles.contactButton
                }
              >
                info@petcard.in
                <ArrowRight size={15} />
              </a>
            </section>

            <div
              className={`${styles.footerNote} ${styles.reveal}`}
            >
              <span>
                Last updated: To be confirmed
              </span>

              <span>
                <LockKeyhole size={12} />
                PetCard Privacy
              </span>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}