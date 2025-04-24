import {
  TRACK_TITLE,
  MICROPHONE_IMG,
  EMINEM_TRACK,
  KENDRICKLAMAR_TRACK,
  M24_TRACK,
  PHARELLWILLIAMS_TRACK,
  SERGEDEVANT_TRACK,
} from "@/mocks/MainPage/musicExamples";
import s from "./musicExamples.module.scss";
import Image from "next/image";
import AudioPlayer from "./AudioPlayer/audioPlayer";

export default function MusicExamplesMain() {
  return (
    <section className={s.musicExamplesBlock}>
      <Image src={MICROPHONE_IMG} alt="Микрофон" className={s.microImg} />
      <div className={s.trackMainBlock}>
        <h2 className={s.trackTitle}>{TRACK_TITLE}</h2>
        <div className={s.trackBlock}>
          <AudioPlayer src={EMINEM_TRACK} />
          <div className={s.string} aria-hidden="true"></div>
          <AudioPlayer src={KENDRICKLAMAR_TRACK} />
          <div className={s.string} aria-hidden="true"></div>
          <AudioPlayer src={M24_TRACK} />
          <div className={s.string} aria-hidden="true"></div>
          <AudioPlayer src={PHARELLWILLIAMS_TRACK} />
          <div className={s.string} aria-hidden="true"></div>
          <AudioPlayer src={SERGEDEVANT_TRACK} />
        </div>
      </div>
    </section>
  );
}
