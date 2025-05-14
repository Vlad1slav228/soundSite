import {
  ABOUT_TITLE,
  ACCOUNT_ICON,
  CALLPHONE_LINK,
  CONTACTS_TITLE,
  EXAMPLES_TITLE,
  LOGO,
  PHOTO_TITLE,
  SERVICES_TITLE,
} from "@/mocks/header";
import s from "./header.module.scss";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className={s.header}>
      <div className={s.container}>
        <ul className={s.headerListMain}>
          <li>
            <Link href="/">
              <Image src={LOGO} alt="Логотип Sound" />
            </Link>
          </li>
          <li>
            <nav>
              <ul className={s.headerList}>
                <li>
                  <a href="/#about">{ABOUT_TITLE}</a>
                </li>
                <li>
                  <a href="/#services">{SERVICES_TITLE}</a>
                </li>
                <li>
                  <a href="/#examples">{EXAMPLES_TITLE}</a>
                </li>
                <li>
                  <a href="/#photo">{PHOTO_TITLE}</a>
                </li>
                <li>
                  <a href="/#contacts">{CONTACTS_TITLE}</a>
                </li>
              </ul>
            </nav>
          </li>
          <li>
            <div className={s.accountBlock}>
              <a href="tel:+79162699881" className={s.callPhoneLink}>
                {CALLPHONE_LINK}
              </a>
              <Link href="/authorization" aria-label="Открыть личный кабинет">
                <Image src={ACCOUNT_ICON} alt="Личный кабинет" />
              </Link>
            </div>
          </li>
        </ul>
      </div>
    </header>
  );
}
