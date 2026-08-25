import ContactForm from "../../components/ContactForm";
import CTA from "../../components/CTA";
import { Mail, MapPin, Phone, Clock } from "lucide-react";

export default function Contact() {
  return <>
    <section className="page-hero"><div className="container page-hero-grid"><div><div className="eyebrow">Contact Us</div><h1>We'd love to <span>hear from you.</span></h1><p>Have a question, suggestion or feedback about PetCard? Send us a message and the official contact details can be added here once finalized.</p></div><div className="pet-visual"><div className="pet-orb"/><div className="pet-card"><div className="screen-top"><span>PetCard</span><span>♥</span></div><div className="pet-avatar">🐶</div><h3>We're here to help</h3><div className="breed">Questions · Feedback · Support</div><div className="mini-row"><span>Email</span><b>→</b></div><div className="mini-row"><span>Support</span><b>→</b></div><div className="mini-row"><span>Feedback</span><b>→</b></div></div></div></div></section>
    <section className="section"><div className="container contact-grid"><ContactForm/><div className="info-card"><h2 style={{marginTop:0}}>Get in <span style={{color:"var(--orange)"}}>touch</span></h2>{[[Mail,"Email","Official support email will be added here"],[Phone,"Phone","Official phone number will be added here"],[MapPin,"Location","Official business address will be added here"],[Clock,"Hours","Official working hours will be added here"]].map(([I,t,d])=>{const Icon=I as any;return <div className="info-item" key={t as string}><div className="feature-icon"><Icon size={21}/></div><div><strong>{t as string}</strong><span>{d as string}</span></div></div>})}</div></div></section>
    <CTA title="Still have questions?" text="You can also check our FAQ section for common PetCard questions."/>
  </>;
}
