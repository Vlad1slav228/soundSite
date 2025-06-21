"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import s from "./detailedReview.module.scss";
import { API_BASE_URL } from "@/lib/config";
import Image from "next/image";
import { MICROPHONE_IMG } from "@/mocks/AddReviewPage/addReview";

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
      } catch (err: unknown) {
        let message = "Неизвестная ошибка";
        if (typeof err === "object" && err && "message" in err) {
          message = (err as { message?: string }).message ?? message;
        }
        setError(message);
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
      <div className={`container ${s.reviewDetailGroup}`}>
        <div className={s.reviewCard}>
          <div className={s.reviewCardInner}>
            <div className={s.reviewRow}>
              <p className={s.label}>Услуга:</p>
              <p className={s.value}>{review.booking_info.service}</p>
            </div>
            <div className={s.reviewRow}>
              <p className={s.label}>Дата написания:</p>
              <p className={s.value}>
                {new Date(review.created).toLocaleDateString("ru-RU")}
              </p>
            </div>
            <div className={s.reviewReview}>
              <p className={s.label}>Отзыв:</p>
              <p className={s.reviewText}>{review.text}</p>
            </div>
          </div>
          {review.reply ? (
            <div className={s.replyBlock}>
              <p className={s.replyLabel}>Ответ администратора:</p>
              <p className={s.replyText}>{review.reply}</p>
            </div>
          ) : (
            <div className={s.replyBlock}>
              <p className={s.replyPending}>
                Администратор ещё не оставил ответ на ваш отзыв.
              </p>
            </div>
          )}
        </div>
        <Image src={MICROPHONE_IMG} alt="Микрофон" className="microImg" />
      </div>
    </section>
  );
}
