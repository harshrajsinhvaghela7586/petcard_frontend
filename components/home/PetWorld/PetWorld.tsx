"use client";

import Image from "next/image";
import { ArrowRight, Bot, Camera, Gift, Sparkles, Star, Trophy } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import styles from "./PetWorld.module.css";

const features = [
    {
        key: "rewards",
        title: "Rewards",
        eyebrow: "The more you care, the more you unlock.",
        tag: "View All REWARDS",
        image: "/images/petworld/rewards.png",
        accent: "orange",
        icon: Gift,
        stats: ["2,450 PawPoints", "Level 12", "7 day streak"],
    },
    {
        key: "memories",
        title: "Memories",
        eyebrow: "Some moments deserve more than your camera roll.",
        tag: "View All MEMORIES",
        image: "/images/petworld/memories.png",
        accent: "peach",
        icon: Camera,
        stats: ["24 memories", "12 favorites", "Forever saved"],
    },
    {
        key: "ai",
        title: "PawChat AI",
        eyebrow: "Personalized care made for your pet.",
        tag: "PAWCHAT AI",
        image: "/images/petworld/pawchatai.png",
        accent: "brown",
        icon: Bot,
        stats: ["Ask anything", "Smart care", "Pet-aware"],
    },
];

export default function PetWorldPage() {
    const sectionRef = useRef<HTMLElement | null>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            {
                threshold: 0.2,
                rootMargin: "0px 0px -8% 0px",
            }
        );

        observer.observe(section);

        return () => observer.disconnect();
    }, []);

    return (
        <main className={styles.page}>
            <section
                ref={sectionRef}
                className={`${styles.featureSection} ${isVisible ? styles.isVisible : ""}`}
                aria-labelledby="pet-world-title"
            >
                <div className={styles.container}>
                    <header className={styles.heading}>
                        <h1 id="pet-world-title">
                            A Smarter Way to Care. <span>A More Fun Way to Grow.</span>
                        </h1>

                        <p>
                            Chat with PawChat AI, build healthy habits, earn rewards, and
                            unlock a world made for your pet.
                        </p>
                    </header>

                    <div className={styles.featureGrid}>
                        {features.map((feature, index) => {
                            const Icon = feature.icon;

                            return (
                                <article
                                    key={feature.key}
                                    className={`${styles.featureCard} ${styles[feature.accent]}`}
                                    style={{ "--delay": `${index * 140}ms` } as React.CSSProperties}
                                >
                                    <div className={styles.cardCopy}>
                                        <div className={styles.cardTitleRow}>
                                            <h2>{feature.title}</h2>
                                            <span className={styles.spark}>
                                                <Sparkles size={15} strokeWidth={2.4} />
                                            </span>
                                        </div>

                                        <p>{feature.eyebrow}</p>
                                    </div>

                                    <div className={styles.visualArea}>
                                        <div className={styles.glow} />

                                        <div className={styles.petFrame}>
                                            <Image
                                                src={feature.image}
                                                alt=""
                                                fill
                                                sizes="(max-width: 700px) 78vw, 39vw"
                                                className={styles.petImage}
                                            />
                                        </div>

                                        {feature.key === "rewards" && (
                                            <div className={styles.rewardList}>
                                                <Image
                                                    src="/images/petworld/rewardlist.png"
                                                    alt="Reward list"
                                                    fill
                                                    sizes="(max-width: 700px) 70vw, 30vw"
                                                    className={styles.rewardListImage}
                                                />
                                            </div>
                                        )}
                                    </div>

                                    <div className={styles.cardFooter}>
                                        <span>{feature.tag}</span>
                                        <ArrowRight size={17} />
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                </div>
            </section>
        </main>
    );
}
