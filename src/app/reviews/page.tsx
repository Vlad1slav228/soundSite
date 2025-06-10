import "@/styles/reset.scss";
import Header from "@/components/Header/header";
import ReviewsList from "@/components/ReviewsPage/reviewsList";
import Footer from "@/components/Footer/footer";

export default function Reviews() {
  return (
    <>
      <Header />
      <main>
        <ReviewsList />
      </main>
      <Footer />
    </>
  );
}