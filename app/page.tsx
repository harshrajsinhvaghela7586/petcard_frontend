import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Award,
  CalendarCheck,
  Check,
  ChevronRight,
  CircleCheck,
  FileHeart,
  HeartPulse,
  Image as ImageIcon,
  LockKeyhole,
  PawPrint,
  QrCode,
  ShieldAlert,
  Sparkles,
  Star,
  Stethoscope,
  Trophy,
  Utensils,
  Droplets,
  Footprints,
  Dumbbell,
} from "lucide-react";

type IconComponent = typeof PawPrint;

type FeatureItem = {
  icon: IconComponent;
  title: string;
  text: string;
};

const highlights: FeatureItem[] = [
  { icon: PawPrint, title: "Digital Identity", text: "Create a unique PET CARD for your pet." },
  { icon: CalendarCheck, title: "Daily Care", text: "Track routines, habits and important tasks." },
  { icon: HeartPulse, title: "Health Records", text: "Keep vaccinations, medicines and visits together." },
  { icon: ImageIcon, title: "Memories", text: "Save photos, milestones and special moments." },
  { icon: Trophy, title: "Rewards & Fun", text: "Build streaks, earn PawPoints and unlock rewards." },
];

const journey = [
  ["01", "Create Your Profile", "Tell us a little about yourself.", "👤"],
  ["02", "Meet Your Pet", "Choose an avatar or add their photo.", "🐶"],
  ["03", "Create Their PET CARD", "Give your pet their own digital identity.", "🪪"],
  ["04", "Care Every Day", "Complete care tasks and build healthy habits.", "🧡"],
  ["05", "Earn & Grow", "Build streaks, earn PawPoints and unlock rewards.", "⭐"],
];

const careItems = [
  [Utensils, "Feeding", "08:00 AM", true],
  [Droplets, "Water", "08:30 AM", true],
  [Footprints, "Walk", "06:00 PM", false],
  [Dumbbell, "Training", "07:00 PM", false],
  [Sparkles, "Grooming", "08:00 PM", false],
] as const;

const ecosystem = [
  ["Daily Care", "Keep routines simple and visible."],
  ["Calendar", "See reminders and upcoming tasks."],
  ["Streaks", "Turn consistency into a habit."],
  ["PawPoints", "Earn points for everyday care."],
  ["Rewards", "Unlock fun ways to customize your pet."],
  ["Emergency Card", "Keep critical information ready."],
  ["Guardians", "Share care with people you trust."],
  ["Memories", "Keep milestones in one place."],
];

