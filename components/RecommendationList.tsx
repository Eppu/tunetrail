import RecommendationCard from './RecommendationCard';
import { useState } from 'react';

interface RecommendationListProps {
  recommendations: any[];
}

const RecommendationList: React.FC<RecommendationListProps> = ({ recommendations }) => {
  const [volume, setVolume] = useState<number>(0.5);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseInt(e.target.value) / 100);
  };

  return (
    <>
      {recommendations.length > 0 && (
        // for each recommendation, display a card with the song info
        <div className="flex flex-col gap-5 items-center justify-center w-full pt-6">
          Volume
          <input
            type="range"
            min={0}
            max="100"
            value={volume * 100}
            className="range range-primary max-w-md w-full"
            onChange={(e) => handleVolumeChange(e)}
          />
          <h2 className="text-2xl font-bold">Recommended songs</h2>
          <div className="flex flex-col gap-5 items-center justify-center w-full max-md:flex-col max-md:gap-1 max-md:items-start max-md:justify-start">
            {recommendations.map((track) => (
              <RecommendationCard key={track.id} track={track} volume={volume} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default RecommendationList;
