import s from "./intro.module.scss";
import Image from "next/image";
import Link from "next/link";
import { APPLY_BUTTON, STUDIO_IMG } from "@/mocks/services";

interface ServiceProps {
  service: {
    slug: string;
    title: string;
    list: string[];
    price: string;
    button: string;
  };
}

export default function IntroService({ service }: ServiceProps) {
  return (
    <section className={s.introBlock}>
      <div className={`container ${s.introContent}`}>
        <nav className={s.breadcrumbs} aria-label="breadcrumb">
          <ul>
            <li>
              <Link href="/">Главная</Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/#services">Услуги</Link>
            </li>
            <li>/</li>
            <li className={s.active}>{service.title}</li>
          </ul>
        </nav>
        <h1 className={s.introServiceTitle}>{service.title}</h1>
        <ul className={s.introServiceList}>
          {service.list.map((item, index) => (
            <li key={index} className={s.introServiceListItem}>
              {item}
            </li>
          ))}
        </ul>
        <div className={s.introServiceFooter}>
          <p className={s.introServicePrice}>{service.price}</p>
          <Link 
            href={`/bookings/${service.slug}`} 
            className={`greenButton ${s.greenButton}`}
          >
            {APPLY_BUTTON}
          </Link>
        </div>
      </div>
      <Image src={STUDIO_IMG} alt="Студия звукозаписи"/>
    </section>
  );
}
