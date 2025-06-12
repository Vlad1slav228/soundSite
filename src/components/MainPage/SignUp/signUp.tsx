import {
  SIGNUP_BUTTON,
  SIGNUP_TEXT,
  STUDIO_IMG,
  WAVES_IMG,
} from "@/mocks/MainPage/signUp";
import s from "./signUp.module.scss";
import Image from "next/image";

export default function SignUpMain() {
  return (
    <section className={s.signUpBlock}>
      <div className={s.signUpGroup}>
        <Image
          src={WAVES_IMG}
          alt="Звуковая волна"
          className={s.signUpWavesImg}
        />
        <article className={s.signUpContent}>
          <p className={s.signUpText}>{SIGNUP_TEXT}</p>
          <a href="#services" className={`greenButton ${s.signUpButton}`}>
            {SIGNUP_BUTTON}
          </a>
        </article>
      </div>
      <Image src={STUDIO_IMG} alt="Студия" />
    </section>
  );
}
