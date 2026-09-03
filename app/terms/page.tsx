"use client";

import {
  ArrowDown,
  ArrowRight,
  CheckCircle2,
  FileText,
  Gavel,
  LockKeyhole,
  Mail,
  PawPrint,
  ShieldCheck,
  UserRound,
  Scale,
  AlertCircle,
  PawPrintIcon,
} from "lucide-react";
import { useEffect, useState } from "react";

import styles from "./Terms.module.css";

const sections = [
  {
    number: "01",
    icon: FileText,
    title: "Use of the Service",
    shortTitle: "Use of Service",
    intro:
      "PetCard provides a digital pet-care experience designed to help users organize pet information, everyday care activities and related resources.",
    items: [
      "You may use the PetCard website and application only for lawful and intended personal or organizational purposes.",
      "You are responsible for using the features available to you in accordance with applicable laws and these terms.",
      "PetCard features, content and functionality may be updated, modified, suspended or discontinued as the product evolves.",
      "Some features may require an account, accurate information or additional permissions to work as intended.",
    ],
  },
  {
    number: "02",
    icon: UserRound,
    title: "Accounts & User Responsibilities",
    shortTitle: "Responsibilities",
    intro:
      "Users are expected to provide accurate information and use their account responsibly so that the PetCard experience remains reliable and safe.",
    items: [
      "You are responsible for maintaining the confidentiality of your account credentials and for activity performed through your account.",
      "Information entered into a pet profile, guardian profile or related feature should be accurate and kept reasonably up to date.",
      "You should not use PetCard to submit unlawful, misleading, abusive or harmful content.",
      "You should not attempt to interfere with, disrupt, reverse engineer or gain unauthorized access to the website, application or related systems.",
      "Where multiple guardians are supported, you should only provide access to people you trust and are authorized to involve in the pet-care process.",
    ],
  },
  {
    number: "03",
    icon: ShieldCheck,
    title: "Pet Information & User Content",
    shortTitle: "Pet Information",
    intro:
      "PetCard allows users to add and manage information related to their pets. You remain responsible for the information and content you choose to provide.",
    items: [
      "You are responsible for ensuring that information you provide about your pet is accurate to the best of your knowledge.",
      "Health, vaccination, medication and emergency information should be reviewed and updated when necessary.",
      "PetCard is intended to help organize information and should not be treated as a replacement for professional veterinary care or emergency services.",
      "You should not upload content that violates another person's rights or any applicable law.",
    ],
  },
  {
    number: "04",
    icon: LockKeyhole,
    title: "Privacy & Data",
    shortTitle: "Privacy & Data",
    intro:
      "Your use of PetCard is also subject to the applicable PetCard Privacy Policy, which describes how information may be collected, used and handled.",
    items: [
      "The Privacy Policy should be reviewed together with these Terms of Service.",
      "PetCard aims to use reasonable measures to protect information handled through the service.",
      "Users should protect their own login credentials and take reasonable steps to prevent unauthorized account access.",
      "Additional terms may apply where third-party services, payment systems, app stores or external platforms are involved.",
    ],
  },
  {
    number: "05",
    icon: Gavel,
    title: "Service Limitations & Changes",
    shortTitle: "Limitations",
    intro:
      "Like any digital platform, PetCard may occasionally experience maintenance, interruptions, technical limitations or changes in functionality.",
    items: [
      "PetCard may perform planned or emergency maintenance that temporarily affects availability.",
      "Features may change as the platform develops, including improvements, additions, removals or replacements.",
      "PetCard does not guarantee that every feature will be continuously available, error-free or suitable for every individual use case.",
      "Users should maintain appropriate backups or alternative access to information that is especially important to them.",
    ],
  },
  {
    number: "06",
    icon: Mail,
    title: "Contact & Support",
    shortTitle: "Contact",
    intro:
      "For questions about these Terms of Service, support requests or other concerns relating to PetCard, please contact the PetCard team.",
    items: [
      "Email: info@petcard.in",
      "When contacting support, provide enough context for the team to understand your request and respond appropriately.",
      "The final production version of these terms should include any additional official legal, company or jurisdiction-specific information required by PetCard.",
    ],
  },
];

