"use client";

import Link from "next/link";
import Image from "next/image";

import {
  ArrowRight,
  Award,
  CalendarCheck,
  Check,
  ChevronRight,
  CircleCheck,
  FileHeart,
  HeartPulse,
  Image as ImageIcon,
  LockKeyhole,
  PawPrint,
  QrCode,
  ShieldAlert,
  Sparkles,
  Star,
  Stethoscope,
  Trophy,
  Utensils,
  Droplets,
  Footprints,
  Dumbbell,
  ChevronLeft,
  LucideVideo,
  CirclePlay,
} from "lucide-react";

import styles from "./page.module.css";
import { useEffect, useState } from "react";
import PetRewardsSlider from "../components/PetReawardsSlider";
import JourneySteps from "../components/home/JourneySteps/JourneySteps";
import FeaturesOrbit from "../components/FeaturesOrbit";
import PetWorldPage from "../components/home/PetWorld/PetWorld";


type IconComponent = typeof PawPrint;

type FeatureItem = {
  icon: IconComponent;
  title: string;
  text: string;
};

const highlights: FeatureItem[] = [
  {
    icon: PawPrint,
    title: "Digital Identity",
    text: "Create a unique PET CARD for your pet.",
  },
  {
    icon: CalendarCheck,
    title: "Daily Care",
    text: "Track routines, habits and important tasks.",
  },
  {
    icon: HeartPulse,
    title: "Health Records",
    text: "Keep vaccinations, medicines and visits together.",
  },
  {
    icon: ImageIcon,
    title: "Memories",
    text: "Save photos, milestones and special moments.",
  },
  {
    icon: Trophy,
    title: "Rewards & Fun",
    text: "Build streaks, earn PawPoints and unlock rewards.",
  },
];

const journey = [
  ["01", "Create Your Profile", "Tell us a little about yourself.", "👤"],
  ["02", "Meet Your Pet", "Choose an avatar or add their photo.", "🐶"],
  ["03", "Create Their PET CARD", "Give your pet their own digital identity.", "🪪"],
  ["04", "Care Every Day", "Complete care tasks and build healthy habits.", "🧡"],
  ["05", "Earn & Grow", "Build streaks, earn PawPoints and unlock rewards.", "⭐"],
];

const careItems = [
  [Utensils, "Feeding", "08:00 AM", true],
  [Droplets, "Water", "08:30 AM", true],
  [Footprints, "Walk", "06:00 PM", false],
  [Dumbbell, "Training", "07:00 PM", false],
  [Sparkles, "Grooming", "08:00 PM", false],
] as const;

