"use client";
import { useState } from "react";
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
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

  const normalizePhone = (phone: string) => {
    return phone.replace(/[^\d\+]/g, "");
  };

  const validateField = (name: keyof FormData, value: string | boolean) => {
    let isValid = true;

    switch (name) {
      case "name":
      case "surname":
        isValid = typeof value === "string" && value.trim().length >= 2;
        break;
      case "phone":
        const normalized = normalizePhone(value as string);
        isValid =
          /^(\+7|7|8)\d{10}$/.test(normalized) ||
          /^\+\d{11,15}$/.test(normalized);
        break;
      case "email":
        isValid =
          typeof value === "string" &&
          (value === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value));
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
            <nav>
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
                    <div style={{ display: "flex" }}>
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
                    {touched.name && errors.name && (
                      <p className={s.errorText}>Введите корректное имя</p>
                    )}
                  </div>
                </div>

                <div className={s.formField}>
                  <div className={s.inputGroup}>
                    <div style={{ display: "flex" }}>
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
                    {touched.surname && errors.surname && (
                      <p className={s.errorText}>Введите корректную фамилию</p>
                    )}
                  </div>
                </div>

                <div className={s.formField}>
                  <div className={s.inputGroup}>
                    <div style={{ display: "flex" }}>
                      <span className={s.requiredMark}>{REQUIRED_MARK}</span>
                      <input
                        type="tel"
                        name="phone"
                        id="phone"
                        placeholder={PHONE_PLACEHOLDER}
                        value={formData.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                      />
                    </div>
                    <div
                      className={`${s.inputUnderline} ${
                        touched.phone && errors.phone ? s.errorUnderline : ""
                      }`}
                    ></div>
                    {touched.phone && errors.phone && (
                      <p className={s.errorText}>
                        Введите корректный номер телефона
                      </p>
                    )}
                  </div>
                </div>

                <div className={s.formField}>
                  <div className={s.inputGroup}>
                    <div style={{ display: "flex" }}>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder={EMAIL_PLACEHOLDER}
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                    <div
                      className={`${s.inputUnderline} ${
                        touched.email && errors.email ? s.errorUnderline : ""
                      }`}
                    ></div>
                    {touched.email && errors.email && (
                      <p className={s.errorText}>Введите корректный email</p>
                    )}
                  </div>
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
              </div>
            </div>
            <button type="submit" className="greenButton">
              {SUBMIT_BUTTON}
            </button>
          </form>
        </div>
        <Image src={FOOTER_LOGO} alt="Логотип SOUND" />
      </section>
    </footer>
  );
}
