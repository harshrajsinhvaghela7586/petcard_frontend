"use client";

/*
  Put this file in the SAME folder as Features.tsx / Features.module.css
  Screenshots go in:  /public/images/features/
*/

import styles from "./Features.module.css";

export type PhoneScreen = { src: string; alt: string };

const DIR = "/images/features";

const s = (file: string, alt: string): PhoneScreen => ({
  src: `${DIR}/${file}`,
  alt,
});

/* ---------- screens per section ---------- */
export const SCREENS = {
  hero: [s("tasks.jpeg", "Today's care tasks")],

  // 01 Identity — 6 screens
  identity: [
    s("petcard.jpeg", "Digital PetCard"), // 0
    s("guardian.jpeg", "Guardian access"), // 1
    s("petid-qr.jpeg", "Pet ID"), // 2
    s("my-qr.jpeg","QR code"), // 3
    s("scan-qr.jpeg", "Scan QR"), // 4
    s("emergency.jpeg", "Emergency card"), // 5
  ],

  daily: [s("tasks.jpeg", "Daily tasks")],
  health: [s("home.jpeg", "PetCard home screen")],
  smart: [s("ai-chat.jpeg", "PawChat AI")],
  memories: [s("memories.jpeg", "Memories")],

  // 06 Rewards — 6 screens
  rewards: [
    s("streak.jpeg", "Daily streak"), // 0
    s("level.jpeg", "Level and XP"), // 1
    s("home.jpeg", "PawPoints on home screen"), // 2
    s("achievements.jpeg", "Achievements"), // 3
    s("avatar.jpeg", "Avatars"), // 4
    s("shop.jpeg", "Rewards shop"), // 5
  ],

  petmoji: [s("sticker.jpeg", "Petmoji stickers")],

  // 08 Fun — 3 screens
  fun: [
    s("clicker.jpeg", "Clicker"), // 0
    s("whistle.jpeg", "Whistle"), // 1
    s("know.jpeg", "Know your pet"), // 2
  ],
};

/*
  Carousel item index  ->  screen index
  (same order as the `items` array of that section)
*/
export const ITEM_SCREEN = {
  // Digital PetCard, Pet ID, QR Code, Scan QR, Emergency Card,
  // Guardian Access, Two Guardian Support, Share/Download
  identity: [0, 2, 3, 4, 5, 1, 1, 0],

  // Daily Streaks, XP, PawPoints, Levels, Achievements,
  // Avatars, Rewards Shop, Unlocks
  rewards: [0, 1, 2, 1, 3, 4, 5, 5],

  // Clicker, Whistle, Training Tools
  fun: [0, 1, 2],
};

export default function PhoneMockup({
  screens,
  activeIndex = 0,
}: {
  screens: PhoneScreen[];
  activeIndex?: number;
}) {
  const active = Math.max(0, Math.min(activeIndex, screens.length - 1));

  return (
    <div className={styles.deviceMockup}>
      <div className={styles.deviceScreen}>
        {screens.map((screen, index) => (
          <img
            key={screen.src}
            src={screen.src}
            alt={index === active ? screen.alt : ""}
            aria-hidden={index !== active}
            className={`${styles.deviceImg} ${
              index === active ? styles.deviceImgActive : ""
            }`}
            loading={index === 0 ? "eager" : "lazy"}
            draggable={false}
          />
        ))}

        <div className={styles.deviceIsland} aria-hidden="true">
          <span className={styles.deviceCamera} />
        </div>

        <div className={styles.deviceHomeBar} aria-hidden="true" />
      </div>
    </div>
  );
}
