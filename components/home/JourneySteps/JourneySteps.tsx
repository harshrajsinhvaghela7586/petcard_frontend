/* JourneySteps.tsx */
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./JourneySteps.module.css";

type JourneyStep = {
  number: string;
  title: string;
  description: string;
  detail: string;
  miniLabel: string;
};

type PhoneScreen = {
  step: number; // index of journeySteps this screen belongs to
  src: string;
  alt: string;
};

const journeySteps: JourneyStep[] = [
  {
    number: "01",
    title: "Create Profile",
    description: "Create your guardian account.",
    detail:
      "Start your PetCard journey by creating your guardian profile and setting up the foundation for your pet's digital world.",
    miniLabel: "Your account",
  },
  {
    number: "02",
    title: "Add Your Pet",
    description: "Choose Dog, Cat or Rabbit and add their details.",
    detail:
      "Add your pet by choosing Dog, Cat or Rabbit and completing their profile with the information that makes them uniquely theirs.",
    miniLabel: "Meet your pet",
  },
  {
    number: "03",
    title: "Create Their Petmoji",
    description: "Choose an existing avatar or customize one.",
    detail:
      "Give your pet a personality with an existing avatar or create a customized Petmoji that feels just like them.",
    miniLabel: "Make it theirs",
  },
  {
    number: "04",
    title: "Get Your PetCard",
    description: "Your unique Pet ID + QR is generated.",
    detail:
      "Your pet gets a unique Pet ID and QR code, creating a recognizable digital identity that can stay connected to them.",
    miniLabel: "Digital identity",
  },
  {
    number: "05",
    title: "Start Daily Care",
    description: "Set tasks, reminders and routines.",
    detail:
      "Build everyday routines with care tasks, reminders and activities that help make looking after your pet easier.",
    miniLabel: "Daily routine",
  },
  {
    number: "06",
    title: "Track & Protect",
    description: "Manage health, emergency information and guardians.",
    detail:
      "Keep important health, emergency and guardian information organized in one place so the right details are available when needed.",
    miniLabel: "Health & safety",
  },
  {
    number: "07",
    title: "Earn, Learn & Have Fun",
    description: "Earn PawPoints, unlock rewards, explore pet knowledge and use AI.",
    detail:
      "Turn everyday care into a rewarding experience with PawPoints, rewards, pet knowledge and smart AI-powered tools.",
    miniLabel: "Grow together",
  },
];

/*
  Put your screenshots in:  /public/images/screens/
  and name them exactly like below (or change the src here).
*/
const SCREEN_DIR = "/images/screens";

const phoneScreens: PhoneScreen[] = [
  { step: 0, src: `${SCREEN_DIR}/01-login.jpeg`, alt: "PetCard login screen" },
  { step: 1, src: `${SCREEN_DIR}/02-pet-type.jpeg`, alt: "Choose your pet type: dog, cat or rabbit" },
  { step: 2, src: `${SCREEN_DIR}/03-avatar.jpeg`, alt: "Create your pet avatar" },
  { step: 2, src: `${SCREEN_DIR}/04-sticker.jpeg`, alt: "Choose a Petmoji sticker" },
  { step: 3, src: `${SCREEN_DIR}/05-petcard.jpeg`, alt: "Your PetCard with Pet ID and QR" },
  { step: 4, src: `${SCREEN_DIR}/06-reminders.jpeg`, alt: "Set up care reminders" },
  { step: 5, src: `${SCREEN_DIR}/07-health-basics.jpeg`, alt: "Optional health basics" },
  { step: 5, src: `${SCREEN_DIR}/08-health-records.jpeg`, alt: "Health records" },
  { step: 6, src: `${SCREEN_DIR}/09-know.jpeg`, alt: "Know your pet" },
  { step: 6, src: `${SCREEN_DIR}/10-streak.jpeg`, alt: "Daily streak" },
];

const AUTO_PLAY_MS = 1200;

export default function JourneySteps() {
  // activeScreen = index inside phoneScreens (flat list of 10)
  const [activeScreen, setActiveScreen] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const sectionRef = useRef<HTMLElement | null>(null);
  const stepScrollRef = useRef<HTMLDivElement | null>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  const activeStep = phoneScreens[activeScreen].step;
  const currentStep = journeySteps[activeStep];

  // screens (indexes) that belong to the current step -> used for dots
  const stepScreenIndexes = useMemo(
    () =>
      phoneScreens
        .map((screen, index) => (screen.step === activeStep ? index : -1))
        .filter((index) => index !== -1),
    [activeStep]
  );

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
      { threshold: 0.18, rootMargin: "0px 0px -80px 0px" }
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
      setActiveScreen((current) => (current + 1) % phoneScreens.length);
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

    const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;

    scrollContainer.scrollTo({
      left: Math.max(0, Math.min(targetLeft, maxScroll)),
      behavior: "smooth",
    });
  }, [activeStep]);

  const handleStepChange = (stepIndex: number) => {
    const firstScreen = phoneScreens.findIndex((s) => s.step === stepIndex);
    setActiveScreen(firstScreen === -1 ? 0 : firstScreen);
  };

  const goToNextStep = () => {
    handleStepChange((activeStep + 1) % journeySteps.length);
  };

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className={`${styles.section} ${isVisible ? styles.isVisible : ""}`}
    
      onFocusCapture={() => setIsPaused(true)}
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
                      <div className={styles.pawGraphic} aria-hidden="true">
                        <img
                          src="/images/paw.png"
                          alt=""
                          className={styles.pawImage}
                          draggable={false}
                        />

                        <div className={styles.pawText}>
                          <span className={styles.pawTitle}>{step.title}</span>
                        </div>
                      </div>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className={styles.detailArea}>
          {/* ---------- LEFT: phone mockup ---------- */}
          <div className={styles.detailVisual}>
            <div className={styles.visualGlow} aria-hidden="true" />

            <div className={styles.phoneStage}>
              <div className={styles.phone}>
                <div className={styles.phoneScreen}>
                  {phoneScreens.map((screen, index) => (
                    <img
                      key={screen.src}
                      src={screen.src}
                      alt={index === activeScreen ? screen.alt : ""}
                      aria-hidden={index !== activeScreen}
                      className={`${styles.screenImg} ${
                        index === activeScreen ? styles.screenImgActive : ""
                      }`}
                      loading={index < 2 ? "eager" : "lazy"}
                      draggable={false}
                    />
                  ))}

                  <div className={styles.island} aria-hidden="true">
                    <span className={styles.islandCamera} />
                  </div>
                  <div className={styles.homeBar} aria-hidden="true" />
                </div>
              </div>

              {stepScreenIndexes.length > 1 && (
                <div className={styles.screenDots} aria-label="Screens in this step">
                  {stepScreenIndexes.map((screenIndex) => (
                    <button
                      key={screenIndex}
                      type="button"
                      className={`${styles.screenDot} ${
                        screenIndex === activeScreen ? styles.screenDotActive : ""
                      }`}
                      onClick={() => setActiveScreen(screenIndex)}
                      aria-label={`Show screen ${screenIndex + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ---------- RIGHT: content ---------- */}
          <div className={styles.detailContent} key={currentStep.number}>
            <h3>{currentStep.title}</h3>

            <p className={styles.detailDescription}>{currentStep.description}</p>

            <p className={styles.detailText}>{currentStep.detail}</p>

            <div className={styles.detailFooter}>
              <button
                type="button"
                className="btn btn-primary"
                onClick={goToNextStep}
                aria-label={`Go to next step after ${currentStep.title}`}
              >
                <span>Next Step</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}