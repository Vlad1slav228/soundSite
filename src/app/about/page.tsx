import "@/styles/reset.scss";
import Header from "@/components/Header/header";
import IntroAbout from "@/components/AboutPage/Intro/intro";
import Footer from "@/components/Footer/footer";

export default function Home() {
  return (
    <>
      <Header />
      <IntroAbout />
      {/* <Footer /> */}
    </>
  );
}
