"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Activity,
  ArrowRight,
  Award,
  BadgeCheck,
  Bell,
  CalendarDays,
  Camera,
  Check,
  ChevronDown,
  ChevronRight,
  CircleCheck,
  Clock3,
  CloudUpload,
  Dumbbell,
  Flame,
  Gift,
  Heart,
  HeartPulse,
  Image as ImageIcon,
  Info,
  KeyRound,
  Leaf,
  ListChecks,
  LockKeyhole,
  Medal,
  MessageCircle,
  MoreHorizontal,
  PawPrint,
  Pencil,
  Pill,
  Play,
  Plus,
  QrCode,
  ScanLine,
  Send,
  ShieldCheck,
  Sparkles,
  Star,
  Stethoscope,
  Trophy,
  Utensils,
  Video,
  Weight,
  WandSparkles,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import styles from "./Features.module.css";
import { GiWhistle } from "react-icons/gi";

type Item = {
  title: string;
  description: string;
  icon: React.ElementType;
};

type SectionData = {
  number: string;
  eyebrow: string;
  title: string;
  highlight: string;
  description: string;
  icon: React.ElementType;
  image?: string;
  items: Item[];
};

const sections: SectionData[] = [
  {
    number: "01",
    eyebrow: "IDENTITY & SAFETY",
    title: "A lifetime identity.",
    highlight: "Total peace of mind.",
    description:
      "Give your pet a digital identity that keeps them safe, connected, and protected — everywhere, every time.",
    icon: ShieldCheck,
    image: "/images/slider/huchiko.png",
    items: [
      {
        title: "Digital PetCard",
        description: "Your pet's all-in-one digital identity card.",
        icon: ShieldCheck,
      },
      {
        title: "Pet ID",
        description: "Unique and permanent ID for your pet.",
        icon: BadgeCheck,
      },
      {
        title: "QR Code",
        description: "Instant access to your pet's information.",
        icon: QrCode,
      },
      {
        title: "Scan QR",
        description: "Anyone can scan and view essential info.",
        icon: ScanLine,
      },
      {
        title: "Emergency Card",
        description: "Important medical and emergency details.",
        icon: HeartPulse,
      },
      {
        title: "Guardian Access",
        description: "Trusted guardians can access and help.",
        icon: KeyRound,
      },
      {
        title: "Two Guardian Support",
        description: "Add two guardians for double the safety.",
        icon: Heart,
      },
      {
        title: "Share / Download",
        description: "Share digitally or download your PetCard.",
        icon: CloudUpload,
      },
    ],
  },

  {
    number: "02",
    eyebrow: "DAILY CARE",
    title: "Care made easy.",
    highlight: "Every single day.",
    description:
      "Stay on top of your pet's daily routine with smart tasks, timely reminders, and helpful insights.",
    icon: ListChecks,
    items: [
      {
        title: "Daily Tasks",
        description: "All essential care tasks in one place.",
        icon: ListChecks,
      },
      {
        title: "Feeding",
        description: "Track meals and build healthy eating habits.",
        icon: Utensils,
      },
      {
        title: "Water",
        description: "Remind and ensure proper hydration.",
        icon: Activity,
      },
      {
        title: "Walking",
        description: "Log walks and keep them active.",
        icon: PawPrint,
      },
      {
        title: "Training",
        description: "Track training and progress.",
        icon: Dumbbell,
      },
      {
        title: "Grooming",
        description: "Maintain grooming routines with ease.",
        icon: Sparkles,
      },
      {
        title: "Medication",
        description: "Never miss important medications.",
        icon: Pill,
      },
      {
        title: "Reminders",
        description: "Smart reminders for every task.",
        icon: Bell,
      },
      {
        title: "Calendar",
        description: "Plan ahead with a clear care calendar.",
        icon: CalendarDays,
      },
      {
        title: "Task History",
        description: "Review completed care and routines.",
        icon: Clock3,
      },
    ],
  },

  {
    number: "03",
    eyebrow: "HEALTH & WELLNESS",
    title: "Better health today.",
    highlight: "Happier tomorrows.",
    description:
      "Keep all your pet's health records in one safe place. Track, manage, and never miss what matters.",
    icon: HeartPulse,
    items: [
      {
        title: "Health Records",
        description: "Complete health information at a glance.",
        icon: HeartPulse,
      },
      {
        title: "Vaccination",
        description: "Track vaccines and their dates.",
        icon: ShieldCheck,
      },
      {
        title: "Deworming",
        description: "Stay on schedule for deworming.",
        icon: Leaf,
      },
      {
        title: "Medicines",
        description: "Manage medicines and dosage.",
        icon: Pill,
      },
      {
        title: "Treatments",
        description: "Track ongoing treatments.",
        icon: Stethoscope,
      },
      {
        title: "Vet Visits",
        description: "Record every visit and consultation.",
        icon: Stethoscope,
      },
      {
        title: "Medical Documents",
        description: "Store reports and documents safely.",
        icon: CloudUpload,
      },
      {
        title: "Weight / Growth",
        description: "Monitor weight and growth.",
        icon: Weight,
      },
      {
        title: "Medical Conditions",
        description: "Keep track of medical conditions.",
        icon: Heart,
      },
      {
        title: "Allergies",
        description: "Note allergies and special care needs.",
        icon: Info,
      },
    ],
  },

  {
    number: "04",
    eyebrow: "SMART PET CARE",
    title: "Smarter care.",
    highlight: "Happier pets.",
    description:
      "Get expert-backed guidance and AI-powered answers for every step of your pet parenting journey.",
    icon: WandSparkles,
    items: [
      {
        title: "Breed Information",
        description: "Learn about your pet's breed and needs.",
        icon: PawPrint,
      },
      {
        title: "Health & Wellness",
        description: "Tips for a healthier, longer life.",
        icon: HeartPulse,
      },
      {
        title: "Food & Nutrition",
        description: "Balanced diet and nutrition advice.",
        icon: Utensils,
      },
      {
        title: "Grooming",
        description: "Grooming tips for a clean happy pet.",
        icon: Sparkles,
      },
      {
        title: "Training",
        description: "Step-by-step training guides.",
        icon: Dumbbell,
      },
      {
        title: "Safety",
        description: "Keep your pet safe at home and outside.",
        icon: ShieldCheck,
      },
      {
        title: "Basic Care",
        description: "Daily care routines made simple.",
        icon: Heart,
      },
      {
        title: "PawChat AI",
        description: "Ask anything. Get smart, personalized answers.",
        icon: MessageCircle,
      },
    ],
  },

  {
    number: "05",
    eyebrow: "MEMORIES & PROGRESS",
    title: "Cherish moments.",
    highlight: "Celebrate progress.",
    description:
      "Save memories, celebrate milestones, and track your pet's journey as they grow happier and healthier every day.",
    icon: Camera,
    items: [
      {
        title: "Memories",
        description: "Keep all your precious moments together.",
        icon: Heart,
      },
      {
        title: "Photos",
        description: "Store and organize favorite photos.",
        icon: ImageIcon,
      },
      {
        title: "Videos",
        description: "Save fun videos and cute memories.",
        icon: Video,
      },
      {
        title: "Albums",
        description: "Create albums for every special occasion.",
        icon: Camera,
      },
      {
        title: "Milestones",
        description: "Celebrate important moments.",
        icon: Trophy,
      },
      {
        title: "Timeline",
        description: "A beautiful timeline of memories.",
        icon: Activity,
      },
      {
        title: "Pet Progress",
        description: "Track health, habits, and improvements.",
        icon: Weight,
      },
      {
        title: "Care Score",
        description: "See how well you're caring for your pet.",
        icon: HeartPulse,
      },
    ],
  },

  {
    number: "06",
    eyebrow: "REWARDS & GAMIFICATION",
    title: "Care more.",
    highlight: "Earn more. Unlock more.",
    description:
      "Every good habit brings you closer to exciting rewards. Stay consistent, level up, and unlock more.",
    icon: Trophy,
    items: [
      {
        title: "Daily Streaks",
        description: "Build streaks by completing care tasks.",
        icon: Flame,
      },
      {
        title: "XP",
        description: "Earn XP for every action and milestone.",
        icon: Star,
      },
      {
        title: "PawPoints",
        description: "Collect PawPoints and redeem rewards.",
        icon: PawPrint,
      },
      {
        title: "Levels",
        description: "Level up and unlock new perks.",
        icon: Medal,
      },
      {
        title: "Achievements",
        description: "Complete achievements and show your wins.",
        icon: Trophy,
      },
      {
        title: "Badges",
        description: "Unlock unique badges.",
        icon: Award,
      },
      {
        title: "Rewards Shop",
        description: "Spend PawPoints on rewards.",
        icon: Gift,
      },
      {
        title: "Unlocks",
        description: "Unlock premium features and surprises.",
        icon: KeyRound,
      },
    ],
  },

  {
    number: "07",
    eyebrow: "PETMOJI & CUSTOMIZATION",
    title: "Your pet, your style.",
    highlight: "Make it uniquely theirs.",
    description:
      "Create adorable Petmojis and customize every detail. Because your pet deserves a look as special as their personality.",
    icon: WandSparkles,
    items: [
      {
        title: "Preset Pet Avatars",
        description: "Choose from a variety of cute pet avatars.",
        icon: PawPrint,
      },
      {
        title: "Create Petmoji",
        description: "Design your own Petmoji.",
        icon: WandSparkles,
      },
      {
        title: "Accessories",
        description: "Add hats, bows, glasses and more.",
        icon: Gift,
      },
      {
        title: "Backgrounds",
        description: "Pick beautiful backgrounds.",
        icon: ImageIcon,
      },
      {
        title: "Frames",
        description: "Decorate with stylish frames.",
        icon: Sparkles,
      },
      {
        title: "Stickers",
        description: "Add playful stickers.",
        icon: Star,
      },
      {
        title: "Paw Effects",
        description: "Add magical paw effects.",
        icon: PawPrint,
      },
      {
        title: "PetCard Themes",
        description: "Apply themes and make your PetCard stand out.",
        icon: Sparkles,
      },
    ],
  },

  {
    number: "08",
    eyebrow: "FUN ZONE",
    title: "Play. Train.",
    highlight: "Bond. Repeat.",
    description:
      "Fun tools to keep your pet active, happy, and well-trained — every single day.",
    icon: GiWhistle,
    items: [
      {
        title: "Clicker",
        description: "Mark the right behavior and reinforce habits.",
        icon: Activity,
      },
      {
        title: "Whistle",
        description: "Different whistle sounds for commands.",
        icon: GiWhistle,
      },
      {
        title: "Training Tools",
        description: "Interactive tools, tips, and guides.",
        icon: Dumbbell,
      },
    ],
  },
];

