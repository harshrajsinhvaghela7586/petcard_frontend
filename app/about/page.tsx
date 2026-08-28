import {
  Heart,
  MapPin,
  ShieldCheck,
  Sparkles,
  Users,
  ArrowRight,
} from "lucide-react";

import CTA from "../../components/CTA";
import styles from "./About.module.css";

const storyHighlights = [
  {
    icon: Heart,
    title: "Pets are family",
    text: "Their identity, health, routines, memories and milestones deserve a place of their own.",
  },
  {
    icon: ShieldCheck,
    title: "Built for recognition",
    text: "Make every pet recognisable, even when they are found alone on the streets.",
  },
  {
    icon: Users,
    title: "Connected back home",
    text: "Help the people who find a lost pet connect them back to the family that loves them.",
  },
];

const stats = [
  {
    title: "01",
    text: "Simple mission",
  },
  {
    title: "01",
    text: "Digital identity",
  },
  {
    title: "∞",
    text: "Possibilities for care",
  },
  {
    title: "🐾",
    text: "For every pet",
  },
];

const journey = [
  {
    number: "01",
    title: "It started with Brownie",
    text: "It all started with a dog named Brownie",
  },
  {
    number: "02",
    title: "Everything changed",
    text: "One day, Brownie went missing. The search began, but the reunion never came.",
  },
  {
    number: "03",
    title: "A question remained",
    text: "“What if every lost pet could be recognised and connected back to the family that loves them?”",
  },
  {
    number: "04",
    title: "The mission became PetCard",
    text: "That question became a mission. And that mission became PetCard.",
  },
];

export default function About() {
  return (
    <>
      {/* =====================================================
          HERO
          ===================================================== */}

      <section className={styles.hero}>
        <div className={styles.heroGlow} />
        <div className={`${styles.heroPaw} ${styles.heroPawOne}`}>
          🐾
        </div>
        <div className={`${styles.heroPaw} ${styles.heroPawTwo}`}>
          ✦
        </div>

        <div className="container">
          <div className={styles.heroGrid}>
            <div className={styles.heroContent}>
              <div className={styles.eyebrow}>
                <Heart size={14} fill="currentColor" />
                Our Story
              </div>

              <h1 className={styles.heroTitle}>
                It all started with a dog named{" "}
                <span>Brownie.</span>{" "}
               
              </h1>

              <p className={styles.heroDescription}>
                PetCard began with a deeply personal experience that turned
                into a simple mission: helping every lost pet find their way
                home.
              </p>

              <div className={styles.heroActions}>
                <a
                  href="#our-story"
                  className="btn btn-primary"
                >
                  Read Our Story
                 <img
                  src="/images/paw-white.png"
                  width={37}
                  height={37}
                  alt=""
                />
                </a>

                <a
                  href="#mission"
                  className="btn btn-outline"
                >
                  Our Mission
                 <img
                  src="/images/paw.png"
                  width={20}
                  height={20}
                  alt=""
                />
                </a>
              </div>
            </div>

            <div className={styles.heroVisual}>
              <div className={styles.storyOrb} />

              <div className={styles.storyCard}>
                <div className={styles.storyCardTop}>
                  <span>PetCard Story</span>
                  <Heart size={16} />
                </div>

                <div className={styles.storyPet}>
                  <div className={styles.storyPetFace}>
                    🐶
                  </div>
                </div>

                <span className={styles.storyLabel}>
                  Brownie
                </span>

                <h3>
                  One question changed everything.
                </h3>

                <p>
                  What if every lost pet could be recognised and
                  connected back home?
                </p>

                <div className={styles.storyCardLine} />

                <div className={styles.storyCardFooter}>
                  <MapPin size={14} />
                  Helping pets find their way home.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          STATS
          ===================================================== */}

      <section className={styles.statsSection}>
        <div className="container">
          <div className={styles.stats}>
            {stats.map(({ title, text }) => (
              <article
                className={styles.stat}
                key={`${title}-${text}`}
              >
                <strong>{title}</strong>
                <span>{text}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          OUR STORY
          ===================================================== */}

      <section
        className={styles.storySection}
        id="our-story"
      >
        <div className="container">
          <div className={styles.storyIntro}>
            <div>
              <div className={styles.eyebrow}>
                The Beginning
              </div>

              <h2 className={styles.sectionTitle}>
                A personal loss became{" "}
                <span>a bigger mission.</span>
              </h2>
            </div>

            <p>
              Our founder loved his dog deeply. He was more than a pet,
              he was family, a constant companion, and a part of everyday
              life.
            </p>
          </div>

          <div className={styles.journey}>
            {journey.map((item) => (
              <article
                className={styles.journeyCard}
                key={item.number}
              >
                <div className={styles.journeyNumber}>
                  {item.number}
                </div>

                <h3>{item.title}</h3>

                <p>{item.text}</p>
              </article>
            ))}
          </div>

          <div className={styles.storyQuote}>
            <div className={styles.quoteMark}>“</div>

            <div>
              <p>
                What if every lost pet could be recognised and connected
                back to the family that loves them?
              </p>

              <span>
                The question that became the PetCard mission.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          MISSION
          ===================================================== */}

      <section
        className={styles.missionSection}
        id="mission"
      >
        <div className="container">
          <div className={styles.missionCard}>
            <div className={styles.missionVisual}>
              <div className={styles.missionCircleOuter} />
              <div className={styles.missionCircleMiddle} />

              <div className={styles.missionCircle}>
                <ShieldCheck size={60} />
                <span>PetCard</span>
              </div>

              <div className={`${styles.missionBadge} ${styles.badgeOne}`}>
                🪪 Identity
              </div>

              <div className={`${styles.missionBadge} ${styles.badgeTwo}`}>
                🔳 QR
              </div>

              <div className={`${styles.missionBadge} ${styles.badgeThree}`}>
                🏠 Way Home
              </div>
            </div>

            <div className={styles.missionContent}>
              <div className={styles.eyebrow}>
                Why PetCard Exists
              </div>

              <h2 className={styles.sectionTitle}>
                No pet should be lost without{" "}
                <span>a way home.</span>
              </h2>

              <p>
                We’re building PetCard with one simple belief: no pet should
                be lost without a way home.
              </p>

              <p>
                Our goal is to make every pet recognisable, even when they
                are found alone on the streets so that the people who find
                them can help them get back to their parents.
              </p>

              <div className={styles.missionPoints}>
                {storyHighlights.map(({ icon: Icon, title, text }) => (
                  <div
                    className={styles.missionPoint}
                    key={title}
                  >
                    <div className={styles.missionPointIcon}>
                      <Icon size={19} />
                    </div>

                    <div>
                      <strong>{title}</strong>
                      <span>{text}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          CLOSING STORY
          ===================================================== */}

      <section className={styles.closingSection}>
        <div className="container">
          <div className={styles.closingCard}>
            <Sparkles className={styles.closingSparkle} size={28} />

            <div className={styles.closingPaw}>🐾</div>

            <div className={styles.closingContent}>
              <div className={styles.eyebrow}>
                The PetCard Promise
              </div>

              <h2>
                Because behind every lost pet is a family{" "}
                <span>waiting for them.</span>
              </h2>

              <p>
                PetCard - Helping every lost pet find their way home.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          CTA
          ===================================================== */}

      <CTA
        title="Give every pet a better way home."
        text="Build a recognisable digital identity and keep the details that matter close when you need them."
      />
    </>
  );
}
