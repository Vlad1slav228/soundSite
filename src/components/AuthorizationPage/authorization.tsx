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
  NEXT_BUTTON,
  REQUIRED_MARK,
  OTP_SENT_MESSAGE,
  ENTER_BUTTON,
  SUCCESS_MESSAGE,
} from "@/mocks/AuthorizationPage/authorizaton";

export default function AuthorizationForm() {
  const [step, setStep] = useState<"input" | "otp" | "success">("input");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
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
    setError("");
    setLoading(true);
    try {
      console.log("API:", API_BASE_URL);
      const res = await fetch(`${API_BASE_URL}/api/v1/auth/verify-otp/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, code: otp }),
      });

      if (!res.ok) throw new Error("Неверный код");

      const data = await res.json();
      localStorage.setItem("access_token", data.access);

      setStep("success");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={s.authorizationBlock}>
      <div className={`${s.container} ${s.authorizationGroup}`}>
        {step === "input" && (
          <form onSubmit={handleSendOTP} className={s.callbackForm}>
            <h1>{FORM_TITLE}</h1>
            <div className={s.formFieldsGroup}>
              <div className={s.formFields}>
                <div className={s.formField}>
                  <div className={s.inputGroup}>
                    <div>
                      <span className={s.requiredMark}>{REQUIRED_MARK}</span>
                      <input
                        type="text"
                        placeholder={NAME_PLACEHOLDER}
                        required
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </div>
                    <div className={s.inputUnderline}></div>
                  </div>
                </div>

                <div className={s.formField}>
                  <div className={s.inputGroup}>
                    <div>
                      <span className={s.requiredMark}>{REQUIRED_MARK}</span>
                      <input
                        type="text"
                        placeholder={SURNAME_PLACEHOLDER}
                        required
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </div>
                    <div className={s.inputUnderline}></div>
                  </div>
                </div>

                <div className={s.formField}>
                  <div className={s.inputGroup}>
                    <div>
                      <span className={s.requiredMark}>{REQUIRED_MARK}</span>
                      <input
                        type="email"
                        placeholder={EMAIL_PLACEHOLDER}
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
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

            <button
              type="submit"
              className={`${s.nextButton} ${loading ? s.isLoading : ""}`}
              disabled={loading}
            >
              {loading ? (
                <Image
                  src={LOADING_ICON}
                  alt="loading"
                  className={s.loadingIcon}
                />
              ) : (
                NEXT_BUTTON
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
                <div>
                  <span className={s.requiredMark}>{REQUIRED_MARK}</span>
                  <input
                    type="text"
                    placeholder="Пароль"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                  />
                </div>
                <div className={s.inputUnderline}></div>
              </div>
            </div>
            <button
              type="submit"
              className={`${s.nextButton} ${loading ? s.isLoading : ""}`}
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

        <Image src={MICROPHONE_IMG} alt="Микрофон" />
      </div>
    </section>
  );
}
