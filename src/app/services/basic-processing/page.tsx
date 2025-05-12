import "@/styles/reset.scss";
import Header from "@/components/Header/header";
import IntroBasicProcessing from "@/components/ServicesPage/BasicProcessing/Intro/intro";
import MusicExamplesServices from "@/components/ServicesPage/MusicExamples/musicExamples";
import Reviews from "@/components/Reviews/reviews";
import Footer from "@/components/Footer/footer";

export default function BasicProcessing() {
  return (
    <>
      <Header />
      <main>
        <IntroBasicProcessing />
        <MusicExamplesServices />
        <Reviews />
      </main>
      <Footer />
    </>
  );
}
