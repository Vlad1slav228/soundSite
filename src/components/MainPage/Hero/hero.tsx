import { HERO_TITLE, MICROPHONE_IMG } from "@/mocks/MainPage/hero";
import s from "./hero.module.scss";
import Image from "next/image";

export default function HeroMain() {
  return (
    <section className={s.heroBlock}>
      <div className={`${s.container} ${s.heroContent}`}>
          <h1 className={s.titleMainPage}>{HERO_TITLE}</h1>
          <Image src={MICROPHONE_IMG} alt="Микрофон" />
      </div>
    </section>
  );
}
