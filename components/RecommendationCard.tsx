import { useState, useRef } from 'react';
import { PlayIcon } from '@/components/icons/PlayIcon';
import { PauseIcon } from '@/components/icons/PauseIcon';

interface RecommendationCardProps {
  track: any;
}

const RecommendationCard: React.FC<RecommendationCardProps> = ({ track }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const artistString = track.artists
    .map((artist: any) => artist.name)
    .join(', ');
  const trackName = track.name;
  const previewUrl = track.preview_url;
  const previewAvailable = previewUrl !== null;

  const audioRef = useRef<HTMLAudioElement>(null);

  const handlePlayPreview = () => {
    const audio = audioRef.current;
    if (!audio) return;

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
    <div className="group card card-side bg-base-100 shadow-xl w-2/5 h-50 flex justify-between items-center">
      <audio ref={audioRef} src={previewUrl} />
      <figure className="w-14">
        <img
          className="mask mask-squircle"
          src={track.album.images[0].url}
          alt={track.name}
        />
      </figure>
      <h3>{artistString}</h3>
      <p>{trackName}</p>

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
