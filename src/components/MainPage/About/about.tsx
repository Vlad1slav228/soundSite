import {
  MICROPHONE_LEFT_IMG,
  SYNTHESIZER_IMG,
  MICROPHONE_RIGHT_IMG,
  ABOUT_TITLE,
  ABOUT_BUTTON,
} from "@/mocks/MainPage/about";
import s from "./about.module.scss";
import Image from "next/image";
import Link from "next/link";

export default function AboutMain() {
  return (
    <section className={s.aboutBlock} id="about">
      <div className={s.stringLineFirst} aria-hidden="true"></div>
      <div className={s.stringLineSecond} aria-hidden="true"></div>
      <div className={s.stringLineThird} aria-hidden="true"></div>
      <div className={'container'}>
        <div className={s.aboutImagesBlock}>
          <Image
            src={MICROPHONE_LEFT_IMG}
            alt="Левый микрофон"
            className={s.leftImage}
          />
          <Image
            src={SYNTHESIZER_IMG}
            alt="Синтезатор"
            className={s.centerImage}
          />
          <Image
            src={MICROPHONE_RIGHT_IMG}
            alt="Правый микрофон"
            className={s.rightImage}
          />
        </div>
        <article className={s.aboutContent}>
          <h2 className={s.aboutTitle}>{ABOUT_TITLE}</h2>
          <Link href="/about" className={s.aboutButton}>
            {ABOUT_BUTTON}
          </Link>
        </article>
      </div>
    </section>
  );
}
