import { SERVICES_DATA } from "@/mocks/services";
import s from "./services.module.scss";
import ServiceCard from "./ServicesCard/servicesCard";
import { Fragment } from "react";

export default function ServicesMain() {
  return (
    <section className={s.servicesBlock} id="services">
      <div className={s.container}>
        <div className={s.servicesCardBlock}>
          {SERVICES_DATA.map((service, index) => (
            <Fragment key={index}>
              <ServiceCard service={service} />
              {index !== SERVICES_DATA.length - 1 && (
                <div className={s.string} aria-hidden="true"></div>
              )}
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
