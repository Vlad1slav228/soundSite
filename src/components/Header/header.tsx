"use client";

import {
  ABOUT_TITLE,
  ACCOUNT_ICON,
  ACCOUNT_TITLE,
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
import { useRouter } from "next/navigation";
import { API_BASE_URL } from "@/lib/config";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(false);
  const router = useRouter();

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

 const handleAccountClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (checkingAuth) return; 
    setCheckingAuth(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/auth/me/`, {
        method: "GET",
        credentials: "include",
      });
      if (res.ok) {
        router.push("/personal-account");
      } else {
        router.push("/authorization");
      }
    } catch {
      router.push("/authorization");
    } finally {
      setCheckingAuth(false);
    }
  };

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
                <li className={s.linkAccount}><a href="/personal-account">{ACCOUNT_TITLE}</a></li>
              </ul>
            </nav>
          </li>

          <li>
            <div className={s.accountBlock}>
              <a href="tel:+79162699881" className={s.callPhoneLink}>
                {CALLPHONE_LINK}
              </a>
              <Link
                href="/personal-account"
                onClick={handleAccountClick}
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
