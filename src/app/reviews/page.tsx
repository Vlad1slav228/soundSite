import "@/styles/reset.scss";
import Header from "@/components/Header/header";
import ReviewsList from "@/components/ReviewsPage/reviewsList";
import Footer from "@/components/Footer/footer";

export async function generateMetadata() {
  return {
    title: "Отзывы клиентов — Sound",
    description:
      "Реальные отзывы клиентов о работе студии звукозаписи Sound. Читайте мнения и делитесь своим опытом.",
  };
}

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
