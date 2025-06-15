"use client";

import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { fetchWithAuth } from "@/lib/fetchWithAuth";
import {
  ACCOUNT_ICON,
  ACTIVE_APPLICATION_BUTTON,
  ALL_APPLICATION_BUTTON,
  APPLICATION_TITLE,
  ARROW_LEFT,
  ARROW_RIGHT,
  CANCEL_APPLICATION_BUTTON,
  LOGOUT_BUTTON,
  SERVICES_DATA,
  WEEKDAYS_DATA,
} from "@/mocks/AccountPage/account";
import s from "./account.module.scss";
import Image from "next/image";

export type Profile = {
  first_name: string;
  last_name: string;
  email: string;
};

type Service = {
  id: number;
  title: string;
  duration_min: number;
};

type Slot = {
  start: string;
  service: number;
};

export default function AccountPage({
  profile,
  onLogout,
}: Readonly<{ profile: Profile; onLogout: () => void }>) {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1_000);
    return () => clearInterval(id);
  }, []);

  const time = now.toLocaleTimeString("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const date = now.toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
  });

  const [services, setServices] = useState<Service[]>([]);
  const [servicesErr, setServicesErr] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await fetchWithAuth("/api/v1/services/", {
          method: "GET",
          credentials: "include",
        });
        if (!res.ok) throw new Error(`Ошибка: ${res.status}`);

        const data = await res.json();
        setServices(data.results ?? []);
      } catch (e: any) {
        setServicesErr(e.message ?? "Не удалось получить услуги");
      }
    })();
  }, []);

  const [selectedDay, setSelectedDay] = useState<Date>(now);
  const [startIndex, setStartIndex] = useState(0);

  const days = useMemo(() => {
    return Array.from({ length: 365 }, (_, i) => {
      const d = new Date(now);
      d.setDate(now.getDate() + i);
      return d;
    });
  }, [now]);

  const daysWindow = useMemo(
    () => days.slice(startIndex, startIndex + 7),
    [days, startIndex]
  );

  const capitalize = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1);

  const monthLabel = daysWindow.length
    ? capitalize(
        daysWindow[0].toLocaleDateString("ru-RU", {
          month: "long",
          year: "numeric",
        })
      )
    : "";

  const scrollRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const onMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    startX.current = e.pageX - (scrollRef.current?.offsetLeft ?? 0);
    scrollLeft.current = scrollRef.current!.scrollLeft;
  };

  const onMouseLeave = () => {
    isDragging.current = false;
  };
  const onMouseUp = () => {
    isDragging.current = false;
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - (scrollRef.current?.offsetLeft ?? 0);
    const walk = (x - startX.current) * 1;
    scrollRef.current!.scrollLeft = scrollLeft.current - walk;
  };

  const canPrev = startIndex > 0;
  const canNext = startIndex + 7 < days.length;
  const goPrev = () => canPrev && setStartIndex(startIndex - 7);
  const goNext = () => canNext && setStartIndex(startIndex + 7);

  // const week = useMemo(() => {
  //   const base = new Date(selectedDay);
  //   base.setHours(0, 0, 0, 0);
  //   const monday = new Date(base);
  //   const diff = (base.getDay() + 6) % 7;
  //   monday.setDate(monday.getDate() - diff);

  //   return Array.from({ length: 7 }, (_, i) => {
  //     const d = new Date(monday);
  //     d.setDate(monday.getDate() + i);
  //     return d;
  //   });
  // }, [selectedDay]);

  return (
    <section className={s.accountBlock}>
      <div className={`container ${s.accountLayout}`}>
        <aside className={s.accountSidebar}>
          <div className={s.accountSidebarInner}>
            <header className={s.accountHeader}>
              <div className={s.accountProfile}>
                <Image src={ACCOUNT_ICON} alt="Иконка профиля" />
                <div className={s.accountProfileInfo}>
                  <p className={s.accountFirstName}>{profile.first_name}</p>
                  <p className={s.accountEmail}>{profile.email}</p>
                </div>
              </div>
              <div className={s.accountTimestamp}>
                <p className={s.time}>{time}</p>
                <p className={s.date}>{date}</p>
              </div>
            </header>

            <div className={s.calendarWrapper}>
              <div className={s.calendarHeader}>
                <button
                  onClick={goPrev}
                  disabled={!canPrev}
                  className={s.arrow}
                  aria-label="Предыдущая неделя"
                >
                  <Image src={ARROW_LEFT} alt="Стрелка влево" />
                </button>
                <span className={s.monthLabel}>{monthLabel}</span>
                <button
                  onClick={goNext}
                  disabled={!canNext}
                  className={s.arrow}
                  aria-label="Следующая неделя"
                >
                  <Image src={ARROW_RIGHT} alt="Стрелка вправо" />
                </button>
              </div>
              <div
                className={s.calendar}
                ref={scrollRef}
                onMouseDown={onMouseDown}
                onMouseUp={onMouseUp}
                onMouseLeave={onMouseLeave}
                onMouseMove={onMouseMove}
              >
                {daysWindow.map((d) => {
                  const isActive =
                    d.toDateString() === selectedDay.toDateString();

                  return (
                    <button
                      key={d.toISOString()}
                      className={`${s.calendarItem} ${
                        isActive ? s["calendarItem--active"] : ""
                      }`}
                      onClick={() => setSelectedDay(d)}
                    >
                      <span className={s.calendarItemDate}>{d.getDate()}</span>
                      <span className={s.calendarItemDay}>
                        {WEEKDAYS_DATA[d.getDay()]}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
            <ul className={s.bookings}>
              {servicesErr && <li className={s.errorText}>{servicesErr}</li>}

              {services.map((srv) => (
                <li key={srv.id} className={s.bookingsItem}>
                  <p className={s.bookingsTitle}>{srv.title}</p>
                </li>
              ))}

              {!servicesErr && services.length === 0 && (
                <li className={s.bookingsItem}>Загрузка…</li>
              )}
            </ul>
          </div>
          <button
            className={`greenButton ${s.logoutButton}`}
            onClick={onLogout}
          >
            {LOGOUT_BUTTON}
          </button>
        </aside>
        <section className={s.applicationMain}>
          <header className={s.applicationHeader}>
            <h1 className={s.applicationTitle}>{APPLICATION_TITLE}</h1>
            <div className={s.applicationFilters}>
              <button className={s.tab}>{ALL_APPLICATION_BUTTON}</button>
              <button className={s.tab}>{ACTIVE_APPLICATION_BUTTON}</button>
              <button className={s.tab}>{CANCEL_APPLICATION_BUTTON}</button>
            </div>
          </header>
          <div className={s.serviceCardWrapper}>
            {SERVICES_DATA.map((service, index) => (
              <Fragment key={index}>
                <article className={s.serviceCard}>
                  <div className={s.serviceCardContent}>
                    <h2 className={s.serviceCardTitle}>{service.title}</h2>
                    <ul className={s.serviceCardList}>
                      {service.list.map((item, i) => (
                        <li key={i} className={s.servicesCardListItem}>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className={s.serviceCardFooter}>
                    <span className={s.serviceCardPrice}>{service.price}</span>
                    <button className={s.reviewButton}>{service.button}</button>
                  </div>
                </article>
                <div className={s.string} aria-hidden="true"></div>
              </Fragment>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
