'use client';

import { useEffect, useRef, useState } from 'react';

export default function LandingPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [volume, setVolume] = useState(0.2);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const video = videoRef.current;

      const moveX = clientX / 150;
      const moveY = clientY / 150;
      if (video instanceof HTMLVideoElement) {
        video.style.transform = `translate(-${moveX}px, -${moveY}px)`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);

    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const handlePlay = () => {
    if (audioRef.current?.muted) {
      audioRef.current.muted = false;
    } else if (audioRef.current?.paused) {
      audioRef.current.play();
    } else {
      audioRef.current?.pause();
    }
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <video
        ref={videoRef}
        className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-100 -z-10"
        src="/background.mp4"
        autoPlay
        loop
        muted
      ></video>
      <audio ref={audioRef} src="/music.mp3" autoPlay loop muted></audio>

      <div className="relative z-10 bg-black p-8 bg-opacity-40 w-full min-h-screen flex flex-col items-center justify-center">
        <div className="absolute right-4 top-4 w-full space-x-4 flex justify-end items-center">
          <button onClick={handlePlay}>Play</button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="w-40"
          />
        </div>
        <h1 className="text-6xl font-bold">STAR WARS</h1>
        <p className="mt-4 text-2xl">
          A long time ago in a galaxy far, far away...
        </p>
        <button className="mt-4 bg-white text-black px-4 py-2 rounded-md hover:bg-gray-400 transition-all duration-300 ease-in-out hover:scale-105">
          Enter
        </button>
      </div>
    </div>
  );
}
