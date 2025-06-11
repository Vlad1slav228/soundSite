"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  MICROPHONE_IMG,
  CROSS_ICON,
  REVIEWS_DATA,
  REVIEWS_BUTTON,
} from "@/mocks/reviews";
import s from "./reviews.module.scss";
import Image from "next/image";
import Link from "next/link";

const DESKTOP_BP = 1440;
const TRANSITION_DURATION = 400; 
const TEXT_FADE_DURATION = 200; 

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(true);
  useEffect(() => {
    const mq = window.matchMedia(`(min-width:${DESKTOP_BP}px)`);
    const handler = () => setIsDesktop(mq.matches);
    handler();
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return isDesktop;
}

export default function Reviews() {
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [height, setHeight] = useState<number | undefined>(undefined);
  const [width, setWidth] = useState<number | undefined>(undefined);

  const cardRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const isDesktop = useIsDesktop();

  const handleNextReview = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);

    setTimeout(() => {
      setCurrentReviewIndex((prev) => (prev + 1) % REVIEWS_DATA.length);
    }, TEXT_FADE_DURATION);

    setTimeout(() => {
      setIsAnimating(false);
    }, TRANSITION_DURATION);
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
      <div className={`container ${s.reviewWrapper}`}>
        <div className={s.reviewContent}>
          <div
            ref={wrapperRef}
            className={s.reviewCardWrapper}
            style={{
              height: height ? `${height}px` : "auto",
              ...(isDesktop
                ? {
                    width: width ? `${width}px` : "auto",
                  }
                : {
                    width: "100%",
                  }),
            }}
          >
            <div 
              className={`${s.reviewCardBackground1} ${isAnimating ? s.backgroundAnimating : ''}`} 
              aria-hidden="true"
            ></div>
            <div 
              className={`${s.reviewCardBackground2} ${isAnimating ? s.backgroundAnimating : ''}`} 
              aria-hidden="true"
            ></div>
            <article 
              className={`${s.reviewCard} ${isAnimating ? s.cardAnimating : ''}`} 
              ref={cardRef}
            >
              <button onClick={handleNextReview} className={s.crossButton}>
                <Image src={CROSS_ICON} alt="Следующий отзыв" />
              </button>
              <h4 className={s.reviewAuthor}>{fullName}</h4>
              <p className={s.reviewText}>{reviewText}</p>
            </article>
          </div>
          <Link href="/reviews" className={s.reviewsButton}>
            {REVIEWS_BUTTON}
          </Link>
        </div>
        <Image
          src={MICROPHONE_IMG}
          alt="Микрофон"
          className={`${s.microImg} ${isAnimating ? s.microphoneAnimated : ""}`}
        />
      </div>
    </section>
  );
}