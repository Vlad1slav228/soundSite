"use client";

import { useRef, useState, useEffect } from "react";
import s from "./audioPlayer.module.scss";
import Image from "next/image";
import { PAUSE_ICON, PLAY_ICON } from "@/mocks/MainPage/musicExamples";

type AudioPlayerProps = Readonly<{
  src: string;
}>;

export default function AudioPlayer({ src }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [duration, setDuration] = useState("0:00");

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      setProgress((audio.currentTime / audio.duration) * 100 || 0);
      setCurrentTime(formatTime(audio.currentTime));
    };

    const updateDuration = () => {
      if (!isNaN(audio.duration)) {
        setDuration(formatTime(audio.duration));
      }
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(0);
      setCurrentTime("0:00");
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
      }
    };

    const handleExternalPlay = (e: Event) => {
      if (e.target !== audio && audio && !audio.paused) {
        audio.pause();
        audio.currentTime = 0;
        setIsPlaying(false);
        setProgress(0);
        setCurrentTime("0:00");
      }
    };

    if (audio.readyState >= 1) {
      updateDuration();
    }

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", handleEnded);
    window.addEventListener("play", handleExternalPlay, true);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", handleEnded);
      window.removeEventListener("play", handleExternalPlay, true);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;
    const value = Number(e.target.value);
    audio.currentTime = (value / 100) * audio.duration;
    setProgress(value);
  };

  const formatTime = (seconds: number): string => {
    if (isNaN(seconds)) return "00:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60)
      .toString()
      .padStart(2, "0");
    return `${mins}:${secs}`;
  };

  return (
    <div className={s.audioTrackBlock}>
      <button onClick={togglePlay} className={s.playButton}>
        <Image
          src={isPlaying ? PAUSE_ICON : PLAY_ICON}
          alt={isPlaying ? "Пауза" : "Воспроизвести"}
        />
      </button>
      <div className={s.audioTrackControls}>
        <span className={s.time}>{currentTime}</span>
        <input
          type="range"
          min="0"
          max="100"
          value={progress}
          onChange={handleSliderChange}
          className={s.progress}
          style={{ "--progress": `${progress}%` } as React.CSSProperties}
        />
        <span className={s.time}>{duration}</span>
        <audio ref={audioRef} src={src} preload="metadata">
          <track kind="captions" srcLang="ru" label="Субтитры отсутствуют" />
        </audio>
      </div>
    </div>
  );
}
