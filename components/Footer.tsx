import Link from "next/link";
import Image from "next/image";
import {
  Instagram,
  Facebook,
  Linkedin,
} from "lucide-react";
import styles from "./Footer.module.css";

const exploreLinks = [
  ["How It Works", "/how-it-works"],
  ["Features", "/features"],
  ["About Us", "/about"],
  ["Download App", "#download-app"],
] as const;

const petWorldLinks = [
  ["Daily Care", "/features"],
  ["Health & Records", "/features"],
  ["Memories", "/features"],
  ["Rewards & Fun", "/features"],
  ["FAQ", "/faq"],
] as const;

const legalLinks = [
  ["Privacy Policy", "/privacy"],
  ["Terms & Conditions", "/terms"],
  ["Contact Us", "/contact"],
  ["Get Started", "/auth"],
] as const;

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerGrid}>

          {/* Brand */}
          <div className={styles.footerBrandColumn}>
            <Link
              href="/"
              className={styles.footerBrand}
              aria-label="PetCard home"
            >
              <Image
                src="/images/dog-white.png"
                alt="PetCard"
                width={58}
                height={58}
                className={styles.footerDogLogo}
              />

              <div className={styles.footerBrandText}>
                <div className={styles.footerBrandName}>
                  <span className={styles.footerPet}>PET</span>
                  <span className={styles.footerCard}>CARD</span>
                </div>

                <div className={styles.footerTagline}>
                  WORLD&apos;S FIRST AI-ENABLED PET ID
                </div>
              </div>
            </Link>

            <p className={styles.footerDescription}>
              Care today. Stronger bond tomorrow. PET CARD brings identity,
              care, health, memories and rewards into one playful pet world.
            </p>

            <div className={styles.footerSocials}>
              <a
                href="#"
                aria-label="Instagram"
                className={styles.socialLink}
              >
                <Instagram size={18} strokeWidth={1.9} />
              </a>

              <a
                href="#"
                aria-label="Facebook"
                className={styles.socialLink}
              >
                <Facebook size={18} strokeWidth={1.9} />
              </a>

              <a
                href="#"
                aria-label="LinkedIn"
                className={styles.socialLink}
              >
                <Linkedin size={18} strokeWidth={1.9} />
              </a>
            </div>
          </div>

          {/* Explore */}
          <FooterColumn title="Explore" links={exploreLinks} showArrow />

          {/* Pet World */}
          <FooterColumn title="Pet World" links={petWorldLinks} />

          {/* Legal */}
          <FooterColumn title="Legal" links={legalLinks} />
        </div>

        {/* Copyright */}
        <div className={styles.copyright}>
          <span>© 2026 PetCard. All rights reserved.</span>
          <span>Made for every little paw <img
          className={styles.copyImage}
          src="/images/paw-white.png"
          width={20}
          height={20}
          /> </span>
        </div>
      </div>
    </footer>
  );
}

type FooterColumnProps = {
  title: string;
  links: readonly (readonly [string, string])[];
  showArrow?: boolean;
};

function FooterColumn({
  title,
  links,
  showArrow = false,
}: FooterColumnProps) {
  return (
    <div className={styles.footerColumn}>
      <h4>{title}</h4>

      <div className={styles.footerLinks}>
        {links.map(([label, href]) => (
          <Link key={`${label}-${href}`} href={href}>
            <span>{label}</span>

           
          </Link>
        ))}
      </div>
    </div>
  );
}