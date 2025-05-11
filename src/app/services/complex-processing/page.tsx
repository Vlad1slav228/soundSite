import "@/styles/reset.scss";
import Header from "@/components/Header/header";
import IntroComplexProcessing from "@/components/ServicesPage/ComplexProcessing/Intro/intro";
import MusicExamplesServices from "@/components/ServicesPage/MusicExamples/musicExamples";
import Reviews from "@/components/Reviews/reviews";
import Footer from "@/components/Footer/footer";

export default function ComplexProcessing() {
  return (
    <>
      <Header />
      <IntroComplexProcessing />
      <MusicExamplesServices />
      <Reviews />
      <Footer />
    </>
  );
}
