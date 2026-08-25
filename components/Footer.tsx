import Link from "next/link";
import { Instagram, Facebook, Linkedin, ArrowRight } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand-column">
            <Link href="/" className="footer-brand" aria-label="PetCard home">
              <Image src="/images/brand/dog.png" alt="PetCard" width={58} height={58} className="footer-dog-logo" />
              <div className="footer-brand-text">
                <div className="footer-brand-name">
                  <span className="footer-pet">PET</span><span className="footer-card">CARD</span>
                </div>
                <div className="footer-tagline">WORLD&apos;S FIRST AI-ENABLED PET ID</div>
              </div>
            </Link>
            <p className="footer-description">
              Care today. Stronger bond tomorrow. PET CARD brings identity, care,
              health, memories and rewards into one playful pet world.
            </p>
            <div className="footer-socials">
              <a href="#" aria-label="Instagram"><Instagram size={18} /></a>
              <a href="#" aria-label="Facebook"><Facebook size={18} /></a>
              <a href="#" aria-label="LinkedIn"><Linkedin size={18} /></a>
            </div>
          </div>

          <div>
            <h4>Explore</h4>
            <div className="footer-links">
              <Link href="/how-it-works">How It Works <ArrowRight size={13} /></Link>
              <Link href="/features">Features <ArrowRight size={13} /></Link>
              <Link href="/about">About Us <ArrowRight size={13} /></Link>
              <Link href="#download-app">Download App <ArrowRight size={13} /></Link>
            </div>
          </div>

          <div>
            <h4>Pet World</h4>
            <div className="footer-links">
              <Link href="/features">Daily Care</Link>
              <Link href="/features">Health & Records</Link>
              <Link href="/features">Memories</Link>
              <Link href="/features">Rewards & Fun</Link>
              <Link href="/faq">FAQ</Link>
            </div>
          </div>

          <div>
            <h4>Legal</h4>
            <div className="footer-links">
              <Link href="/privacy">Privacy Policy</Link>
              <Link href="/terms">Terms & Conditions</Link>
              <Link href="/contact">Contact Us</Link>
              <Link href="/auth">Get Started</Link>
            </div>
          </div>
        </div>

        <div className="copyright">
          <span>© 2026 PetCard. All rights reserved.</span>
          <span>Made for every little paw 🐾</span>
        </div>
      </div>
    </footer>
  );
}
