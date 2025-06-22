"use client";

import "@/styles/reset.scss";
import Header from "@/components/Header/header";
import DetailedReview from "@/components/DetailedReviewPage/detailedReview";
import { Suspense } from "react";
import LoadingPage from "@/components/LoadingPage/loading";

export async function generateMetadata() {
  return {
    title: "Просмотр отзыва — Sound",
    description: "Детальный просмотр отзыва о студии звукозаписи Sound.",
  };
}

export default function Review() {
  return (
    <>
      <Header />
      <main>
        <Suspense fallback={<LoadingPage />}>
          <DetailedReview />
        </Suspense>
      </main>
    </>
  );
}
