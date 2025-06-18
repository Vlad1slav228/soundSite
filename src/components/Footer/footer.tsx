"use client";

import { useState, useRef } from "react";
import {
  ABOUT_TITLE,
  CONTACTS_TITLE,
  DZEN_ICON,
  EMAIL_PLACEHOLDER,
  EXAMPLES_TITLE,
  FOOTER_LOGO,
  FORM_TITLE,
  MANAGER_PHONE,
  MANAGER_PHONE_TITLE,
  NAME_PLACEHOLDER,
  OK_ICON,
  PHONE_PLACEHOLDER,
  PRIVACY_POLICY_LINK,
  PRIVACY_POLICY_TITLE,
  REQUIRED_MARK,
  REVIEWS_TITLE,
  SERVICES_TITLE,
  STUDIO_PHONE,
  STUDIO_PHONE_TITLE,
  SUBMIT_BUTTON,
  SURNAME_PLACEHOLDER,
  TG_ICON,
  VK_ICON,
  YT_ICON,
} from "@/mocks/footer";
import s from "./footer.module.scss";
import Image from "next/image";
import Link from "next/link";

type FormData = {
  name: string;
  surname: string;
  phone: string;
  email: string;
  agreed: boolean;
};

type FormErrors = {
  name: boolean;
  surname: boolean;
  phone: boolean;
  email: boolean;
  agreed: boolean;
};

type TouchedFields = {
  name: boolean;
  surname: boolean;
  phone: boolean;
  email: boolean;
};

export default function Footer() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    surname: "",
    phone: "",
    email: "",
    agreed: false,
  });

  const [errors, setErrors] = useState<FormErrors>({
    name: false,
    surname: false,
    phone: false,
    email: false,
    agreed: false,
  });

  const [touched, setTouched] = useState<TouchedFields>({
    name: false,
    surname: false,
    phone: false,
    email: false,
  });

  const phoneInputRef = useRef<HTMLInputElement>(null);
  const [lastPhoneCursor, setLastPhoneCursor] = useState(0);
  const [lastPhoneValue, setLastPhoneValue] = useState("");
  const [isBackspace, setIsBackspace] = useState(false);

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
      case "agreed":
        isValid = value === true;
        break;
      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: !isValid }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const allTouched: TouchedFields = {
      name: true,
      surname: true,
      phone: true,
      email: true,
    };
    setTouched(allTouched);

    (Object.keys(formData) as Array<keyof FormData>).forEach((key) => {
      validateField(key, formData[key]);
    });

    const hasErrors = Object.values(errors).some((error) => error);
    if (!hasErrors) {
      console.log("Форма отправлена:", formData);
    }
  };

  return (
    <footer className={s.footer}>
      <section className={s.footerMainSection}>
        <div className={`container ${s.footerContentWrapper} ${s.footerBlock}`}>
          <aside className={s.footerContentInfo}>
            <nav className={s.footerNav}>
              <ul className={s.footerList}>
                <li>
                  <Link href="/#about">{ABOUT_TITLE}</Link>
                </li>
                <li>
                  <a href="/#services">{SERVICES_TITLE}</a>
                </li>
                <li>
                  <a href="/#examples">{EXAMPLES_TITLE}</a>
                </li>
                <li>
                  <a href="/#reviews">{REVIEWS_TITLE}</a>
                </li>
                <li>
                  <a href="/#contacts">{CONTACTS_TITLE}</a>
                </li>
              </ul>
            </nav>
            <div className={s.сontactInfoBlock} id="contacts">
              <div className={s.contactInfo}>
                <div>
                  <p>{STUDIO_PHONE_TITLE}</p>
                  <a href="tel:+79913991337">{STUDIO_PHONE}</a>
                </div>
                <div>
                  <p>{MANAGER_PHONE_TITLE}</p>
                  <a href="tel:+79162699881">{MANAGER_PHONE}</a>
                </div>
              </div>
              <div>
                <ul className={s.socialLinksList}>
                  <li>
                    <a href="заглушка">
                      <Image src={VK_ICON} alt="Вконтакте" />
                    </a>
                  </li>
                  <li>
                    <a href="заглушка">
                      <Image src={TG_ICON} alt="Телеграм" />
                    </a>
                  </li>
                  <li>
                    <a href="заглушка">
                      <Image src={YT_ICON} alt="Ютуб" />
                    </a>
                  </li>
                  <li>
                    <a href="заглушка">
                      <Image src={DZEN_ICON} alt="Дзен" />
                    </a>
                  </li>
                  <li>
                    <a href="заглушка">
                      <Image src={OK_ICON} alt="Одноклассники" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </aside>
          <form className={s.callbackForm} onSubmit={handleSubmit}>
            <h2>{FORM_TITLE}</h2>
            <div className={s.formFieldsGroup}>
              <div className={s.formFields}>
                <div className={s.formField}>
                  <div className={s.inputGroup}>
                    <div style={{ display: "flex", padding: "0 12px" }}>
                      <span className={s.requiredMark}>{REQUIRED_MARK}</span>
                      <input
                        type="text"
                        name="name"
                        id="name"
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
                    <div style={{ display: "flex", padding: "0 12px" }}>
                      <span className={s.requiredMark}>{REQUIRED_MARK}</span>
                      <input
                        type="text"
                        name="surname"
                        id="surname"
                        placeholder={SURNAME_PLACEHOLDER}
                        value={formData.surname}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                      />
                    </div>
                    <div
                      className={`${s.inputUnderline} ${
                        touched.surname && errors.surname
                          ? s.errorUnderline
                          : ""
                      }`}
                    ></div>
                  </div>
                  {touched.surname && errors.surname && (
                    <p className={s.errorText}>Введите корректную фамилию</p>
                  )}
                </div>

                <div className={s.formField}>
                  <div className={s.inputGroup}>
                    <div style={{ display: "flex", padding: "0 12px" }}>
                      <span className={s.requiredMark}>{REQUIRED_MARK}</span>
                      <input
                        ref={phoneInputRef}
                        type="tel"
                        name="phone"
                        id="phone"
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
                    <div style={{ display: "flex", padding: "0 12px" }}>
                      <span className={s.requiredMark}>{REQUIRED_MARK}</span>
                      <input
                        type="email"
                        name="email"
                        id="email"
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
                    <p className={s.errorText}>Введите корректный email</p>
                  )}
                </div>
              </div>

              <div className={s.checkboxWrapper}>
                <input
                  type="checkbox"
                  name="agreed"
                  id="agreed"
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
            <button type="submit" className="greenButton">
              {SUBMIT_BUTTON}
            </button>
          </form>
        </div>
        <Image src={FOOTER_LOGO} alt="Логотип SOUND" className={s.footerImg} />
      </section>
    </footer>
  );
}
