import "@/styles/reset.scss";
import HeaderMain from "@/components/MainPage/Header/header";
import HeroMain from "@/components/MainPage/Hero/hero";
import SignUpMain from "@/components/MainPage/SignUp/signUp";
import AboutMain from "@/components/MainPage/About/about";
import ServicesMain from "@/components/MainPage/Services/services";
import MusicExamplesMain from "@/components/MainPage/MusicExamples/musicExamples";

export default function Home() {
  return (
    <>
      <HeaderMain />
      <HeroMain />
      <SignUpMain />
      <AboutMain />
      <ServicesMain />
      <MusicExamplesMain />
    </>
  );
}
