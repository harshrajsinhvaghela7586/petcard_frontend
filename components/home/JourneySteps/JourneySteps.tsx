/* JourneySteps.tsx */
"use client";

import {
  BadgeCheck,
  BellRing,
  Brain,
  HeartPulse,
  IdCard,
  PawPrint,
  ShieldCheck,
  Sparkles,
  UserRound,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import styles from "./JourneySteps.module.css";

type JourneyStep = {
  number: string;
  title: string;
  description: string;
  detail: string;
  icon: React.ElementType;
  accent: string;
  miniLabel: string;
};

const journeySteps: JourneyStep[] = [
  {
    number: "01",
    title: "Create Profile",
    description: "Create your guardian account.",
    detail:
      "Start your PetCard journey by creating your guardian profile and setting up the foundation for your pet's digital world.",
    icon: UserRound,
    accent: "guardian",
    miniLabel: "Your account",
  },
  {
    number: "02",
    title: "Add Your Pet",
    description: "Choose Dog, Cat or Rabbit and add their details.",
    detail:
      "Add your pet by choosing Dog, Cat or Rabbit and completing their profile with the information that makes them uniquely theirs.",
    icon: PawPrint,
    accent: "pet",
    miniLabel: "Meet your pet",
  },
  {
    number: "03",
    title: "Create Their Petmoji",
    description: "Choose an existing avatar or customize one.",
    detail:
      "Give your pet a personality with an existing avatar or create a customized Petmoji that feels just like them.",
    icon: Sparkles,
    accent: "petmoji",
    miniLabel: "Make it theirs",
  },
  {
    number: "04",
    title: "Get Your PetCard",
    description: "Your unique Pet ID + QR is generated.",
    detail:
      "Your pet gets a unique Pet ID and QR code, creating a recognizable digital identity that can stay connected to them.",
    icon: IdCard,
    accent: "identity",
    miniLabel: "Digital identity",
  },
  {
    number: "05",
    title: "Start Daily Care",
    description: "Set tasks, reminders and routines.",
    detail:
      "Build everyday routines with care tasks, reminders and activities that help make looking after your pet easier.",
    icon: BellRing,
    accent: "care",
    miniLabel: "Daily routine",
  },
  {
    number: "06",
    title: "Track & Protect",
    description: "Manage health, emergency information and guardians.",
    detail:
      "Keep important health, emergency and guardian information organized in one place so the right details are available when needed.",
    icon: ShieldCheck,
    accent: "protect",
    miniLabel: "Health & safety",
  },
  {
    number: "07",
    title: "Earn, Learn & Have Fun",
    description: "Earn PawPoints, unlock rewards, explore pet knowledge and use AI.",
    detail:
      "Turn everyday care into a rewarding experience with PawPoints, rewards, pet knowledge and smart AI-powered tools.",
    icon: Brain,
    accent: "rewards",
    miniLabel: "Grow together",
  },
];

const AUTO_PLAY_MS = 1200;

export default function JourneySteps() {
  const [activeStep, setActiveStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const sectionRef = useRef<HTMLElement | null>(null);
  const stepScrollRef = useRef<HTMLDivElement | null>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      {
        threshold: 0.18,
        rootMargin: "0px 0px -80px 0px",
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
  if (isPaused) return;

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (reducedMotion) return;

  const timer = window.setInterval(() => {
    setActiveStep((current) => (current + 1) % journeySteps.length);
  }, AUTO_PLAY_MS);

  return () => window.clearInterval(timer);
}, [isPaused]);

  useEffect(() => {
    const activeElement = stepRefs.current[activeStep];
    const scrollContainer = stepScrollRef.current;

    if (!activeElement || !scrollContainer) return;

    const isMobile = window.matchMedia("(max-width: 900px)").matches;

    if (!isMobile) return;

    const targetLeft =
      activeElement.offsetLeft +
      activeElement.offsetWidth / 2 -
      scrollContainer.clientWidth / 2;

    const maxScroll =
      scrollContainer.scrollWidth - scrollContainer.clientWidth;

    scrollContainer.scrollTo({
      left: Math.max(0, Math.min(targetLeft, maxScroll)),
      behavior: "smooth",
    });
  }, [activeStep]);

  const currentStep = journeySteps[activeStep];
  const CurrentIcon = currentStep.icon;

  const handleStepChange = (index: number) => {
    setActiveStep(index);
  };

  const goToNextStep = () => {
    setActiveStep((current) => (current + 1) % journeySteps.length);
  };

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className={`${styles.section} ${isVisible ? styles.isVisible : ""}`}
     
      onMouseLeave={() => setIsPaused(false)}
      onBlurCapture={() => setIsPaused(false)}
    >
      <div className={styles.backgroundOrb} aria-hidden="true" />

      <div className={styles.container}>
        <div className={styles.heading}>
          <h2>
            Simple steps. <span>A happier pet.</span>
          </h2>

          <p>
            A playful journey from creating a profile to building better
            everyday care habits.
          </p>
        </div>

        <div
          className={styles.stepNavigation}
          aria-label="PetCard journey steps"
        >
          <div ref={stepScrollRef} className={styles.stepsScrollWrapper}>
            <div className={styles.steps} role="list">
              {journeySteps.map((step, index) => {
                const isActive = index === activeStep;

                return (
                  <div
                    key={step.number}
                    ref={(element) => {
                      stepRefs.current[index] = element;
                    }}
                    className={`${styles.stepItem} ${
                      isActive ? styles.stepItemActive : ""
                    }`}
                    role="listitem"
                    aria-current={isActive ? "step" : undefined}
                  >
                    <button
                      type="button"
                      className={styles.stepButton}
                      onClick={() => handleStepChange(index)}
                      aria-label={`Step ${step.number}: ${step.title}`}
                      aria-current={isActive ? "step" : undefined}
                    >
                      <div
                        className={styles.pawGraphic}
                        aria-hidden="true"
                      >
                        <img
                          src="/images/paw.png"
                          alt=""
                          className={styles.pawImage}
                          draggable={false}
                        />

                        <div className={styles.pawText}>
                          <span className={styles.pawTitle}>
                            {step.title}
                          </span>
                        </div>
                      </div>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className={styles.detailArea} key={currentStep.number}>
          <div
            className={`${styles.detailVisual} ${styles[currentStep.accent]}`}
          >
            <div className={styles.visualGlow} aria-hidden="true" />

            <div className={styles.visualPawOne} aria-hidden="true">
              <PawPrint size={44} fill="currentColor" />
            </div>

            <div className={styles.visualPawTwo} aria-hidden="true">
              <PawPrint size={27} fill="currentColor" />
            </div>

            <div className={styles.visualCard}>
              <div className={styles.visualTop}>
                <span>STEP {currentStep.number}</span>

                <div className={styles.liveDot}>
                  <span aria-hidden="true" />
                  Active
                </div>
              </div>

              <div className={styles.visualIcon}>
                <CurrentIcon size={48} strokeWidth={2} />
              </div>

              <div className={styles.visualNumber}>
                {currentStep.number}
              </div>

              <div className={styles.visualBottom}>
                <span>{currentStep.miniLabel}</span>
                <PawPrint size={20} fill="currentColor" />
              </div>
            </div>
          </div>

          <div className={styles.detailContent}>
           

            <h3>{currentStep.title}</h3>

            <p className={styles.detailDescription}>
              {currentStep.description}
            </p>

            <p className={styles.detailText}>{currentStep.detail}</p>

            <div className={styles.detailFooter}>
              <div className={styles.detailFeatures}>
                <span>
                  <BadgeCheck size={15} />
                  Simple setup
                </span>

                <span>
                  <HeartPulse size={15} />
                  Pet-first
                </span>
              </div>

              <button
                type="button"
                className="btn btn-primary"
                onClick={goToNextStep}
                aria-label={`Go to next step after ${currentStep.title}`}
              >
                <span>Next Step</span>

                <img
                  src="/images/paw-white.png"
                  height={30}
                  width={30}
                  alt=""
                  aria-hidden="true"
                  draggable={false}
                />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
