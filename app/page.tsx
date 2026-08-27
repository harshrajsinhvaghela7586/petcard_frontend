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
} from "lucide-react";

import styles from "./page.module.css";
import { useEffect, useState } from "react";

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

    <div className={styles.storeBadge}>
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

function SectionLabel({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.eyebrow}>
      {children}
    </div>
  );
}

export default function Home() {
  return (
    <>
      {/* =====================================================
          HERO
          ===================================================== */}

      <section className={styles.homeHero}>
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
              daily care, health records, memories, and more —
              all in one fun and personalized place.
            </p>

            <div className={styles.heroActions}>
              <Link
                href="#download-app"
                className="btn btn-primary"
              >
                Download the App
                <ArrowRight size={17} />
              </Link>

              <Link
                href="#how-it-works"
                className="btn btn-outline"
              >
                How It Works
                <ArrowRight size={16} />
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
          INTRO
          ===================================================== */}

      <section
        className={`${styles.section}`}
        id="what-is-pet-card"
      >
        <div className={styles.container}>
          <div
            className={`${styles.sectionHeading} ${styles.center}`}
          >
          

            <h2 className={styles.sectionTitle}>
              More than a pet care app.
            </h2>

            <p className={styles.sectionSubtitle}>
              PET CARD is your pet&apos;s digital companion — a
              place to create their identity, manage everyday
              care, keep important records safe, celebrate
              memories, and make caring for them more fun.
            </p>
          </div>

          <div className={styles.highlightGrid}>
            {highlights.map(
              ({ icon: Icon, title, text }, index) => (
                <article
                  className={styles.highlightCard}
                  key={title}
                  style={
                    {
                      "--delay": `${index * 70}ms`,
                    } as React.CSSProperties
                  }
                >
                  <div className={styles.highlightIcon}>
                    <Icon size={24} />
                  </div>

                  <span className={styles.highlightNumber}>
                    0{index + 1}
                  </span>

                  <h3>{title}</h3>
                  <p>{text}</p>

                  <ArrowRight
                    className={styles.highlightArrow}
                    size={17}
                  />
                </article>
              )
            )}
          </div>
        </div>
      </section>


      {/* =====================================================
          DIGITAL PET CARD
          ===================================================== */}

      <section
        className={`${styles.section} ${styles.soft}`}
        id="digital-pet-card"
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
              <ArrowRight size={17} />
            </Link>

          </div>
        </div>
      </section>


      {/* =====================================================
          HOW IT WORKS
          ===================================================== */}

      <section
        className={styles.section}
        id="how-it-works"
      >
        <div className={styles.container}>
          <div
            className={`${styles.sectionHeading} ${styles.center}`}
          >
          
            <h2 className={styles.sectionTitle}>
              Simple steps.{" "}
              <span>A happier pet.</span>
            </h2>

            <p className={styles.sectionSubtitle}>
              A playful journey from creating a profile to
              building better everyday care habits.
            </p>
          </div>

          <div className={styles.journeyTrack}>
            <div className={styles.journeyLine} />

            {journey.map(
              ([number, title, text, avatar], index) => (
                <article
                  className={styles.journeyStep}
                  key={number}
                >
                  <div className={styles.journeyAvatar}>
                    {index === 1 ? (
                      <Image
                        src="/images/home/home-dog.png"
                        alt={title}
                        fill
                        sizes="86px"
                      />
                    ) : (
                      avatar
                    )}
                  </div>

                  <span className={styles.journeyNumber}>
                    {number}
                  </span>

                  <h3>{title}</h3>

                  <p>{text}</p>
                </article>
              )
            )}
          </div>
        </div>
      </section>


      {/* =====================================================
          DAILY CARE
          ===================================================== */}

      <section
        className={`${styles.section} ${styles.soft}`}
        id="daily-care"
      >
        <div
          className={`${styles.container} ${styles.careGrid}`}
        >
          <div className={styles.careCopy}>
           
            <h2 className={styles.sectionTitle}>
              Care made easy.{" "}
              <span>Every single day.</span>
            </h2>

            <p className={styles.sectionSubtitle}>
              Complete your pet&apos;s daily activities, stay on
              top of their routine, and never forget the little
              things that matter.
            </p>

            <div className={styles.careFeatureList}>
              {[
                ["🍽", "Feeding", "Keep meal routines on track."],
                ["💧", "Water", "Build healthy hydration habits."],
                ["🚶", "Walk", "Never miss their daily movement."],
                ["🎓", "Training", "Turn practice into progress."],
                ["✨", "Grooming", "Keep grooming routines visible."],
                ["💊", "Medicine", "Remember important medication."],
              ].map(([emoji, title, text]) => (
                <div
                  className={styles.careFeature}
                  key={title}
                >
                  <span>{emoji}</span>

                  <div>
                    <b>{title}</b>
                    <small>{text}</small>
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="/features"
              className="btn btn-primary"
            >
              Explore Daily Care
              <ArrowRight size={17} />
            </Link>
          </div>

          <div className={styles.dashboardShowcase}>
            <div className={styles.dashboardPanel}>
              <div className={styles.dashboardHead}>
                <span>Today&apos;s Care</span>
                <b>3 / 5 Completed</b>
              </div>

              {careItems.map(
                ([Icon, title, time, done]) => (
                  <div
                    className={styles.dashboardRow}
                    key={title}
                  >
                    <span className={styles.dashboardIcon}>
                      <Icon size={18} />
                    </span>

                    <span>
                      <b>{title}</b>
                      <small>{time}</small>
                    </span>

                    <span
                      className={`${styles.dashboardCheck} ${done ? styles.done : ""
                        }`}
                    >
                      {done ? <Check size={13} /> : ""}
                    </span>
                  </div>
                )
              )}

              <div className={styles.dashboardProgress}>
                <span style={{ width: "62%" }} />
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* =====================================================
          REWARDS
          ===================================================== */}

      <section
        className={`${styles.section} ${styles.gameSection}`}
        id="rewards"
      >
        <div
          className={`${styles.container} ${styles.gameGrid}`}
        >
          <div className={styles.gamePhoneWrap}>
            <PhoneMockup
              type="reward"
              className={styles.gamePhone}
            />

            <div
              className={`${styles.gameBubble} ${styles.bubbleOne}`}
            >
              🔥 7 day streak!
            </div>

            <div
              className={`${styles.gameBubble} ${styles.bubbleTwo}`}
            >
              +20 PawPoints ⭐
            </div>
          </div>

          <div className={styles.gameCopy}>
           
            <h2 className={styles.sectionTitle}>
              The more you care,{" "}
              <span>the more you unlock.</span>
            </h2>

            <p className={styles.sectionSubtitle}>
              Make everyday care rewarding. Build streaks,
              collect PawPoints, level up and unlock fun ways
              to customize your pet.
            </p>

            <div className={styles.gameStats}>
              <div>
                <strong>🔥 7</strong>
                <span>Day Streak</span>
              </div>

              <div>
                <strong>⭐ 240</strong>
                <span>PawPoints</span>
              </div>

              <div>
                <strong>🏆 4</strong>
                <span>Level</span>
              </div>

              <div>
                <strong>🎖 12</strong>
                <span>Achievements</span>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* =====================================================
    CUSTOMIZATION
    ===================================================== */}

      <section
        className={`${styles.section} ${styles.soft}`}
        id="customization"
      >
        <div className={styles.container}>
          <div
            className={`${styles.sectionHeading} ${styles.center}`}
          >
           
            <h2 className={styles.sectionTitle}>
              Unlock a world made{" "}
              <span>for your pet.</span>
            </h2>

            <p className={styles.sectionSubtitle}>
              Earn rewards and make your pet&apos;s digital world
              feel uniquely theirs.
            </p>
          </div>

          {/* ================= PET CAROUSEL ================= */}

          <PetCarousel />

        </div>
      </section>


      {/* =====================================================
          RECORDS
          ===================================================== */}

      <section
        className={styles.section}
        id="records"
      >
        <div
          className={`${styles.container} ${styles.recordsGrid}`}
        >
          <div className={styles.recordsCopy}>
          
            <h2 className={styles.sectionTitle}>
              Important information.{" "}
              <span>Always within reach.</span>
            </h2>

            <p className={styles.sectionSubtitle}>
              Keep health information, documents and progress
              together instead of searching through scattered
              files.
            </p>

            <div className={styles.recordTabs}>
              <div
                className={`${styles.recordTab} ${styles.active}`}
              >
                <HeartPulse size={17} />

                <span>
                  <b>Health</b>
                  <small>
                    Vaccinations · Medicines · Vet visits
                  </small>
                </span>
              </div>

              <div className={styles.recordTab}>
                <FileHeart size={17} />

                <span>
                  <b>Documents</b>
                  <small>
                    Prescriptions · Reports · Insurance
                  </small>
                </span>
              </div>

              <div className={styles.recordTab}>
                <Award size={17} />

                <span>
                  <b>Progress</b>
                  <small>
                    Weight · Growth · Health updates
                  </small>
                </span>
              </div>
            </div>
          </div>

          <div className={styles.recordsPanel}>
            <div className={styles.recordsPanelHead}>
              <span>
                <Stethoscope size={17} />
                Bruno&apos;s Health
              </span>

              <ChevronRight size={17} />
            </div>

            {[
              "Vaccination",
              "Deworming",
              "Medicines",
              "Vet Visits",
              "Weight Progress",
            ].map((item, index) => (
              <div
                className={styles.recordRow}
                key={item}
              >
                <span className={styles.recordRowIcon}>
                  {index < 3 ? (
                    <Check size={13} />
                  ) : (
                    "↗"
                  )}
                </span>

                <span>
                  <b>{item}</b>

                  <small>
                    {index < 3
                      ? "Up to date"
                      : index === 3
                        ? "Last visit · 12 Jun"
                        : "8.4 kg · +0.3 kg"}
                  </small>
                </span>

                <ChevronRight size={15} />
              </div>
            ))}

            <div className={styles.recordSecure}>
              <LockKeyhole size={14} />
              Your pet&apos;s information stays organized and
              protected.
            </div>
          </div>
        </div>
      </section>


      {/* =====================================================
          EMERGENCY
          ===================================================== */}

      <section
        className={`${styles.section} ${styles.soft}`}
        id="emergency"
      >
        <div
          className={`${styles.container} ${styles.emergencyGrid}`}
        >
          <div className={styles.emergencyCard}>
            <div className={styles.emergencyTop}>
              <span>🚨 EMERGENCY CARD</span>
              <ShieldAlert size={20} />
            </div>

            <div className={styles.emergencyProfile}>
              <div className={styles.emergencyAvatar}>
                <Image
                  src="/images/home/home-dog.png"
                  alt="Bruno"
                  fill
                  sizes="66px"
                />
              </div>

              <div>
                <strong>Bruno</strong>
                <small>
                  Golden Retriever · Blood Group: DEA 1.1 +
                </small>
              </div>
            </div>

            <div className={styles.emergencyData}>
              <span>
                <b>Allergies</b>
                None known
              </span>

              <span>
                <b>Emergency Contact</b>
                +91 98765 43210
              </span>

              <span>
                <b>Current Medication</b>
                None
              </span>

              <span>
                <b>Vet</b>
                Happy Paws Clinic
              </span>
            </div>

            <div className={styles.emergencyActions}>
              <button>Download</button>
              <button>Share</button>
              <button>Update</button>
            </div>
          </div>

          <div className={styles.emergencyCopy}>
         

            <h2 className={styles.sectionTitle}>
              Important information matters most{" "}
              <span>when you need it quickly.</span>
            </h2>

            <p className={styles.sectionSubtitle}>
              Keep guardian contacts, allergies, medical
              conditions, medications and vet information ready
              in one reliable card.
            </p>

            <div className={styles.trustPoints}>
              <span>
                <ShieldAlert size={16} />
                Critical details at a glance
              </span>

              <span>
                <QrCode size={16} />
                Easy to share
              </span>

              <span>
                <CircleCheck size={16} />
                Simple to update
              </span>
            </div>
          </div>
        </div>
      </section>


      {/* =====================================================
          GUARDIANS
          ===================================================== */}

      <section
        className={styles.section}
        id="guardians"
      >
        <div className={styles.container}>
          <div
            className={`${styles.sectionHeading} ${styles.center}`}
          >
           
            <h2 className={styles.sectionTitle}>
              Care is better{" "}
              <span>when it&apos;s shared.</span>
            </h2>

            <p className={styles.sectionSubtitle}>
              Invite another guardian while keeping permission
              and access under your control.
            </p>
          </div>

          <div className={styles.guardianFlow}>
            {[
              ["01", "Main Guardian", "Creates PET CARD", "👤"],
              ["02", "Second Guardian", "Scans QR", "📱"],
              ["03", "Request Access", "Sends request", "🤝"],
              ["04", "Approve", "Main guardian approves", "✅"],
              ["05", "Care Together", "Shared pet journey", "🧡"],
            ].map(([num, title, text, icon], index) => (
              <div
                className={styles.guardianStep}
                key={num}
              >
                <div className={styles.guardianIcon}>
                  {icon}
                </div>

                <span>{num}</span>

                <b>{title}</b>

                <small>{text}</small>

                {index < 4 && (
                  <ArrowRight
                    className={styles.guardianArrow}
                    size={17}
                  />
                )}
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* =====================================================
          MEMORIES
          ===================================================== */}

      <section
        className={`${styles.section} ${styles.soft}`}
        id="memories"
      >
        <div
          className={`${styles.container} ${styles.memoriesGrid}`}
        >
          <div className={styles.memoriesCopy}>
           
            <h2 className={styles.sectionTitle}>
              Some moments deserve more than your{" "}
              <span>camera roll.</span>
            </h2>

            <p className={styles.sectionSubtitle}>
              Save the first day home, birthdays, adventures,
              achievements and everyday moments in one beautiful
              place.
            </p>

            <div className={styles.memoryList}>
              {[
                "Photos",
                "Videos",
                "Captions",
                "Stories",
                "Albums",
                "Milestones",
              ].map((item) => (
                <span key={item}>
                  <ImageIcon size={15} />
                  {item}
                </span>
              ))}
            </div>

            <Link
              href="#download-app"
              className="btn btn-outline"
            >
              Explore Memories
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className={styles.memoryBoard}>
            <div
              className={`${styles.memoryNote} ${styles.noteOne}`}
            >
              First day home 🧡
            </div>

            <div
              className={`${styles.memoryPhoto} ${styles.photoMain}`}
            >
              <Image
                src="/images/home/home-dog.png"
                alt="Pet memory"
                fill
                sizes="270px"
              />

              <span>Bruno&apos;s first adventure</span>
            </div>

            <div
              className={`${styles.memoryPhoto} ${styles.photoCat}`}
            >
              <Image
                src="/images/home/home-cat.png"
                alt="Cat memory"
                fill
                sizes="150px"
              />

              <span>Best nap buddy</span>
            </div>

            <div
              className={`${styles.memoryPhoto} ${styles.photoRabbit}`}
            >
              <Image
                src="/images/home/home-rabbit.png"
                alt="Rabbit memory"
                fill
                sizes="130px"
              />

              <span>Little moments</span>
            </div>

            <div
              className={`${styles.memoryNote} ${styles.noteTwo}`}
            >
              🏆 First achievement!
            </div>
          </div>
        </div>
      </section>


      {/* =====================================================
          AI
          ===================================================== */}

      <section
        className={styles.section}
        id="know-ai"
      >
        <div
          className={`${styles.container} ${styles.knowGrid}`}
        >
          <div className={styles.knowPetStage}>
            <div className={styles.knowGlow} />

            <div className={styles.knowPet}>
              <Image
                src="/images/home/home-dog.png"
                alt="Bruno"
                fill
              />
            </div>

            <div
              className={`${styles.knowCard} ${styles.knowCardTop}`}
            >
              <Sparkles size={16} />

              <div>
                <b>Know Bruno</b>
                <small>Personalized care</small>
              </div>
            </div>

            <div
              className={`${styles.knowCard} ${styles.knowCardBottom}`}
            >
              <span>🤖</span>

              <div>
                <b>PET CARD AI</b>
                <small>Ask anything about Bruno</small>
              </div>
            </div>
          </div>

          <div className={styles.knowCopy}>
          
            <h2 className={styles.sectionTitle}>
              Personalized care,{" "}
              <span>made for your pet.</span>
            </h2>

            <p className={styles.sectionSubtitle}>
              Get a pet-specific view across nutrition,
              grooming, training, wellness, safety and daily
              care.
            </p>

            <div className={styles.knowTopics}>
              {[
                "🍽 Food & Nutrition",
                "✨ Grooming",
                "🎓 Training",
                "🩺 Wellness",
                "🛡 Safety",
                "🐾 Daily Care",
              ].map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>

            <div className={styles.aiChat}>
              <div className={styles.aiChatHead}>
                

                <div>
                  <b>Ask PET CARD AI</b>
                  <small>Personalized assistant</small>
                </div>

                <span className={styles.onlineDot} />
              </div>

              <div className={styles.aiQuestion}>
                How often should Bruno be groomed?
              </div>

              <div className={styles.aiAnswer}>
                For a Golden Retriever like Bruno, regular
                brushing helps manage shedding and keeps his
                coat healthy. 🐶
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* =====================================================
          ECOSYSTEM
          ===================================================== */}

      <section
        className={`${styles.section} ${styles.soft}`}
        id="features"
      >
        <div className={styles.container}>
          <div
            className={`${styles.sectionHeading} ${styles.center}`}
          >
          
            <h2 className={styles.sectionTitle}>
              One app.{" "}
              <span>One pet world.</span>
            </h2>

            <p className={styles.sectionSubtitle}>
              Everything connects around your pet&apos;s digital
              identity.
            </p>
          </div>

          <div className={styles.ecosystemVisual}>
            <div
              className={`${styles.ecosystemOrbit} ${styles.orbitA}`}
            />

            <div
              className={`${styles.ecosystemOrbit} ${styles.orbitB}`}
            />

<div className={styles.ecosystemPaws} aria-hidden="true">
  <img
    src="/images/paw.png"
    alt=""
    className={`${styles.ecoPaw} ${styles.ecoPaw1}`}
  />
  <img
    src="/images/paw.png"
    alt=""
    className={`${styles.ecoPaw} ${styles.ecoPaw2}`}
  />
  <img
    src="/images/paw.png"
    alt=""
    className={`${styles.ecoPaw} ${styles.ecoPaw3}`}
  />
  <img
    src="/images/paw.png"
    alt=""
    className={`${styles.ecoPaw} ${styles.ecoPaw4}`}
  />
  <img
    src="/images/paw.png"
    alt=""
    className={`${styles.ecoPaw} ${styles.ecoPaw5}`}
  />
  <img
    src="/images/paw.png"
    alt=""
    className={`${styles.ecoPaw} ${styles.ecoPaw6}`}
  />
  <img
    src="/images/paw.png"
    alt=""
    className={`${styles.ecoPaw} ${styles.ecoPaw7}`}
  />
  <img
    src="/images/paw.png"
    alt=""
    className={`${styles.ecoPaw} ${styles.ecoPaw8}`}
  />
</div>
            <div className={styles.ecosystemCenter}>
              <img
                src="/images/brand/dog.png"
                width={150}
                height={125}
                alt="PetCard dog"
                className={styles.ecosystemDog}
              />

              <b>
                <span>PET</span> <em>CARD</em>
              </b>
            </div>
            {ecosystem.map(([title, text], index) => (
              <div
                className={`${styles.ecoNode} ${styles[`ecoNode${index + 1}` as keyof typeof styles]
                  }`}
                key={title}
              >
                <span>
                  {
                    [
                      "🏠",
                      "📅",
                      "🔥",
                      "⭐",
                      "🎁",
                      "🚨",
                      "👥",
                      "📸",
                    ][index]
                  }
                </span>

                <b>{title}</b>
                <small>{text}</small>
              </div>
            ))}
          </div>
        </div>
      </section>


{/* =====================================================
    WHY CHOOSE US
    ===================================================== */}

<section
  className={`${styles.section} ${styles.whySection}`}
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
          to daily care, reminders, and memories—keep
          everything together.
        </p>

        <div className={styles.whyCardFooter}>
          <span>🪪 PET CARD</span>
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
          <span>🐾 DAILY CARE</span>
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
          <span>⭐ REWARDS</span>
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
          ABOUT
          ===================================================== */}

      <section
        className={styles.section}
        id="about-us"
      >
        <div
          className={`${styles.container} ${styles.aboutHomeCard}`}
        >
          <div className={styles.aboutHomeCopy}>
        
            <h2 className={styles.sectionTitle}>
              Built for the love behind{" "}
              <span>every little paw.</span>
            </h2>

            <p>
              PET CARD was created with a simple belief: pets
              are family. Their identity, health, routines,
              memories and milestones deserve a place of their
              own.
            </p>

            <div className={styles.missionGrid}>
              <div>
                <b>Our Mission</b>
                <span>
                  Make pet care simpler, more organized and more
                  enjoyable.
                </span>
              </div>

              <div>
                <b>Our Vision</b>
                <span>
                  A future where every pet has a digital
                  identity and every guardian has better tools to
                  care for them.
                </span>
              </div>
            </div>

            <Link
              href="/about"
              className="btn btn-primary"
            >
              Our Story
              <ArrowRight size={17} />
            </Link>
          </div>

          <div className={styles.aboutHomePets}>
            <div
              className={`${styles.aboutPet} ${styles.aboutDog}`}
            >
              <Image
                src="/images/about/dog.png"
                alt="Dog"
                fill
                sizes="(max-width: 768px) 42vw, (max-width: 1200px) 230px, 270px"
              />
            </div>

            <div
              className={`${styles.aboutPet} ${styles.aboutCat}`}
            >
              <Image
                src="/images/about/cat.png"
                alt="Cat"
                fill
                sizes="(max-width: 768px) 32vw, (max-width: 1200px) 190px, 220px"
              />
            </div>

            <div
              className={`${styles.aboutPet} ${styles.aboutRabbit}`}
            >
              <Image
                src="/images/about/rabbit.png"
                alt="Rabbit"
                fill
                sizes="(max-width: 768px) 32vw, (max-width: 1200px) 190px, 220px"
              />
            </div>

          </div>
        </div>
      </section>


      {/* =====================================================
          FINAL DOWNLOAD
          SAME APP STORE / GOOGLE PLAY BADGES AS TOP
          ===================================================== */}

      <section
        className={styles.finalDownload}
        id="download-app"
      >
        <div
          className={`${styles.container} ${styles.finalDownloadCard}`}
        >
          <div className={styles.finalCopy}>
          
            <h2>
              Care today.{" "}
              <span>Stronger bond tomorrow.</span>
            </h2>

            <p>
              Create their PET CARD, build better care habits,
              save every memory, and enjoy the journey together.
            </p>

            {/* SAME BADGES AS HERO */}
            <div className={styles.finalButtons}>
              {storeBadges}
            </div>
          </div>

          <div className={styles.finalPets}>
            <div
              className={`${styles.finalPet} ${styles.finalDog}`}
            >
              <Image
                src="/images/about/dog.png"
                alt="Dog"
                fill
                sizes="260px"
              />
            </div>

            <div
              className={`${styles.finalPet} ${styles.finalCat}`}
            >
              <Image
                src="/images/about/cat.png"
                alt="Cat"
                fill
                sizes="160px"
              />
            </div>

            <div
              className={`${styles.finalPet} ${styles.finalRabbit}`}
            >
              <Image
                src="/images/about/rabbit.png"
                alt="Rabbit"
                fill
                sizes="140px"
              />
            </div>

            <span
              className={`${styles.finalSpark} ${styles.sparkOne}`}
            >
              ✦
            </span>

            <span
              className={`${styles.finalSpark} ${styles.sparkTwo}`}
            >
              ♡
            </span>
          </div>
        </div>
      </section>
    </>
  );
}