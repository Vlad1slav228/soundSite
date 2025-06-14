"use client"

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

export default function AddReviewForm() {
  const [review, setReview] = useState("");
  const [error, setError] = useState(false);
  const [touched, setTouched] = useState(false);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    const isValid = validateReview(review);
    setError(!isValid);
    
    if (isValid) {
      console.log("Отправка отзыва:", review);
    }
  };

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
              />
            </div>
            <div
              className={`${s.inputUnderline} ${
                touched && error ? s.errorUnderline : ""
              }`}
            ></div>
          </div>
          {touched && error && (
            <p className={s.errorText}>Введите корректные данные</p>
          )}
          <button type="submit" className={`greenButton ${s.sendButton}`}>
            {SEND_BUTTON}
          </button>
        </form>
        <Image
          src={MICROPHONE_IMG}
          alt="Микрофон"
          className="microImg" 
        />
      </div>
    </section>
  );
}