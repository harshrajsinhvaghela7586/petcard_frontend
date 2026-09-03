"use client";

import {
  Activity,
  Award,
  CalendarCheck,
  Camera,
  Gamepad2,
  HeartPulse,
  PawPrint,
  ShieldCheck,
} from "lucide-react";
import styles from "./FeaturesOrbit.module.css";

const featureGroups = [
  {
    number: "01",
    title: "Identity & Safety",
    icon: ShieldCheck,
    features: ["Digital PetCard", "Pet ID", "QR Code", "Scan QR", "Emergency Card", "Guardian Access", "Two Guardian Support", "Share/Download"],
  },
  {
    number: "02",
    title: "Daily Care",
    icon: CalendarCheck,
    features: ["Daily Tasks", "Feeding", "Water", "Walking", "Grooming", "Medication", "Reminders", "Calendar", "Task History"],
  },
  {
    number: "03",
    title: "Health & Wellness",
    icon: HeartPulse,
    features: ["Health Records", "Vaccination", "Deworming", "Medicines", "Treatments", "Vet Visits", "Medical Documents", "Weight/Growth", "Medical Conditions", "Allergies"],
  },
  {
    number: "04",
    title: "Smart Pet Care",
    icon: PawPrint,
    features: ["Breed Information", "Health & Wellness", "Food & Nutrition", "Grooming", "Training", "Safety", "Basic Care", "PawChat AI"],
  },
  {
    number: "05",
    title: "Memories & Progress",
    icon: Camera,
    features: ["Memories", "Photos", "Videos", "Albums", "Milestones", "Timeline", "Pet Progress", "Care Score"],
  },
  {
    number: "06",
    title: "Rewards & Gamification",
    icon: Award,
    features: ["Daily Streaks", "XP", "PawPoints", "Levels", "Achievements", "Badges", "Rewards Shop", "Unlocks"],
  },
  {
    number: "07",
    title: "Petmoji & Customization",
    icon: PawPrint,
    features: ["Preset Pet Avatars", "Create Petmoji", "Accessories", "Backgrounds", "Frames", "Stickers", "Paw Effects", "PetCard Themes"],
  },
  {
    number: "08",
    title: "Fun Zone",
    icon: Gamepad2,
    features: ["Clicker", "Whistle", "Training tools"],
  },
];

const positions = [
  "orbitOne",
  "orbitTwo",
  "orbitThree",
  "orbitFour",
  "orbitFive",
  "orbitSix",
  "orbitSeven",
  "orbitEight",
];

export default function FeaturesOrbit() {
  return (
    <main className={styles.page}>
      <section className={styles.featuresSection} aria-labelledby="features-title">
        <div className={styles.ambientGlow} />

        <div className={styles.heading}>
          
          <h1 id="features-title">
            Everything your pet needs,
            <span> in one orbit.</span>
          </h1>
          <p>
            Explore the PetCard ecosystem as every feature category moves
            continuously around the heart of the experience.
          </p>
        </div>

        <div className={styles.orbitStage}>
          <div className={styles.orbitBackdrop} aria-hidden="true">
            <span className={styles.orbitRingOuter} />
            <span className={styles.orbitRingMiddle} />
            <span className={styles.orbitRingInner} />
            <span className={`${styles.orbitDot} ${styles.orbitDotTop}`} />
            <span className={`${styles.orbitDot} ${styles.orbitDotRight}`} />
            <span className={`${styles.orbitDot} ${styles.orbitDotBottom}`} />
            <span className={`${styles.orbitDot} ${styles.orbitDotLeft}`} />
          </div>

          {/* Rotating Cards Orbit System */}
          <div className={styles.orbitSystem}>
            {featureGroups.map((group, index) => {
              const Icon = group.icon;

              return (
                <article
                  className={`${styles.featureCard} ${styles[positions[index]]}`}
                  key={group.number}
                >
                  <div className={styles.featureCardInner}>
                    <div className={styles.cardTop}>
                      <div className={styles.iconBox}>
                        <Icon size={24} strokeWidth={2} />
                      </div>
                      <span className={styles.cardNumber}>{group.number}</span>
                    </div>

                    <h2>{group.title}</h2>

                    <ul>
                      {group.features.map((feature) => (
                        <li key={feature}>{feature}</li>
                      ))}
                    </ul>

                    <div className={styles.cardShine} />
                  </div>
                </article>
              );
            })}
          </div>

          {/* Static Center Core (Does not rotate) */}
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

    
      </section>
    </main>
  );
}