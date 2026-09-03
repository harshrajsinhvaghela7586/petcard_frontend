"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import styles from "./Header.module.css";

const links = [
  ["Home","/"],
  ["How It Works", "/how-it-works"],
  ["Features","/features"],
  ["Blogs", "/blogs"],
  ["About Us", "/about"],
] as const;

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);
    };

    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  // Prevent background page scrolling when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const headerClass = [
    styles.siteHeader,
    scrolled ? styles.isScrolled : "",
  ]
    .filter(Boolean)
    .join(" ");

  const mobileMenuClass = [
    styles.mobileMenu,
    menuOpen ? styles.open : "",
  ]
    .filter(Boolean)
    .join(" ");

  const overlayClass = [
    styles.mobileNavOverlay,
    menuOpen ? styles.show : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      <header className={headerClass}>
        <div className={`container ${styles.headerInner}`}>
          {/* Logo */}
          <Link
            href="/"
            className={styles.headerBrand}
            aria-label="PetCard home"
          >
            <Image
              src="/images/brand/dog.png"
              alt="PetCard"
              width={62}
              height={62}
              priority
              className={styles.headerDogLogo}
            />

            <div className={styles.brandText}>
              <div className={styles.brandName}>
                <span className={styles.petText}>PET</span>
                <span className={styles.cardText}>CARD</span>
              </div>

              <div className={styles.brandTagline}>
                WORLD&apos;S FIRST AI-ENABLED PET ID
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav
            className={styles.desktopNav}
            aria-label="Primary navigation"
          >
            {links.map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className={pathname === href ? styles.active : ""}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className={styles.headerActions}>
            <Link
              href="#download-app"
              className={`btn btn-primary ${styles.headerDownload}`}
            >
              <span>Download App</span>

              <img
                src="/images/paw-white.png"
                alt=""
                className={styles.downloadPaw}
              />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={mobileMenuClass}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            type="button"
            onClick={() => setMenuOpen((value) => !value)}
          >
            {menuOpen ? <X size={23} strokeWidth={2.2} /> : <Menu size={23} strokeWidth={2.2} />}
          </button>
        </div>
      </header>

      {/* Mobile Navigation */}
      <div
        className={overlayClass}
        aria-hidden={!menuOpen}
        onClick={() => setMenuOpen(false)}
      >
        <nav
          id="mobile-navigation"
          className={styles.mobileNav}
          aria-label="Mobile navigation"
          onClick={(event) => event.stopPropagation()}
        >
          <div className={styles.mobileNavLabel}>
            Explore PetCard
          </div>

          {links.map(([label, href], index) => (
            <Link
              key={href}
              href={href}
              className={
                pathname === href
                  ? `${styles.mobileNavLink} ${styles.active}`
                  : styles.mobileNavLink
              }
              onClick={() => setMenuOpen(false)}
              style={{
                animationDelay: `${index * 55}ms`,
              }}
            >
              <span>{label}</span>
              <ArrowRight size={17} />
            </Link>
          ))}

          <Link
            href="#download-app"
            className={`btn btn-primary ${styles.mobileDownload}`}
            onClick={() => setMenuOpen(false)}
          >
            <span>Download App</span>
            <ArrowRight size={16} />
          </Link>
        </nav>
      </div>
    </>
  );
}