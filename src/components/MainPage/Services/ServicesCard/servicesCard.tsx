import s from "./servicesCard.module.scss";

export type ServiceProps = Readonly<{
  service: {
    title: string;
    list: readonly string[];
    price: string;
    button: string;
  };
}>;

export default function ServiceCard({ service }: ServiceProps) {
  return (
    <article className={s.servicesCard}>
      <h3 className={s.servicesCardTitle}>{service.title}</h3>
      <ul className={s.servicesCardList}>
        {service.list.map((item, index) => (
          <li key={index} className={s.servicesCardListItem}>
            {item}
          </li>
        ))}
      </ul>
      <div className={s.servicesCardFooter}>
        <span className={s.servicesCardPrice}>{service.price}</span>
        <a href="заглушка" className={s.servicesCardButton}>
          {service.button}
        </a>
      </div>
    </article>
  );
}
