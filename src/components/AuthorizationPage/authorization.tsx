"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "@/lib/config";
import Image from "next/image";
import s from "./authorization.module.scss";
import {
  FORM_TITLE,
  MICROPHONE_IMG,
  NAME_PLACEHOLDER,
  SURNAME_PLACEHOLDER,
  EMAIL_PLACEHOLDER,
  PRIVACY_POLICY_LINK,
  PRIVACY_POLICY_TITLE,
  LOADING_ICON,
  REQUIRED_MARK,
  OTP_SENT_MESSAGE,
  ENTER_BUTTON,
  SUCCESS_MESSAGE,
} from "@/mocks/AuthorizationPage/authorizaton";

type FormErrors = {
  firstName: boolean;
  lastName: boolean;
  email: boolean;
  otp: boolean;
  agreed: boolean;
};

type TouchedFields = {
  firstName: boolean;
  lastName: boolean;
  email: boolean;
  otp: boolean;
};

export default function AuthorizationForm() {
  const [step, setStep] = useState<"input" | "otp" | "success">("input");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({
    firstName: false,
    lastName: false,
    email: false,
    otp: false,
    agreed: false,
  });
  const [touched, setTouched] = useState<TouchedFields>({
    firstName: false,
    lastName: false,
    email: false,
    otp: false,
  });

  const validateField = (name: keyof TouchedFields, value: string) => {
    let isValid = true;

    switch (name) {
      case "firstName":
      case "lastName":
        isValid = value.trim().length >= 2;
        break;
      case "email":
        isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        break;
      case "otp":
        isValid = value.trim().length > 0;
        break;
      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: !isValid }));
  };

  const handleBlur = (field: keyof TouchedFields) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    switch (field) {
      case "firstName":
        validateField(field, firstName);
        break;
      case "lastName":
        validateField(field, lastName);
        break;
      case "email":
        validateField(field, email);
        break;
      case "otp":
        validateField(field, otp);
        break;
    }
  };

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();

    setTouched({
      firstName: true,
      lastName: true,
      email: true,
      otp: false,
    });

    validateField("firstName", firstName);
    validateField("lastName", lastName);
    validateField("email", email);

    const hasErrors = errors.firstName || errors.lastName || errors.email;
    if (hasErrors) return;

    setError("");
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/auth/request-otp/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          first_name: firstName,
          last_name: lastName,
        }),
      });

      if (!res.ok) throw new Error("Ошибка при отправке кода");

      setStep("otp");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const router = useRouter();

  useEffect(() => {
    if (step === "success") {
      const timer = setTimeout(() => {
        router.push("/personal-account");
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [step, router]);

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();

    // Mark OTP field as touched
    setTouched((prev) => ({ ...prev, otp: true }));
    validateField("otp", otp);

    if (errors.otp) return;

    setError("");
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/auth/verify-otp/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, code: otp }),
      });

      if (!res.ok) throw new Error("Неверный код");

      setStep("success");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={s.authorizationBlock}>
      <div className={`container ${s.authorizationGroup}`}>
        {step === "input" && (
          <form onSubmit={handleSendOTP} className={s.callbackForm}>
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
                        value={firstName}
                        onChange={(e) => {
                          setFirstName(e.target.value);
                          if (touched.firstName) {
                            validateField("firstName", e.target.value);
                          }
                        }}
                        onBlur={() => handleBlur("firstName")}
                      />
                    </div>
                    <div
                      className={`${s.inputUnderline} ${
                        touched.firstName && errors.firstName
                          ? s.errorUnderline
                          : ""
                      }`}
                    ></div>
                  </div>
                  {touched.firstName && errors.firstName && (
                    <p className={s.errorText}>Введите корректное имя</p>
                  )}
                </div>

                <div className={s.formField}>
                  <div className={s.inputGroup}>
                    <div className={s.inputWrapper}>
                      <span className={s.requiredMark}>{REQUIRED_MARK}</span>
                      <input
                        type="text"
                        placeholder={SURNAME_PLACEHOLDER}
                        required
                        value={lastName}
                        onChange={(e) => {
                          setLastName(e.target.value);
                          if (touched.lastName) {
                            validateField("lastName", e.target.value);
                          }
                        }}
                        onBlur={() => handleBlur("lastName")}
                      />
                    </div>
                    <div
                      className={`${s.inputUnderline} ${
                        touched.lastName && errors.lastName
                          ? s.errorUnderline
                          : ""
                      }`}
                    ></div>
                  </div>
                  {touched.lastName && errors.lastName && (
                    <p className={s.errorText}>Введите корректную фамилию</p>
                  )}
                </div>

                <div className={s.formField}>
                  <div className={s.inputGroup}>
                    <div className={s.inputWrapper}>
                      <span className={s.requiredMark}>{REQUIRED_MARK}</span>
                      <input
                        type="email"
                        placeholder={EMAIL_PLACEHOLDER}
                        required
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (touched.email) {
                            validateField("email", e.target.value);
                          }
                        }}
                        onBlur={() => handleBlur("email")}
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
                  required
                />
                <label>
                  <span>
                    {PRIVACY_POLICY_TITLE}
                    <a href="/PP.pdf" target="_blank">
                      {PRIVACY_POLICY_LINK}
                    </a>
                  </span>
                </label>
                {errors.agreed && (
                  <p className={s.errorText}>Необходимо ваше согласие</p>
                )}
              </div>
            </div>

            <button
              type="submit"
              className={`greenButton ${loading ? s.isLoading : ""}`}
              disabled={loading}
            >
              {loading ? (
                <Image
                  src={LOADING_ICON}
                  alt="loading"
                  className={s.loadingIcon}
                />
              ) : (
                ENTER_BUTTON
              )}
            </button>
            {error && <p className={s.errorText}>{error}</p>}
          </form>
        )}

        {step === "otp" && (
          <form onSubmit={handleVerifyOTP} className={s.callbackForm}>
            <h1>{OTP_SENT_MESSAGE}</h1>
            <div className={s.formField}>
              <div className={s.inputGroup}>
                <div className={s.inputWrapper}>
                  <span className={s.requiredMark}>{REQUIRED_MARK}</span>
                  <input
                    type="text"
                    placeholder="Пароль"
                    value={otp}
                    onChange={(e) => {
                      setOtp(e.target.value);
                      if (touched.otp) {
                        validateField("otp", e.target.value);
                      }
                    }}
                    onBlur={() => handleBlur("otp")}
                    required
                  />
                </div>
                <div
                  className={`${s.inputUnderline} ${
                    touched.otp && errors.otp ? s.errorUnderline : ""
                  }`}
                ></div>
              </div>
              {touched.otp && errors.otp && (
                <p className={s.errorText}>Введите корректный код</p>
              )}
            </div>
            <button
              type="submit"
              className={`greenButton ${loading ? s.isLoading : ""}`}
              disabled={loading}
            >
              {loading ? (
                <Image
                  src={LOADING_ICON}
                  alt="loading"
                  className={s.loadingIcon}
                />
              ) : (
                ENTER_BUTTON
              )}
            </button>
            {error && <p className={s.errorText}>{error}</p>}
          </form>
        )}

        {step === "success" && (
          <div className={s.callbackForm}>
            <h1>{SUCCESS_MESSAGE}</h1>
          </div>
        )}

        <Image src={MICROPHONE_IMG} alt="Микрофон" className="microImg" />
      </div>
    </section>
  );
}
