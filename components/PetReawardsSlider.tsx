"use client";

import {
  ChevronLeft,
  ChevronRight,
  PawPrint,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import styles from "./PetRewardsSlider.module.css";

type Pet = {
  name: string;
  image: string;
  points: string;
  subtitle: string;
};

const pets: Pet[] = [
  {
    name: "Huchiko",
    image: "/images/slider/huchiko.png",
    points: "120 PawPoints",
    subtitle: "Happy explorer",
  },
  {
    name: "Cupid",
    image: "/images/slider/cupid.png",
    points: "2 Level Unlocked",
    subtitle: "Little dreamer",
  },
  {
    name: "Oreo",
    image: "/images/slider/oreo.png",
    points: "350 PawPoints",
    subtitle: "Playful soul",
  },
  {
    name: "Noir",
    image: "/images/slider/noir.png",
    points: "240 PawPoints",
    subtitle: "Adventure buddy",
  },
  
  {
    name: "Waffle",
    image: "/images/slider/waffle.png",
    points: "180 PawPoints",
    subtitle: "Sweet companion",
  },
  {
    name: "Kiki",
    image: "/images/slider/kiki.png",
    points: "420 PawPoints",
    subtitle: "Tiny explorer",
  },
  {
    name: "Browny",
    image: "/images/slider/browny.png",
    points: "290 PawPoints",
    subtitle: "Adventure buddy",
  },
];

export default function PetRewardsSlider() {
  const [activeIndex, setActiveIndex] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setActiveIndex((current) => {
      return (current + 1) % pets.length;
    });
  }, []);

  const previousSlide = useCallback(() => {
    setActiveIndex((current) => {
      return (
        (current - 1 + pets.length) %
        pets.length
      );
    });
  }, []);

  useEffect(() => {
    if (isPaused) return;

    const interval = window.setInterval(() => {
      nextSlide();
    }, 1200);

    return () => {
      window.clearInterval(interval);
    };
  }, [isPaused, nextSlide]);

  const getPosition = (index: number) => {
    const diff =
      (index - activeIndex + pets.length) %
      pets.length;

    if (diff === 0) return "active";
    if (diff === 1) return "right";
    if (diff === pets.length - 1) return "left";

    return diff <= pets.length / 2
      ? "hidden-right"
      : "hidden-left";
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* ==================================================
            HEADING
            ================================================== */}

        <div className={styles.heading}>
          <h2>
            Unlock a world made{" "}
            <span>for your pet.</span>
          </h2>

          <p>
            Earn rewards and make your pet&apos;s
            digital world feel uniquely theirs.
          </p>
        </div>

        {/* ==================================================
            CAROUSEL
            ================================================== */}

        <div
          className={styles.slider}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={() => setIsPaused(false)}
        >
          <button
            type="button"
            className={`${styles.arrow} ${styles.arrowLeft}`}
            onClick={previousSlide}
            aria-label="Previous pet"
          >
            <ChevronLeft size={18} />
          </button>

          <div className={styles.track}>
            {pets.map((pet, index) => {
              const position =
                getPosition(index);

              return (
                <article
                  className={`${styles.card} ${styles[position]}`}
                  key={pet.name}
                  aria-hidden={
                    position.startsWith("hidden")
                  }
                >
                  <div className={styles.cardInner}>
                    <div className={styles.pawDecoration}>
                      <PawPrint
                        size={44}
                        fill="currentColor"
                      />
                    </div>

                    <div className={styles.petImage}>
                      <img
                        src={pet.image}
                        alt={pet.name}
                      />
                    </div>

                    <h3>{pet.name}</h3>

                    <div className={styles.badge}>
                      <PawPrint
                        size={10}
                        fill="currentColor"
                      />
                      {pet.points}
                    </div>

                   
                  </div>
                </article>
              );
            })}
          </div>

          <button
            type="button"
            className={`${styles.arrow} ${styles.arrowRight}`}
            onClick={nextSlide}
            aria-label="Next pet"
          >
            <ChevronRight size={18} />
          </button>
        </div>

      </div>
    </section>
  );
}