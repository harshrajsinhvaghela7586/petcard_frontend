"use client";

import Link from "next/link";
import Image from "next/image";
import {  ArrowRight,
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
  ArrowLeft,
  Download,
  Share2,
  Printer,
  ShieldCheck,
  Cake,
  Weight,
} from "lucide-react";

import styles from "./page.module.css";
import { useEffect, useState } from "react";
import PetRewardsSlider from "../components/PetReawardsSlider";
import JourneySteps from "../components/home/JourneySteps/JourneySteps";
import FeaturesOrbit from "../components/FeaturesOrbit";
import PetWorldPage from "../components/home/PetWorld/PetWorld";
import HomeTestimonialsPreview from "../components/HomeTestimonialsPreview";
import { FaMars } from "react-icons/fa6";


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

/* =========================================================
   HERO: real app screens inside phone frames
   left = Digital PetCard, centre = Home, right = Level & XP
   (screenshots live in /public/images/home/app-*.jpg)
   ========================================================= */

const heroScreens = [
  {
    cls: "hsLeft",
    src: "/images/home/app-petcard.jpg",
    alt: "Digital PetCard screen in the PetCard app",
  },
  {
    cls: "hsRight",
    src: "/images/home/app-level.jpg",
    alt: "Level and XP screen in the PetCard app",
  },
  {
    cls: "hsMain",
    src: "/images/home/app-home.jpg",
    alt: "Home screen in the PetCard app",
  },
] as const;

function HeroScreens() {
  return (
    <div
      className={styles.hsScene}
      aria-label="PetCard app preview"
    >
      <div className={styles.hsSun} />

      <div className={`${styles.hsChip} ${styles.hsChipOne}`}>♡</div>
      <div className={`${styles.hsChip} ${styles.hsChipTwo}`}>✦</div>
      <div className={`${styles.hsChip} ${styles.hsChipThree}`}>🐾</div>

      {heroScreens.map((screen) => (
        <div
          key={screen.cls}
          className={`${styles.hsPhone} ${styles[screen.cls]}`}
        >
          <span className={styles.hsNotch} />

          <Image
            src={screen.src}
            alt={screen.alt}
            width={726}
            height={1600}
            sizes="(max-width: 950px) 46vw, 300px"
            priority={screen.cls === "hsMain"}
            className={styles.hsShot}
          />
        </div>
      ))}
    </div>
  );
}


/* =========================================================
   DIGITAL PET CARD (same layout as the app's Digital PetCard screen)
   Edit the demo data here.
   ========================================================= */

const demoPet = {
  name: "Lio",
  breed: "Japanese Akita",
  gender: "Male",
  age: "9y",
  weight: "63 kg",
  id: "PC-2407-0184",
  issued: "11/4/2026",
};

/** Decorative QR-style pattern. Deterministic, so server and browser render the same thing. */
function PetQr({ seed }: { seed: string }) {
  const N = 25;

  let h = 2166136261;
  for (let i = 0; i < seed.length; i += 1) {
    h = Math.imul(h ^ seed.charCodeAt(i), 16777619) >>> 0;
  }

  const rnd = () => {
    h = (Math.imul(h, 1664525) + 1013904223) >>> 0;
    return h / 4294967296;
  };

  const inFinder = (x: number, y: number) =>
    (x < 8 && y < 8) ||
    (x >= N - 8 && y < 8) ||
    (x < 8 && y >= N - 8);

  let data = "";
  for (let y = 0; y < N; y += 1) {
    for (let x = 0; x < N; x += 1) {
      if (!inFinder(x, y) && rnd() < 0.48) {
        data += `M${x} ${y}h1v1h-1z`;
      }
    }
  }

  const finder = (ox: number, oy: number) =>
    `M${ox} ${oy}h7v7h-7z` +
    `M${ox + 1} ${oy + 1}v5h5v-5z` +
    `M${ox + 2} ${oy + 2}h3v3h-3z`;

  return (
    <svg
      viewBox={`0 0 ${N} ${N}`}
      shapeRendering="crispEdges"
      role="img"
      aria-label="Sample QR code"
    >
      <path d={data} fill="currentColor" />
      <path
        d={finder(0, 0) + finder(N - 7, 0) + finder(0, N - 7)}
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
}

function DigitalPetCard() {
  const p = demoPet;

  return (
    <div className={styles.pcApp}>
      <div className={styles.pcScreen}>
        <div className={styles.pcHeader}>
          <ArrowLeft className={styles.pcBack} />
          <span>Digital PetCard</span>
        </div>

        <div className={styles.pcCard}>
          <div className={styles.pcCardTop}>
            <div className={styles.pcBrandRow}>
              <span>PETCARD</span>
              <span className={styles.pcPawBadge}>
                <PawPrint />
              </span>
            </div>

            <div className={styles.pcIdentity}>
              <div className={styles.pcAvatar}>
                <Image
                  src="/images/home/home-dog.png"
                  alt={p.name}
                  fill
                  sizes="120px"
                />
              </div>

              <div className={styles.pcNameBlock}>
                <h3>
                  {p.name} <PawPrint />
                </h3>
                <p>{p.breed}</p>
              </div>
            </div>

            <div className={styles.pcStats}>
              <div>
                <span><FaMars />Gender</span>
                <b>{p.gender}</b>
              </div>
              <div>
                <span><Cake />Age</span>
                <b>{p.age}</b>
              </div>
              <div>
                <span><Weight />Weight</span>
                <b>{p.weight}</b>
              </div>
            </div>
          </div>

          <div className={styles.pcCardBottom}>
            <div className={styles.pcIdBlock}>
              <small>PET ID</small>
              <strong>{p.id}</strong>
              <small>Issued on</small>
              <b>{p.issued}</b>
            </div>

            <div className={styles.pcQr}>
              <PetQr seed={p.id} />
            </div>
          </div>
        </div>

        <div className={styles.pcNote}>
          <span className={styles.pcNoteIcon}>
            <ShieldCheck />
          </span>
          <p>
            <b>This is {p.name}&apos;s official identity.</b>
            <br />
            Keep it safe and share when needed.
          </p>
        </div>

        <div className={styles.pcActions}>
          <div><Download />Download</div>
          <div><Share2 />Share</div>
          <div><Printer />Print</div>
        </div>
      </div>
    </div>
  );
}


const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000/api";


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

          <HeroScreens />
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

            <DigitalPetCard />

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
             Ready to Make Every Day More Paw-some?
            </h2>

            <p>
             Bring your pet's care, memories, and little  moments together 
              <br className={styles.desktopBreak} />
             with PETCARD.
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
