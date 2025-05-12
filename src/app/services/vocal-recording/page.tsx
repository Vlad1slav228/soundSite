import "@/styles/reset.scss";
import Header from "@/components/Header/header";
import IntroVocalRecording from "@/components/ServicesPage/VocalRecording/Intro/intro";
import MusicExamplesServices from "@/components/ServicesPage/MusicExamples/musicExamples";
import Reviews from "@/components/Reviews/reviews";
import Footer from "@/components/Footer/footer";

export default function VocalRecording() {
  return (
    <>
      <Header />
      <main>
        <IntroVocalRecording />
        <MusicExamplesServices />
        <Reviews />
      </main>
      <Footer />
    </>
  );
}
