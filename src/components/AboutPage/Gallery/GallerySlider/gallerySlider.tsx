"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import s from "./gallerySlider.module.scss";
import { galleryImages } from "@/mocks/AboutPage/gallery";

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
        speed={1300}
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
    </div>
  );
}