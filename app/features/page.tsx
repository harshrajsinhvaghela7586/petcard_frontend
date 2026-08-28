import Link from "next/link";
import {
  Activity,
  ArrowRight,
  Award,
  Bell,
  Bot,
  CalendarDays,
  Camera,
  CheckCircle2,
  ChevronRight,
  CircleHelp,
  Clock3,
  Droplets,
  Dumbbell,
  Gift,
  HeartPulse,
  IdCard,
  KeyRound,
  LockKeyhole,
  PawPrint,
  QrCode,
  ScanLine,
  ShieldAlert,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  Stethoscope,
  Syringe,
  Trophy,
  UserRound,
  Users,
  Utensils,
  Waves,
} from "lucide-react";
import CTA from "../../components/CTA";
import styles from "./Features.module.css";

type FeatureItem = {
  title: string;
  description: string;
  icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
};

type FeatureCategory = {
  number: string;
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
  features: FeatureItem[];
};

const categories: FeatureCategory[] = [
  {
    number: "01",
    title: "Identity & Safety",
    subtitle:
      "Give your pet a reliable digital identity and keep important safety information ready when it matters.",
    icon: ShieldCheck,
    features: [
      {
        title: "Digital PetCard",
        description:
          "Create a dedicated digital identity for your pet and keep essential details together.",
        icon: IdCard,
      },
      {
        title: "QR Code & QR Scanner",
        description:
          "Make pet information quick to access with a shareable QR experience.",
        icon: QrCode,
      },
      {
        title: "Emergency Card",
        description:
          "Keep critical contacts, allergies, medication and vet information ready in one place.",
        icon: ShieldAlert,
      },
      {
        title: "Two-Guardian Access",
        description:
          "Share pet access with another trusted guardian while keeping permissions under control.",
        icon: Users,
      },
      {
        title: "Guardian Profile",
        description:
          "Keep guardian details organized as part of your pet-care setup.",
        icon: UserRound,
      },
    ],
  },
  {
    number: "02",
    title: "Daily Care",
    subtitle:
      "Stay consistent with everyday routines, tasks and reminders without losing track of the little things.",
    icon: CalendarDays,
    features: [
      {
        title: "Daily Tasks",
        description:
          "Track feeding, water, walks, training, grooming and other everyday routines.",
        icon: CheckCircle2,
      },
      {
        title: "Calendar & Reminders",
        description:
          "Keep important pet-care tasks, appointments and dates visible in one calendar.",
        icon: CalendarDays,
      },
      {
        title: "Notifications",
        description:
          "Stay aware of important reminders and pet-care activities throughout the day.",
        icon: Bell,
      },
      {
        title: "Basic Pet Care",
        description:
          "Keep common everyday care activities simple, visible and organized.",
        icon: PawPrint,
      },
      {
        title: "Grooming",
        description:
          "Keep grooming routines visible and easier to remember.",
        icon: Sparkles,
      },
      {
        title: "Training",
        description:
          "Track training activities and build better habits over time.",
        icon: Dumbbell,
      },
    ],
  },
  {
    number: "03",
    title: "Health & Wellness",
    subtitle:
      "Keep health-related information organized so important details are easier to review and access.",
    icon: HeartPulse,
    features: [
      {
        title: "Health Records",
        description:
          "Store useful health information in one organized place.",
        icon: HeartPulse,
      },
      {
        title: "Vaccination",
        description:
          "Keep vaccination details organized and easier to review.",
        icon: Syringe,
      },
      {
        title: "Health & Wellness",
        description:
          "Keep wellness-related information connected to your pet profile.",
        icon: Stethoscope,
      },
      {
        title: "Food & Nutrition",
        description:
          "Keep nutrition-related guidance and everyday food information easy to reach.",
        icon: Utensils,
      },
      {
        title: "Pet Progress & Care Score",
        description:
          "Follow your pet's progress and get a simple view of care activity over time.",
        icon: Activity,
      },
    ],
  },
  {
    number: "04",
    title: "Pet World",
    subtitle:
      "Build a richer digital pet profile with multiple pets, memories and personalized information.",
    icon: PawPrint,
    features: [
      {
        title: "My Pets / Multiple Pets",
        description:
          "Manage information for more than one pet from the same account.",
        icon: PawPrint,
      },
      {
        title: "Petmoji / Pet Avatar",
        description:
          "Give your pet a fun digital avatar that feels personal to them.",
        icon: Sparkles,
      },
      {
        title: "Know Your Pet",
        description:
          "Explore pet-specific information across care, wellness and everyday needs.",
        icon: CircleHelp,
      },
      {
        title: "Breed Information",
        description:
          "Explore useful information connected to your pet's breed.",
        icon: PawPrint,
      },
      {
        title: "Memories & Milestones",
        description:
          "Save meaningful moments, milestones and memories in one place.",
        icon: Camera,
      },
    ],
  },
  {
    number: "05",
    title: "Rewards & Gamification",
    subtitle:
      "Turn consistent care into a more engaging experience with streaks, points, achievements and rewards.",
    icon: Trophy,
    features: [
      {
        title: "Daily Streaks",
        description:
          "Build consistency by keeping your daily care streak going.",
        icon: Clock3,
      },
      {
        title: "PawPoints / XP",
        description:
          "Earn points for everyday care and track your progress.",
        icon: Star,
      },
      {
        title: "Achievements & Badges",
        description:
          "Celebrate milestones and unlock achievements as you care.",
        icon: Award,
      },
      {
        title: "Avatar & Theme Unlocks",
        description:
          "Use rewards to unlock new avatar and theme options.",
        icon: Sparkles,
      },
      {
        title: "Rewards Shop",
        description:
          "Explore available rewards and use earned points to unlock them.",
        icon: ShoppingBag,
      },
    ],
  },
  {
    number: "06",
    title: "Smart Tools",
    subtitle:
      "Bring helpful tools and AI-powered assistance into the same pet-care experience.",
    icon: Bot,
    features: [
      {
        title: "PawChat AI",
        description:
          "Get a smart, pet-focused assistant experience for everyday questions and guidance.",
        icon: Bot,
      },
      {
        title: "Clicker Tool",
        description:
          "Use a simple clicker tool to support training sessions.",
        icon: Waves,
      },
      {
        title: "Whistle Tool",
        description:
          "Keep a whistle tool available for everyday training and interaction.",
        icon: Bell,
      },
    ],
  },
];

