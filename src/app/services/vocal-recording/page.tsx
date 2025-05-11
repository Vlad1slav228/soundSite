import "@/styles/reset.scss";
import Header from "@/components/Header/header";
import Footer from "@/components/Footer/footer";

import Reviews from "@/components/Reviews/reviews";
import IntroVocalRecording from "@/components/ServicesPage/VocalRecording/Intro/intro";

export default function VocalRecording() {
  return (
    <>
      <Header />
      <IntroVocalRecording />
      <Reviews />
      <Footer />
    </>
  );
}
