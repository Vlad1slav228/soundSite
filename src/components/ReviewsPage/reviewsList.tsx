"use client";

import {
  REVIEWS_DATA,
  REVIEWS_PAGE_BUTTON,
  REVIEWS_PAGE_MICROPHONE_IMG,
  REVIEWS_PAGE_TITLE,
} from "@/mocks/reviews";
import s from "./reviewsList.module.scss";
import Image from "next/image";
import { useEffect, useState } from "react";
import { fetchWithAuth } from "@/lib/fetchWithAuth";

type Review = {
  id: number;
  user: number;
  booking_info: {
    service: string;
    start_at: string;
    end_at: string;
  };
  text: string;
  created: string;
};

export default function ReviewsList() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [visibleCount, setVisibleCount] = useState(4);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReviews() {
      setLoading(true);
      try {
        const res = await fetchWithAuth("/api/v1/reviews/", {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();
        setReviews(data.results || []);
      } catch {
        setReviews([]);
      }
      setLoading(false);
    }
    fetchReviews();
  }, []);

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
              {loading && <p>Загрузка отзывов...</p>}
              {!loading && reviews.length === 0 && (
                <p>Пока нет отзывов. Станьте первым!</p>
              )}
              {reviews.slice(0, visibleCount).map((review, index, arr) => (
                <div key={review.id}>
                  <article className={s.reviewCard}>
                    <h2 className={s.reviewerName}>{review.booking_info?.service || "Аноним"}</h2>
                    <p className={s.reviewText}>{review.text}</p>
                  </article>
                  {index < arr.length - 1 && (
                    <div className={s.string} aria-hidden="true"></div>
                  )}
                </div>
              ))}
            </div>
            {visibleCount < reviews.length && (
              <button
                className={`greenButton ${s.loadMoreButton}`}
                onClick={handleShowMore}
              >
                {REVIEWS_PAGE_BUTTON}
              </button>
            )}
          </div>
        </div>
        <Image
          src={REVIEWS_PAGE_MICROPHONE_IMG}
          alt="Микрофон"
          className={s.reviwsMicroImg}
        />
      </div>
    </section>
  );
}
