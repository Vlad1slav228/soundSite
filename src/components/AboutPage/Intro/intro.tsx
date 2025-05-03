import {
  ARTIST_RIGHT_IMG,
  INTRO_TITLE,
  SOUND_DESIGNER_CENTER_IMG,
  SOUND_ENGINEER_LEFT_IMG,
} from "@/mocks/AboutPage/intro";
import s from "./intro.module.scss";
import Image from "next/image";
import Link from "next/link";

export default function IntroAbout() {
  return (
    <section className={s.IntroBlock}>
      <div className={s.stringLineFirst} aria-hidden="true"></div>
      <div className={s.stringLineSecond} aria-hidden="true"></div>
      <div className={s.stringLineThird} aria-hidden="true"></div>
      <div className={s.container}>
        <nav className={s.breadcrumbs} aria-label="breadcrumb">
          <ul>
            <li>
              <Link href="/">Главная</Link>
            </li>
            <li>/</li>
            <li className={s.active}>О студии</li>
          </ul>
        </nav>
        <div className={s.imagesGrid}>
          <Image
            src={SOUND_ENGINEER_LEFT_IMG}
            alt="Звукорежиссёр работает с микшерным пультом"
            className={s.leftImage}
          />
          <h1 className={s.introTitle}>{INTRO_TITLE}</h1>

          <Image
            src={ARTIST_RIGHT_IMG}
            alt="Музыкант в наушниках записывает вокал в студии"
            className={s.rightImage}
          />
          <Image
            src={SOUND_DESIGNER_CENTER_IMG}
            alt="Саунд-дизайнер на фоне студийного оборудования"
            className={s.centerImage}
          />
        </div>
      </div>
    </section>
  );
}
