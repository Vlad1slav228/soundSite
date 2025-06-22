"use client";

import "@/styles/reset.scss";
import Header from "@/components/Header/header";
import BookingForm from "@/components/BookingPage/booking";
import { Suspense } from "react";
import LoadingPage from "@/components/LoadingPage/loading";

export async function generateMetadata() {
  return {
    title: "Онлайн-запись — Sound",
    description:
      "Запишитесь на услуги студии звукозаписи онлайн. Быстрое и удобное бронирование.",
  };
}

export default function Booking() {
  return (
    <>
      <Header />
      <main>
        <Suspense fallback={<LoadingPage />}>
          <BookingForm />
        </Suspense>
      </main>
    </>
  );
}
