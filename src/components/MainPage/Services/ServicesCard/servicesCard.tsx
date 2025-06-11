import s from "./servicesCard.module.scss";
import Link from "next/link";

export type ServiceProps = Readonly<{
  service: {
    slug: string;
    title: string;
    list: readonly string[];
    price: string;
    button: string;
  };
}>;

export default function ServiceCard({ service }: ServiceProps) {
  return (
    <article className={s.servicesCard}>
      <div className={s.wrapper}>
        <h3 className={s.servicesCardTitle}>{service.title}</h3>
      <ul className={s.servicesCardList}>
        {service.list.map((item, index) => (
          <li key={index} className={s.servicesCardListItem}>
            {item}
          </li>
        ))}
      </ul>
      </div>
      
      <div className={s.servicesCardFooter}>
        <span className={s.servicesCardPrice}>{service.price}</span>
        <Link href={`/services/${service.slug}`} className="greenButton">
          {service.button}
        </Link>
      </div>
    </article>
  );
}
