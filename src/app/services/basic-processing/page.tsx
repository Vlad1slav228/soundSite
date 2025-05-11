import "@/styles/reset.scss";
import Header from "@/components/Header/header";
import Footer from "@/components/Footer/footer";

import Reviews from "@/components/Reviews/reviews";
import IntroBasicProcessing from "@/components/ServicesPage/BasicProcessing/Intro/intro";

export default function BasicProcessing() {
  return (
    <>
      <Header />
      <IntroBasicProcessing />
      <Reviews />
      <Footer />
    </>
  );
}