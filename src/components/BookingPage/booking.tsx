"use client";

import {
  BOOKING_BUTTON,
  DATA_PLACEHOLDER,
  EMAIL_PLACEHOLDER,
  FORM_TITLE,
  MICROPHONE_IMG,
  NAME_PLACEHOLDER,
  PHONE_PLACEHOLDER,
  PRIVACY_POLICY_LINK,
  PRIVACY_POLICY_TITLE,
  REQUIRED_MARK,
  SURNAME_PLACEHOLDER,
  TIME_PLACEHOLDER,
} from "@/mocks/BookingPage/booking";
import s from "./booking.module.scss";
import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import Calendar from "./BookingPageCalendar/calendar";

export default function BookingForm() {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [showCalendar, setShowCalendar] = useState(false);
  const [calendarDate, setCalendarDate] = useState<Date | null>(null);
  const calendarRef = useRef<HTMLDivElement>(null);
  const dateInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node)
      ) {
        setShowCalendar(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDateSelect = (date: Date) => {
    const formattedDate = date.toLocaleDateString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    setSelectedDate(formattedDate);
    setCalendarDate(date);
    setShowCalendar(false);

    if (dateInputRef.current) {
      const isoDate = date.toISOString().split("T")[0];
      dateInputRef.current.value = isoDate;
    }
  };

  const toggleCalendar = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowCalendar(!showCalendar);
  };

  return (
    <section className={s.bookingBlock}>
      <div className={`container ${s.bookingGroup}`}>
        <form className={s.callbackForm}>
          <h1>{FORM_TITLE}</h1>
          <div className={s.formFieldsGroup}>
            <div className={s.formFields}>
              <div className={s.formField}>
                <div className={s.inputGroup}>
                  <div className={s.inputWrapper}>
                    <span className={s.requiredMark}>{REQUIRED_MARK}</span>
                    <input
                      type="text"
                      placeholder={NAME_PLACEHOLDER}
                      required
                    />
                  </div>
                  <div className={s.inputUnderline}></div>
                </div>
              </div>

              <div className={s.formField}>
                <div className={s.inputGroup}>
                  <div className={s.inputWrapper}>
                    <span className={s.requiredMark}>{REQUIRED_MARK}</span>
                    <input
                      type="text"
                      placeholder={SURNAME_PLACEHOLDER}
                      required
                    />
                  </div>
                  <div className={s.inputUnderline}></div>
                </div>
              </div>

              <div className={s.formField}>
                <div className={s.inputGroup}>
                  <div className={s.inputWrapper}>
                    <span className={s.requiredMark}>{REQUIRED_MARK}</span>
                    <input
                      type="tel"
                      placeholder={PHONE_PLACEHOLDER}
                      required
                    />
                  </div>
                  <div className={s.inputUnderline}></div>
                </div>
              </div>

              <div className={s.formField}>
                <div className={s.inputGroup}>
                  <div className={s.inputWrapper}>
                    <span className={s.requiredMark}>{REQUIRED_MARK}</span>
                    <input
                      type="email"
                      placeholder={EMAIL_PLACEHOLDER}
                      required
                    />
                  </div>
                  <div className={s.inputUnderline}></div>
                </div>
              </div>

              <div className={s.formField}>
                <div className={s.inputGroup}>
                  <div
                    className={`${s.inputWrapper} ${s.dataInput}`}
                    onClick={toggleCalendar}
                  >
                    <div>
                      <span className={s.requiredMark}>{REQUIRED_MARK}</span>
                      <input
                        ref={dateInputRef}
                        type="text"
                        onClick={toggleCalendar}
                        placeholder={DATA_PLACEHOLDER}
                        required
                        readOnly
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className={s.inputUnderline}></div>

                  {showCalendar && (
                    <div ref={calendarRef} className={s.calendarPopup}>
                      <Calendar
                        onDateSelect={handleDateSelect}
                        selectedDate={calendarDate}
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className={s.formField}>
                <div className={s.inputGroup}>
                  <div className={`${s.inputWrapper} ${s.timeInput}`}>
                    <div>
                      <span className={s.requiredMark}>{REQUIRED_MARK}</span>
                      <input
                        type="time"
                        placeholder={TIME_PLACEHOLDER}
                        required
                      />
                    </div>
                  </div>
                  <div className={s.inputUnderline}></div>
                </div>
              </div>
            </div>

            <div className={s.checkboxWrapper}>
              <input type="checkbox" required />
              <label>
                <span>
                  {PRIVACY_POLICY_TITLE}
                  <a href="заглушка" target="_blank">
                    {PRIVACY_POLICY_LINK}
                  </a>
                </span>
              </label>
            </div>
          </div>
          <button type="submit">{BOOKING_BUTTON}</button>
        </form>
        <Image src={MICROPHONE_IMG} alt="Микрофон" />
      </div>
    </section>
  );
}
