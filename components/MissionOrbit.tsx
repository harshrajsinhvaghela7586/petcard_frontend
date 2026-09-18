
import { BiHomeHeart } from "react-icons/bi";
import { PawPrint, UsersRound, type LucideIcon } from "lucide-react";
import type { IconType } from "react-icons";

import styles from "./MissionOrbit.module.css";

type MissionHighlight = {
  title: string;
  text: string;
  number: string;
  icon: LucideIcon | IconType;
  className: string;
};

const missionHighlights: MissionHighlight[] = [
  {
    title: "Connected back home",
    text: "Help the people who find a lost pet connect them back to the family that loves them.",
    number: "01",
    icon: BiHomeHeart,
    className: styles.missionOrbitBadge1,
  },
  {
    title: "Built for recognition",
    text: "Make every pet recognisable, even when they are found alone on the streets.",
    number: "02",
    icon: PawPrint,
    className: styles.missionOrbitBadge2,
  },
  {
    title: "Pets are family",
    text: "Their identity, health, routines, memories and milestones deserve a place of their own.",
    number: "03",
    icon: UsersRound,
    className: styles.missionOrbitBadge3,
  },
];

export default function MissionOrbit() {
  return (
    <section
      className={styles.missionOrbit}
      aria-label="PetCard mission highlights"
    >
      <div className={styles.missionOrbitBackdrop} aria-hidden="true">
        <span className={styles.missionCircleOuter} />
        <span className={styles.missionCircleMiddle} />
        <span className={styles.missionCircleInner} />

        <span
          className={`${styles.missionOrbitDot} ${styles.missionOrbitDotTop}`}
        />
        <span
          className={`${styles.missionOrbitDot} ${styles.missionOrbitDotRight}`}
        />
        <span
          className={`${styles.missionOrbitDot} ${styles.missionOrbitDotBottom}`}
        />
        <span
          className={`${styles.missionOrbitDot} ${styles.missionOrbitDotLeft}`}
        />
      </div>

      <div className={styles.center} aria-label="PetCard">
        <div className={styles.centerHalo} aria-hidden="true" />

        <div className={styles.centerCore}>
          <img
            className={styles.centerImage}
            src="/images/brand/dog.png"
            alt="PetCard dog logo"
          />

          <div className={styles.brand} aria-label="PET CARD">
            <span>PET</span>
            <strong>CARD</strong>
          </div>
        </div>
      </div>

      <div className={styles.missionOrbitSystem}>
        {missionHighlights.map(
          ({ title, text, number, icon: Icon, className }) => (
            <article
              key={title}
              className={`${styles.missionOrbitBadge} ${className}`}
            >
              <div className={styles.missionOrbitBadgeInner}>
                <div className={styles.cardTop}>
                  <div className={styles.cardIcon} aria-hidden="true">
                    <Icon strokeWidth={2.2} />
                  </div>

                  <span className={styles.cardNumber}>{number}</span>
                </div>

                <div className={styles.cardContent}>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </div>
            </article>
          ),
        )}
      </div>
    </section>
  );
}
