"use client";

import {
  ABOUT_TITLE,
  ACCOUNT_ICON,
  CALLPHONE_LINK,
  CONTACTS_TITLE,
  EXAMPLES_TITLE,
  LOGO,
  MENU_TITLE,
  PHOTO_TITLE,
  SERVICES_TITLE,
} from "@/mocks/header";
import s from "./header.module.scss";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
  setIsLoggedIn(localStorage.getItem("profile") !== null);

  const handler = () =>
    setIsLoggedIn(localStorage.getItem("profile") !== null);

  window.addEventListener("storage", handler);
  return () => window.removeEventListener("storage", handler);
}, []);

useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
  }, [isMenuOpen]);

  const handleLinkClick = () => setIsMenuOpen(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className={s.header}>
      <div className="container">
        <ul className={s.headerListMain}>
          <li>
            <div className={s.logoAndMenu}>
              <Link href="/">
                <Image src={LOGO} alt="Логотип Sound" />
              </Link>

              <button
                className={s.burger}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Меню"
                aria-expanded={isMenuOpen}
              >
                {MENU_TITLE}
              </button>
            </div>
          </li>

          <li>
            <nav>
              <ul className={`${s.headerList} ${isMenuOpen ? s.navOpen : ""}`}>
                <li>
                  <a href="/#about" onClick={handleLinkClick}>{ABOUT_TITLE}</a>
                </li>
                <li>
                  <a href="/#services" onClick={handleLinkClick}>{SERVICES_TITLE}</a>
                </li>
                <li>
                  <a href="/#examples" onClick={handleLinkClick}>{EXAMPLES_TITLE}</a>
                </li>
                <li>
                  <a href="/#photo" onClick={handleLinkClick}>{PHOTO_TITLE}</a>
                </li>
                <li>
                  <a href="/#contacts" onClick={handleLinkClick}>{CONTACTS_TITLE}</a>
                </li>
              </ul>
            </nav>
          </li>

          <li>
            <div className={s.accountBlock}>
              <a href="tel:+79162699881" className={s.callPhoneLink}>
                {CALLPHONE_LINK}
              </a>
              <Link
                href={isLoggedIn ? "/personal-account" : "/authorization"}
                aria-label="Личный кабинет"
              >
                <Image src={ACCOUNT_ICON} alt="Личный кабинет" />
              </Link>
            </div>
          </li>
        </ul>
      </div>
    </header>
  );
}
