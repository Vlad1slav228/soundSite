"use client";

import { Fragment, useEffect, useMemo, useState } from "react";
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
  service_id: number;
  service_name: string;
  slots: string[];
};

type Booking = {
  id: number;
  service: {
    id: number;
    title: string;
    features: string;
    price: string;
    duration_min: number;
    is_active: boolean;
  };
  start_at: string;
  end_at: string;
  status: string;
  source: string;
  is_paid: boolean;
  paid_at: string | null;
  can_review: boolean;
  tracks: Array<{
    id: number;
    title: string;
    file: string;
    file_converted: string;
    uploaded: string;
  }>;
  reviews: Array<{
    id: number;
    booking_info: {
      id: number;
      service: string;
      start_at: string;
      end_at: string;
    };
    user: number;
    rating: number;
    text: string;
    reply: string;
    created: string;
  }>;
};

export default function AccountPage({
  profile,
  onLogout,
}: Readonly<{ profile: Profile; onLogout: () => void }>) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [now, setNow] = useState(() => new Date());
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [bookingsLoading, setBookingsLoading] = useState(false);
  const [bookingsError, setBookingsError] = useState("");

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

  // Функция для загрузки записей пользователя
  const fetchBookings = async () => {
    setBookingsLoading(true);
    setBookingsError("");
    try {
      const res = await fetchWithAuth("/api/v1/bookings/", {
        method: "GET",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Ошибка получения записей");
      const data = await res.json();
      setBookings(data.results || []);
    } catch (e: any) {
      setBookingsError(e.message || "Ошибка загрузки записей");
    } finally {
      setBookingsLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  useEffect(() => {
    if (isSidebarOpen && window.innerWidth < 1024) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isSidebarOpen]);

  const [selectedSlot, setSelectedSlot] = useState<{
    serviceId: number;
    time: string;
  } | null>(null);

  const handleSlotSelect = (serviceId: number, time: string) => {
    setSelectedSlot({ serviceId, time });
  };

  const handleCancelSelection = () => {
    setSelectedSlot(null);
  };

  const handleBookAppointment = async () => {
    if (!selectedSlot) return;

    try {
      const dateStr = selectedDay.toISOString().split("T")[0];
      const timeStr = selectedSlot.time.padEnd(5, ":00");

      // Проверка на прошедшую дату/время
      const selectedDateTime = new Date(`${dateStr}T${timeStr}`);
      if (selectedDateTime < now) {
        alert("Нельзя записаться на прошедшую дату или время");
        return;
      }

      const res = await fetchWithAuth("/api/v1/bookings/", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          service_id: selectedSlot.serviceId,
          start_at: `${dateStr}T${timeStr}`,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Ошибка при создании записи");
      }

      const newBooking = await res.json();
      setBookings((prev) => [newBooking, ...prev]);
      alert(`Запись на ${selectedSlot.time} подтверждена!`);
      setSelectedSlot(null);
    } catch (error: any) {
      alert(error.message || "Произошла ошибка при записи");
      console.error("Booking error:", error);
    }
  };

  const [selectedDay, setSelectedDay] = useState<Date>(now);
  const [startIndex, setStartIndex] = useState(0);
  const [direction, setDirection] = useState<"next" | "prev" | null>(null);
  const [visibleDaysCount, setVisibleDaysCount] = useState(7);

  const [services, setServices] = useState<Service[]>([]);
  const [serviceSlots, setServiceSlots] = useState<Record<number, Slot>>({});
  const [expandedService, setExpandedService] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError("");
      try {
        const res = await fetchWithAuth("/api/v1/services/", {
          method: "GET",
          credentials: "include",
        });
        if (!res.ok) throw new Error("Ошибка получения услуг");
        const data = await res.json();
        setServices(data.results || []);

        const slotsResponses = await Promise.all(
          (data.results || []).map(async (service: Service) => {
            const r = await fetchWithAuth(
              `/api/v1/slots/?date=${selectedDay
                .toISOString()
                .slice(0, 10)}&service=${service.id}`,
              { method: "GET", credentials: "include" }
            );
            if (!r.ok) return null;
            const slotData = await r.json();
            const slot = Array.isArray(slotData) ? slotData[0] : slotData;
            return { ...slot, service_id: service.id };
          })
        );

        const slotsMap: Record<number, Slot> = {};
        slotsResponses.forEach((slot) => {
          if (slot && Array.isArray(slot.slots)) {
            slotsMap[slot.service_id] = slot;
          }
        });
        setServiceSlots(slotsMap);
      } catch (e: any) {
        setError(e.message || "Ошибка");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [selectedDay]);

  useEffect(() => {
    const handleResize = () => {
      setVisibleDaysCount(window.innerWidth < 768 ? 4 : 7);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const days = useMemo(() => {
    return Array.from({ length: 365 }, (_, i) => {
      const d = new Date(now);
      d.setDate(now.getDate() + i);
      return d;
    });
  }, [now]);

  const daysWindow = useMemo(
    () => days.slice(startIndex, startIndex + visibleDaysCount),
    [days, startIndex, visibleDaysCount]
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

  const canPrev = startIndex > 0;
  const canNext = startIndex + visibleDaysCount < days.length;

  const goPrev = () => {
    if (!canPrev) return;
    setDirection("prev");
    setStartIndex((prev) => Math.max(0, prev - visibleDaysCount));
  };

  const goNext = () => {
    if (!canNext) return;
    setDirection("next");
    setStartIndex((prev) => prev + visibleDaysCount);
  };

  const resetSidebarState = () => {
    setExpandedService(null);
    setSelectedSlot(null);
  };

  // Функция для форматирования даты и времени
  const formatDateTime = (dateTimeString: string) => {
    const date = new Date(dateTimeString);
    return {
      date: date.toLocaleDateString("ru-RU", {
        day: "numeric",
        month: "long",
      }),
      time: date.toLocaleTimeString("ru-RU", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  };

  // Проверка, является ли день прошедшим
  const isPastDay = (day: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return day < today;
  };

  // Проверка, является ли временной слот прошедшим
  const isPastTimeSlot = (day: Date, time: string) => {
    const now = new Date();
    const [hours, minutes] = time.split(":").map(Number);
    const slotDate = new Date(day);
    slotDate.setHours(hours, minutes, 0, 0);
    return slotDate < now;
  };

  return (
    <section className={s.accountBlock}>
      <div
        className={`${s.sidebarOverlay} ${isSidebarOpen ? s.active : ""}`}
        onClick={() => {
          setIsSidebarOpen(false);
          resetSidebarState();
        }}
      />

      <div className={`container ${s.accountLayout}`}>
        <aside
          className={`${s.accountSidebar} ${
            isSidebarOpen ? s.sidebarOpen : ""
          }`}
        >
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
                <p className={s.monthLabel}>{monthLabel}</p>
                <button
                  onClick={goNext}
                  disabled={!canNext}
                  className={s.arrow}
                  aria-label="Следующая неделя"
                >
                  <Image src={ARROW_RIGHT} alt="Стрелка вправо" />
                </button>
              </div>
              <div className={s.calendarWrapperInner}>
                <div
                  className={`${s.calendarAnimated} ${
                    direction === "next"
                      ? s.slideInFromRight
                      : direction === "prev"
                      ? s.slideInFromLeft
                      : ""
                  }`}
                  onAnimationEnd={() => setDirection(null)}
                >
                  {daysWindow.map((d) => {
                    const isActive =
                      d.toDateString() === selectedDay.toDateString();
                    const isPast = isPastDay(d);

                    return (
                      <button
                        key={d.toISOString()}
                        className={`${s.calendarItem} ${
                          isActive ? s["calendarItem--active"] : ""
                        } ${isPast ? s.calendarItemPast : ""}`}
                        onClick={() => !isPast && setSelectedDay(d)}
                        disabled={isPast}
                      >
                        <p className={s.calendarItemDate}>
                          {d.getDate()}
                        </p>
                        <p className={s.calendarItemDay}>
                          {WEEKDAYS_DATA[d.getDay()]}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
            <ul className={s.bookings}>
              {error && <li className={s.errorText}>{error}</li>}
              {loading && <li className={s.bookingsItem}>Загрузка…</li>}

              {!loading &&
                !error &&
                services.length > 0 &&
                services.map((service) => {
                  const slot = serviceSlots[service.id];
                  const hasSlots =
                    slot && Array.isArray(slot.slots) && slot.slots.length > 0;

                  return (
                    <li
                      key={service.id}
                      className={`${s.bookingsItem} ${
                        !hasSlots ? s.disabledService : ""
                      } ${expandedService === service.id ? s.expanded : ""}`}
                    >
                      <button
                        className={s.bookingsTitle}
                        disabled={!hasSlots}
                        onClick={() =>
                          hasSlots &&
                          setExpandedService(
                            expandedService === service.id ? null : service.id
                          )
                        }
                      >
                        {service.title}
                      </button>
                      {hasSlots && expandedService === service.id && (
                        <div className={s.slotsList}>
                          <div className={s.slotsTimeGroup}>
                            <h4 className={s.slotsTimeGroupTitle}>Утро</h4>
                            <div className={s.slotsTimeGroupItems}>
                              {slot.slots
                                .filter((time) => {
                                  const hours = parseInt(time.split(":")[0]);
                                  return hours >= 9 && hours < 12;
                                })
                                .map((time: string, i: number) => {
                                  const isPast = isPastTimeSlot(
                                    selectedDay,
                                    time
                                  );
                                  return (
                                    <button
                                      key={i}
                                      className={`${s.slotItem} ${
                                        selectedSlot?.serviceId ===
                                          service.id &&
                                        selectedSlot?.time === time
                                          ? s.slotItemActive
                                          : ""
                                      } ${isPast ? s.slotItemPast : ""}`}
                                      onClick={() =>
                                        !isPast &&
                                        handleSlotSelect(service.id, time)
                                      }
                                      disabled={isPast}
                                    >
                                      {time}
                                    </button>
                                  );
                                })}
                            </div>
                          </div>

                          <div className={s.slotsTimeGroup}>
                            <h4 className={s.slotsTimeGroupTitle}>День</h4>
                            <div className={s.slotsTimeGroupItems}>
                              {slot.slots
                                .filter((time) => {
                                  const hours = parseInt(time.split(":")[0]);
                                  return hours >= 12 && hours < 18;
                                })
                                .map((time: string, i: number) => {
                                  const isPast = isPastTimeSlot(
                                    selectedDay,
                                    time
                                  );
                                  return (
                                    <button
                                      key={i}
                                      className={`${s.slotItem} ${
                                        selectedSlot?.serviceId ===
                                          service.id &&
                                        selectedSlot?.time === time
                                          ? s.slotItemActive
                                          : ""
                                      } ${isPast ? s.slotItemPast : ""}`}
                                      onClick={() =>
                                        !isPast &&
                                        handleSlotSelect(service.id, time)
                                      }
                                      disabled={isPast}
                                    >
                                      {time}
                                    </button>
                                  );
                                })}
                            </div>
                          </div>

                          {slot.slots.some((time) => {
                            const hours = parseInt(time.split(":")[0]);
                            return hours >= 18;
                          }) && (
                            <div className={s.slotsTimeGroup}>
                              <h4 className={s.slotsTimeGroupTitle}>Вечер</h4>
                              <div className={s.slotsTimeGroupItems}>
                                {slot.slots
                                  .filter((time) => {
                                    const hours = parseInt(time.split(":")[0]);
                                    return hours >= 18;
                                  })
                                  .map((time: string, i: number) => {
                                    const isPast = isPastTimeSlot(
                                      selectedDay,
                                      time
                                    );
                                    return (
                                      <button
                                        key={i}
                                        className={`${s.slotItem} ${
                                          selectedSlot?.serviceId ===
                                            service.id &&
                                          selectedSlot?.time === time
                                            ? s.slotItemActive
                                            : ""
                                        } ${isPast ? s.slotItemPast : ""}`}
                                        onClick={() =>
                                          !isPast &&
                                          handleSlotSelect(service.id, time)
                                        }
                                        disabled={isPast}
                                      >
                                        {time}
                                      </button>
                                    );
                                  })}
                              </div>
                            </div>
                          )}

                          {selectedSlot?.serviceId === service.id && (
                            <div className={s.slotActions}>
                              <button
                                className={`greenButton ${s.bookButton}`}
                                onClick={handleBookAppointment}
                              >
                                Записаться
                              </button>
                              <button
                                className={`greenButton ${s.cancelButton}`}
                                onClick={handleCancelSelection}
                              >
                                Отмена
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </li>
                  );
                })}
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
            <div className={s.headerGroup}>
              <button
                className={s.sidebarToggle}
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              >
                <Image src={ARROW_LEFT} alt="Меню" />
              </button>
              <h1 className={s.applicationTitle}>{APPLICATION_TITLE}</h1>
            </div>
            <div className={s.applicationFilters}>
              <button className={s.tab}>{ALL_APPLICATION_BUTTON}</button>
              <button className={s.tab}>{ACTIVE_APPLICATION_BUTTON}</button>
              <button className={s.tab}>{CANCEL_APPLICATION_BUTTON}</button>
            </div>
          </header>
          <div className={s.serviceCardWrapper}>
            {bookingsLoading && <p>Загрузка записей...</p>}
            {bookingsError && <p className={s.errorText}>{bookingsError}</p>}

            {!bookingsLoading && !bookingsError && bookings.length === 0 && (
              <p className={s.lackOfBookingsText}>У вас пока нет записей</p>
            )}

            {!bookingsLoading &&
              bookings.map((booking) => {
                const { date, time } = formatDateTime(booking.start_at);
                const bookingDate = new Date(booking.start_at);
                const isPast = bookingDate < now;
                const duration = booking.service.duration_min;

                return (
                  <Fragment key={booking.id}>
                    <article
                      className={`${s.serviceCard} ${
                        isPast ? s.pastBooking : ""
                      }`}
                    >
                      <div className={s.serviceCardContent}>
                        <h2 className={s.serviceCardTitle}>
                          {booking.service.title}
                        </h2>
                        <div className={s.bookingDetails}>
                          <p className={s.bookingDetail}>{date}</p>
                          <p className={s.bookingDetail}>{time}</p>
                          <p className={s.bookingDetail}>{duration} мин.</p>
                        </div>
                        {booking.service.features &&
                          Array.isArray(booking.service.features) && (
                            <ul className={s.serviceCardList}>
                              {booking.service.features.map(
                                (feature, index) => (
                                  <li
                                    key={index}
                                    className={s.servicesCardListItem}
                                  >
                                    {feature}
                                  </li>
                                )
                              )}
                            </ul>
                          )}
                      </div>
                      <div className={s.serviceCardFooter}>
                        <p className={s.serviceCardPrice}>
                          {booking.service.price} ₽
                        </p>
                        {isPast && booking.can_review && (
                          <button className={s.reviewButton}>
                            Оставить отзыв
                          </button>
                        )}
                        {isPast && !booking.can_review && (
                          <button
                            className={s.reviewButton}
                            disabled
                          >
                            Отзыв оставлен
                          </button>
                        )}
                      </div>
                    </article>
                    <div className={s.string} aria-hidden="true"></div>
                  </Fragment>
                );
              })}
          </div>
        </section>
      </div>
    </section>
  );
}
