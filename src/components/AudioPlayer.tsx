'use client';

import { useState, useRef, useEffect } from 'react';
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute } from 'react-icons/fa';

const STREAM_URL = 'https://dattatreya.s02.radio-tochka.com:1255/stream';

const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlay = async () => {
    if (audioRef.current) {
      try {
        if (isPlaying) {
          audioRef.current.pause();
        } else {
          setError(null);
          await audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
      } catch (err) {
        setError('Unable to play stream. Please try again later.');
        setIsPlaying(false);
      }
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const handleError = () => {
    setError('Stream error. Please try again later.');
    setIsPlaying(false);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-lg border-t border-teal-500/20 p-4 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <audio
          ref={audioRef}
          src={STREAM_URL}
          preload="none"
          onError={handleError}
        />
        
        <div className="flex items-center gap-4">
          <button
            onClick={togglePlay}
            className="w-12 h-12 rounded-full bg-teal-500 hover:bg-teal-400 transition-colors flex items-center justify-center text-black"
            title={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
          </button>
          
          <div className="flex flex-col">
            <div className="text-teal-500 font-medium">
              {isPlaying ? 'Now Playing' : 'Radio Stream'}
            </div>
            {error && (
              <div className="text-red-500 text-sm mt-1">
                {error}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleMute}
            className="text-teal-500 hover:text-teal-400 transition-colors"
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <FaVolumeMute size={20} /> : <FaVolumeUp size={20} />}
          </button>
          
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="w-24 h-2 bg-teal-500/20 rounded-lg appearance-none cursor-pointer"
            title="Volume"
          />
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer; 