const quickHighlights = [
  ["29+", "Features across the PetCard experience"],
  ["06", "Organized feature categories"],
  ["01", "Connected pet-care world"],
];

export default function Features() {
  return (
    <div className={styles.page}>
      {/* =====================================================
          HERO
          ===================================================== */}

      <section className={styles.hero}>
        <div className={styles.heroGlow} />
        <div className={`${styles.heroPaw} ${styles.heroPawOne}`}>
          <PawPrint size={44} fill="currentColor" />
        </div>
        <div className={`${styles.heroPaw} ${styles.heroPawTwo}`}>
          <PawPrint size={28} fill="currentColor" />
        </div>

        <div className={styles.container}>
          <div className={styles.heroContent}>
            <div className={styles.eyebrow}>
              <Sparkles size={14} />
              PetCard Features
            </div>

            <h1>
              Everything your pet needs,{" "}
              <span>all in one place.</span>
            </h1>

            <p>
              Explore the complete PetCard feature set, from digital identity
              and everyday care to health, memories, rewards and smart tools.
              Everything is designed around a simpler pet-care experience.
            </p>

            <div className={styles.heroActions}>
              <Link
                href="#feature-categories"
                className="btn btn-primary"
              >
                Explore Features
                <ArrowRightIcon />
              </Link>

              <Link
                href="/how-it-works"
                className="btn btn-outline"
              >
                How It Works
                <ArrowRightIcon />
              </Link>
            </div>
          </div>

          <div className={styles.heroVisual}>
            <div className={styles.heroOrb} />

            <div className={styles.heroPetCard}>
              <div className={styles.heroCardTop}>
                <span>PetCard</span>
                <ShieldCheck size={16} />
              </div>

              <div className={styles.heroAvatar}>
                <PawPrint size={31} fill="currentColor" />
              </div>

              <h3>Bruno</h3>

              <span className={styles.heroBreed}>
                Golden Retriever · 3 yrs
              </span>

              <div className={styles.heroFeatureRows}>
                <div>
                  <HeartPulse size={14} />
                  <span>Health Records</span>
                  <CheckCircle2 size={14} />
                </div>

                <div>
                  <CalendarDays size={14} />
                  <span>Daily Care</span>
                  <CheckCircle2 size={14} />
                </div>

                <div>
                  <QrCode size={14} />
                  <span>Digital PET CARD</span>
                  <CheckCircle2 size={14} />
                </div>

                <div>
                  <Trophy size={14} />
                  <span>Rewards</span>
                  <CheckCircle2 size={14} />
                </div>
              </div>

              <div className={styles.heroPetCardBottom}>
                <span>All your pet&apos;s essentials</span>
                <PawPrint size={16} fill="currentColor" />
              </div>
            </div>

            <div className={`${styles.floatingCard} ${styles.floatOne}`}>
              <QrCode size={17} />
              <span>Digital Identity</span>
            </div>

            <div className={`${styles.floatingCard} ${styles.floatTwo}`}>
              <Star size={17} fill="currentColor" />
              <span>PawPoints</span>
            </div>

            <div className={`${styles.floatingCard} ${styles.floatThree}`}>
              <HeartPulse size={17} />
              <span>Health</span>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          QUICK OVERVIEW
          ===================================================== */}

      <section className={styles.overview}>
        <div className={styles.container}>
          <div className={styles.overviewGrid}>
            {quickHighlights.map(([value, text]) => (
              <div className={styles.overviewCard} key={value}>
                <strong>{value}</strong>
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          FEATURE CATEGORIES
          ===================================================== */}

      <section
        className={styles.featureSection}
        id="feature-categories"
      >
        <div className={styles.container}>
          <div className={styles.sectionHeading}>
            <div className={styles.eyebrow}>
              <PawPrint size={14} />
              Explore PetCard
            </div>

            <h2>
              Features organized around{" "}
              <span>your pet&apos;s journey.</span>
            </h2>

            <p>
              All PetCard capabilities are grouped into clear categories so
              users can quickly understand what the platform offers without
              getting lost in a long feature list.
            </p>
          </div>

          <div className={styles.categoryList}>
            {categories.map((category) => {
              const CategoryIcon = category.icon;

              return (
                <section
                  className={styles.category}
                  key={category.number}
                >
                  <div className={styles.categoryHeader}>
                    <div className={styles.categoryHeadingLeft}>
                      <div className={styles.categoryIcon}>
                        <CategoryIcon size={24} strokeWidth={2} />
                      </div>

                      <div>
                        <div className={styles.categoryNumber}>
                          {category.number}
                        </div>

                        <h3>{category.title}</h3>
                      </div>
                    </div>

                    <p>{category.subtitle}</p>
                  </div>

                  <div className={styles.featureGrid}>
                    {category.features.map((feature) => {
                      const Icon = feature.icon;

                      return (
                        <article
                          className={styles.featureCard}
                          key={feature.title}
                        >
                          <div className={styles.featureCardTop}>
                            <div className={styles.featureIcon}>
                              <Icon size={21} strokeWidth={2} />
                            </div>

                            <ChevronRight
                              className={styles.featureArrow}
                              size={17}
                            />
                          </div>

                          <h4>{feature.title}</h4>

                          <p>{feature.description}</p>

                          <div className={styles.featureCardGlow} />
                        </article>
                      );
                    })}
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          EXPERIENCE STRIP
          ===================================================== */}

      <section className={styles.experienceSection}>
        <div className={styles.container}>
          <div className={styles.experienceCard}>
            <div className={styles.experienceVisual}>
              <div className={styles.experienceCircle}>
                <PawPrint size={58} fill="currentColor" />
              </div>

            <div
  className={`${styles.experienceChip} ${styles.chipOne}`}
>
  <HeartPulse size={14} />
  Health
</div>

<div
  className={`${styles.experienceChip} ${styles.chipTwo}`}
>
  <Trophy size={14} />
  Rewards
</div>

<div
  className={`${styles.experienceChip} ${styles.chipThree}`}
>
  <QrCode size={14} />
  QR
</div>
</div>

            <div className={styles.experienceCopy}>
              <div className={styles.eyebrow}>
                One connected experience
              </div>

              <h2>
                Identity, care, health and fun{" "}
                <span>work better together.</span>
              </h2>

              <p>
                PetCard brings the important parts of a pet parent&apos;s
                journey into one connected digital world, so information
                stays easier to find and everyday care stays easier to manage.
              </p>

              <div className={styles.experiencePoints}>
                <span>
                  <CheckCircle2 size={16} />
                  One pet profile
                </span>

                <span>
                  <CheckCircle2 size={16} />
                  Connected care tools
                </span>

                <span>
                  <CheckCircle2 size={16} />
                  Simple everyday experience
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          CTA
          ===================================================== */}

      <CTA
        title="Everything your pet needs. All in one place."
        text="Discover the PetCard experience and bring identity, care, health, memories and rewards together."
      />
    </div>
  );
}

function ArrowRightIcon() {
  return <ArrowRight size={17} />;
}
