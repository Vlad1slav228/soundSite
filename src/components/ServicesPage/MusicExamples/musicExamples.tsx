import {
  AFTER_TITLE,
  BEFORE_TITLE,
  EMINEM_TRACK,
  KENDRICKLAMAR_TRACK,
  M24_TRACK,
  PHARELLWILLIAMS_TRACK,
  SERGEDEVANT_TRACK,
} from "@/mocks/ServicesPage/musicExamples";
import s from "./musicExamples.module.scss";
import AudioPlayer from "./AudioPlayer/audioPlayer";

export default function MusicExamplesServices() {
  return (
    <section className={s.musicExamplesBlock}>
      <div className={s.stringLineFirst} aria-hidden="true"></div>
      <div className={s.stringLineSecond} aria-hidden="true"></div>
      <div className={s.stringLineThird} aria-hidden="true"></div>
      <div className={`${s.container} ${s.trackGroup}`}>
        <div className={s.beforeTrackBlock}>
          <h2 className={s.trackTitle}>{BEFORE_TITLE}</h2>
          <div className={s.trackBlock}>
            <AudioPlayer src={EMINEM_TRACK} />
            <div className={s.string} aria-hidden="true"></div>
            <AudioPlayer src={KENDRICKLAMAR_TRACK} />
            <div className={s.string} aria-hidden="true"></div>
            <AudioPlayer src={M24_TRACK} />
          </div>
        </div>
        <div className={s.afterTrackBlock}>
          <h2 className={s.trackTitle}>{AFTER_TITLE}</h2>
          <div className={s.trackBlock}>
            <AudioPlayer src={M24_TRACK} />
            <div className={s.string} aria-hidden="true"></div>
            <AudioPlayer src={PHARELLWILLIAMS_TRACK} />
            <div className={s.string} aria-hidden="true"></div>
            <AudioPlayer src={SERGEDEVANT_TRACK} />
          </div>
        </div>
      </div>
    </section>
  );
}