function IconBox({
  icon: Icon,
  className = "",
}: {
  icon: React.ElementType;
  className?: string;
}) {
  return (
    <span className={`${styles.iconBox} ${className}`}>
      <Icon size={18} strokeWidth={2} />
    </span>
  );
}

export default function FeaturesPage() {
  const [visible, setVisible] = useState<string[]>([]);
  const [activeItems, setActiveItems] = useState<Record<string, number>>(
    {}
  );

  const sectionRefs = useRef<
    Record<string, HTMLElement | null>
  >({});

  const overviewRailRef =
    useRef<HTMLDivElement | null>(null);

  const overviewHoverRef =
    useRef(false);

  useEffect(() => {
    const rail = overviewRailRef.current;

    if (!rail || sections.length <= 1) {
      return;
    }

    let animationFrame = 0;
    let previousTime = performance.now();

    const railStyles =
      window.getComputedStyle(rail);

    const gap =
      parseFloat(
        railStyles.columnGap ||
        railStyles.gap ||
        "0"
      );

    const firstSet = Array.from(
      rail.children
    ).slice(0, sections.length);

    const loopWidth =
      firstSet.reduce(
        (total, child, index) => {
          const width =
            (child as HTMLElement)
              .getBoundingClientRect()
              .width;

          return (
            total +
            width +
            (index <
              firstSet.length - 1
              ? gap
              : 0)
          );
        },
        0
      );

    const speed = 55;

    const animate = (time: number) => {
      const delta =
        Math.min(
          time - previousTime,
          32
        );

      previousTime = time;

      if (
        !overviewHoverRef.current &&
        !document.hidden
      ) {
        rail.scrollLeft +=
          (speed * delta) / 1000;

        if (
          loopWidth > 0 &&
          rail.scrollLeft >= loopWidth
        ) {
          rail.scrollLeft -= loopWidth;
        }
      }

      animationFrame =
        window.requestAnimationFrame(
          animate
        );
    };

    animationFrame =
      window.requestAnimationFrame(
        animate
      );

    return () => {
      window.cancelAnimationFrame(
        animationFrame
      );
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const number = entry.target.getAttribute("data-feature");

          if (!number) return;

          setVisible((current) =>
            current.includes(number)
              ? current
              : [...current, number]
          );
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -100px 0px",
      }
    );

    Object.values(sectionRefs.current).forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToFeature = (number: string) => {
    sectionRefs.current[number]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <main className={styles.page}>
      {/* =====================================================
          HERO
          ===================================================== */}

      <section className={styles.hero}>
        <div className={styles.heroBackdrop} />

        <div className={styles.container}>
          <div className={styles.heroLayout}>
            <div className={styles.heroCopy}>
              <h1>
                Everything your pet needs.
                <span>All in one place.</span>
              </h1>

              <p>
                From identity and safety to everyday care, health,
                memories, rewards and smart tools — PetCard connects
                your pet&apos;s entire world in one simple experience.
              </p>

              <div className={styles.heroActions}>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => scrollToFeature("01")}
                >
                  Explore Features
                  <img
                    src="/images/paw-white.png"
                    width={30}
                    height={30}
                  />
                </button>

                <a
                  href="#feature-overview"
                  className="btn btn-outline"
                >
                  View All
                </a>
              </div>
            </div>

            <div className={styles.heroVisual}>
              <div className={styles.heroGlow} />

              <div className={styles.heroPhone}>
                <div className={styles.heroPhoneNotch} />

                <div className={styles.heroPhoneHeader}>
                  <span>9:41</span>
                  <strong>PetCard</strong>
                  <span>•••</span>
                </div>

                <div className={styles.heroPetHeader}>
                  <div className={styles.heroPetAvatar}>
                    <PawPrint size={19} fill="currentColor" />
                  </div>

                  <div>
                    <small>Good morning,</small>
                    <strong>Bruno ❤️</strong>
                  </div>

                  <span className={styles.onlineDot}>
                    Active
                  </span>
                </div>

                <div className={styles.heroTodayCard}>
                  <div>
                    <small>Today&apos;s Care</small>
                    <strong>3 / 5</strong>
                  </div>

                  <div className={styles.heroProgress}>
                    <span />
                  </div>
                </div>

                {[
                  ["Feeding", "08:00 AM", true],
                  ["Water", "09:30 AM", true],
                  ["Walk", "06:00 PM", false],
                  ["Training", "07:00 PM", false],
                  ["Grooming", "08:00 PM", false],
                ].map(([name, time, done]) => (
                  <div className={styles.heroTask} key={String(name)}>
                    <span>
                      <Activity size={13} />
                    </span>

                    <div>
                      <strong>{name}</strong>
                      <small>{time}</small>
                    </div>

                    {done ? (
                      <CircleCheck size={15} />
                    ) : (
                      <span className={styles.emptyCheck} />
                    )}
                  </div>
                ))}

                <div className={styles.heroPhoneNav}>
                  <span>Home</span>
                  <span>Care</span>

                  <span className={styles.heroNavActive}>
                    <PawPrint size={13} fill="currentColor" />
                  </span>

                  <span>History</span>
                  <span>More</span>
                </div>
              </div>

              <div className={styles.heroFloatA}>
                <ShieldCheck size={14} />
                Secure profile
              </div>

              <div className={styles.heroFloatB}>
                <Trophy size={14} />
                7 day streak
              </div>

              <div className={styles.heroFloatC}>
                <HeartPulse size={14} />
                Health tracked
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          FEATURE OVERVIEW
          ===================================================== */}

      <section
        id="feature-overview"
        className={styles.overview}
      >
        <div className={styles.container}>
          <div className={styles.overviewHead}>
            <div>


              <h2>
                One pet.
                <span>Eight connected worlds.</span>
              </h2>
            </div>

            <p>
              Explore the complete PetCard experience — built around
              the way real pet parents care, protect, learn and play.
            </p>
          </div>

          <div
            ref={overviewRailRef}
            className={styles.overviewRail}


          >
            {[...sections, ...sections].map(
              (section, index) => {
                const Icon = section.icon;

                return (
                  <button
                    type="button"
                    key={`${section.number}-${index}`}
                    className={styles.overviewItem}
                    onClick={() =>
                      scrollToFeature(
                        section.number
                      )
                    }
                    aria-label={`Go to ${section.eyebrow}`}
                  >
                    <div className={styles.overviewTop}>
                      <span className={styles.overviewNo}>
                        {section.number}
                      </span>

                      <span className={styles.overviewIcon}>
                        <IconBox icon={Icon} />
                      </span>
                    </div>

                    <div className={styles.overviewBottom}>
                      <span className={styles.overviewLabel}>
                        {section.eyebrow}
                      </span>

                      <span className={styles.overviewArrow}>
                        <ChevronRight size={18} />
                      </span>
                    </div>
                  </button>
                );
              }
            )}
          </div>
        </div>
      </section>

      {/* =====================================================
          01 — IDENTITY & SAFETY
          ===================================================== */}

      <section
        ref={(node) => {
          sectionRefs.current["01"] = node;
        }}
        data-feature="01"
        id="feature-01"
        className={`${styles.feature} ${styles.identity}`}
      >
        <div className={styles.container}>
          <div
            className={`${styles.identityLayout} ${visible.includes("01") ? styles.isVisible : ""
              }`}
          >
            <div className={styles.identityCopy}>
              <FeatureHeading section={sections[0]} />

              <p className={styles.sectionDescription}>
                {sections[0].description}
              </p>

              <div className={styles.identityBottomCard}>
                <div className={styles.identityShield}>
                  <ShieldCheck size={25} />
                </div>

                <div>
                  <strong>Safety is love in action.</strong>
                  <p>
                    Because they can&apos;t speak for themselves,
                    we make sure someone can.
                  </p>
                </div>
              </div>

            </div>

            <div className={styles.identityCenter}>
              <div className={styles.identityHalo} />

              <div className={styles.identityPhone}>
                <div className={styles.phoneBlackNotch} />

                <div className={styles.idHeader}>
                  <span>‹</span>
                  <strong>PetCard</strong>
                  <span>•••</span>
                </div>

                <div className={styles.idProfile}>
                  <div className={styles.idProfileImage}>
                    <Image
                      src="/images/slider/huchiko.png"
                      alt="Pet profile"
                      fill
                      sizes="50px"
                    />
                  </div>

                  <div>
                    <strong>Milo</strong>
                    <small>Akita Inu · 2 Years</small>
                  </div>
                </div>

                <div className={styles.idCardHero}>
                  <span>Pet ID</span>
                  <strong>PC24MILO0001</strong>

                  <div className={styles.fakeQR}>
                    <QrCode size={45} />
                  </div>
                </div>

                <div className={styles.idEmergency}>
                  <div>
                    <HeartPulse size={14} />
                    <strong>Emergency Card</strong>
                  </div>

                  <ChevronRight size={14} />
                </div>

                <div className={styles.idGuardians}>
                  <div>
                    <small>PRIMARY GUARDIAN</small>
                    <strong>Riya Sharma</strong>
                  </div>

                  <div>
                    <small>SECONDARY GUARDIAN</small>
                    <strong>Karan Sharma</strong>
                  </div>
                </div>

                <button type="button" className={styles.phoneAction}>
                  Share PetCard
                  <ArrowRight size={12} />
                </button>

                <div className={styles.phoneBottom}>
                  Profile
                  · Health
                  · Guardians
                  · Emergency
                </div>
              </div>

              <div className={styles.identityPet}>
                <Image
                  src={sections[0].image ?? "/images/slider/huchiko.png"}
                  alt="Pet"
                  fill
                  sizes="180px"
                />
              </div>

              <div className={styles.identityBadge}>
                <LockKeyhole size={15} />
                Secure
                <small>Always protected.</small>
              </div>
            </div>

            <div className={styles.identityRight}>
              <FeatureItemCarousel
                items={sections[0].items}
                visible={visible.includes("01")}
                large
                className={styles.identityCarousel}
              />
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          02 — DAILY CARE
          ===================================================== */}

      <section
        ref={(node) => {
          sectionRefs.current["02"] = node;
        }}
        data-feature="02"
        id="feature-02"
        className={`${styles.feature} ${styles.daily}`}
      >
        <div className={styles.container}>
          <div
            className={`${styles.dailyLayout} ${visible.includes("02") ? styles.isVisible : ""
              }`}
          >
            <div className={styles.dailyCopy}>
              <FeatureHeading section={sections[1]} />

              <p className={styles.sectionDescription}>
                {sections[1].description}
              </p>

              <FeatureItemCarousel
                items={sections[1].items}
                visible={visible.includes("02")}
                className={styles.dailyCarousel}
              />


            </div>

            <div className={styles.dailyPhoneWrap}>
              <div className={styles.dailyDecorHeart}>
                <Heart size={39} />
              </div>

              <div className={styles.dailyPhone}>
                <div className={styles.phoneBlackNotch} />

                <div className={styles.dailyProfile}>
                  <div className={styles.dailyPetImage}>
                    <Image
                      src="/images/slider/browny.png"
                      alt="Milo"
                      fill
                      sizes="42px"
                    />
                  </div>

                  <div>
                    <strong>Milo</strong>
                    <small>Akita Inu · 2 Years</small>
                  </div>

                  <CalendarDays size={17} />
                </div>

                <div className={styles.dailyDateRow}>
                  <strong>Today, May 20</strong>
                  <span>3 / 5 Completed</span>
                </div>

                <div className={styles.dailyTaskList}>
                  {[
                    ["Feeding", "08:00 AM", true],
                    ["Water", "09:30 AM", true],
                    ["Walk", "06:00 PM", false],
                    ["Training", "07:00 PM", false],
                    ["Grooming", "08:00 PM", false],
                  ].map(([title, time, done]) => (
                    <button
                      type="button"
                      key={String(title)}
                      className={styles.dailyTaskRow}
                    >
                      <span className={styles.dailyTaskIcon}>
                        <Activity size={13} />
                      </span>

                      <span>
                        <strong>{title}</strong>
                        <small>{time}</small>
                      </span>

                      {done ? (
                        <CircleCheck size={17} />
                      ) : (
                        <span className={styles.taskOutline} />
                      )}
                    </button>
                  ))}
                </div>

                <div className={styles.dailyProgressLine}>
                  <span />
                </div>

                <div className={styles.dailyReminder}>
                  <Pill size={15} />

                  <div>
                    <small>Upcoming Reminder</small>
                    <strong>Medicine</strong>
                    <span>Tomorrow · 09:00 AM</span>
                  </div>

                  <Bell size={14} />
                </div>

                <div className={styles.dailyNav}>
                  <span>Home</span>
                  <span>Tasks</span>
                  <span className={styles.dailyNavActive}>
                    <PawPrint size={13} fill="currentColor" />
                  </span>
                  <span>History</span>
                  <span>More</span>
                </div>
              </div>

              <div className={styles.dailyPet}>
                <Image
                  src="/images/slider/browny.png"
                  alt="Pet"
                  fill
                  sizes="150px"
                />
              </div>
            </div>

            <div className={styles.dailyAside}>
              <div className={styles.calendarCard}>
                <div className={styles.panelTitle}>
                  <span>
                    <CalendarDays size={15} />
                    Calendar View
                  </span>
                  <ChevronRight size={14} />
                </div>

                <div className={styles.calendarMonth}>
                  <span>‹</span>
                  <strong>May 2024</strong>
                  <span>›</span>
                </div>

                <div className={styles.calendarGrid}>
                  {[
                    "28",
                    "29",
                    "30",
                    "1",
                    "2",
                    "3",
                    "4",
                    "5",
                    "6",
                    "7",
                    "8",
                    "9",
                    "10",
                    "11",
                    "12",
                    "13",
                    "14",
                    "15",
                    "16",
                    "17",
                    "18",
                    "19",
                    "20",
                    "21",
                    "22",
                    "23",
                    "24",
                    "25",
                    "26",
                    "27",
                    "28",
                    "29",
                    "30",
                    "31",
                  ].map((day, index) => (
                    <span
                      key={`${day}-${index}`}
                      className={
                        day === "20"
                          ? styles.calendarToday
                          : ""
                      }
                    >
                      {day}
                    </span>
                  ))}
                </div>
              </div>

              <div className={styles.overviewPanel}>
                <div className={styles.panelTitle}>
                  <span>
                    <ListChecks size={15} />
                    Today&apos;s Overview
                  </span>
                </div>

                <div className={styles.overviewStats}>
                  <div>
                    <Check size={14} />
                    <strong>3 / 5</strong>
                    <small>Tasks Completed</small>
                  </div>

                  <div>
                    <Clock3 size={14} />
                    <strong>2</strong>
                    <small>Upcoming Tasks</small>
                  </div>

                  <div>
                    <HeartPulse size={14} />
                    <strong>92%</strong>
                    <small>Care Score</small>
                  </div>

                  <div>
                    <Flame size={14} />
                    <strong>7</strong>
                    <small>Day Streak</small>
                  </div>
                </div>
              </div>

              <div className={styles.activityPanel}>
                <div className={styles.panelTitle}>
                  <span>
                    <Activity size={15} />
                    Recent Activity
                  </span>
                  <span className={styles.viewAll}>View All →</span>
                </div>

                {[
                  ["Feeding completed", "08:00 AM"],
                  ["Water completed", "09:30 AM"],
                  ["Medicine reminder set", "Yesterday"],
                  ["Walk logged", "Yesterday"],
                ].map(([title, time]) => (
                  <div className={styles.activityRow} key={title}>
                    <IconBox icon={Activity} />

                    <div>
                      <strong>{title}</strong>
                      <small>{time}</small>
                    </div>

                    <Check size={13} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          03 — HEALTH
          ===================================================== */}

      <section
        ref={(node) => {
          sectionRefs.current["03"] = node;
        }}
        data-feature="03"
        id="feature-03"
        className={`${styles.feature} ${styles.health}`}
      >
        <div className={styles.container}>
          <div
            className={`${styles.healthLayout} ${visible.includes("03") ? styles.isVisible : ""
              }`}
          >
            <div className={styles.healthCopy}>
              <FeatureHeading section={sections[2]} />

              <p className={styles.sectionDescription}>
                {sections[2].description}
              </p>

              <FeatureItemCarousel
                items={sections[2].items}
                visible={visible.includes("03")}
                className={styles.healthCarousel}
              />


            </div>

            <div className={styles.healthPhoneWrap}>
              <div className={styles.healthPhone}>
                <div className={styles.phoneBlackNotch} />

                <div className={styles.healthTopBar}>
                  <span>‹</span>
                  <strong>Health Records</strong>
                  <span>↗</span>
                </div>

                <div className={styles.healthPet}>
                  <div className={styles.healthPetImage}>
                    <Image
                      src="/images/slider/kiki.png"
                      alt="Milo"
                      fill
                      sizes="42px"
                    />
                  </div>

                  <div>
                    <strong>Milo</strong>
                    <small>Akita Inu · 2 Years</small>
                  </div>
                </div>

                <div className={styles.healthTabs}>
                  <span className={styles.activeHealthTab}>
                    Overview
                  </span>
                  <span>Vaccines</span>
                  <span>Medicines</span>
                  <span>Visits</span>
                  <span>Documents</span>
                </div>

                <div className={styles.healthSummaryCards}>
                  <HealthMini
                    icon={PawPrint}
                    title="Vaccines"
                    value="Up to date"
                  />
                  <HealthMini
                    icon={Weight}
                    title="Weight"
                    value="24.5 kg"
                  />
                  <HealthMini
                    icon={Heart}
                    title="Conditions"
                    value="None"
                  />
                  <HealthMini
                    icon={ShieldCheck}
                    title="Allergies"
                    value="None"
                  />
                </div>

                <div className={styles.healthUpcoming}>
                  <strong>Upcoming Reminders</strong>

                  <div>
                    <Pill size={13} />
                    <span>
                      <strong>Rabies Vaccine</strong>
                      <small>Due on 20 Jun 2024</small>
                    </span>
                    <em>Upcoming</em>
                  </div>

                  <div>
                    <Leaf size={13} />
                    <span>
                      <strong>Deworming</strong>
                      <small>Due on 05 Jun 2024</small>
                    </span>
                    <em>Upcoming</em>
                  </div>
                </div>

                <button
                  type="button"
                  className={styles.healthAddButton}
                >
                  <Plus size={15} />
                  Add New Record
                </button>
              </div>

              <div className={styles.healthCat}>
                <Image
                  src="/images/slider/kiki.png"
                  alt="Pet"
                  fill
                  sizes="120px"
                />
              </div>
            </div>

            <div className={styles.healthAside}>
              <div className={styles.vaccinePanel}>
                <div className={styles.panelTitle}>
                  <span>Vaccination Schedule</span>
                  <span className={styles.viewAll}>View All →</span>
                </div>

                {[
                  ["DHPP", "20 May 2023", "Completed"],
                  ["Rabies", "20 May 2023", "Completed"],
                  ["Booster DHPP", "20 May 2024", "Upcoming"],
                  ["Kennel Cough", "20 Jun 2024", "Upcoming"],
                ].map(([name, date, status]) => (
                  <div className={styles.vaccineRow} key={name}>
                    <span className={styles.vaccineDot}>
                      <ShieldCheck size={13} />
                    </span>

                    <div>
                      <strong>{name}</strong>
                      <small>{date}</small>
                    </div>

                    <em
                      className={
                        status === "Completed"
                          ? styles.doneStatus
                          : styles.pendingStatus
                      }
                    >
                      {status}
                    </em>

                    {status === "Completed" ? (
                      <Check size={14} />
                    ) : (
                      <span className={styles.statusCircle} />
                    )}
                  </div>
                ))}
              </div>

              <div className={styles.weightPanel}>
                <div className={styles.panelTitle}>
                  <span>Weight Progress</span>
                  <span className={styles.viewAll}>View Chart →</span>
                </div>

                <div className={styles.chartValue}>
                  +2.1 kg
                  <small>This Month</small>
                </div>

                <div className={styles.fakeChart}>
                  <span style={{ height: "35%" }} />
                  <span style={{ height: "47%" }} />
                  <span style={{ height: "56%" }} />
                  <span style={{ height: "66%" }} />
                  <span style={{ height: "79%" }} />
                  <span style={{ height: "91%" }} />
                </div>
              </div>

              <div className={styles.alertPanel}>
                <div className={styles.panelTitle}>
                  <span>
                    <Bell size={15} />
                    Health Alerts
                  </span>
                  <span className={styles.viewAll}>View All →</span>
                </div>

                <div className={styles.alertRow}>
                  <HeartPulse size={15} />
                  <span>
                    <strong>Due for Rabies vaccine</strong>
                    <small>20 Jun 2024</small>
                  </span>
                  <button type="button">Reminder</button>
                </div>

                <div className={styles.alertRow}>
                  <Bell size={15} />
                  <span>
                    <strong>Deworming due soon</strong>
                    <small>05 Jun 2024</small>
                  </span>
                  <button type="button">Reminder</button>
                </div>
              </div>

              <div className={styles.healthAsideTip}>
                <HeartPulse size={17} />
                <div>
                  <strong>Tip for a healthy pet</strong>
                  <p>
                    Regular check-ups, timely vaccines and a
                    balanced routine keep your pet happy and strong.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          04 — SMART PET CARE
          ===================================================== */}

      <section
        ref={(node) => {
          sectionRefs.current["04"] = node;
        }}
        data-feature="04"
        id="feature-04"
        className={`${styles.feature} ${styles.smart}`}
      >
        <div className={styles.container}>
          <div
            className={`${styles.smartLayout} ${visible.includes("04") ? styles.isVisible : ""
              }`}
          >
            <div className={styles.smartCopy}>
              <FeatureHeading section={sections[3]} />

              <p className={styles.sectionDescription}>
                {sections[3].description}
              </p>

              <FeatureItemCarousel
                items={sections[3].items}
                visible={visible.includes("04")}
                className={styles.smartCarousel}
              />

              <div className={styles.smartKnowledge}>
                <div className={styles.smartKnowledgeIcon}>
                  <PawPrint size={19} fill="currentColor" />
                </div>

                <div>
                  <strong>Knowledge is love.</strong>
                  <p>
                    The more you learn, the better you care.
                  </p>
                </div>
              </div>
            </div>

            <div className={styles.smartPhoneWrap}>
              <div className={styles.smartPhone}>
                <div className={styles.phoneBlackNotch} />

                <div className={styles.chatHeader}>
                  <span>‹</span>

                  <div>
                    <strong>PawChat AI</strong>
                    <small>Your pet care assistant</small>
                  </div>

                  <div className={styles.chatAvatar}>
                    <PawPrint size={14} fill="currentColor" />
                  </div>
                </div>

                <div className={styles.chatQuestion}>
                  How often should I groom my Golden Retriever?
                </div>

                <div className={styles.chatAnswer}>
                  <div className={styles.chatPaw}>
                    <PawPrint size={12} fill="currentColor" />
                  </div>

                  <div>
                    <p>
                      Golden Retrievers have a beautiful double coat
                      that needs regular care!
                    </p>

                    <strong>Here&apos;s what I recommend:</strong>

                    {[
                      ["Brushing", "3–4 times a week"],
                      ["Bathing", "Every 4–6 weeks"],
                      ["Nail Trimming", "Every 2–3 weeks"],
                      ["Ear Cleaning", "Once a week"],
                    ].map(([title, value]) => (
                      <div
                        className={styles.aiRecommendation}
                        key={title}
                      >
                        <Check size={11} />
                        <span>
                          <strong>{title}</strong>
                          <small>{value}</small>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={styles.aiSuggestions}>
                  <span>Feeding tips</span>
                  <span>Training help</span>
                  <span>Health advice</span>
                </div>

                <div className={styles.aiInput}>
                  Ask anything about your pet...
                  <Send size={13} />
                </div>

                <div className={styles.smartPhoneNav}>
                  <span>Home</span>
                  <span>Learn</span>
                  <span className={styles.smartNavActive}>
                    <MessageCircle size={13} />
                  </span>
                  <span>History</span>
                  <span>More</span>
                </div>
              </div>
            </div>

            <div className={styles.smartAside}>
              <div className={styles.smartBreedCard}>
                <div>
                  <span>Every pet is unique.</span>
                  <strong>So is their care.</strong>

                  <p>
                    Personalized guidance for your pet&apos;s breed,
                    age, and lifestyle.
                  </p>

                  <button type="button">
                    Explore Breed Info
                    <img
                      src="/images/paw-white.png"
                      width={20}
                      height={20}
                    />
                  </button>
                </div>

                <Image
                  src="/images/slider/cupid.png"
                  alt="Dog"
                  width={170}
                  height={170}
                />
              </div>

              <div className={styles.guidePanel}>
                <div className={styles.panelTitle}>
                  <span>Top Guides for You</span>
                  <span className={styles.viewAll}>View All →</span>
                </div>

                <div className={styles.guideGrid}>
                  {(
                    [
                      ["Best Food", Utensils],
                      ["How to Brush", Sparkles],
                      ["Training", Dumbbell],
                      ["Pet Safety", ShieldCheck],
                    ] as Array<[string, React.ElementType]>
                  ).map(([title, Icon]) => {
                    const GuideIcon = Icon as React.ElementType;

                    return (
                      <button
                        type="button"
                        key={String(title)}
                        className={styles.guideCard}
                      >
                        <span>
                          <GuideIcon size={20} />
                        </span>

                        <strong>{title}</strong>
                        <small>Explore guide</small>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className={styles.askPanel}>
                <div className={styles.panelTitle}>
                  <span>
                    <MessageCircle size={15} />
                    Ask PawChat AI
                  </span>
                </div>

                {[
                  "Is my dog's weight healthy?",
                  "What food is best for my puppy?",
                  "How do I calm my anxious dog?",
                ].map((question) => (
                  <button type="button" key={question}>
                    {question}
                    <ChevronRight size={13} />
                  </button>
                ))}
              </div>

              <div className={styles.smartCat}>
                <Image
                  src="/images/slider/waffle.png"
                  alt="Cat"
                  fill
                  sizes="130px"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          05 — MEMORIES
          ===================================================== */}

      <section
        ref={(node) => {
          sectionRefs.current["05"] = node;
        }}
        data-feature="05"
        id="feature-05"
        className={`${styles.feature} ${styles.memories}`}
      >
        <div className={styles.container}>
          <div
            className={`${styles.memoryLayout} ${visible.includes("05") ? styles.isVisible : ""
              }`}
          >
            <div className={styles.memoryIntro}>
              <FeatureHeading section={sections[4]} />

              <p className={styles.sectionDescription}>
                {sections[4].description}
              </p>

              <FeatureItemCarousel
                items={sections[4].items}
                visible={visible.includes("05")}
                className={styles.memoryCarousel}
              />
            </div>

            <div className={styles.memoryGallery}>
              <div className={styles.galleryHeader}>
                <span>May 2024</span>
                <div>
                  <button type="button">
                    <MoreHorizontal size={16} />
                  </button>

                  <button type="button">
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              <div className={styles.galleryTabs}>
                <button type="button">All</button>
                <button
                  type="button"
                  className={styles.galleryActive}
                >
                  Photos
                </button>
                <button type="button">Videos</button>
                <button type="button">Albums</button>
              </div>

              <div className={styles.photoGrid}>
                {[
                  "/images/reward/coco.png",
                  "/images/slider/huchiko.png",
                  "/images/reward/huchiko.png",
                  "/images/slider/noir.png",
                  "/images/reward/zuzu.png",
                  "/images/slider/waffle.png",
                  "/images/slider/kiki.png",
                  "/images/slider/cupid.png",
                  "/images/slider/oreo.png",
                ].map((src, index) => (
                  <div className={styles.photoTile} key={src + index}>
                    <Image
                      src={src}
                      alt="Pet memory"
                      fill
                      sizes="120px"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.memoryAside}>
              <div className={styles.milestonePanel}>
                <div className={styles.panelTitle}>
                  <span>
                    <Star size={15} />
                    Milestones
                  </span>

                  <span className={styles.viewAll}>View All →</span>
                </div>

                <div className={styles.milestoneRail}>
                  {(
                    [
                      ["Gotcha Day", "Jan 10, 2023", Heart],
                      ["First Walk", "Feb 05, 2023", PawPrint],
                      ["Birthday", "May 20, 2023", Gift],
                      ["Vet Visit", "Aug 12, 2023", Stethoscope],
                      ["Trick Master", "Dec 01, 2023", Trophy],
                    ] as Array<[string, string, React.ElementType]>
                  ).map(([title, date, Icon]) => {
                    const MilestoneIcon =
                      Icon as React.ElementType;

                    return (
                      <div
                        className={styles.milestoneItem}
                        key={String(title)}
                      >
                        <span>
                          <MilestoneIcon
                            size={14}
                            fill="currentColor"
                          />
                        </span>

                        <strong>{title}</strong>
                        <small>{date}</small>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className={styles.progressPanel}>
                <div className={styles.panelTitle}>
                  <span>Pet Progress</span>
                  <span>This Month⌄</span>
                </div>

                <div className={styles.progressMetrics}>
                  <div>
                    <strong>24.5 kg</strong>
                    <small>Weight</small>
                    <span>+1.2 kg</span>
                  </div>

                  <div>
                    <strong>85%</strong>
                    <small>Daily Activity</small>
                    <span>Great job!</span>
                  </div>

                  <div>
                    <strong>28/30</strong>
                    <small>Meals Completed</small>
                    <span>On track</span>
                  </div>

                  <div>
                    <strong>90%</strong>
                    <small>Hydration</small>
                    <span>Well done!</span>
                  </div>
                </div>
              </div>

              <div className={styles.scorePanel}>
                <div className={styles.scoreCircle}>
                  <strong>92%</strong>
                  <small>Excellent Care</small>
                </div>

                <div className={styles.scoreList}>
                  {[
                    ["Nutrition", "Great"],
                    ["Exercise", "Great"],
                    ["Grooming", "Good"],
                    ["Health", "Excellent"],
                    ["Love & Attention", "Excellent"],
                  ].map(([name, status]) => (
                    <div key={name}>
                      <HeartPulse size={13} />
                      <span>{name}</span>
                      <strong>{status}</strong>
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.memoryMessage}>
                <Gift size={22} />

                <div>
                  <strong>Keep creating happy memories!</strong>
                  <p>
                    Every moment you save today becomes a memory
                    you&apos;ll cherish forever.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          06 — REWARDS
          ===================================================== */}

      <section
        ref={(node) => {
          sectionRefs.current["06"] = node;
        }}
        data-feature="06"
        id="feature-06"
        className={`${styles.feature} ${styles.rewards}`}
      >
        <div className={styles.container}>
          <div
            className={`${styles.rewardLayout} ${visible.includes("06") ? styles.isVisible : ""
              }`}
          >
            <div className={styles.rewardCopy}>
              <FeatureHeading section={sections[5]} />

              <p className={styles.sectionDescription}>
                {sections[5].description}
              </p>

              <FeatureItemCarousel
                items={sections[5].items}
                visible={visible.includes("06")}
                className={styles.rewardCarousel}
              />
            </div>

            <div className={styles.rewardPhoneWrap}>
              <div className={styles.rewardPhone}>
                <div className={styles.phoneBlackNotch} />

                <div className={styles.rewardTop}>
                  <span>‹</span>
                  <strong>Rewards</strong>
                  <CalendarDays size={15} />
                </div>

                <div className={styles.rewardProfile}>
                  <div>
                    <span>
                      <PawPrint
                        size={15}
                        fill="currentColor"
                      />
                    </span>

                    <div>
                      <strong>Milo</strong>
                      <small>Akita Inu · 2 Years</small>
                    </div>
                  </div>

                  <Flame size={17} />
                </div>

                <div className={styles.rewardLevel}>
                  <div>
                    <strong>Level 12</strong>
                    <span>580 / 1000 XP</span>
                  </div>

                  <div className={styles.xpLine}>
                    <span />
                  </div>
                </div>

                <div className={styles.rewardStats}>
                  <div>
                    <Flame size={14} />
                    <strong>12</strong>
                    <small>Day Streak</small>
                  </div>

                  <div>
                    <PawPrint
                      size={14}
                      fill="currentColor"
                    />
                    <strong>2,450</strong>
                    <small>PawPoints</small>
                  </div>

                  <div>
                    <Star size={14} />
                    <strong>580</strong>
                    <small>Total XP</small>
                  </div>
                </div>

                <div className={styles.rewardMission}>
                  <div className={styles.missionHead}>
                    <strong>Today&apos;s Mission</strong>
                    <span>3 / 5</span>
                  </div>

                  <div>
                    <Utensils size={14} />
                    <span>
                      <strong>Complete all daily care tasks</strong>
                      <small>Earn 50 XP + 100 PawPoints</small>
                    </span>
                  </div>

                  <div className={styles.missionProgress}>
                    <span />
                  </div>
                </div>

                <div className={styles.recentBadges}>
                  <div className={styles.missionHead}>
                    <strong>Recent Achievements</strong>
                    <span>View All →</span>
                  </div>

                  <div className={styles.badgeRow}>
                    <span>
                      <Flame size={16} />
                    </span>
                    <span>
                      <Leaf size={16} />
                    </span>
                    <span>
                      <Clock3 size={16} />
                    </span>
                  </div>
                </div>

                <div className={styles.rewardPhoneBottom}>
                  Home · Tasks · Rewards · More
                </div>
              </div>

              <div className={styles.rewardPet}>
                <Image
                  src="/images/slider/huchiko.png"
                  alt="Happy pet"
                  fill
                  sizes="130px"
                />
              </div>
            </div>

            <div className={styles.rewardAside}>
              <div className={styles.streakPanel}>
                <div className={styles.panelTitle}>
                  <span>
                    <Flame size={15} />
                    Daily Streak
                  </span>
                  <span className={styles.viewAll}>
                    View Calendar →
                  </span>
                </div>

                <div className={styles.weekRow}>
                  {[
                    ["Mon", true],
                    ["Tue", true],
                    ["Wed", true],
                    ["Thu", true],
                    ["Fri", false],
                    ["Sat", false],
                    ["Sun", false],
                  ].map(([day, done]) => (
                    <div key={String(day)}>
                      <span
                        className={
                          done
                            ? styles.streakDone
                            : styles.streakEmpty
                        }
                      >
                        {done ? (
                          <Check size={13} />
                        ) : (
                          ""
                        )}
                      </span>

                      <small>{day}</small>
                    </div>
                  ))}
                </div>

                <div className={styles.streakMessage}>
                  <PawPrint size={19} fill="currentColor" />
                  <div>
                    <strong>12 Days Strong! 💪</strong>
                    <small>Keep it up, Milo!</small>
                  </div>
                </div>
              </div>

              <div className={styles.achievementPanel}>
                <div className={styles.panelTitle}>
                  <span>
                    <Trophy size={15} />
                    Top Achievements
                  </span>
                  <span className={styles.viewAll}>
                    View All →
                  </span>
                </div>

                <div className={styles.achievementGrid}>
                  {(
                    [
                      ["Pawfect Start", PawPrint],
                      ["Care Master", ShieldCheck],
                      ["Healthy Habit", HeartPulse],
                      ["Super Groomer", Sparkles],
                    ] as Array<[string, React.ElementType]>
                  ).map(([title, Icon]) => {
                    const AchievementIcon =
                      Icon as React.ElementType;

                    return (
                      <div key={String(title)}>
                        <span>
                          <AchievementIcon
                            size={18}
                          />
                        </span>
                        <strong>{title}</strong>
                        <small>Completed</small>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className={styles.shopPanel}>
                <div className={styles.panelTitle}>
                  <span>
                    <Gift size={15} />
                    Rewards Shop
                  </span>
                  <span className={styles.viewAll}>
                    View Shop →
                  </span>
                </div>

                <div className={styles.shopGrid}>
                  {(
                    [
                      ["Cozy Bed", Gift],
                      ["Fun Toy Ball", Star],
                      ["Premium Food", Utensils],
                      ["Pet Hoodie", Sparkles],
                    ] as Array<[string, React.ElementType]>
                  ).map(([name, Icon]) => {
                    const ShopIcon =
                      Icon as React.ElementType;

                    return (
                      <button
                        type="button"
                        key={String(name)}
                        className={styles.shopItem}
                      >
                        <span>
                          <ShopIcon size={20} />
                        </span>
                        <strong>{name}</strong>
                        <small>
                          <PawPrint
                            size={9}
                            fill="currentColor"
                          />
                          2,500
                        </small>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className={styles.rewardMessage}>
                <Gift size={22} />
                <div>
                  <strong>More care. More rewards.</strong>
                  <p>
                    Turn everyday care into something amazing for
                    your pet.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          07 — PETMOJI
          ===================================================== */}

      <section
        ref={(node) => {
          sectionRefs.current["07"] = node;
        }}
        data-feature="07"
        id="feature-07"
        className={`${styles.feature} ${styles.petmoji}`}
      >
        <div className={styles.container}>
          <div
            className={`${styles.petmojiLayout} ${visible.includes("07") ? styles.isVisible : ""
              }`}
          >
            <div className={styles.petmojiCopy}>
              <FeatureHeading section={sections[6]} />

              <p className={styles.sectionDescription}>
                {sections[6].description}
              </p>

              <FeatureItemCarousel
                items={sections[6].items}
                visible={visible.includes("07")}
                className={styles.petmojiCarousel}
              />
            </div>

            <div className={styles.petmojiEditor}>
              <div className={styles.editorPhone}>
                <div className={styles.phoneBlackNotch} />

                <div className={styles.editorHeader}>
                  <span>‹</span>
                  <strong>Create Petmoji</strong>
                  <span className={styles.editorCheck}>
                    ✓
                  </span>
                </div>

                <div className={styles.petmojiCanvas}>
                  <div className={styles.petmojiCanvasGlow} />

                  <div className={styles.petmojiCharacter}>
                    <Image
                      src="/images/slider/huchiko.png"
                      alt="Petmoji"
                      fill
                      sizes="155px"
                    />
                  </div>

                  <div className={styles.petmojiSparkleOne}>
                    ✦
                  </div>

                  <div className={styles.petmojiSparkleTwo}>
                    ✦
                  </div>

                  <div className={styles.petmojiHeart}>
                    ❤️
                  </div>
                </div>

                <div className={styles.editorTools}>
                  {(
                    [
                      ["Avatar", PawPrint],
                      ["Accessories", Gift],
                      ["Background", ImageIcon],
                      ["Stickers", Star],
                      ["Effects", Sparkles],
                    ] as Array<[string, React.ElementType]>
                  ).map(([title, Icon]) => {
                    const EditorIcon =
                      Icon as React.ElementType;

                    return (
                      <button type="button" key={String(title)}>
                        <EditorIcon size={14} />
                        <small>{title}</small>
                      </button>
                    );
                  })}
                </div>

                <div className={styles.editorSection}>
                  <div className={styles.editorSectionHead}>
                    <strong>Accessories</strong>
                    <span>View All →</span>
                  </div>

                  <div className={styles.accessoryRow}>
                    <span>🎩</span>
                    <span className={styles.accessoryActive}>
                      🕶️
                    </span>
                    <span>🎀</span>
                    <span>🌸</span>
                  </div>
                </div>

                <div className={styles.editorSection}>
                  <div className={styles.editorSectionHead}>
                    <strong>Backgrounds</strong>
                    <span>View All →</span>
                  </div>

                  <div className={styles.backgroundRow}>
                    <span>💗</span>
                    <span>🏝️</span>
                    <span>🌄</span>
                    <span>🌌</span>
                  </div>
                </div>

                <div className={styles.editorPreviewText}>
                  Petmoji Preview
                  <ArrowRight size={13} />
                </div>
              </div>
            </div>

            <div className={styles.petmojiAside}>
              <div className={styles.avatarPanel}>
                <div className={styles.panelTitle}>
                  <span>Choose Your Avatar</span>
                  <span className={styles.viewAll}>View All →</span>
                </div>

                <div className={styles.avatarRow}>
                  {[
                    "/images/slider/huchiko.png",
                    "/images/huchiko2.png",
                    "/images/slider/kiki.png",
                    "/images/slider/noir.png",
                    "/images/slider/oreo.png",
                  ].map((src, index) => (
                    <button
                      type="button"
                      key={src}
                      className={
                        index === 0
                          ? styles.avatarActive
                          : ""
                      }
                    >
                      <Image
                        src={src}
                        alt="Avatar"
                        fill
                        sizes="60px"
                      />

                      {index === 0 && (
                        <span className={styles.avatarTick}>
                          ✓
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.previewPanel}>
                <div className={styles.panelTitle}>
                  <span>Petmoji Preview</span>
                  <span>↗</span>
                </div>

                <div className={styles.previewGrid}>
                  <div className={styles.previewLarge}>
                    <Image
                      src="/images/slider/cupid.png"
                      alt="Petmoji preview"
                      fill
                      sizes="200px"
                    />

                    <span className={styles.previewSticker}>
                      GOOD BOY
                    </span>
                  </div>

                  <div className={styles.previewSmallGrid}>
                    <div>
                      <Image
                        src="/images/slider/waffle.png"
                        alt="Preview"
                        fill
                        sizes="100px"
                      />
                    </div>

                    <div>
                      <Image
                        src="/images/zuzu2.png"
                        alt="Preview"
                        fill
                        sizes="100px"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.themePanel}>
                <div className={styles.panelTitle}>
                  <span>PetCard Themes</span>
                  <span className={styles.viewAll}>View All →</span>
                </div>

                <div className={styles.themeRow}>
                  {[
                    ["Classic Paw", "🐾"],
                    ["Royal Paws", "👑"],
                    ["Pastel Love", "💗"],
                    ["Adventure", "🏔️"],
                    ["Galaxy", "🪐"],
                  ].map(([name, emoji], index) => (
                    <button
                      type="button"
                      className={
                        index === 0
                          ? styles.themeActive
                          : ""
                      }
                      key={name}
                    >
                      <span>{emoji}</span>
                      <small>{name}</small>
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.petmojiBottomMessage}>
                <Sparkles size={18} />

                <div>
                  <strong>
                    Express their personality.
                  </strong>

                  <p>
                    Create a Petmoji that&apos;s 100% them.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          08 — FUN ZONE
          ===================================================== */}

      <section
        ref={(node) => {
          sectionRefs.current["08"] = node;
        }}
        data-feature="08"
        id="feature-08"
        className={`${styles.feature} ${styles.fun}`}
      >
        <div className={styles.container}>
          <div
            className={`${styles.funLayout} ${visible.includes("08") ? styles.isVisible : ""
              }`}
          >
            <div className={styles.funCopy}>
              <FeatureHeading section={sections[7]} />

              <p className={styles.sectionDescription}>
                {sections[7].description}
              </p>

              <FeatureItemCarousel
                items={sections[7].items}
                visible={visible.includes("08")}
                className={styles.funCarousel}
                onActiveChange={(index) =>
                  setActiveItems((current) => ({
                    ...current,
                    "08": index,
                  }))
                }
              />
            </div>

            <div className={styles.funPhoneWrap}>
              <div className={styles.funPhone}>
                <div className={styles.phoneBlackNotch} />

                <div className={styles.funPhoneHeader}>
                  <span>9:41</span>
                  <strong>Fun Zone</strong>
                  <span>•••</span>
                </div>

                <div className={styles.funPetProfile}>
                  <div className={styles.funPetAvatar}>
                    <Image
                      src="/images/reward/home-dog.png"
                      alt="Milo"
                      fill
                      sizes="39px"
                    />
                  </div>

                  <div>
                    <strong>Milo</strong>
                    <small>Golden Retriever · 2 Years</small>
                  </div>
                </div>

                <div className={styles.funTabs}>
                  <span
                    className={
                      activeItems["08"] === 0
                        ? styles.funTabActive
                        : ""
                    }
                  >
                    Clicker
                  </span>

                  <span
                    className={
                      activeItems["08"] === 1
                        ? styles.funTabActive
                        : ""
                    }
                  >
                    Whistle
                  </span>

                  <span
                    className={
                      activeItems["08"] === 2
                        ? styles.funTabActive
                        : ""
                    }
                  >
                    Training
                  </span>
                </div>

                <div className={styles.clickerArea}>
                  <div className={styles.clickerTitle}>
                    <strong>Clicker</strong>
                    <small>
                      Tap to click and reward good behavior!
                    </small>
                  </div>

                  <button
                    type="button"
                    className={styles.clickButton}
                  >
                    <PawPrint
                      size={50}
                      fill="currentColor"
                    />
                  </button>

                  <strong className={styles.clickCount}>
                    128
                  </strong>

                  <span>Total Clicks</span>
                </div>

                <div className={styles.clickerTips}>
                  <strong>Clicker Tips</strong>

                  <span>
                    • Click instantly when your pet does something
                    good.
                  </span>

                  <span>
                    • Follow the click with a treat or praise.
                  </span>

                  <span>
                    • Consistency is the key to learning.
                  </span>
                </div>

                <div className={styles.funNav}>
                  <span>Home</span>
                  <span>Progress</span>

                  <span className={styles.funNavActive}>
                    <PawPrint size={14} fill="currentColor" />
                  </span>

                  <span>Rewards</span>
                  <span>More</span>
                </div>
              </div>

              <div className={styles.funPet}>
                <Image
                  src="/images/reward/home-dog.png"
                  alt="Happy dog"
                  fill
                  sizes="145px"
                />
              </div>
            </div>

            <div className={styles.funAside}>
              <div className={styles.clickerPanel}>
                <div className={styles.panelTitle}>
                  <span>
                    <Activity size={15} />
                    Clicker Training
                  </span>
                  <span className={styles.viewAll}>
                    View All →
                  </span>
                </div>

                <div className={styles.clickerSteps}>
                  {[
                    ["1", "Click", "Mark the right behavior"],
                    ["2", "Treat", "Reward with a treat"],
                    ["3", "Praise", "Praise your pet happily"],
                  ].map(([number, title, description]) => (
                    <div key={number}>
                      <span>{number}</span>
                      <div>
                        <strong>{title}</strong>
                        <small>{description}</small>
                      </div>
                    </div>
                  ))}
                </div>

                <div className={styles.goodBoy}>
                  <strong>Good boy!</strong>
                  <span>Click!</span>
                </div>

                <div className={styles.funPetSmall}>
                  <Image
                    src="/images/reward/home-dog.png"
                    alt="Training dog"
                    fill
                    sizes="120px"
                  />
                </div>
              </div>

              <div className={styles.whistlePanel}>
                <div className={styles.panelTitle}>
                  <span>
                    <GiWhistle size={15} />
                    Whistle Commands
                  </span>
                  <span className={styles.viewAll}>
                    View All →
                  </span>
                </div>

                <div className={styles.whistleCommands}>
                  {[
                    ["Sit", "1 Short Whistle"],
                    ["Come", "2 Short Whistles"],
                    ["Stay", "1 Long Whistle"],
                  ].map(([title, subtitle]) => (
                    <button type="button" key={title}>
                      <span>
                        <PawPrint
                          size={18}
                          fill="currentColor"
                        />
                      </span>

                      <strong>{title}</strong>
                      <small>{subtitle}</small>
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  className={styles.waveButton}
                >
                  <Play size={13} fill="currentColor" />
                  <span />
                  Try Now
                </button>
              </div>

              <div className={styles.trainingPanel}>
                <div className={styles.panelTitle}>
                  <span>
                    <Dumbbell size={15} />
                    Training Tools
                  </span>

                  <span className={styles.viewAll}>
                    View All →
                  </span>
                </div>

                <div className={styles.trainingGrid}>
                  {(
                    [
                      ["Basic Commands", Award],
                      ["Tricks", Star],
                      ["Leash Training", KeyRound],
                      ["Behavior Tips", BrainIcon],
                    ] as Array<[string, React.ElementType]>
                  ).map(([title, Icon]) => {
                    const TrainingIcon =
                      Icon as React.ElementType;

                    return (
                      <button
                        type="button"
                        key={String(title)}
                      >
                        <span>
                          <TrainingIcon size={19} />
                        </span>

                        <strong>{title}</strong>
                      </button>
                    );
                  })}
                </div>

                <div className={styles.trainingLevel}>
                  <div>
                    <strong>Level up your training!</strong>
                    <small>
                      Complete lessons, earn XP and unlock badges.
                    </small>
                  </div>

                  <button type="button">
                    Start Training
                  </button>
                </div>
              </div>
            </div>

            <div className={styles.funBottom}>
              <div>
                <ShieldCheck size={24} />
                <div>
                  <strong>Happy pet. Active mind. Stronger bond.</strong>
                  <small>
                    Make every playtime a learning time!
                  </small>
                </div>
              </div>

              <div className={styles.funBottomActions}>

                {/* App Store */}
                <a
                  href="#download-app"
                  className={styles.storeBadge}
                  aria-label="Download PetCard on the App Store"
                >
                  <img
                    src="/images/apple-logo.png"
                    alt="Apple"
                    className={styles.storeIconImage}
                  />

                  <span className={styles.storeText}>
                    <small>Download on the</small>
                    <b>App Store</b>
                  </span>
                </a>

                {/* Google Play */}
                <a
                  href="#download-app"
                  className={`${styles.storeBadge} ${styles.googleBadge}`}
                  aria-label="Get PetCard on Google Play"
                >
                  <img
                    src="/images/google-play.png"
                    alt="Google Play"
                    className={styles.storeIconImage}
                  />

                  <span className={styles.storeText}>
                    <small>GET IT ON</small>
                    <b>Google Play</b>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          FINAL CTA
          ===================================================== */}


      <div className={styles.container}>
  <div className={styles.finalCard}>
    <div className={styles.finalGlow} />

    <div className={styles.finalPaw}>
      <PawPrint
        size={170}
        fill="currentColor"
      />
    </div>

    {/* LEFT IMAGE */}
    <div className={styles.finalImageWrap}>
      <img
        src="/images/footer/pets.png"
        width={200}
        height={120}
        alt=""
        className={styles.featureCTA}
      />
    </div>

    {/* CENTER CONTENT */}
    <div className={styles.finalContent}>
      <h2>
        More than features.
        <span>It&apos;s their whole world.</span>
      </h2>

      <p>
        Identity, care, health, memories, rewards and smart
        tools — thoughtfully connected around the pet you love.
      </p>
    </div>

    {/* RIGHT BUTTON */}
    <Link
      href="/"
      className={`btn btn-primary ${styles.finalButton}`}
    >
      Explore PetCard

      <img
        src="/images/paw-white.png"
        width={30}
        height={30}
        alt=""
      />
    </Link>
  </div>
</div>

    </main>
  );
}


/* =========================================================
   REUSABLE COMPONENTS
   ========================================================= */

function FeatureHeading({
  section,
}: {
  section: SectionData;
}) {
  return (
    <div className={styles.featureHeading}>


      <h2>
        {section.title}
        <span>{section.highlight}</span>
      </h2>
    </div>
  );
}

function FeatureMiniCard({
  item,
  large = false,
}: {
  item: Item;
  large?: boolean;
}) {
  const Icon = item.icon;

  return (
    <button
      type="button"
      className={`${styles.miniCard} ${large ? styles.miniCardLarge : ""
        }`}
    >
      <IconBox icon={Icon} />

      <span className={styles.miniCardText}>
        <strong>{item.title}</strong>
        <small>{item.description}</small>
      </span>

      <ChevronRight
        size={14}
        className={styles.miniArrow}
      />
    </button>
  );
}

function HealthMini({
  icon: Icon,
  title,
  value,
}: {
  icon: React.ElementType;
  title: string;
  value: string;
}) {
  return (
    <div className={styles.healthMini}>
      <IconBox icon={Icon} />

      <div>
        <small>{title}</small>
        <strong>{value}</strong>
      </div>
    </div>
  );
}

function BrainIcon({
  size = 20,
}: {
  size?: number;
}) {
  return (
    <span
      style={{
        display: "grid",
        placeItems: "center",
        fontSize: size * 0.8,
        lineHeight: 1,
      }}
      aria-hidden="true"
    >
      🧠
    </span>
  );
}

function FeatureItemCarousel({
  items,
  visible = true,
  large = false,
  className = "",
  onActiveChange,
}: {
  items: Item[];
  visible?: boolean;
  large?: boolean;
  className?: string;
  onActiveChange?: (index: number) => void;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const total = items.length;

  /*
   * Keep the callback in a ref so a new parent callback identity
   * cannot restart the effects or cause a render/update loop.
   */
  const onActiveChangeRef = useRef(onActiveChange);

  useEffect(() => {
    onActiveChangeRef.current = onActiveChange;
  }, [onActiveChange]);

  useEffect(() => {
    if (!visible || total <= 1 || isHovered) return;

    const mediaQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    if (mediaQuery.matches) return;

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % total);
    }, 2000);

    return () => {
      window.clearInterval(interval);
    };
  }, [visible, isHovered, total]);

  useEffect(() => {
    onActiveChangeRef.current?.(activeIndex);
  }, [activeIndex]);

  const getOffset = (index: number) => {
    let offset = index - activeIndex;

    if (offset > total / 2) {
      offset -= total;
    }

    if (offset < -total / 2) {
      offset += total;
    }

    return offset;
  };

  const selectItem = (index: number) => {
    setActiveIndex(index);
  };

  const goPrevious = () => {
    selectItem((activeIndex - 1 + total) % total);
  };

  const goNext = () => {
    selectItem((activeIndex + 1) % total);
  };

  return (
    <div
      className={`${styles.miniCarousel} ${large ? styles.miniCarouselLarge : ""
        } ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={styles.miniCarouselViewport}>
        {items.map((item, index) => {
          const Icon = item.icon;
          const offset = getOffset(index);

          const isActive = offset === 0;
          const isPrevious = offset === -1;
          const isNext = offset === 1;
          const isVisible =
            isActive || isPrevious || isNext;

          return (
            <button
              key={item.title}
              type="button"
              className={`${styles.miniCarouselCard} ${isActive
                ? styles.miniCarouselCardActive
                : ""
                } ${isPrevious
                  ? styles.miniCarouselCardPrevious
                  : ""
                } ${isNext
                  ? styles.miniCarouselCardNext
                  : ""
                } ${!isVisible
                  ? styles.miniCarouselCardHidden
                  : ""
                }`}
              onClick={() => selectItem(index)}
              onFocus={() => {
                setIsHovered(true);
                selectItem(index);
              }}
              onBlur={() => setIsHovered(false)}
              aria-current={
                isActive ? "true" : undefined
              }
              aria-label={`View ${item.title}`}
            >
              <span
                className={styles.miniCarouselVisual}
                aria-hidden="true"
              >
                <span
                  className={styles.miniCarouselVisualGlow}
                />
                <Icon size={30} strokeWidth={2} />
              </span>

              <span className={styles.miniCarouselContent}>


                <strong>{item.title}</strong>

                <small>{item.description}</small>
              </span>

              <span
                className={styles.miniCarouselAction}
                aria-hidden="true"
              >
                <ChevronRight size={18} />
              </span>
            </button>
          );
        })}
      </div>

      {total > 1 && (
        <div className={styles.miniCarouselControls}>
          <button
            type="button"
            aria-label="Previous feature"
            onClick={goPrevious}
          >
            <ChevronRight size={15} />
          </button>

          <div className={styles.miniCarouselProgress}>
            <span
              style={{
                width: `${((activeIndex + 1) / total) * 100}%`,
              }}
            />
          </div>

          <span className={styles.miniCarouselCounter}>
            <strong>
              {String(activeIndex + 1).padStart(2, "0")}
            </strong>
            <span>/ {String(total).padStart(2, "0")}</span>
          </span>

          <button
            type="button"
            aria-label="Next feature"
            onClick={goNext}
          >
            <ChevronRight size={15} />
          </button>
        </div>
      )}
    </div>
  );
}