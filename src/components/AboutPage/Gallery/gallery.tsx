import { GALLERY_BUTTON } from "@/mocks/AboutPage/gallery";
import s from "./gallery.module.scss";
import GallerySlider from "./GallerySlider/gallerySlider";

export default function GalleryAbout() {
  return (
    <section className={s.galleryBlock} id="photo">
      <div className={s.sliderWrapper}>
        <GallerySlider />
        <a href="заглушка" className={s.galleryButton}>
          {GALLERY_BUTTON}
        </a>
      </div>
    </section>
  );
}
