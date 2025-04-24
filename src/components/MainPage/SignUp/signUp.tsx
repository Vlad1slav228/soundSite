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
        <div className={s.container}>
          <Image src={WAVES_IMG} alt="Звуковая волна" />
          <article className={s.signUpContent}>
          <p className={s.signUpText}>{SIGNUP_TEXT}</p>
          <a href="заглушка" className={s.signUpButton}>
            {SIGNUP_BUTTON}
          </a>
          </article>
        </div>
      <Image src={STUDIO_IMG} alt="Студия" />
    </section>
  );
}
