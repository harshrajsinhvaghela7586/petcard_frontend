"use client";
import { useState } from "react";
export default function ContactForm() {
  const [sent,setSent]=useState(false);
  return <form className="form-card" onSubmit={e=>{e.preventDefault();setSent(true)}}><h2 style={{marginTop:0}}>Send us a <span style={{color:"var(--orange)"}}>message</span></h2><div className="form-grid"><div className="field"><label>Name *</label><input required placeholder="Your name"/></div><div className="field"><label>Email *</label><input required type="email" placeholder="you@example.com"/></div><div className="field full"><label>Subject</label><input placeholder="How can we help?"/></div><div className="field full"><label>Message *</label><textarea required rows={6} placeholder="Write your message..."/></div></div><button className="btn btn-primary" type="submit">{sent ? "Message Sent ✓" : "Send Message →"}</button></form>
}
