"use client";

import {
  REVIEWS_DATA,
  REVIEWS_PAGE_BUTTON,
  REVIEWS_PAGE_MICROPHONE_IMG,
  REVIEWS_PAGE_TITLE,
} from "@/mocks/reviews";
import s from "./reviewsList.module.scss";
import Image from "next/image";
import { useState } from "react";

export default function ReviewsList() {
  const [visibleCount, setVisibleCount] = useState(4);

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 2);
  };

  return (
    <section className={s.reviewsBlock}>
      <div className={`container ${s.reviewsWrapper}`}>
        <div className={s.reviewsContent}>
          <h1 className={s.reviewsTitle}>{REVIEWS_PAGE_TITLE}</h1>
          <div className={s.reviewsListWrapper}>
            <div>
              {REVIEWS_DATA.slice(0, visibleCount).map((review, index, arr) => (
                <div key={index}>
                  <article className={s.reviewCard}>
                    <h2 className={s.reviewerName}>{review.fullName}</h2>
                    <p className={s.reviewText}>{review.reviewText}</p>
                  </article>
                  {index < arr.length - 1 && (
                    <div className={s.string} aria-hidden="true"></div>
                  )}
                </div>
              ))}
            </div>
            {visibleCount < REVIEWS_DATA.length && (
              <button className={s.loadMoreButton} onClick={handleShowMore}>
                {REVIEWS_PAGE_BUTTON}
              </button>
            )}
          </div>
        </div>
        <Image src={REVIEWS_PAGE_MICROPHONE_IMG} alt="Микрофон" />
      </div>
    </section>
  );
}