export default function Terms() {
  const [openSection, setOpenSection] = useState("01");
  const [activeSection, setActiveSection] = useState("01");

  useEffect(() => {
    const revealTargets =
      document.querySelectorAll<HTMLElement>(
        `.${styles.reveal}`
      );

    const policySections =
      document.querySelectorAll<HTMLElement>(
        `.${styles.termsSection}`
      );

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotion) {
      revealTargets.forEach((element) =>
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

              revealObserver.unobserve(entry.target);
            });
          },
          {
            threshold: 0.12,
            rootMargin:
              "0px 0px -70px 0px",
          }
        );

      revealTargets.forEach((element) =>
        revealObserver.observe(element)
      );

      const activeObserver =
        new IntersectionObserver(
          (entries) => {
            const visible =
              entries
                .filter(
                  (entry) =>
                    entry.isIntersecting
                )
                .sort(
                  (a, b) =>
                    b.intersectionRatio -
                    a.intersectionRatio
                )[0];

            if (!visible) return;

            const section =
              (
                visible.target as HTMLElement
              ).dataset.section;

            if (section) {
              setActiveSection(section);
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

      policySections.forEach((section) =>
        activeObserver.observe(section)
      );

      return () => {
        revealObserver.disconnect();
        activeObserver.disconnect();
      };
    }

    return undefined;
  }, []);

  const scrollToSection = (
    number: string
  ) => {
    document
      .getElementById(`terms-${number}`)
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

    setOpenSection(number);
  };

  return (
    <main className={styles.page}>
      {/* ==================================================
          BACKGROUND
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
        className={styles.bigPaw}
        aria-hidden="true"
      >
        <PawPrint
          size={155}
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
                Terms,
                <br />
                made{" "}
                <span>clear.</span>
              </h1>

              <p>
                These Terms of Service describe the
                general rules and responsibilities that
                apply when using the PetCard website and
                application. They are intended to help
                establish a clear, safe and reliable
                experience for pet parents and other
                users of the platform.
              </p>

              <div
                className={styles.heroActions}
              >
                <button
                  type="button"
                  onClick={() =>
                    scrollToSection("01")
                  }
                  className="btn btn-primary"
                >
                  Explore Terms
                 <img src="/images/paw-white.png"
                 height={35}
                 width={35}/>
                </button>

                <a
                  href="mailto:info@petcard.in"
                  className="btn btn-outline"
                >
                  Have a question?
                  <ArrowRight size={14} />
                </a>
              </div>

              <div
                className={styles.heroPoints}
              >
                <span>
                  <ShieldCheck size={14} />
                  Responsible use
                </span>

                <span>
                  <UserRound size={14} />
                  User responsibilities
                </span>

                <span>
                  <Scale size={14} />
                  Clear expectations
                </span>
              </div>
            </div>

            {/* TERM CARD */}
            <div className={styles.visualArea}>
              <div
                className={styles.visualGlow}
                aria-hidden="true"
              />

              <div
                className={styles.visualCard}
              >
                <div
                  className={
                    styles.visualHeader
                  }
                >
                  <div
                    className={
                      styles.visualIcon
                    }
                  >
                    <Scale size={24} />
                  </div>

                  <div>
                    <span>
                      PETCARD
                    </span>

                    <strong>
                      TERMS OF SERVICE
                    </strong>
                  </div>
                </div>

                <div
                  className={
                    styles.visualTitle
                  }
                >
                  A simple guide
                  <br />
                  to using{" "}
                  <span>PetCard.</span>
                </div>

                <div
                  className={
                    styles.visualList
                  }
                >
                  <div>
                    <CheckCircle2 size={15} />
                    <span>
                      Use the service responsibly
                    </span>
                  </div>

                  <div>
                    <CheckCircle2 size={15} />
                    <span>
                      Keep your information accurate
                    </span>
                  </div>

                  <div>
                    <CheckCircle2 size={15} />
                    <span>
                      Respect other users
                    </span>
                  </div>

                  <div>
                    <CheckCircle2 size={15} />
                    <span>
                      Protect your account
                    </span>
                  </div>
                </div>

                <div
                  className={
                    styles.visualPaw
                  }
                >
                  <PawPrint
                    size={76}
                    fill="currentColor"
                  />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* ==================================================
            NOTICE
            ================================================== */}

        <section
          className={`${styles.notice} ${styles.reveal}`}
        >
          <div className={styles.noticeIcon}>
            <AlertCircle size={20} />
          </div>

          <div
            className={styles.noticeContent}
          >
            <span>
              Important Terms Notice
            </span>

            <p>
              This page currently contains draft
              promotional-site content. Before
              production launch, it should be reviewed
              and replaced where necessary with the
              officially approved PetCard Terms of
              Service, including any applicable legal
              requirements, jurisdiction, product-specific
              conditions and final company policies.
            </p>
          </div>

          <PawPrint
            className={styles.noticePaw}
            size={49}
            fill="currentColor"
          />
        </section>

        {/* ==================================================
            MOBILE NAV
            ================================================== */}

        <div
          className={`${styles.mobileNav} ${styles.reveal}`}
        >
          {sections.map((section) => (
            <button
              type="button"
              key={section.number}
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
            TERMS JOURNEY
            ================================================== */}

        <section
          className={`${styles.termsArea} ${styles.reveal}`}
        >
          {/* DESKTOP SIDE NAV */}
          <aside
            className={styles.sideNav}
          >
            <div
              className={
                styles.sideNavTitle
              }
            >
              <PawPrint
                size={15}
                fill="currentColor"
              />
              Terms journey
            </div>

            <div
              className={
                styles.sideNavList
              }
            >
              <div
                className={
                  styles.sideLine
                }
              />

              {sections.map(
                (section) => {
                  const isActive =
                    activeSection ===
                    section.number;

                  return (
                    <button
                      type="button"
                      key={
                        section.number
                      }
                      className={`${styles.sideItem} ${
                        isActive
                          ? styles.sideItemActive
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
                          styles.sideDot
                        }
                      />

                      <span
                        className={
                          styles.sideNumber
                        }
                      >
                        {section.number}
                      </span>

                      <span
                        className={
                          styles.sideName
                        }
                      >
                        {
                          section.shortTitle
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
                    id={`terms-${section.number}`}
                    data-section={
                      section.number
                    }
                    className={`${styles.termsSection} ${styles.reveal}`}
                    style={
                      {
                        "--delay": `${index * 75}ms`,
                      } as React.CSSProperties
                    }
                    key={
                      section.number
                    }
                  >
                    <div
                      className={
                        styles.connectorPaw
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
                          styles.number
                        }
                      >
                        {section.number}
                      </div>

                      <div
                        className={
                          styles.cardIcon
                        }
                      >
                        <Icon size={21} />
                      </div>

                      <div
                        className={
                          styles.cardHeading
                        }
                      >
                       

                        <h2>
                          {
                            section.title
                          }
                        </h2>
                      </div>

                      <div
                        className={`${styles.expandButton} ${
                          isOpen
                            ? styles.expandOpen
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
                          styles.cardBody
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
                            styles.detailList
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
                                    size={
                                      14
                                    }
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
                SUPPORT
                ================================================= */}

            <section
              className={`${styles.supportCard} ${styles.reveal}`}
            >
              <div
                className={
                  styles.supportPaw
                }
              >
                <PawPrint
                  size={105}
                  fill="currentColor"
                />
              </div>

              <div
                className={
                  styles.supportIcon
                }
              >
                <Mail size={23} />
              </div>

              <div
                className={
                  styles.supportContent
                }
              >
                <span>
                  Terms &amp; Support
                </span>

                <h2>
                  Need help understanding{" "}
                  <strong>
                    these terms?
                  </strong>
                </h2>

                <p>
                  For questions, clarification or
                  support relating to the PetCard
                  service or these Terms of Service,
                  contact the PetCard team at the
                  official email address below.
                </p>
              </div>

              <a
                href="mailto:info@petcard.in"
                className={
                  styles.supportButton
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
                <Gavel size={12} />
                PetCard Terms
              </span>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}