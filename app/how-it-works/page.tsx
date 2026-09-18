"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CalendarCheck,
  ShieldAlert,
  Users,
  Trophy,
  Heart,
  IdCard,
  PawPrint,
  UserRound,
} from "lucide-react";

import CTA from "../../components/CTA";
import styles from "./HowItWorks.module.css";

const steps = [
  {
    number: "01",
    title: "Create Your Profile",
    description:
      "Create your PetCard account and tell us a little about yourself.",
    icon: UserRound,
  },
  {
    number: "02",
    title: "Add Your Pet",
    description:
      "Add your pet's details and create their personalized profile.",
    icon: PawPrint,
  },
  {
    number: "03",
    title: "Create Their PET CARD",
    description:
      "Give your pet their own unique digital identity with PET CARD and QR access.",
    icon: IdCard,
  },
  {
    number: "04",
    title: "Care Every Day",
    description:
      "Track daily tasks, routines, reminders and healthy care habits together.",
    icon: CalendarCheck,
  },
  {
    number: "05",
    title: "Stay Healthy & Safe",
    description:
      "Keep health records, vaccinations and emergency information organized and ready.",
    icon: ShieldAlert,
  },
  {
    number: "06",
    title: "Share & Grow Together",
    description:
      "Connect trusted guardians, save memories and follow your pet's progress.",
    icon: Users,
  },
  {
    number: "07",
    title: "Earn, Learn & Have Fun",
    description:
      "Build streaks, earn PawPoints, unlock rewards and explore smarter pet care.",
    icon: Trophy,
  },
];
const orbitSteps = [
  {
    number: "01",
    title: "Create Your Profile",
    description:
      "Create your PetCard account and tell us a little about yourself.",
    icon: UserRound,
    className: "stepOne",
    image:
      "https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&w=300&q=80",
  },
  {
    number: "02",
    title: "Add Your Pet",
    description:
      "Add your pet's details and create their personalized profile.",
    icon: PawPrint,
    className: "stepTwo",
    image:
      "https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=300&q=80",
  },
  {
    number: "03",
    title: "Create Their PET CARD",
    description:
      "Give your pet their own unique digital identity with PET CARD and QR access.",
    icon: IdCard,
    className: "stepThree",
    image:
      "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=300&q=80",
  },
  {
    number: "04",
    title: "Care Every Day",
    description:
      "Track daily tasks, routines, reminders and healthy care habits together.",
    icon: CalendarCheck,
    className: "stepFour",
    image:
      "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=300&q=80",
  },
  {
    number: "05",
    title: "Stay Healthy & Safe",
    description:
      "Keep health records, vaccinations and emergency information organized and ready.",
    icon: ShieldAlert,
    className: "stepFive",
    image:
      "https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=300&q=80",
  },
  {
    number: "06",
    title: "Share & Grow Together",
    description:
      "Connect trusted guardians, save memories and follow your pet's progress.",
    icon: Users,
    className: "stepSix",
    image:
      "https://images.unsplash.com/photo-1598133894008-61f7f2f6e8a6?auto=format&fit=crop&w=300&q=80",
  },
  {
    number: "07",
    title: "Earn, Learn & Have Fun",
    description:
      "Build streaks, earn PawPoints, unlock rewards and explore smarter pet care.",
    icon: Trophy,
    className: "stepSeven",
    image:
      "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=300&q=80",
  },
];



