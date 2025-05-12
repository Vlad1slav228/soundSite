import "@/styles/reset.scss";
import Header from "@/components/Header/header";
import IntroAbout from "@/components/AboutPage/Intro/intro";
import Footer from "@/components/Footer/footer";
import StudioRoomsAbout from "@/components/AboutPage/StudioRooms/studioRooms";
import GalleryAbout from "@/components/AboutPage/Gallery/gallery";
import Reviews from "@/components/Reviews/reviews";

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
