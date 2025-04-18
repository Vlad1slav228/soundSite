import { SERVICES_DATA } from "@/mocks/MainPage/services";
import s from "./services.module.scss";
import ServiceCard from "./ServicesCard/servicesCard";

export default function ServicesMain() {
  return (
    <section className={s.servicesBlock}>
      <div className={s.container}>
        <div className={s.servicesCardBlock}>
        {SERVICES_DATA.map((service, index) => (
          <ServiceCard key={index} service={service} />
        ))}
        </div>
      </div>
    </section>
  );
}
