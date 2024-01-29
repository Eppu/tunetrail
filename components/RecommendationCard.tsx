import { useState, useRef } from 'react';

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
    <div className="group card card-side bg-base-100 shadow-xl w-auto h-50 relative">
      <audio ref={audioRef} src={previewUrl} />
      <h3>{artistString}</h3>
      <p>{trackName}</p>

      <button
        // if previewUrl is null, disable the button and show a tooltip
        className="btn btn-circle bg-base-300 hover:bg-base-200 text-base-content"
        onClick={handlePlayPreview}
        disabled={!previewUrl}
      >
        {isPlaying ? (
          <svg
            className="w-6 h-6 text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              fill-rule="evenodd"
              d="M8 5a2 2 0 0 0-2 2v10c0 1.1.9 2 2 2h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H8Zm7 0a2 2 0 0 0-2 2v10c0 1.1.9 2 2 2h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1Z"
              clip-rule="evenodd"
            />
          </svg>
        ) : (
          <svg
            className={`w-6 h-6 text-gray-800 ${
              !previewUrl ? 'dark:text-slate-500' : 'dark:text-white'
            }`}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              fill-rule="evenodd"
              d="M8.6 5.2A1 1 0 0 0 7 6v12a1 1 0 0 0 1.6.8l8-6a1 1 0 0 0 0-1.6l-8-6Z"
              clip-rule="evenodd"
            />
          </svg>
        )}
      </button>

      {/* <button disabled={isPlaying}>{isPlaying ? 'Playing...' : 'Play Preview'}</button> */}
    </div>
  );
};

export default RecommendationCard;