const ecosystem = [
  ["Daily Care", "Keep routines simple and visible."],
  ["Calendar", "See reminders and upcoming tasks."],
  ["Streaks", "Turn consistency into a habit."],
  ["PawPoints", "Earn points for everyday care."],
  ["Rewards", "Unlock fun ways to customize your pet."],
  ["Emergency Card", "Keep critical information ready."],
  ["Guardians", "Share care with people you trust."],
  ["Memories", "Keep milestones in one place."],
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

const petSlides = [
  {
    name: "Huchiko",
    image: "/images/reward/huchiko.png",
    reward: "👑 Crown unlocked",
  },
  {
    name: "Zuzu",
    image: "/images/reward/zuzu.png",
    reward: "🎀 New accessory",
  },
  {
    name: "Coco",
    image: "/images/reward/coco.png",
    reward: "⭐ +120 PawPoints",
  },
  {
    name: "Bruno",
    image: "/images/reward/home-dog.png",
    reward: "🏆 Level 4 unlocked",
  },
  {
    name: "Oreo",
    image: "/images/reward/oreo.png",
    reward: "🕶 New look unlocked",
  },
  {
    name: "Toffee",
    image: "/images/reward/toffee.png",
    reward: "🎁 Reward unlocked",
  },
];
function PetCarousel() {
  const total = petSlides.length;

  const slides = [
    ...petSlides,
    ...petSlides,
    ...petSlides,
  ];

  const [current, setCurrent] = useState(total);
  const [transitionEnabled, setTransitionEnabled] = useState(true);

  const nextSlide = () => {
    setTransitionEnabled(true);
    setCurrent((prev) => prev + 1);
  };

  const previousSlide = () => {
    setTransitionEnabled(true);
    setCurrent((prev) => prev - 1);
  };

  const handleTransitionEnd = () => {
    if (current >= total * 2) {
      setTransitionEnabled(false);
      setCurrent(current - total);
    }

    if (current < total) {
      setTransitionEnabled(false);
      setCurrent(current + total);
    }
  };

  // Re-enable transition after invisible reset
  useEffect(() => {
    if (!transitionEnabled) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setTransitionEnabled(true);
        });
      });
    }
  }, [transitionEnabled]);

  // ================================
  // AUTO SLIDE
  // ================================
  useEffect(() => {
    const autoSlide = window.setInterval(() => {
      setTransitionEnabled(true);
      setCurrent((prev) => prev + 1);
    }, 3000);

    return () => {
      window.clearInterval(autoSlide);
    };
  }, []);

  return (
    <div className={styles.petCarousel}>
      <div className={styles.petCarouselViewport}>
        <div
          className={`${styles.petCarouselTrack} ${transitionEnabled
            ? styles.petCarouselAnimated
            : ""
            }`}
          style={
            {
              "--pet-index": current,
            } as React.CSSProperties
          }
          onTransitionEnd={handleTransitionEnd}
        >
          {slides.map((pet, index) => {
            const isCenter =
              index === current + 1;

            return (
              <article
                className={`${styles.petSlide} ${isCenter
                  ? styles.petSlideCenter
                  : ""
                  }`}
                key={`${pet.name}-${index}`}
              >
                <div className={styles.petSlideInner}>
                  <div className={styles.petImageWrap}>
                    <Image
                      src={pet.image}
                      alt={pet.name}
                      fill
                      sizes="(max-width: 768px) 75vw, 280px"
                      className={styles.petSlideImage}
                    />
                  </div>

                  <div className={styles.petName}>
                    {pet.name}
                  </div>

                  <div className={styles.petReward}>
                    {pet.reward}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <button
        type="button"
        className={`${styles.petCarouselArrow} ${styles.petCarouselPrev}`}
        onClick={previousSlide}
        aria-label="Previous pet"
      >
        <ChevronLeft size={22} />
      </button>

      <button
        type="button"
        className={`${styles.petCarouselArrow} ${styles.petCarouselNext}`}
        onClick={nextSlide}
        aria-label="Next pet"
      >
        <ChevronRight size={22} />
      </button>

      <div className={styles.petCarouselDots}>
        {petSlides.map((pet, index) => (
          <button
            key={pet.name}
            type="button"
            aria-label={`Go to ${pet.name}`}
            className={
              index === current % total
                ? styles.petCarouselDotActive
                : styles.petCarouselDot
            }
            onClick={() => {
              setTransitionEnabled(true);
              setCurrent(total + index);
            }}
          />
        ))}
      </div>
    </div>
  );
}

function PhoneMockup({
  type = "dashboard",
  className = "",
}: {
  type?: "dashboard" | "card" | "reward";
  className?: string;
}) {
  return (
    <div className={`${styles.phoneShell} ${className}`}>
      <div className={styles.phoneSpeaker} />

      <div className={styles.phoneScreen}>
        <div className={styles.phoneStatus}>
          <span>9:41</span>
          <span>PetCard</span>
          <span>●</span>
        </div>

        {type === "dashboard" && (
          <>
            <div className={styles.appGreeting}>
              <div>
                <small>Good morning,</small>
                <strong>Bruno 🧡</strong>
              </div>

              <div className={styles.appAvatarSmall}>
                <Image
                  src="/images/home/home-dog.png"
                  alt="Bruno"
                  fill
                  sizes="40px"
                />
              </div>
            </div>

            <div className={styles.phoneProfileBanner}>
              <div className={styles.phoneAvatar}>
                <Image
                  src="/images/home/home-dog.png"
                  alt="Bruno"
                  fill
                  sizes="76px"
                />
              </div>

              <strong>Bruno</strong>
              <small>Golden Retriever · 3 yrs · Male</small>
            </div>

            <div className={styles.phoneStats}>
              <span>
                🔥 7
                <small>Streak</small>
              </span>

              <span>
                ⭐ 240
                <small>PawPoints</small>
              </span>

              <span>
                🏆 Lv.4
                <small>Level</small>
              </span>
            </div>

            <div className={styles.phoneSectionTitle}>
              <strong>Today&apos;s Care</strong>
              <span>3 / 5</span>
            </div>

            {careItems.slice(0, 4).map(([Icon, title, time, done]) => (
              <div className={styles.phoneCareRow} key={title}>
                <span className={styles.careIcon}>
                  <Icon size={13} />
                </span>

                <span>
                  <b>{title}</b>
                  <small>{time}</small>
                </span>

                <span
                  className={
                    done ? styles.careDone : styles.carePending
                  }
                >
                  {done ? <Check size={12} /> : "50%"}
                </span>
              </div>
            ))}
          </>
        )}

        {type === "card" && (
          <>
            <div className={styles.digitalCardPreview}>
              <span className={styles.cardChip}>PET CARD</span>

              <div className={styles.cardPetImage}>
                <Image
                  src="/images/home/home-dog.png"
                  alt="Pet profile"
                  fill
                  sizes="130px"
                />
              </div>

              <strong>Bruno</strong>
              <small>Golden Retriever · Male</small>

              <div className={styles.cardId}>
                PET ID · PC-2407-0184
              </div>

              <div className={styles.cardQr}>
                <QrCode size={48} />
              </div>
            </div>

            <div className={styles.cardDetails}>
              <span>
                <b>Guardian</b>
                <small>Amber Patel</small>
              </span>

              <span>
                <b>Age</b>
                <small>3 years</small>
              </span>

              <span>
                <b>Breed</b>
                <small>Golden Retriever</small>
              </span>

              <span>
                <b>Status</b>
                <small>Healthy · Active</small>
              </span>
            </div>

            <button className={styles.phoneAction}>
              Share PET CARD <ArrowRight size={12} />
            </button>
          </>
        )}

        {type === "reward" && (
          <>
            <div className={styles.rewardHero}>
              <span>🔥</span>
              <small>YOUR STREAK</small>
              <strong>7 DAYS</strong>
              <p>Keep caring. Keep growing.</p>
            </div>

            <div className={styles.pointsCard}>
              <span>
                <Star size={15} /> PawPoints
              </span>

              <strong>240</strong>
              <small>+20 today</small>
            </div>

            <div className={styles.rewardProgress}>
              <div>
                <span>Level 4</span>
                <span>320 XP</span>
              </div>

              <i>
                <b />
              </i>
            </div>

            <div className={styles.unlockRow}>
              <span>🎀</span>

              <div>
                <b>Adventure Bandana</b>
                <small>Unlocked today!</small>
              </div>

              <Award size={17} />
            </div>

            <div className={styles.unlockRow}>
              <span>👑</span>

              <div>
                <b>Golden Crown</b>
                <small>80 PawPoints away</small>
              </div>

              <LockKeyhole size={15} />
            </div>
          </>
        )}

        <div className={styles.phoneBottomNav}>
          <span>
            ⌂
            <small>Home</small>
          </span>

          <span>
            ▣
            <small>Records</small>
          </span>

          <span className="active">
            🐾
            <small>Pet</small>
          </span>

          <span>
            ♡
            <small>Memories</small>
          </span>

          <span>
            ◉
            <small>Profile</small>
          </span>
        </div>
      </div>
    </div>
  );
}


interface Testimonial {
  _id: string;
  name: string;
  role: string;
  rating: number;
  text: string;
  photo?: string;
  isActive: boolean;
}

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000/api";

function HomeTestimonialsPreview() {
  const [testimonials, setTestimonials] =
    useState<Testimonial[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch(
          `${API_URL}/testimonials`
        );

        const data = await response.json();

        if (response.ok && data.success) {
          setTestimonials(
            data.testimonials || []
          );
        }
      } catch (error) {
        console.error(
          "Failed to fetch testimonials:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  if (loading) {
    return null;
  }

  if (testimonials.length === 0) {
    return null;
  }

  const slides = [
    ...testimonials,
    ...testimonials,
  ];

  const getImageUrl = (
    photo?: string
  ) => {
    if (!photo) return "";

    if (photo.startsWith("http")) {
      return photo;
    }

    return `${API_URL.replace(
      "/api",
      ""
    )}${photo}`;
  };

  return (
    <section
      className={`${styles.section} ${styles.homeTestimonials}`}
      id="testimonials"
    >
      <div className={styles.container}>
        <div
          className={`${styles.sectionHeading} ${styles.center}`}
        >
          <h2
            className={
              styles.sectionTitle
            }
          >
            Loved for the little things.{" "}
            <span>
              Built for everyday care.
            </span>
          </h2>

          <p
            className={
              styles.sectionSubtitle
            }
          >
            Hear from pet parents about
            their experience with PetCard.
          </p>
        </div>

        <div
          className={
            styles.homeTestimonialsViewport
          }
        >
          <div
            className={
              styles.homeTestimonialsTrack
            }
          >
            {slides.map(
              (item, index) => {
                const imageUrl =
                  getImageUrl(
                    item.photo
                  );

                return (
                  <article
                    className={
                      styles.homeTestimonialCard
                    }
                    key={`${item._id}-${index}`}
                  >
                    <div
                      className={
                        styles.homeTestimonialTop
                      }
                    >
                      <span
                        className={
                          styles.homeQuote
                        }
                      >
                        “
                      </span>

                      <span
                        className={
                          styles.homeStars
                        }
                      >
                        {"★".repeat(
                          item.rating
                        )}
                      </span>
                    </div>

                    <p>
                      {
                        item.text
                      }
                    </p>

                    <div
                      className={
                        styles.homeTestimonialAuthor
                      }
                    >
                      <span
                        className={
                          styles.homeTestimonialAvatar
                        }
                      >
                        {imageUrl ? (
                          <Image
                            src={
                              imageUrl
                            }
                            alt={
                              item.name
                            }
                            width={
                              48
                            }
                            height={
                              48
                            }
                            unoptimized
                          />
                        ) : (
                          item.name
                            .split(
                              " "
                            )
                            .map(
                              (
                                word
                              ) =>
                                word[0]
                            )
                            .join(
                              ""
                            )
                            .slice(
                              0,
                              2
                            )
                        )}
                      </span>

                      <div>
                        <b>
                          {
                            item.name
                          }
                        </b>

                        <small>
                          {
                            item.role
                          }
                        </small>
                      </div>
                    </div>
                  </article>
                );
              }
            )}
          </div>
        </div>

        <div
          className={
            styles.homePreviewLinkWrap
          }
        >
          <Link
            href="/testimonials"
            className="btn btn-primary"
          >
            View All Testimonials
          </Link>
        </div>
      </div>
    </section>
  );
}

interface FAQ {
  _id: string;
  question: string;
  answer: string;
  isActive: boolean;
}

function HomeFaqPreview() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const response = await fetch(`${API_URL}/faqs`, {
          method: "GET",
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error(
            `Failed to fetch FAQs: ${response.status}`
          );
        }

        const data = await response.json();

        console.log("FAQ API Response:", data);

        // Backend array ya { faqs: [] } dono handle karega
        const faqList = Array.isArray(data)
          ? data
          : Array.isArray(data.faqs)
            ? data.faqs
            : [];

        const activeFaqs = faqList
          .filter((item: FAQ) => item.isActive === true)
          .slice(0, 5);

        setFaqs(activeFaqs);

        setFaqs(activeFaqs);
      } catch (error) {
        console.error("Error fetching FAQs:", error);
        setFaqs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFaqs();
  }, []);

  return (
    <section
      className={`${styles.section} ${styles.soft}`}
      id="faq"
    >
      <div className={styles.container}>
        <div className={styles.homeFaqGrid}>
          <div className={styles.homeFaqIntro}>
            <h2 className={styles.sectionTitle}>
              Questions?{" "}
              <span>We&apos;ve got answers.</span>
            </h2>

            <p className={styles.sectionSubtitle}>
              Find answers to common questions about PetCard
              and its promotional website.
            </p>

            <Link
              href="/faq"
              className="btn btn-primary"
            >
              View All FAQs
            </Link>
          </div>

          <div className={styles.homeFaqList}>
            {loading && (
              <p>Loading FAQs...</p>
            )}

            {!loading && faqs.length === 0 && (
              <p>No FAQs available.</p>
            )}

            {!loading &&
              faqs.map((item) => (
                <details
                  className={styles.homeFaqItem}
                  key={item._id}
                >
                  <summary>
                    <span>{item.question}</span>
                    <ChevronRight size={18} />
                  </summary>

                  <p>{item.answer}</p>
                </details>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}



function HomeScrollAnimations() {
  useEffect(() => {
    const selector = [
      `.${styles.homeReveal}`,
      `.${styles.whyReveal}`,
      `.${styles.homeTestimonials}`,
      "#faq",
      "#know-ai",
    ].join(",");

    const sections =
      document.querySelectorAll<HTMLElement>(
        selector
      );

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotion) {
      sections.forEach((section) => {
        section.classList.add(
          styles.homeRevealVisible
        );
      });

      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          if (
            entry.target.classList.contains(
              styles.whyReveal
            )
          ) {
            entry.target.classList.add(
              styles.whyAnimated
            );
          } else {
            entry.target.classList.add(
              styles.homeRevealVisible
            );
          }

          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.12,
        rootMargin:
          "0px 0px -60px 0px",
      }
    );

    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return null;
}


export default function Home() {

  return (
    <>
      <HomeScrollAnimations />

      {/* =====================================================
          HERO
          ===================================================== */}

      <section
        className={styles.homeHero}
        data-home-reveal="hero"
      >
        <div
          className={`${styles.homeHeroGrid} ${styles.container}`}
        >
          <div className={styles.homeHeroCopy}>


            <h1>
              One Identity. A Lifetime of Care.{" "}
              <span>Every Pet Deserves an Identity. </span>
            </h1>

            <p>
              PET CARD helps you manage your pet&apos;s identity,
              daily care, health records, memories, and more
              all in one fun and personalized place.
            </p>

            <div className={styles.heroActions}>
              <Link
                href="#download-app"
                className="btn btn-primary"
              >
                Download the App
                <img
                  src="/images/paw-white.png"
                  width={37}
                  height={37}
                  alt=""
                />
              </Link>

              <Link
                href="#how-it-works"
                className="btn btn-outline"
              >
                <CirclePlay
                  size={24}
                />
                Watch Video

              </Link>
            </div>

            <div className={styles.storeRow}>
              {storeBadges}
            </div>
          </div>

          <div
            className={styles.heroAppScene}
            aria-label="PetCard app preview"
          >
            <div className={styles.sceneSun} />

            <div
              className={`${styles.scenePaw} ${styles.scenePawOne}`}
            >
              ♡
            </div>

            <div
              className={`${styles.scenePaw} ${styles.scenePawTwo}`}
            >
              ✦
            </div>

            <div
              className={`${styles.scenePaw} ${styles.scenePawThree}`}
            >
              🐾
            </div>

            <div
              className={`${styles.heroPhone} ${styles.phoneBackLeft}`}
            >
              <PhoneMockup type="card" />
            </div>

            <div
              className={`${styles.heroPhone} ${styles.phoneMain}`}
            >
              <PhoneMockup type="dashboard" />
            </div>

            <div
              className={`${styles.heroPhone} ${styles.phoneBackRight}`}
            >
              <PhoneMockup type="reward" />
            </div>
          </div>
        </div>
      </section>







      {/* =====================================================
    WHY CHOOSE US
    ===================================================== */}

      <section
        className={`${styles.section} ${styles.whySection} ${styles.whyReveal}`}
        id="why-choose-us"
      >
        <div className={styles.container}>
          <div
            className={`${styles.sectionHeading} ${styles.center}`}
          >


            <h2 className={styles.sectionTitle}>
              Built around{" "}
              <span>better pet care.</span>
            </h2>

            <p className={styles.sectionSubtitle}>
              Everything your pet needs, thoughtfully brought
              together in one simple and playful experience.
            </p>
          </div>

          <div className={styles.whyGrid}>
            {/* =================================================
          LEFT CARD
          ================================================= */}

            <article
              className={`${styles.whyCard} ${styles.whyCardLeft}`}
            >
              <div className={styles.whyCardTop}>
                <div className={styles.whyCardIcon}>
                  <img
                    src="/images/paw.png"
                    alt=""
                    aria-hidden="true"
                  />
                </div>

              </div>

              <h3>Everything in One Place</h3>

              <p>
                From your pet&apos;s identity and health records
                to daily care, reminders, and memories keep
                everything together.
              </p>

              <div className={styles.whyCardFooter}>
                <span>PET CARD</span>
                <ArrowRight size={17} />
              </div>

              <div className={styles.whyCardPaw}>
                <img
                  src="/images/paw.png"
                  alt=""
                  aria-hidden="true"
                />
              </div>

              <div className={`${styles.whyPet} ${styles.whyPetLeft}`}>
                <Image
                  src="/images/coco2.png"
                  alt="Coco"
                  fill
                  sizes="(max-width: 768px) 180px, 240px"
                />
              </div>
            </article>

            {/* =================================================
          CENTER CARD
          ================================================= */}

            <article
              className={`${styles.whyCard} ${styles.whyCardCenter}`}
            >
              <div className={styles.whyCardTop}>
                <div className={styles.whyCardIcon}>
                  <img
                    src="/images/paw.png"
                    alt=""
                    aria-hidden="true"
                  />
                </div>

              </div>

              <h3>Made for Everyday Care</h3>

              <p>
                Stay on top of feeding, walks, training,
                grooming, and other important routines with ease.
              </p>

              <div className={styles.whyCardFooter}>
                <span>DAILY CARE</span>
                <ArrowRight size={17} />
              </div>

              <div className={styles.whyCardPaw}>
                <img
                  src="/images/paw.png"
                  alt=""
                  aria-hidden="true"
                />
              </div>

              <div className={`${styles.whyPet} ${styles.whyPetCenter}`}>
                <Image
                  src="/images/zuzu2.png"
                  alt="Zuzu"
                  fill
                  sizes="(max-width: 768px) 180px, 240px"
                />
              </div>
            </article>

            {/* =================================================
          RIGHT CARD
          ================================================= */}

            <article
              className={`${styles.whyCard} ${styles.whyCardRight}`}
            >
              <div className={styles.whyCardTop}>
                <div className={styles.whyCardIcon}>
                  <img
                    src="/images/paw.png"
                    alt=""
                    aria-hidden="true"
                  />
                </div>
              </div>

              <h3>Care That Feels Fun</h3>

              <p>
                Build streaks, earn PawPoints, unlock rewards,
                and make caring for your pet a fun journey.
              </p>

              <div className={styles.whyCardFooter}>
                <span>REWARDS</span>
                <ArrowRight size={17} />
              </div>

              <div className={styles.whyCardPaw}>
                <img
                  src="/images/paw.png"
                  alt=""
                  aria-hidden="true"
                />
              </div>

              <div className={`${styles.whyPet} ${styles.whyPetRight}`}>
                <Image
                  src="/images/huchiko2.png"
                  alt="Huchiko"
                  fill
                  sizes="(max-width: 768px) 180px, 240px"
                />
              </div>
            </article>
          </div>
        </div>
      </section>


      {/* =====================================================
          DIGITAL PET CARD
          ===================================================== */}

      <section
        className={`${styles.section} ${styles.soft} ${styles.homeReveal}`}
        id="digital-pet-card"
        data-home-reveal="identity"
      >
        <div
          className={`${styles.container} ${styles.identityGrid}`}
        >
          <div className={styles.identityVisual}>
            <div className={styles.identityGlow} />

            <div className={styles.identityCardLarge}>
              <div className={styles.identityCardTop}>
                <span>PET CARD</span>
                <span>●●●</span>
              </div>

              <div className={styles.identityAvatar}>
                <Image
                  src="/images/home/home-dog.png"
                  alt="Bruno"
                  fill
                  sizes="190px"
                />
              </div>

              <span className={styles.identityLabel}>
                YOUR PET&apos;S DIGITAL IDENTITY
              </span>

              <h3>Bruno</h3>

              <p>Golden Retriever · 3 years · Male</p>

              <div className={styles.identityId}>
                PC-2407-0184
              </div>

              <div className={styles.identityBottom}>
                <span>
                  <b>Guardian</b>
                  Meet Patel
                </span>

                <QrCode size={58} />
              </div>
            </div>

            <div
              className={`${styles.identityFloatChip} ${styles.chipOne}`}
            >
              <CircleCheck size={15} />
              Profile verified
            </div>

            <div
              className={`${styles.identityFloatChip} ${styles.chipTwo}`}
            >

              Emergency ready
            </div>
          </div>

          <div className={styles.identityCopy}>

            <h2 className={styles.sectionTitle}>
              Every pet deserves their own{" "}
              <span>PET CARD.</span>
            </h2>

            <p className={styles.sectionSubtitle}>
              Give your pet a beautiful, shareable digital
              identity that keeps the details that matter close
              when you need them.
            </p>

            <div className={styles.identityPoints}>
              {[
                "Pet photo or avatar",
                "Pet name, breed and age",
                "Unique Pet ID",
                "Guardian information",
                "QR code for quick access",
              ].map((item) => (
                <div key={item}>
                  <Check size={16} />
                  {item}
                </div>
              ))}
            </div>

            <Link
              href="#download-app"
              className="btn btn-primary"
            >
              Create Your Pet&apos;s Card
              <img
                src="/images/paw-white.png"
                width={37}
                height={37}
                alt=""
              />
            </Link>

          </div>
        </div>
      </section>

      <JourneySteps />


      <FeaturesOrbit />

      <PetWorldPage />





      <PetRewardsSlider />



      <HomeTestimonialsPreview />

      <HomeFaqPreview />

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
              src="/images/pets.png"
              alt="PETCARD pets"
              fill
              priority

              className={styles.finalPetsImage}
            />
          </div>


          {/* ================= COPY ================= */}

          <div className={styles.finalCopy}>

            <h2>
              Start your pet&apos;s amazing journey today!
            </h2>

            <p>
              Download PETCARD and make every day better
              <br className={styles.desktopBreak} />
              for you and your pet.
            </p>

          </div>


          {/* ================= STORE BADGES ================= */}

          <div className={styles.finalButtons}>
            {storeBadges}
          </div>

        </div>
      </section>

    </>
  );
}
