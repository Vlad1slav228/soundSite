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
import { API_BASE_URL } from "@/lib/config";
import React, { useState, useRef, useEffect } from "react";
import Calendar from "./BookingPageCalendar/calendar";
import { useSearchParams } from "next/navigation";

const TIME_SLOTS = [
  "09:00 - 10:00",
  "10:00 - 11:00",
  "11:00 - 12:00",
  "12:00 - 13:00",
  "13:00 - 14:00",
  "14:00 - 15:00",
  "15:00 - 16:00",
  "16:00 - 17:00",
  "17:00 - 18:00",
];

type FormData = {
  name: string;
  surname: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  agreed: boolean;
};

type FormErrors = {
  name: boolean;
  surname: boolean;
  phone: boolean;
  email: boolean;
  date: boolean;
  time: boolean;
  agreed: boolean;
};

type TouchedFields = {
  name: boolean;
  surname: boolean;
  phone: boolean;
  email: boolean;
  date: boolean;
  time: boolean;
};

export default function BookingForm() {
  const searchParams = useSearchParams();
  const serviceId = searchParams.get("serviceId");
  const [formData, setFormData] = useState<FormData>({
    name: "",
    surname: "",
    phone: "",
    email: "",
    date: "",
    time: "",
    agreed: false,
  });

  const [errors, setErrors] = useState<FormErrors>({
    name: false,
    surname: false,
    phone: false,
    email: false,
    date: false,
    time: false,
    agreed: false,
  });

  const [touched, setTouched] = useState<TouchedFields>({
    name: false,
    surname: false,
    phone: false,
    email: false,
    date: false,
    time: false,
  });

  const [showCalendar, setShowCalendar] = useState(false);
  const [showTimeDropdown, setShowTimeDropdown] = useState(false);
  const [calendarDate, setCalendarDate] = useState<Date | null>(null);
  const calendarRef = useRef<HTMLDivElement>(null);
  const timeDropdownRef = useRef<HTMLDivElement>(null);
  const dateInputRef = useRef<HTMLInputElement>(null);
  const phoneInputRef = useRef<HTMLInputElement>(null);
  const [lastPhoneCursor, setLastPhoneCursor] = useState(0);
  const [lastPhoneValue, setLastPhoneValue] = useState("");
  const [isBackspace, setIsBackspace] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node) &&
        !document.getElementById("dateInput")?.contains(event.target as Node)
      ) {
        setShowCalendar(false);
      }

      if (
        timeDropdownRef.current &&
        !timeDropdownRef.current.contains(event.target as Node) &&
        !document.getElementById("timeInput")?.contains(event.target as Node)
      ) {
        setShowTimeDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handlePhoneKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    setLastPhoneCursor(e.currentTarget.selectionStart || 0);
    setLastPhoneValue(e.currentTarget.value);
    setIsBackspace(e.key === "Backspace");
  };

  const formatPhone = (value: string): string => {
    let rawNumbers = value.replace(/\D/g, "");

    if (rawNumbers.startsWith("8")) {
      rawNumbers = "7" + rawNumbers.slice(1);
    } else if (!rawNumbers.startsWith("7")) {
      rawNumbers = "7" + rawNumbers;
    }

    rawNumbers = rawNumbers.slice(0, 11);

    let formatted = "+7";
    if (rawNumbers.length > 1) formatted += "(" + rawNumbers.slice(1, 4);
    if (rawNumbers.length >= 4) formatted += ")";
    if (rawNumbers.length > 4) formatted += "-" + rawNumbers.slice(4, 7);
    if (rawNumbers.length > 7) formatted += "-" + rawNumbers.slice(7, 9);
    if (rawNumbers.length > 9) formatted += "-" + rawNumbers.slice(9, 11);

    return formatted;
  };

  const countDigitsBeforeCursor = (value: string, cursor: number): number => {
    return value
      .substring(0, cursor)
      .split("")
      .filter((char) => /\d/.test(char)).length;
  };

  const findCursorPositionFromDigits = (
    formatted: string,
    digitIndex: number
  ): number => {
    let count = 0;
    for (let i = 0; i < formatted.length; i++) {
      if (/\d/.test(formatted[i])) {
        count++;
        if (count === digitIndex + 1) return i + 1;
      }
    }
    return formatted.length;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    setFormData((prev) => ({ ...prev, phone: formatted }));

    const digitsBeforeCursor = countDigitsBeforeCursor(
      lastPhoneValue,
      lastPhoneCursor
    );
    const newCursor = findCursorPositionFromDigits(
      formatted,
      digitsBeforeCursor - (isBackspace ? 1 : 0)
    );

    setTimeout(() => {
      if (phoneInputRef.current) {
        phoneInputRef.current.setSelectionRange(newCursor, newCursor);
      }
    }, 0);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    if (name === "phone") {
      handlePhoneChange(e);
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (touched[name as keyof TouchedFields]) {
      validateField(
        name as keyof FormData,
        type === "checkbox" ? checked : value
      );
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    validateField(name as keyof FormData, formData[name as keyof FormData]);
  };

  const validateField = (name: keyof FormData, value: string | boolean) => {
    let isValid = true;

    switch (name) {
      case "name":
      case "surname":
        isValid = typeof value === "string" && value.trim().length >= 2;
        break;
      case "phone":
        const normalized = value.toString().replace(/\D/g, "");
        isValid = normalized.length === 11 && normalized.startsWith("7");
        break;
      case "email":
        isValid =
          typeof value === "string" &&
          value.trim() !== "" &&
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        break;
      case "date":
        isValid = typeof value === "string" && value.trim().length > 0;
        break;
      case "time":
        isValid = typeof value === "string" && value.trim().length > 0;
        break;
      case "agreed":
        isValid = value === true;
        break;
      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: !isValid }));
  };

  const handleDateSelect = (date: Date) => {
    const formattedDate = date.toLocaleDateString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    setFormData((prev) => ({ ...prev, date: formattedDate }));
    setCalendarDate(date);
    setShowCalendar(false);

    if (dateInputRef.current) {
      dateInputRef.current.value = date.toISOString().split("T")[0];
    }

    validateField("date", formattedDate);
  };

  const handleTimeSelect = (time: string) => {
    setFormData((prev) => ({ ...prev, time }));
    setShowTimeDropdown(false);
    validateField("time", time);
  };

  const toggleCalendar = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowCalendar(!showCalendar);
    setShowTimeDropdown(false);
    setTouched((prev) => ({ ...prev, date: true }));
  };

  const toggleTimeDropdown = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowTimeDropdown(!showTimeDropdown);
    setShowCalendar(false);
    setTouched((prev) => ({ ...prev, time: true }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const allTouched: TouchedFields = {
      name: true,
      surname: true,
      phone: true,
      email: true,
      date: true,
      time: true,
    };
    setTouched(allTouched);

    (Object.keys(formData) as Array<keyof FormData>).forEach((key) => {
      validateField(key, formData[key]);
    });

    const hasErrors = Object.values(errors).some((error) => error);
    if (!hasErrors && serviceId) {
      try {
        const [day, month, year] = formData.date.split(".");
        const dateTime = `${year}-${month}-${day}T${
          formData.time.split(" - ")[0]
        }:00`;

        const response = await fetch(`${API_BASE_URL}/api/v1/services?id=${serviceId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            first_name: formData.name,
            last_name: formData.surname,
            phone: formData.phone.replace(/\D/g, "").substring(1), // Убираем +7
            service_id: parseInt(serviceId),
            start_at: dateTime,
          }),
        });

        if (!response.ok) {
          throw new Error("Ошибка при отправке формы");
        }

        const data = await response.json();
        console.log("Успешно отправлено:", data);
      } catch (error) {
        console.error("Ошибка:", error);
      }
    }
  };

  return (
    <section className={s.bookingBlock}>
      <div className={`container ${s.bookingGroup}`}>
        <form className={s.callbackForm} onSubmit={handleSubmit}>
          <input type="hidden" name="service_id" value={serviceId || ""} />
          <h1>{FORM_TITLE}</h1>
          <div className={s.formFieldsGroup}>
            <div className={s.formFields}>
              <div className={s.formField}>
                <div className={s.inputGroup}>
                  <div className={s.inputWrapper}>
                    <span className={s.requiredMark}>{REQUIRED_MARK}</span>
                    <input
                      type="text"
                      name="name"
                      placeholder={NAME_PLACEHOLDER}
                      value={formData.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                    />
                  </div>
                  <div
                    className={`${s.inputUnderline} ${
                      touched.name && errors.name ? s.errorUnderline : ""
                    }`}
                  ></div>
                </div>
                {touched.name && errors.name && (
                  <p className={s.errorText}>Введите корректное имя</p>
                )}
              </div>

              <div className={s.formField}>
                <div className={s.inputGroup}>
                  <div className={s.inputWrapper}>
                    <span className={s.requiredMark}>{REQUIRED_MARK}</span>
                    <input
                      type="text"
                      name="surname"
                      placeholder={SURNAME_PLACEHOLDER}
                      value={formData.surname}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                    />
                  </div>
                  <div
                    className={`${s.inputUnderline} ${
                      touched.surname && errors.surname ? s.errorUnderline : ""
                    }`}
                  ></div>
                </div>
                {touched.surname && errors.surname && (
                  <p className={s.errorText}>Введите корректную фамилию</p>
                )}
              </div>

              <div className={s.formField}>
                <div className={s.inputGroup}>
                  <div className={s.inputWrapper}>
                    <span className={s.requiredMark}>{REQUIRED_MARK}</span>
                    <input
                      ref={phoneInputRef}
                      type="tel"
                      name="phone"
                      placeholder={PHONE_PLACEHOLDER}
                      value={formData.phone}
                      onChange={handleChange}
                      onKeyDown={handlePhoneKeyDown}
                      onBlur={handleBlur}
                      required
                    />
                  </div>
                  <div
                    className={`${s.inputUnderline} ${
                      touched.phone && errors.phone ? s.errorUnderline : ""
                    }`}
                  ></div>
                </div>
                {touched.phone && errors.phone && (
                  <p className={s.errorText}>
                    Введите корректный номер телефона
                  </p>
                )}
              </div>

              <div className={s.formField}>
                <div className={s.inputGroup}>
                  <div className={s.inputWrapper}>
                    <span className={s.requiredMark}>{REQUIRED_MARK}</span>
                    <input
                      type="email"
                      name="email"
                      placeholder={EMAIL_PLACEHOLDER}
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                    />
                  </div>
                  <div
                    className={`${s.inputUnderline} ${
                      touched.email && errors.email ? s.errorUnderline : ""
                    }`}
                  ></div>
                </div>
                {touched.email && errors.email && (
                  <p className={s.errorText}>
                    Введите корректный email (пример: example@mail.com)
                  </p>
                )}
              </div>

              <div className={s.formField}>
                <div className={s.inputGroup}>
                  <div
                    className={`${s.inputWrapper} ${s.dataInput}`}
                    onClick={toggleCalendar}
                    id="dateInput"
                  >
                    <span className={s.requiredMark}>{REQUIRED_MARK}</span>
                    <input
                      ref={dateInputRef}
                      type="text"
                      name="date"
                      onClick={toggleCalendar}
                      placeholder={DATA_PLACEHOLDER}
                      value={formData.date}
                      readOnly
                      required
                    />
                  </div>
                  <div
                    className={`${s.inputUnderline} ${
                      touched.date && errors.date ? s.errorUnderline : ""
                    }`}
                  ></div>
                  {showCalendar && (
                    <div ref={calendarRef} className={s.calendarPopup}>
                      <Calendar
                        onDateSelect={handleDateSelect}
                        selectedDate={calendarDate}
                      />
                    </div>
                  )}
                </div>
                {touched.date && errors.date && (
                  <p className={s.errorText}>Выберите дату</p>
                )}
              </div>

              <div className={s.formField}>
                <div className={s.inputGroup}>
                  <div
                    className={`${s.inputWrapper} ${s.timeInput}`}
                    onClick={toggleTimeDropdown}
                    id="timeInput"
                  >
                    <span className={s.requiredMark}>{REQUIRED_MARK}</span>
                    <input
                      type="text"
                      name="time"
                      placeholder={TIME_PLACEHOLDER}
                      value={formData.time}
                      readOnly
                      required
                    />
                  </div>
                  <div
                    className={`${s.inputUnderline} ${
                      touched.time && errors.time ? s.errorUnderline : ""
                    }`}
                  ></div>
                  {showTimeDropdown && (
                    <div ref={timeDropdownRef} className={s.timeDropdown}>
                      {TIME_SLOTS.map((time, index) => (
                        <div
                          key={index}
                          className={s.timeOption}
                          onClick={() => handleTimeSelect(time)}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.backgroundColor = "#F0F8D3")
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.backgroundColor =
                              "transparent")
                          }
                          onMouseDown={(e) =>
                            (e.currentTarget.style.backgroundColor = "#CEE86B")
                          }
                          onMouseUp={(e) =>
                            (e.currentTarget.style.backgroundColor = "#F0F8D3")
                          }
                        >
                          {time}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {touched.time && errors.time && (
                  <p className={s.errorText}>Выберите время</p>
                )}
              </div>
            </div>

            <div className={s.checkboxWrapper}>
              <input
                type="checkbox"
                name="agreed"
                checked={formData.agreed}
                onChange={handleChange}
                required
              />
              <label>
                <span>
                  {PRIVACY_POLICY_TITLE}
                  <a href="заглушка" target="_blank">
                    {PRIVACY_POLICY_LINK}
                  </a>
                </span>
              </label>
              {errors.agreed && (
                <p className={s.errorText}>Необходимо ваше согласие</p>
              )}
            </div>
          </div>
          <button type="submit" className={`greenButton ${s.submitButton}`}>
            {BOOKING_BUTTON}
          </button>
        </form>
        <Image src={MICROPHONE_IMG} alt="Микрофон" className="microImg" />
      </div>
    </section>
  );
}
