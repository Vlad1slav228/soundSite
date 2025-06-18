"use client";

import {
  REVIEWS_PAGE_BUTTON,
  REVIEWS_PAGE_MICROPHONE_IMG,
  REVIEWS_PAGE_TITLE,
} from "@/mocks/reviews";
import s from "./reviewsList.module.scss";
import Image from "next/image";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "@/lib/config";

type BookingInfo = {
  id: number;
  service: string;
  start_at: string;
  end_at: string;
};

type Review = {
  id: number;
  user: {
    id: number;
    first_name: string;
    last_name: string;
  };
  booking_info: BookingInfo;
  text: string;
  created: string;
};

export default function ReviewsList() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [visibleCount, setVisibleCount] = useState(4);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchReviews() {
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE_URL}/api/v1/public-reviews/`);
        if (!res.ok) throw new Error("Ошибка загрузки отзывов");
        const data = await res.json();
        setReviews(Array.isArray(data.results) ? data.results : []);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Неизвестная ошибка при загрузке отзывов");
        }
        setReviews([]);
      }
      setLoading(false);
    }
    fetchReviews();
  }, []);

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 2);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <section className={s.reviewsBlock}>
      <div className={`container ${s.reviewsWrapper}`}>
        <div className={s.reviewsContent}>
          <h1 className={s.reviewsTitle}>{REVIEWS_PAGE_TITLE}</h1>
          <div className={s.reviewsListWrapper}>
            <div>
              {loading && <p>Загрузка отзывов...</p>}
              {error && <p className={s.errorText}>{error}</p>}
              {!loading && !error && reviews.length === 0 && (
                <p className={s.errorText}>Пока нет отзывов. Станьте первым!</p>
              )}
              {reviews.slice(0, visibleCount).map((review, index, arr) => (
                <div key={review.id}>
                  <article className={s.reviewCard}>
                    <h2 className={s.reviewService}>
                      {review.booking_info?.service || "Услуга"}
                    </h2>
                    <p className={s.reviewText}>{review.text}</p>
                    <div className={s.reviewFooter}>
                      <p className={s.reviewUser}>
                        {review.user?.first_name || "Аноним"}{" "}
                        {review.user?.last_name}
                      </p>
                      <p className={s.reviewDate}>
                        {formatDate(review.created)}
                      </p>
                    </div>
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
