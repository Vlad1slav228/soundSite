import Link from "next/link";
import s from "./notFound.module.scss";

export default function NotFound() {
  return (
    <section className={s.notFound}>
      <div className="container">
        {/* Забавная SVG-иллюстрация */}
        <div className={s.illustration}>
          <svg width="140" height="140" viewBox="0 0 140 140">
            <circle cx="70" cy="70" r="70" fill="#CEE86B" />
            <ellipse cx="95" cy="55" rx="11" ry="14" fill="#fff"/>
            <ellipse cx="45" cy="55" rx="11" ry="14" fill="#fff"/>
            <circle cx="45" cy="60" r="4" fill="#000"/>
            <circle cx="95" cy="60" r="4" fill="#000"/>
            <ellipse cx="70" cy="90" rx="18" ry="7" fill="#fff"/>
            <ellipse cx="70" cy="90" rx="12" ry="4" fill="#000"/>
          </svg>
        </div>
        <h1 className={s.title}>404 — Ой, что-то пошло не так!</h1>
        <p className={s.text}>
          Кажется, эта страница ушла записывать альбом.<br />
          <span className={s.emotion}>¯\_(ツ)_/¯</span>
          <br />
          Попробуйте вернуться назад или на главную.
        </p>
        <Link href="/" className={s.link}>
          <span>Вернуться домой</span>
        </Link>
      </div>
    </section>
  );
}