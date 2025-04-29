"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import s from "./gallerySlider.module.scss";
import {
  ARROW_LEFT,
  ARROW_RIGHT,
  galleryImages,
} from "@/mocks/MainPage/gallery";

export default function GallerySlider() {
  return (
    <div className={s.galleryWrapper}>
      <Swiper
        modules={[Navigation]}
        spaceBetween={124}
        slidesPerView={2}
        centeredSlides={true}
        loop={true}
        observer={true}
        observeParents={true}
        navigation={{
          nextEl: `.${s.arrowRight}`,
          prevEl: `.${s.arrowLeft}`,
        }}
      >
        {galleryImages.map((image, index) => (
          <SwiperSlide key={index}>
           <Image
              src={image}
              alt={`Фото ${index + 1}`}
              width={900}
              height={600}
              className={s.swiperImage}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className={`${s.arrowsWrapper} ${s.container}`}>
        <button className={s.arrowLeft}>
          <Image src={ARROW_LEFT} alt="Левая стрелка" />
        </button>
        <button className={s.arrowRight}>
          <Image src={ARROW_RIGHT} alt="Правая стрелка" />
        </button>
      </div>
    </div>
  );
}
