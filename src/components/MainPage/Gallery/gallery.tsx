import { GALLERY_BUTTON } from "@/mocks/MainPage/gallery";
import s from "./gallery.module.scss";
import GallerySlider from "./GallerySlider/gallerySlider";
import Link from "next/link";

export default function GalleryMain() {
  return (
    <section className={s.galleryBlock} id="photo">
      <div className={s.sliderWrapper}>
        <GallerySlider />
        <Link href="/about#photo" className={s.galleryButton}>
          {GALLERY_BUTTON}
        </Link>
      </div>
    </section>
  );
}