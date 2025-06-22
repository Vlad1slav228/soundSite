import "@/styles/reset.scss";
import Header from "@/components/Header/header";
import HeroMain from "@/components/MainPage/Hero/hero";
import SignUpMain from "@/components/MainPage/SignUp/signUp";
import AboutMain from "@/components/MainPage/About/about";
import ServicesMain from "@/components/MainPage/Services/services";
import MusicExamplesMain from "@/components/MainPage/MusicExamples/musicExamples";
import GalleryMain from "@/components/MainPage/Gallery/gallery";
import Reviews from "@/components/Reviews/reviews";
import Footer from "@/components/Footer/footer";

export async function generateMetadata() {
  return {
    title: "Sound — студия звукозаписи",
    description:
      "Профессиональная студия звукозаписи в вашем городе. Запись голоса и инструментов, аранжировка, сведение и мастеринг треков.",
  };
}

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroMain />
        <SignUpMain />
        <AboutMain />
        <ServicesMain />
        <MusicExamplesMain />
        <GalleryMain />
        <Reviews />
      </main>
      <Footer />
    </>
  );
}
