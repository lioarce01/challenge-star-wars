'use client';

import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store/store';
import { setVolume, togglePlay } from '../redux/slices/audioSlice';
import { PlayIcon, PauseIcon } from 'lucide-react';

const AudioPlayer = () => {
  const volume = useSelector((state: RootState) => state.audio.volume);
  const isPlaying = useSelector((state: RootState) => state.audio.isPlaying);
  const dispatch = useDispatch();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio('/music.mp3');
      audioRef.current.loop = true;
      audioRef.current.play();
    } else {
      audioRef.current.volume = volume;
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [volume, isPlaying]);

  const handlePlay = () => {
    dispatch(togglePlay());
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setVolume(Number(e.target.value)));
  };

  return (
    <>
      <div className="z-10 flex flex-row items-center absolute left-4 bottom-4 space-x-4">
        <button
          className="bg-[#29282880] text-white px-2 py-1 rounded-md transition-all duration-300 ease-in-out hover:scale-105"
          onClick={handlePlay}
        >
          {isPlaying ? <PauseIcon /> : <PlayIcon />}
        </button>
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
    </>
  );
};

export default AudioPlayer;
