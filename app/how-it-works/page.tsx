import Link from "next/link";
import { ArrowRight, Check, PawPrint } from "lucide-react";
import CTA from "../../components/CTA";

const steps = [
  ["01","Create your account","Sign up with your basic details and start your PetCard journey."],
  ["02","Add your pet","Create a pet profile and add the information you want to keep organized."],
  ["03","Keep information updated","Add health details, reminders, notes and other useful information."],
  ["04","Stay organized","Use PetCard whenever you need a quick overview of your pet's information."]
];

export default function HowItWorks() {
  return <>
    <section className="page-hero"><div className="container page-hero-grid"><div><div className="eyebrow">How It Works</div><h1>Simple to start. <span>Easy to use.</span></h1><p>PetCard is designed around a straightforward experience so pet parents can spend less time managing information and more time caring for their pets.</p><div className="hero-actions"><Link href="#download-app" className="btn btn-primary">Download Our App <ArrowRight size={17}/></Link></div></div><div className="pet-visual"><div className="pet-orb"/><div className="floating-paw paw-one">🐾</div><div className="pet-card"><div className="screen-top"><span>PetCard</span><span>9:41</span></div><div className="pet-avatar">🐶</div><h3>Bruno</h3><div className="breed">Your pet profile</div><div className="mini-row"><span>Profile setup</span><b>✓</b></div><div className="mini-row"><span>Health info</span><b>✓</b></div><div className="mini-row"><span>Reminders</span><b>✓</b></div></div></div></div></section>
    <section className="section"><div className="container center"><div className="eyebrow">The Process</div><h2 className="section-title">How <span>PetCard</span> works</h2><p className="section-subtitle">A simple four-step flow for the promotional website. Exact product behavior can be connected when the app backend is ready.</p><div className="steps">{steps.map(([n,t,d])=><div className="step" key={n}><div className="step-number">{n}</div><h3>{t}</h3><p>{d}</p></div>)}</div></div></section>
    <section className="section soft"><div className="container"><div className="page-hero-grid"><div><div className="eyebrow">One place</div><h2 className="section-title">Keep the important stuff <span>together.</span></h2><p className="section-subtitle">From profile information to reminders and notes, PetCard is designed to make everyday pet care easier to manage.</p><div style={{display:"grid",gap:12,marginTop:25}}>{["Simple pet profile","Organized care information","Useful reminders","Multiple-pet support"].map(x=><div key={x} style={{display:"flex",alignItems:"center",gap:10,fontWeight:600}}><span className="feature-icon" style={{width:34,height:34,borderRadius:10}}><Check size={17}/></span>{x}</div>)}</div></div><div className="pet-visual"><div className="pet-orb"/><div className="pet-card"><div className="screen-top"><span>PetCard</span><span>●</span></div><div className="pet-avatar">🐕</div><h3>Buddy</h3><div className="breed">Everything in one place</div>{["Pet Profile","Health","Vaccination","Notes"].map(x=><div className="mini-row" key={x}><span>{x}</span><b>›</b></div>)}</div></div></div></div></section>
    <CTA />
  </>;
}
