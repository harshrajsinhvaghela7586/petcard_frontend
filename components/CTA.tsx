import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

import styles from "./CTA.module.css";

interface CTAProps {
  title?: string;
  text?: string;
}

export default function CTA({
  title = "Give Your Pet a Smarter Identity",
  text = "Discover PetCard and keep your pet's important information organized.",
}: CTAProps) {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.cta}>
          {/* Decorative glow */}
          <div
            className={styles.glow}
            aria-hidden="true"
          />

          <div
            className={styles.content}
          >
            <div className={styles.label}>
              
              <span>PetCard</span>
            </div>

            <h2>{title}</h2>

            <p>{text}</p>
          </div>

          <Link
            className={`btn btn-dark ${styles.button}`}
            href="#download-app"
          >
            Download Our App
            <ArrowRight size={17} />
          </Link>
        </div>
      </div>
    </section>
  );
}