function PhoneMockup({
  type = "dashboard",
  className = "",
}: {
  type?: "dashboard" | "card" | "reward";
  className?: string;
}) {
  return (
    <div className={`phone-shell ${className}`}>
      <div className="phone-speaker" />
      <div className="phone-screen">
        <div className="phone-status">
          <span>9:41</span>
          <span>PetCard</span>
          <span>●</span>
        </div>

        {type === "dashboard" && (
          <>
            <div className="app-greeting">
              <div>
                <small>Good morning,</small>
                <strong>Bruno 🧡</strong>
              </div>
              <div className="app-avatar-small">
                <Image src="/images/home/home-dog.png" alt="Bruno" fill sizes="40px" />
              </div>
            </div>
            <div className="phone-profile-banner">
              <div className="phone-avatar">
                <Image src="/images/home/home-dog.png" alt="Bruno" fill sizes="76px" />
              </div>
              <strong>Bruno</strong>
              <small>Golden Retriever · 3 yrs · Male</small>
            </div>
            <div className="phone-stats">
              <span>🔥 7<small>Streak</small></span>
              <span>⭐ 240<small>PawPoints</small></span>
              <span>🏆 Lv.4<small>Level</small></span>
            </div>
            <div className="phone-section-title">
              <strong>Today&apos;s Care</strong><span>3 / 5</span>
            </div>
            {careItems.slice(0, 4).map(([Icon, title, time, done]) => (
              <div className="phone-care-row" key={title}>
                <span className="care-icon"><Icon size={13} /></span>
                <span><b>{title}</b><small>{time}</small></span>
                <span className={done ? "care-done" : "care-pending"}>
                  {done ? <Check size={12} /> : "50%"}
                </span>
              </div>
            ))}
          </>
        )}

        {type === "card" && (
          <>
            <div className="digital-card-preview">
              <span className="card-chip">PET CARD</span>
              <div className="card-pet-image">
                <Image src="/images/home/home-dog.png" alt="Pet profile" fill sizes="130px" />
              </div>
              <strong>Bruno</strong>
              <small>Golden Retriever · Male</small>
              <div className="card-id">PET ID · PC-2407-0184</div>
              <div className="card-qr"><QrCode size={48} /></div>
            </div>
            <div className="card-details">
              <span><b>Guardian</b><small>Amber Patel</small></span>
              <span><b>Age</b><small>3 years</small></span>
              <span><b>Breed</b><small>Golden Retriever</small></span>
              <span><b>Status</b><small>Healthy · Active</small></span>
            </div>
            <button className="phone-action">Share PET CARD <ArrowRight size={12} /></button>
          </>
        )}

        {type === "reward" && (
          <>
            <div className="reward-hero">
              <span>🔥</span>
              <small>YOUR STREAK</small>
              <strong>7 DAYS</strong>
              <p>Keep caring. Keep growing.</p>
            </div>
            <div className="points-card">
              <span><Star size={15} /> PawPoints</span>
              <strong>240</strong>
              <small>+20 today</small>
            </div>
            <div className="reward-progress">
              <div><span>Level 4</span><span>320 XP</span></div>
              <i><b /></i>
            </div>
            <div className="unlock-row">
              <span>🎀</span><div><b>Adventure Bandana</b><small>Unlocked today!</small></div><Award size={17} />
            </div>
            <div className="unlock-row">
              <span>👑</span><div><b>Golden Crown</b><small>80 PawPoints away</small></div><LockKeyhole size={15} />
            </div>
          </>
        )}

        <div className="phone-bottom-nav">
          <span>⌂<small>Home</small></span>
          <span>▣<small>Records</small></span>
          <span className="active">🐾<small>Pet</small></span>
          <span>♡<small>Memories</small></span>
          <span>◉<small>Profile</small></span>
        </div>
      </div>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <div className="eyebrow home-eyebrow">{children}</div>;
}

export default function Home() {
  return (
    <>
      <section className="home-hero">
        <div className="home-hero-glow home-hero-glow-one" />
        <div className="home-hero-glow home-hero-glow-two" />
        <div className="container home-hero-grid">
          <div className="home-hero-copy">
            <div className="hero-pill"><PawPrint size={14} /> Your Pet&apos;s World. All in One Card. <span>🧡</span></div>
            <SectionLabel>PetCard App</SectionLabel>
            <h1>Everything your pet needs. <span>All in one card.</span></h1>
            <p>
              PET CARD helps you manage your pet&apos;s identity, daily care, health records,
              memories, and more — all in one fun and personalized place.
            </p>

            <div className="hero-actions">
              <Link href="#download-app" className="btn btn-primary hero-main-btn">
                Download the App <ArrowRight size={17} />
              </Link>
              <Link href="#how-it-works" className="btn btn-outline hero-secondary-btn">
                How It Works <ArrowRight size={16} />
              </Link>
            </div>

          <div className="store-row">
  <div className="store-badge">
    <img
      src="/images/apple-logo.png"
      alt="Apple"
      className="store-icon-image"
    />

    <span className="store-text">
      <small>Download on the</small>
      <b>App Store</b>
    </span>
  </div>

  <div className="store-badge">
    <img
      src="/images/google-play.png"
      alt="Google Play"
      className="store-icon-image"
    />

    <span className="store-text">
      <small>GET IT ON</small>
      <b>Google Play</b>
    </span>
  </div>
</div>
          </div>

          <div className="hero-app-scene" aria-label="PetCard app preview">
            <div className="scene-sun" />
            <div className="scene-paw scene-paw-one">♡</div>
            <div className="scene-paw scene-paw-two">✦</div>
            <div className="scene-paw scene-paw-three">🐾</div>

            <div className="hero-phone phone-back-left">
              <PhoneMockup type="card" />
            </div>
            <div className="hero-phone phone-main">
              <PhoneMockup type="dashboard" />
            </div>
            <div className="hero-phone phone-back-right">
              <PhoneMockup type="reward" />
            </div>

          
          </div>
        </div>
      </section>

      <section className="home-intro section" id="what-is-pet-card">
        <div className="container">
          <div className="section-heading center">
            <SectionLabel>Meet PET CARD</SectionLabel>
            <h2 className="section-title">More than a pet care app. <span>🧡</span></h2>
            <p className="section-subtitle">
              PET CARD is your pet&apos;s digital companion — a place to create their identity,
              manage everyday care, keep important records safe, celebrate memories, and make caring for them more fun.
            </p>
          </div>

          <div className="highlight-grid">
            {highlights.map(({ icon: Icon, title, text }, index) => (
              <article className="highlight-card" key={title} data-reveal style={{ "--delay": `${index * 70}ms` } as React.CSSProperties}>
                <div className="highlight-icon"><Icon size={24} /></div>
                <span className="highlight-number">0{index + 1}</span>
                <h3>{title}</h3>
                <p>{text}</p>
                <ArrowRight className="highlight-arrow" size={17} />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="identity-section section soft" id="digital-pet-card">
        <div className="container identity-grid">
          <div className="identity-visual" data-reveal>
            <div className="identity-glow" />
            <div className="identity-card-large">
              <div className="identity-card-top"><span>PET CARD</span><span>●●●</span></div>
              <div className="identity-avatar">
                <Image src="/images/home/home-dog.png" alt="Bruno" fill sizes="190px" />
              </div>
              <span className="identity-label">YOUR PET&apos;S DIGITAL IDENTITY</span>
              <h3>Bruno</h3>
              <p>Golden Retriever · 3 years · Male</p>
              <div className="identity-id">PC-2407-0184</div>
              <div className="identity-bottom">
                <span><b>Guardian</b>Meet Patel</span>
                <QrCode size={58} />
              </div>
            </div>
            <div className="identity-float-chip chip-one"><CircleCheck size={15} /> Profile verified</div>
            <div className="identity-float-chip chip-two"><ShieldAlert size={15} /> Emergency ready</div>
          </div>

          <div className="identity-copy" data-reveal>
            <SectionLabel>Your Pet&apos;s Digital Identity</SectionLabel>
            <h2 className="section-title">Every pet deserves their own <span>PET CARD.</span></h2>
            <p className="section-subtitle">
              Give your pet a beautiful, shareable digital identity that keeps the details
              that matter close when you need them.
            </p>

            <div className="identity-points">
              {["Pet photo or avatar", "Pet name, breed and age", "Unique Pet ID", "Guardian information", "QR code for quick access"].map((item) => (
                <div key={item}><Check size={16} />{item}</div>
              ))}
            </div>

            <Link href="#download-app" className="btn btn-primary">Create Your Pet&apos;s Card <ArrowRight size={17} /></Link>

            <div className="creation-flow">
              {["Choose Pet", "Add Details", "Create Card", "Ready 🎉"].map((item, index) => (
                <div className="creation-step" key={item}><span>{index + 1}</span><small>{item}</small></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="journey-section section" id="how-it-works">
        <div className="container">
          <div className="section-heading center">
            <SectionLabel>How It Works</SectionLabel>
            <h2 className="section-title">Simple steps. <span>A happier pet.</span></h2>
            <p className="section-subtitle">A playful journey from creating a profile to building better everyday care habits.</p>
          </div>

          <div className="journey-track">
            <div className="journey-line" />
            {journey.map(([number, title, text, avatar], index) => (
              <article className="journey-step" key={number} data-reveal style={{ "--delay": `${index * 80}ms` } as React.CSSProperties}>
                <div className="journey-avatar">
                  {index === 1 ? <Image src="/images/home/home-dog.png" alt={title} fill sizes="86px" /> : avatar}
                </div>
                <span className="journey-number">{number}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="care-section section soft" id="daily-care">
        <div className="container care-grid">
          <div className="care-copy" data-reveal>
            <SectionLabel>Daily Care · 🏠</SectionLabel>
            <h2 className="section-title">Care made easy. <span>Every single day.</span></h2>
            <p className="section-subtitle">
              Complete your pet&apos;s daily activities, stay on top of their routine,
              and never forget the little things that matter.
            </p>
            <div className="care-feature-list">
              {[
                ["🍽", "Feeding", "Keep meal routines on track."],
                ["💧", "Water", "Build healthy hydration habits."],
                ["🚶", "Walk", "Never miss their daily movement."],
                ["🎓", "Training", "Turn practice into progress."],
                ["✨", "Grooming", "Keep grooming routines visible."],
                ["💊", "Medicine", "Remember important medication."],
              ].map(([emoji, title, text]) => (
                <div className="care-feature" key={title}><span>{emoji}</span><div><b>{title}</b><small>{text}</small></div></div>
              ))}
            </div>
            <Link href="/features" className="btn btn-primary">Explore Daily Care <ArrowRight size={17} /></Link>
          </div>

          <div className="dashboard-showcase" data-reveal>
            <div className="dashboard-panel">
              <div className="dashboard-head"><span>☷ Today&apos;s Care</span><b>3 / 5 Completed</b></div>
              {careItems.map(([Icon, title, time, done]) => (
                <div className="dashboard-row" key={title}>
                  <span className="dashboard-icon"><Icon size={18} /></span>
                  <span><b>{title}</b><small>{time}</small></span>
                  <span className={done ? "dashboard-check done" : "dashboard-check"}>{done ? <Check size={13} /> : ""}</span>
                </div>
              ))}
              <div className="dashboard-progress"><span style={{ width: "62%" }} /></div>
            </div>
            <div className="dashboard-pet-note"><Image src="/images/home/home-dog.png" alt="Happy pet" fill sizes="130px" /><span>You&apos;re doing amazing, Bruno! 🐾</span></div>
          </div>
        </div>
      </section>

      <section className="game-section section" id="rewards">
        <div className="container game-grid">
          <div className="game-phone-wrap" data-reveal>
            <PhoneMockup type="reward" className="game-phone" />
            <div className="game-bubble bubble-one">🔥 7 day streak!</div>
            <div className="game-bubble bubble-two">+20 PawPoints ⭐</div>
          </div>
          <div className="game-copy" data-reveal>
            <SectionLabel>Turn Care Into a Game 🔥⭐</SectionLabel>
            <h2 className="section-title">The more you care, <span>the more you unlock.</span></h2>
            <p className="section-subtitle">
              Make everyday care rewarding. Build streaks, collect PawPoints,
              level up and unlock fun ways to customize your pet.
            </p>
            <div className="game-stats">
              <div><strong>🔥 7</strong><span>Day Streak</span></div>
              <div><strong>⭐ 240</strong><span>PawPoints</span></div>
              <div><strong>🏆 4</strong><span>Level</span></div>
              <div><strong>🎖 12</strong><span>Achievements</span></div>
            </div>
            <div className="game-loop"><span>Care</span><i>→</i><span>Complete</span><i>→</i><span>Earn</span><i>→</i><span>Unlock</span><i>→</i><span>Repeat</span></div>
          </div>
        </div>
      </section>

      <section className="rewards-section section soft" id="customization">
        <div className="container">
          <div className="section-heading center">
            <SectionLabel>Rewards & Customization 🎁</SectionLabel>
            <h2 className="section-title">Unlock a world made <span>for your pet.</span></h2>
            <p className="section-subtitle">Earn rewards and make your pet&apos;s digital world feel uniquely theirs.</p>
          </div>

          <div className="reward-showcase">
            <div className="reward-pet-card reward-pet-left" data-reveal>
              <Image src="/images/home/home-cat.png" alt="Customizable cat" fill sizes="210px" />
              <span>👑 Crown unlocked</span>
            </div>
            <div className="reward-pet-main" data-reveal>
              <div className="reward-orbit orbit-one" />
              <div className="reward-orbit orbit-two" />
              <div className="reward-main-pet">
                <Image src="/images/home/home-dog.png" alt="Bruno with rewards" fill sizes="300px" />
              </div>
              <div className="reward-tag tag-bandana">🎀 Adventure Bandana</div>
              <div className="reward-tag tag-points">⭐ +120 PawPoints</div>
            </div>
            <div className="reward-pet-card reward-pet-right" data-reveal>
              <Image src="/images/home/home-rabbit.png" alt="Customizable rabbit" fill sizes="190px" />
              <span>🕶 New look unlocked</span>
            </div>
          </div>

          <div className="reward-chips">
            {["👒 Accessories", "🎀 Bandanas", "👑 Crowns", "🕶 Sunglasses", "🌳 Backgrounds", "🪪 PET CARD themes", "🏅 Frames & badges"].map((item) => <span key={item}>{item}</span>)}
          </div>
        </div>
      </section>

      <section className="records-section section" id="records">
        <div className="container records-grid">
          <div className="records-copy" data-reveal>
            <SectionLabel>Health & Records 🩺</SectionLabel>
            <h2 className="section-title">Important information. <span>Always within reach.</span></h2>
            <p className="section-subtitle">
              Keep health information, documents and progress together instead of searching through scattered files.
            </p>

            <div className="record-tabs">
              <div className="record-tab active"><HeartPulse size={17} /><span><b>Health</b><small>Vaccinations · Medicines · Vet visits</small></span></div>
              <div className="record-tab"><FileHeart size={17} /><span><b>Documents</b><small>Prescriptions · Reports · Insurance</small></span></div>
              <div className="record-tab"><Award size={17} /><span><b>Progress</b><small>Weight · Growth · Health updates</small></span></div>
            </div>
          </div>

          <div className="records-panel" data-reveal>
            <div className="records-panel-head"><span><Stethoscope size={17} /> Bruno&apos;s Health</span><ChevronRight size={17} /></div>
            {["Vaccination", "Deworming", "Medicines", "Vet Visits", "Weight Progress"].map((item, index) => (
              <div className="record-row" key={item}><span className="record-row-icon">{index < 3 ? <Check size={13} /> : "↗"}</span><span><b>{item}</b><small>{index < 3 ? "Up to date" : index === 3 ? "Last visit · 12 Jun" : "8.4 kg · +0.3 kg"}</small></span><ChevronRight size={15} /></div>
            ))}
            <div className="record-secure"><LockKeyhole size={14} /> Your pet&apos;s information stays organized and protected.</div>
          </div>
        </div>
      </section>

      <section className="emergency-section section soft" id="emergency">
        <div className="container emergency-grid">
          <div className="emergency-card" data-reveal>
            <div className="emergency-top"><span>🚨 EMERGENCY CARD</span><ShieldAlert size={20} /></div>
            <div className="emergency-profile"><div className="emergency-avatar"><Image src="/images/home/home-dog.png" alt="Bruno" fill sizes="66px" /></div><div><strong>Bruno</strong><small>Golden Retriever · Blood Group: DEA 1.1 +</small></div></div>
            <div className="emergency-data">
              <span><b>Allergies</b>None known</span>
              <span><b>Emergency Contact</b>+91 98765 43210</span>
              <span><b>Current Medication</b>None</span>
              <span><b>Vet</b>Happy Paws Clinic</span>
            </div>
            <div className="emergency-actions"><button>Download</button><button>Share</button><button>Update</button></div>
          </div>

          <div className="emergency-copy" data-reveal>
            <SectionLabel>Be Ready for Emergencies 🚨</SectionLabel>
            <h2 className="section-title">Important information matters most <span>when you need it quickly.</span></h2>
            <p className="section-subtitle">Keep guardian contacts, allergies, medical conditions, medications and vet information ready in one reliable card.</p>
            <div className="trust-points"><span><ShieldAlert size={16} /> Critical details at a glance</span><span><QrCode size={16} /> Easy to share</span><span><CircleCheck size={16} /> Simple to update</span></div>
          </div>
        </div>
      </section>

      <section className="guardian-section section" id="guardians">
        <div className="container">
          <div className="section-heading center">
            <SectionLabel>Shared Guardians & QR 👥</SectionLabel>
            <h2 className="section-title">Care is better <span>when it&apos;s shared.</span></h2>
            <p className="section-subtitle">Invite another guardian while keeping permission and access under your control.</p>
          </div>

          <div className="guardian-flow">
            {[
              ["01", "Main Guardian", "Creates PET CARD", "👤"],
              ["02", "Second Guardian", "Scans QR", "📱"],
              ["03", "Request Access", "Sends request", "🤝"],
              ["04", "Approve", "Main guardian approves", "✅"],
              ["05", "Care Together", "Shared pet journey", "🧡"],
            ].map(([num, title, text, icon], index) => (
              <div className="guardian-step" key={num} data-reveal>
                <div className="guardian-icon">{icon}</div><span>{num}</span><b>{title}</b><small>{text}</small>
                {index < 4 && <ArrowRight className="guardian-arrow" size={17} />}
              </div>
            ))}
          </div>

          <div className="shared-access">
            {["Daily care", "Progress", "Records", "Memories", "Reminders", "Achievements"].map((item) => <span key={item}><Check size={14} /> {item}</span>)}
          </div>
        </div>
      </section>

      <section className="memories-section section soft" id="memories">
        <div className="container memories-grid">
          <div className="memories-copy" data-reveal>
            <SectionLabel>Memories 📸</SectionLabel>
            <h2 className="section-title">Some moments deserve more than your <span>camera roll.</span></h2>
            <p className="section-subtitle">Save the first day home, birthdays, adventures, achievements and everyday moments in one beautiful place.</p>
            <div className="memory-list">{["Photos", "Videos", "Captions", "Stories", "Albums", "Milestones"].map((item) => <span key={item}><ImageIcon size={15} /> {item}</span>)}</div>
            <Link href="#download-app" className="btn btn-outline">Explore Memories <ArrowRight size={16} /></Link>
          </div>

          <div className="memory-board" data-reveal>
            <div className="memory-note note-one">First day home 🧡</div>
            <div className="memory-photo photo-main"><Image src="/images/home/home-dog.png" alt="Pet memory" fill sizes="270px" /><span>Bruno&apos;s first adventure</span></div>
            <div className="memory-photo photo-cat"><Image src="/images/home/home-cat.png" alt="Cat memory" fill sizes="150px" /><span>Best nap buddy</span></div>
            <div className="memory-photo photo-rabbit"><Image src="/images/home/home-rabbit.png" alt="Rabbit memory" fill sizes="130px" /><span>Little moments</span></div>
            <div className="memory-note note-two">🏆 First achievement!</div>
          </div>
        </div>
      </section>

      <section className="know-section section" id="know-ai">
        <div className="container know-grid">
          <div className="know-pet-stage" data-reveal>
            <div className="know-glow" />
            <div className="know-pet"><Image src="/images/home/home-dog.png" alt="Bruno" fill sizes="280px" /></div>
            <div className="know-card know-card-top"><Sparkles size={16} /><b>Know Bruno</b><small>Personalized care</small></div>
            <div className="know-card know-card-bottom"><span>🤖</span><div><b>PET CARD AI</b><small>Ask anything about Bruno</small></div></div>
          </div>

          <div className="know-copy" data-reveal>
            <SectionLabel>Know Your Pet Better 🤖</SectionLabel>
            <h2 className="section-title">Personalized care, <span>made for your pet.</span></h2>
            <p className="section-subtitle">Get a pet-specific view across nutrition, grooming, training, wellness, safety and daily care.</p>
            <div className="know-topics">{["🍽 Food & Nutrition", "✨ Grooming", "🎓 Training", "🩺 Wellness", "🛡 Safety", "🐾 Daily Care"].map((item) => <span key={item}>{item}</span>)}</div>
            <div className="ai-chat">
              <div className="ai-chat-head"><span>🤖</span><div><b>Ask PET CARD AI</b><small>Personalized assistant</small></div><span className="online-dot" /></div>
              <div className="ai-question">How often should Bruno be groomed?</div>
              <div className="ai-answer">For a Golden Retriever like Bruno, regular brushing helps manage shedding and keeps his coat healthy. 🐶</div>
            </div>
          </div>
        </div>
      </section>

      <section className="ecosystem-section section soft" id="features">
        <div className="container">
          <div className="section-heading center">
            <SectionLabel>Everything Your Pet Needs</SectionLabel>
            <h2 className="section-title">One app. <span>One pet world.</span></h2>
            <p className="section-subtitle">Everything connects around your pet&apos;s digital identity.</p>
          </div>

          <div className="ecosystem-visual">
            <div className="ecosystem-orbit orbit-a" />
            <div className="ecosystem-orbit orbit-b" />
            <div className="ecosystem-center"><PawPrint size={35} /><b>PET CARD</b><small>Your pet&apos;s world</small></div>
            {ecosystem.map(([title, text], index) => (
              <div className={`eco-node eco-node-${index + 1}`} key={title} data-reveal>
                <span>{["🏠", "📅", "🔥", "⭐", "🎁", "🚨", "👥", "📸"][index]}</span><b>{title}</b><small>{text}</small>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="about-home section" id="about-us">
        <div className="container about-home-card">
          <div className="about-home-copy" data-reveal>
            <SectionLabel>About PET CARD 🧡</SectionLabel>
            <h2 className="section-title">Built for the love behind <span>every little paw.</span></h2>
            <p>
              PET CARD was created with a simple belief: pets are family. Their identity,
              health, routines, memories and milestones deserve a place of their own.
            </p>
            <div className="mission-grid">
              <div><b>Our Mission</b><span>Make pet care simpler, more organized and more enjoyable.</span></div>
              <div><b>Our Vision</b><span>A future where every pet has a digital identity and every guardian has better tools to care for them.</span></div>
            </div>
            <Link href="/about" className="btn btn-primary">Our Story <ArrowRight size={17} /></Link>
          </div>
          <div className="about-home-pets" data-reveal>
            <div className="about-pet about-dog"><Image src="/images/home/home-dog.png" alt="Dog" fill sizes="240px" /></div>
            <div className="about-pet about-cat"><Image src="/images/home/home-cat.png" alt="Cat" fill sizes="150px" /></div>
            <div className="about-pet about-rabbit"><Image src="/images/home/home-rabbit.png" alt="Rabbit" fill sizes="130px" /></div>
            <div className="about-heart">♥</div>
          </div>
        </div>
      </section>

      <section className="final-download section" id="download-app">
        <div className="container final-download-card">
          <div className="final-copy" data-reveal>
            <SectionLabel>Ready to Create Your Pet&apos;s World? 🐾</SectionLabel>
            <h2>Care today. <span>Stronger bond tomorrow.</span></h2>
            <p>Create their PET CARD, build better care habits, save every memory, and enjoy the journey together.</p>
            <div className="final-buttons">
              <span className="store-badge store-badge-large"><span className="store-icon">●</span><span><small>Download on the</small><b>App Store</b></span></span>
              <span className="store-badge store-badge-large"><span className="store-icon">▶</span><span><small>GET IT ON</small><b>Google Play</b></span></span>
            </div>
          </div>
          <div className="final-pets" data-reveal>
            <div className="final-pet final-dog"><Image src="/images/home/home-dog.png" alt="Dog" fill sizes="260px" /></div>
            <div className="final-pet final-cat"><Image src="/images/home/home-cat.png" alt="Cat" fill sizes="160px" /></div>
            <div className="final-pet final-rabbit"><Image src="/images/home/home-rabbit.png" alt="Rabbit" fill sizes="140px" /></div>
            <span className="final-spark spark-one">✦</span><span className="final-spark spark-two">♡</span>
          </div>
        </div>
      </section>
    </>
  );
}
