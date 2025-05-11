import "@/styles/reset.scss";
import Header from "@/components/Header/header";
import Footer from "@/components/Footer/footer";

import Reviews from "@/components/Reviews/reviews";
import IntroComplexProcessing from "@/components/ServicesPage/ComplexProcessing/Intro/intro";

export default function ComplexProcessing() {
  return (
    <>
      <Header />
      <IntroComplexProcessing />
      <Reviews />
      <Footer />
    </>
  );
}