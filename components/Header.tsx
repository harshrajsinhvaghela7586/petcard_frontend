"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const links = [
  ["How It Works", "/how-it-works"],
  ["Features", "/features"],
  ["About Us", "/about"],
] as const;

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
        <div className="container header-inner">
          <Link href="/" className="header-brand" aria-label="PetCard home">
            <Image
              src="/images/brand/dog.png"
              alt="PetCard"
              width={62}
              height={62}
              priority
              className="header-dog-logo"
            />
            <div className="brand-text">
              <div className="brand-name">
                <span className="pet-text">PET</span>
                <span className="card-text">CARD</span>
              </div>
              <div className="brand-tagline">WORLD&apos;S FIRST AI-ENABLED PET ID</div>
            </div>
          </Link>

          <nav className="desktop-nav" aria-label="Primary navigation">
            {links.map(([label, href]) => (
              <Link key={href} href={href} className={pathname === href ? "active" : ""}>
                {label}
              </Link>
            ))}
          </nav>

         <div className="header-actions">
  <Link href="#download-app" className="btn btn-primary header-download">
    Download App
    <img
      src="/images/paw-white.png"
      alt=""
      className="download-paw"
    />
  </Link>
</div>

          <button
            className={`mobile-menu${menuOpen ? " open" : ""}`}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            type="button"
            onClick={() => setMenuOpen((value) => !value)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      <div className={`mobile-nav-overlay${menuOpen ? " show" : ""}`} aria-hidden={!menuOpen}>
        <nav className="mobile-nav" aria-label="Mobile navigation">
          <div className="mobile-nav-label">Explore PetCard</div>
          {links.map(([label, href], index) => (
            <Link
              key={href}
              href={href}
              className={pathname === href ? "active" : ""}
              onClick={() => setMenuOpen(false)}
              style={{ animationDelay: `${index * 55}ms` }}
            >
              <span>{label}</span>
              <ArrowRight size={17} />
            </Link>
          ))}
          <Link href="#download-app" className="btn btn-primary mobile-download" onClick={() => setMenuOpen(false)}>
            Download App <ArrowRight size={16} />
          </Link>
        </nav>
      </div>
    </>
  );
}

function PawIcon() {
  return <span aria-hidden="true" className="header-paw-icon">🐾</span>;
}
