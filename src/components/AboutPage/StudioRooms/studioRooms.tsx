"use client";

import { useState } from "react";
import { MICROPHONE_IMG, ROOMS_DATA } from "@/mocks/AboutPage/studioRooms";
import s from "./studioRooms.module.scss";
import Image from "next/image";

export default function StudioRoomsAbout() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className={s.studioRoomsBlock}>
      <Image src={MICROPHONE_IMG} alt="Микрофон" />
      <div className={s.roomCard}>
        {ROOMS_DATA.map((room, index) => (
          <button
            key={index}
            className={`${s.roomContent} ${
              activeIndex === index ? s.active : ""
            }`}
            onClick={() => setActiveIndex(index)}
          >
            <div>
              <h2 className={s.roomTitle}>{room.title}</h2>
              {activeIndex === index && (
                <p className={s.roomText}>{room.text}</p>
              )}
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
