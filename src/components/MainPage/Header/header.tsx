import { LOGO, ACCOUNT_ICON } from "@/mocks/MainPage/Header/header";
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
                  <a href="заглушка">О студии</a>
                </li>
                <li>
                  <a href="заглушка">Услуги</a>
                </li>
                <li>
                  <a href="заглушка">Примеры работ</a>
                </li>
                <li>
                  <a href="заглушка">Фото</a>
                </li>
                <li>
                  <a href="заглушка">Контакты</a>
                </li>
              </ul>
            </nav>
          </li>
          <li>
            <div className={s.accountBlock}>
              <a href="tel:79162699881" className={s.callPhoneLink}>+7 (916) 269-98-81</a>
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
