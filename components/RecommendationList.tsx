import { useState, useRef } from 'react';
import { PlayIcon } from '@/components/icons/PlayIcon';
import { PauseIcon } from '@/components/icons/PauseIcon';
import RecommendationCard from './RecommendationCard';

interface RecommendationListProps {
  recommendations: any[];
}

const RecommendationList: React.FC<RecommendationListProps> = ({ recommendations }) => {
  return (
    <>
      {recommendations.length > 0 && (
        // for each recommendation, display a card with the song info
        <div className="flex flex-col gap-5 items-center justify-center w-full pt-6">
          <h2 className="text-2xl font-bold">Recommended songs</h2>

          <div className="flex flex-col gap-5 items-center justify-center w-full max-md:flex-col max-md:gap-1 max-md:items-start max-md:justify-start">
            {recommendations.map((track) => (
              <RecommendationCard key={track.id} track={track} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default RecommendationList;
