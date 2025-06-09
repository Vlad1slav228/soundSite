import "@/styles/reset.scss";
import Header from "@/components/Header/header";
import AddReviewForm from "@/components/AddReviewPage/addReview";

export default function AddReview() {
  return (
    <>
      <Header />
      <main>
       <AddReviewForm />
      </main>
    </>
  );
}  