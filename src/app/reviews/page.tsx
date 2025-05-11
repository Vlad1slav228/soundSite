import "@/styles/reset.scss";
import Header from "@/components/Header/header";
import ReviewsList from "@/components/ReviewsPage/reviews";
import Footer from "@/components/Footer/footer";

export default function Reviews() {
  return (
    <>
      <Header />
      <ReviewsList />
      <Footer />
    </>
  );
}
