"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import s from "./detailedReview.module.scss";
import { API_BASE_URL } from "@/lib/config";

type Review = {
  id: number;
  user: {
    id: number;
    first_name: string;
    last_name: string;
  };
  booking_info: {
    id: number;
    service: string;
    start_at: string;
    end_at: string;
  };
  text: string;
  reply: string;
  created: string;
};

export default function DetailedReview() {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("booking");
  const [review, setReview] = useState<Review | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!bookingId) return;

    async function fetchReview() {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(
          `${API_BASE_URL}/api/v1/reviews/?booking=${bookingId}`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        if (!res.ok) throw new Error("Ошибка загрузки отзыва");
        const data = await res.json();
        setReview(data.results?.[0] ?? null);
      } catch (err: any) {
        setError(err.message ?? "Неизвестная ошибка");
        setReview(null);
      }
      setLoading(false);
    }

    fetchReview();
  }, [bookingId]);

  if (loading) return <div className={s.reviewDetailPage}>Загрузка...</div>;
  if (error) return <div className={s.reviewDetailPage}>Ошибка: {error}</div>;
  if (!review) return <div className={s.reviewDetailPage}>Отзыв не найден</div>;

  return (
    <section className={s.reviewDetailPage}>
      <div className={s.reviewCard}>
        <p>
          <strong>Услуга:</strong> {review.booking_info.service}
        </p>
        <p>
          <strong>Дата написания отзыва:</strong>{" "}
          {new Date(review.created).toLocaleDateString("ru-RU")}
        </p>
        <div>
          <strong>Отзыв:</strong>
          <p>{review.text}</p>
        </div>
        {review.reply ? (
          <div className={s.replyBlock}>
            <strong>Ответ администратора:</strong>
            <p>{review.reply}</p>
          </div>
        ) : (
          <div className={s.replyBlock}>
            <p>Администратор ещё не оставил ответ на ваш отзыв.</p>
          </div>
        )}
      </div>
    </section>
  );
}
