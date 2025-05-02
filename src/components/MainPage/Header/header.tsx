import { LOGO, ACCOUNT_ICON, ABOUT_TITLE, CONTACTS_TITLE, EXAMPLES_TITLE, PHOTO_TITLE, SERVICES_TITLE, CALLPHONE_LINK } from "@/mocks/MainPage/header";
import s from "./header.module.scss";
import Image from "next/image";
export default function HeaderMain() {
  return (
    <header className={s.header}>
      <div className={s.container}>
        <ul className={s.headerListMain}>
          <li>
            <a href="заглушка">
              <Image src={LOGO} alt="Логотип Sound" />
            </a>
          </li>
          <li>
            <nav>
              <ul className={s.headerList}>
                <li>
                  <a href="заглушка">{ABOUT_TITLE}</a>
                </li>
                <li>
                  <a href="заглушка">{SERVICES_TITLE}</a>
                </li>
                <li>
                  <a href="заглушка">{EXAMPLES_TITLE}</a>
                </li>
                <li>
                  <a href="заглушка">{PHOTO_TITLE}</a>
                </li>
                <li>
                  <a href="заглушка">{CONTACTS_TITLE}</a>
                </li>
              </ul>
            </nav>
          </li>
          <li>
            <div className={s.accountBlock}>
              <a href="tel:+79162699881" className={s.callPhoneLink}>{CALLPHONE_LINK}</a>
              <a href="заглушка" className={s.accountLink}>
                <Image src={ACCOUNT_ICON} alt="Личный кабинет" />
              </a>
            </div>
          </li>
        </ul>
      </div>
    </header>
  );
}