export default function HowItWorks() {
  return (
    <div className={styles.page}>
      {/* =====================================================
          HERO / HOW IT WORKS
          ===================================================== */}

      <section className={styles.howHero}>
        <div className="container">
          <div className={styles.heroTop}>
            {/* LEFT CONTENT */}
            <div className={styles.heroContent}>

              <h1 className={styles.heroTitle}>
                7 simple steps
                <br />
                to <span>happier paws.</span>

              </h1>

              <p className={styles.heroDescription}>
                From creating your pet&apos;s identity to building
                healthy habits and memories together — PETCARD makes
                every step meaningful.

              </p>
            </div>

            {/* TOP RIGHT PET VISUAL */}
            <div className={styles.heroPets}>
              <div className={styles.heroPetsGlow} />

              <div className={`${styles.pawDecor} ${styles.pawDecorTop}`}>
                <PawPrint size={25} fill="currentColor" />
              </div>

              <div className={`${styles.pawDecor} ${styles.pawDecorRight}`}>
                <PawPrint size={18} fill="currentColor" />
              </div>

              <div className={styles.petGroup}>
                <div className={styles.petBlob} />

                <Image
                  src="/images/huchiko2.png"
                  alt="PetCard pet"
                  width={310}
                  height={260}
                  className={styles.heroDog}
                  priority
                />


              </div>

              <div className={styles.heroSpeech}>
                <span>Every step</span>
                <span>brings us closer</span>
                <Heart size={13} fill="currentColor" />
              </div>

              <div className={`${styles.heroSparkle} ${styles.sparkleOne}`}>
                ✦
              </div>

              <div className={`${styles.heroSparkle} ${styles.sparkleTwo}`}>
                ✦
              </div>

              <div className={`${styles.heroSparkle} ${styles.sparkleThree}`}>
                ♡
              </div>
            </div>
          </div>

          {/* =================================================
              CIRCULAR PROCESS
              ================================================= */}

          <div className={styles.processVisual}>
            {/* =================================================
      DECORATIVE PAWS
      ================================================= */}

            <div className={styles.processPaws}>
              <Image
                src="/images/paw.png"
                alt=""
                width={52}
                height={52}
                className={`${styles.processPaw} ${styles.processPaw1}`}
              />

              <Image
                src="/images/paw.png"
                alt=""
                width={42}
                height={42}
                className={`${styles.processPaw} ${styles.processPaw2}`}
              />

              <Image
                src="/images/paw.png"
                alt=""
                width={58}
                height={58}
                className={`${styles.processPaw} ${styles.processPaw3}`}
              />

              <Image
                src="/images/paw.png"
                alt=""
                width={44}
                height={44}
                className={`${styles.processPaw} ${styles.processPaw4}`}
              />

              <Image
                src="/images/paw.png"
                alt=""
                width={48}
                height={48}
                className={`${styles.processPaw} ${styles.processPaw5}`}
              />

              <Image
                src="/images/paw.png"
                alt=""
                width={36}
                height={36}
                className={`${styles.processPaw} ${styles.processPaw6}`}
              />

              <Image
                src="/images/paw.png"
                alt=""
                width={32}
                height={32}
                className={`${styles.processPaw} ${styles.processPaw7}`}
              />

              <Image
                src="/images/paw.png"
                alt=""
                width={38}
                height={38}
                className={`${styles.processPaw} ${styles.processPaw8}`}
              />
            </div>

            {/* =================================================
      OUTER ORBIT
      ================================================= */}

            <div className={styles.orbitOuter}>
              <div className={styles.orbitTrack} />
            </div>

            {/* =================================================
      INNER ORBIT
      ================================================= */}

            <div className={styles.orbitInner} />

            {/* =================================================
      ROTATING STEP SYSTEM
      ================================================= */}

            <div className={styles.stepsOrbit}>
              {orbitSteps.map(
                ({
                  number,
                  title,
                  description,
                  icon: Icon,
                  className,
                  image
                }) => (
                  <article
                    className={`${styles.stepCard} ${styles[className as keyof typeof styles]
                      }`}
                    key={number}
                  >
                    <div className={styles.stepCardInner}>

                      {/* HOVER IMAGE */}
                      <div className={styles.stepHoverImage}>
                        <Image
                          src={image}
                          alt=""
                          width={75}
                          height={75}
                        />
                      </div>

                      {/* NUMBER */}
                      <div className={styles.stepNumber}>
                        {number}
                      </div>

                      {/* ICON */}
                      <div className={styles.stepIcon}>
                        <Icon
                          size={23}
                          strokeWidth={2.1}
                        />
                      </div>

                      {/* TEXT */}
                      <div className={styles.stepText}>
                        <h3>{title}</h3>
                        <p>{description}</p>
                      </div>

                    </div>
                  </article>
                ),
              )}
            </div>
            <div className={styles.center} aria-label="PetCard">
              <div className={styles.centerHalo} />
              <div className={styles.centerCore}>
                <img
                  src="/images/brand/dog.png"
                  className={styles.centerImage}
                  height={140}
                  width={140}
                />
                <div className={styles.brand}>
                  <span>PET</span>
                  <strong>CARD</strong>
                </div>

              </div>
            </div>


          </div>
        </div>
      </section>

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
              Now You Know How It All Comes Together.
            </h2>

            <p>
              Have thoughts after exploring PETCARD?
              <br className={styles.desktopBreak} />
              We'd love to hear what you think.
            </p>

          </div>


          {/* ================= STORE BADGES ================= */}

          <div className={styles.finalButtons}>
            <Link href="/contact#contact-form" className="btn btn-outline">
              Share Your Thoughts
            </Link>

            <Link href="/faq" className="btn btn-outline">
              See FAQS
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}