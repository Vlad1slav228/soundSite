"use client";

import "@/styles/reset.scss";
import Header from "@/components/Header/header";
import { Suspense } from "react";
import AddReviewForm from "@/components/AddReviewPage/addReview";
import LoadingPage from "@/components/LoadingPage/loading";

export async function generateMetadata() {
  return {
    title: "Оставить отзыв — Sound",
    description:
      "Оставьте отзыв о работе студии звукозаписи Sound и помогите другим сделать выбор.",
  };
}

export default function AddReview() {
  return (
    <>
      <Header />
      <main>
        <Suspense fallback={<LoadingPage />}>
          <AddReviewForm />
        </Suspense>
      </main>
    </>
  );
}
