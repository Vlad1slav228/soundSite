import "@/styles/reset.scss";
import Header from "@/components/Header/header";
import IntroAbout from "@/components/AboutPage/Intro/intro";
import StudioRoomsAbout from "@/components/AboutPage/StudioRooms/studioRooms";
import GalleryAbout from "@/components/AboutPage/Gallery/gallery";
import Reviews from "@/components/Reviews/reviews";
import Footer from "@/components/Footer/footer";

export async function generateMetadata() {
  return {
    title: "О студии Sound",
    description:
      "Узнайте больше о студии звукозаписи Sound: миссия, команда, опыт и преимущества.",
  };
}

export default function About() {
  return (
    <>
      <Header />
      <main>
        <IntroAbout />
        <StudioRoomsAbout />
        <GalleryAbout />
        <Reviews />
      </main>
      <Footer />
    </>
  );
}
