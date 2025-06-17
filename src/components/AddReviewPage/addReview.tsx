"use client";

import {
  FORM_TITLE,
  MICROPHONE_IMG,
  REQUIRED_MARK,
  REVIEW_PLACEHOLDER,
  SEND_BUTTON,
} from "@/mocks/AddReviewPage/addReview";
import s from "./addReview.module.scss";
import Image from "next/image";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { fetchWithAuth } from "@/lib/fetchWithAuth";

export default function AddReviewForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const bookingId = searchParams.get('bookingId');
  
  const [review, setReview] = useState("");
  const [error, setError] = useState(false);
  const [touched, setTouched] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const validateReview = (text: string) => {
    return text.trim().length >= 6;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setReview(value);
    if (touched) {
      setError(!validateReview(value));
    }
  };

  const handleBlur = () => {
    setTouched(true);
    setError(!validateReview(review));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    const isValid = validateReview(review);
    setError(!isValid);

    if (!isValid || !bookingId) {
      setSubmitError("Пожалуйста, введите корректный отзыв (минимум 6 символов)");
      return;
    }

    setIsLoading(true);
    setSubmitError("");

    try {
      const response = await fetchWithAuth(`/api/v1/reviews/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          booking: parseInt(bookingId),
          text: review,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        
        if (response.status === 400) {
          throw new Error(errorData.detail || "Невозможно оставить отзыв для этого бронирования");
        }
        throw new Error("Произошла ошибка на сервере. Попробуйте позже.");
      }

      setIsSubmitted(true);
    } catch (error: any) {
      setSubmitError(
        error.message || "Произошла непредвиденная ошибка. Пожалуйста, попробуйте позже."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    router.push(`/personal-account`);
  };

  if (isSubmitted) {
    return (
      <section className={s.addReviewBlock}>
        <div className={`container ${s.addReviewGroup}`}>
          <div className={s.successContent}>
            <button
              onClick={handleBack}
              className={`greenButton ${s.backButton}`}
            >
              Назад
            </button>
            <h1 className={s.successTitle}>Отзыв успешно отправлен!</h1>
          </div>
          <Image src={MICROPHONE_IMG} alt="Микрофон" className="microImg" />
        </div>
      </section>
    );
  }

  return (
    <section className={s.addReviewBlock}>
      <div className={`container ${s.addReviewGroup}`}>
        <form className={s.callbackForm} onSubmit={handleSubmit}>
          <h1>{FORM_TITLE}</h1>

          <div className={s.inputGroup}>
            <div className={s.inputWrapper}>
              <span className={s.requiredMark}>{REQUIRED_MARK}</span>
              <input
                type="text"
                placeholder={REVIEW_PLACEHOLDER}
                required
                value={review}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={isLoading}
              />
            </div>
            <div
              className={`${s.inputUnderline} ${
                touched && error ? s.errorUnderline : ""
              }`}
            ></div>
          </div>
          {touched && error && (
            <p className={s.errorText}>Отзыв должен содержать минимум 6 символов</p>
          )}
          {submitError && (
            <p className={s.errorText}>{submitError}</p>
          )}
          <button 
            type="submit" 
            className={`greenButton ${s.sendButton}`}
            disabled={isLoading || (touched && error)}
          >
            {isLoading ? "Отправка..." : SEND_BUTTON}
          </button>
        </form>
        <Image src={MICROPHONE_IMG} alt="Микрофон" className="microImg" />
      </div>
    </section>
  );
}