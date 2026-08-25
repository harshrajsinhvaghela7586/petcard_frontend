import Link from "next/link";
import { ArrowRight, Bell, CalendarDays, FileText, HeartPulse, Image, ListChecks, PawPrint, Syringe, Users } from "lucide-react";
import CTA from "../../components/CTA";

const items = [
  [PawPrint,"Pet Profile","Keep your pet's essential profile details organized and easy to access."],
  [HeartPulse,"Health Information","Store useful health-related information in one organized place."],
  [Syringe,"Vaccination","Keep vaccination records organized and easier to review."],
  [Bell,"Reminders","Remember important pet-care tasks, appointments and dates."],
  [Image,"Gallery","Keep your favorite pet photos organized in one place."],
  [FileText,"Notes & Logs","Create notes and logs for everyday pet care."],
  [Users,"Multiple Pets","Manage information for multiple pets from one account."],
  [CalendarDays,"Calendar View","Get a simple overview of tasks, reminders and logs."]
];

export default function Features() {
  return <>
    <section className="page-hero"><div className="container page-hero-grid"><div><div className="eyebrow">PetCard Features</div><h1>Features that make pet parenting <span>easier.</span></h1><p>PetCard brings useful pet-care information into one simple digital experience designed for everyday pet parents.</p><div className="hero-actions"><Link href="#download-app" className="btn btn-primary">Download Our App <ArrowRight size={17}/></Link></div></div><div className="pet-visual"><div className="pet-orb"/><div className="pet-card"><div className="screen-top"><span>PetCard</span><span>•••</span></div><div className="pet-avatar">🐱</div><h3>Milo</h3><div className="breed">Pet Profile</div>{["Profile","Health","Vaccination","Reminders","Gallery"].map(x=><div className="mini-row" key={x}><span>{x}</span><b>›</b></div>)}</div></div></div></section>
    <section className="section"><div className="container center"><div className="eyebrow">Explore PetCard</div><h2 className="section-title">Everything your pet profile <span>needs.</span></h2><p className="section-subtitle">The following feature set mirrors the promotional direction of the reference app. Replace or remove items according to the final approved PetCard app scope.</p><div className="feature-grid">{items.map(([I,t,d])=>{const Icon=I as any; return <div className="feature-card" key={t as string}><div className="feature-icon"><Icon size={24}/></div><h3>{t as string}</h3><p>{d as string}</p><div style={{marginTop:18,color:"var(--orange)",fontWeight:700,fontSize:13}}>Learn more →</div></div>})}</div></div></section>
    <CTA title="One place for your pet-care journey." text="Keep important information organized and make everyday pet care easier."/>
  </>;
}
