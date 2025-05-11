"use client";

import { useLayoutEffect, useRef, useState } from "react";
import {
  MICROPHONE_IMG,
  CROSS_ICON,
  REVIEWS_DATA,
  REVIEWS_BUTTON,
} from "@/mocks/reviews";
import s from "./reviews.module.scss";
import Image from "next/image";
import Link from "next/link";

export default function Reviews() {
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [micAnimated, setMicAnimated] = useState(false);
  const [height, setHeight] = useState<number | undefined>(undefined);
  const [width, setWidth] = useState<number | undefined>(undefined);

  const cardRef = useRef<HTMLDivElement>(null);

  const handleNextReview = () => {
    setIsFading(true);
    setMicAnimated(true);

    setTimeout(() => {
      setCurrentReviewIndex((prev) => (prev + 1) % REVIEWS_DATA.length);
      setIsFading(false);
    }, 400);

    setTimeout(() => {
      setMicAnimated(false);
    }, 400);
  };

  const { fullName, reviewText } = REVIEWS_DATA[currentReviewIndex];

  useLayoutEffect(() => {
    if (!cardRef.current) return;

    const el = cardRef.current;

    const resizeObserver = new ResizeObserver(() => {
      setHeight(el.scrollHeight);
      setWidth(el.scrollWidth);
    });

    resizeObserver.observe(el);
    setHeight(el.scrollHeight);
    setWidth(el.scrollWidth);

    return () => resizeObserver.disconnect();
  }, [currentReviewIndex]);

  return (
    <section className={s.reviewsBlock}>
      <div className={`${s.container} ${s.reviewWrapper}`}>
        <div className={s.reviewContent}>
          <div
            className={s.reviewCardWrapper}
            style={{
              height: height ? `${height}px` : "auto",
              width: width ? `${width}px` : "auto",
              transition: "height 0.5s ease, width 0.5s ease",
            }}
          >
            <div className={s.reviewCardBackground1} aria-hidden="true"></div>
            <div className={s.reviewCardBackground2} aria-hidden="true"></div>
            <article className={s.reviewCard} ref={cardRef}>
              <button onClick={handleNextReview} className={s.crossButton}>
                <Image src={CROSS_ICON} alt="Следующий отзыв" />
              </button>
              <h4 className={`${s.reviewAuthor} ${isFading ? s.fadeOut : ""}`}>
                {fullName}
              </h4>
              <p className={`${s.reviewText} ${isFading ? s.fadeOut : ""}`}>
                {reviewText}
              </p>
            </article>
          </div>
          <Link href="/reviews" className={s.reviewsButton}>
            {REVIEWS_BUTTON}
          </Link>
        </div>
        <div className={s.reviewImageBlock}>
          <Image
            src={MICROPHONE_IMG}
            alt="Микрофон"
            className={micAnimated ? s.microphoneAnimated : ""}
          />
        </div>
      </div>
    </section>
  );
}
