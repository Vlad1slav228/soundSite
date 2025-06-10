import s from "./gallery.module.scss";
import GallerySlider from "./GallerySlider/gallerySlider";

export default function GalleryAbout() {
  return (
    <section className={s.galleryBlock} id="photo">
        <GallerySlider />
    </section>
  );
}