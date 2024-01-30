import { useState, useRef, useEffect } from 'react';
import { PlayIcon } from '@/components/icons/PlayIcon';
import { PauseIcon } from '@/components/icons/PauseIcon';
import Link from 'next/link';

interface RecommendationCardProps {
  track: any;
  volume?: number;
}

const RecommendationCard: React.FC<RecommendationCardProps> = ({ track, volume }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const artistString = track.artists.map((artist: any) => artist.name).join(', ');
  const trackName = track.name;
  const previewUrl = track.preview_url;
  const previewAvailable = previewUrl !== null;

  const audioRef = useRef<HTMLAudioElement>(null);

  // Don't really like using useEffect for this, but oh well...
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (volume) {
      audio.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.onended = () => {
      setIsPlaying(false);
    };
  }, []);

  const handlePlayPreview = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = volume || 0.5;

    if (isPlaying) {
      setIsPlaying(false);
      audio.pause();
      audio.currentTime = 0;
      return;
    }

    setIsPlaying(true);
    audio.play();
    return;
  };

  return (
    <div className="group card card-side bg-base-100 shadow-xl w-2/5 h-50 flex justify-between items-center max-xl:w-full ">
      <audio ref={audioRef} src={previewUrl} />
      <figure className="w-14">
        <img className="mask mask-squircle" src={track.album.images[0].url} alt={track.name} />
      </figure>

      <Link
        href={track.external_urls.spotify}
        target="blank"
        className="cursor-pointer hover:brightness-75 focus:outline-none focus:ring focus:ring-primary"
      >
        <div className="flex flex-col justify-center items-center">
          <p className="text-sm font-bold text-base-content">{artistString}</p>
          <p className="text-md font-bold truncate max-w-md">{trackName}</p>
        </div>
      </Link>
      <button
        // if previewUrl is null, disable the button and show a tooltip
        className="btn btn-circle bg-base-300 hover:bg-base-200 text-base-content"
        onClick={handlePlayPreview}
        disabled={!previewAvailable}
      >
        {isPlaying ? <PauseIcon /> : <PlayIcon disabled={!previewAvailable} />}
      </button>
    </div>
  );
};

export default RecommendationCard;
