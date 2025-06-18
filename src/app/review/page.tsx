import "@/styles/reset.scss";
import Header from "@/components/Header/header";
import DetailedReview from "@/components/DetailedReviewPage/detailedReview";

export default function Review() {
  return (
    <>
      <Header />
      <main>
        <DetailedReview />
      </main>
    </>
  );
}
