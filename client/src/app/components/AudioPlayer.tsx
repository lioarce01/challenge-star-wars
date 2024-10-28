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
      audioRef.current.muted = volume === 0;
      audioRef.current.play();
    } else {
      audioRef.current.volume = volume;
      audioRef.current.muted = volume === 0;
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
    <div className="fixed bottom-0 left-0 w-auto bg-transparent p-4 z-20">
      <div className="flex items-center space-x-4">
        <button
          className="bg-gray-700 text-white px-3 py-2 rounded-full transition-all duration-300 hover:bg-yellow-400"
          onClick={handlePlay}
          aria-label={isPlaying ? 'Pause audio' : 'Play audio'}
        >
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          className="w-40"
          aria-label="Volume control"
        />
      </div>
    </div>
  );
};

export default AudioPlayer;
