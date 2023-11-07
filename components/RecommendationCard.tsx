import React from 'react';

type RecommendationCardProps = {
  track: {
    album: {
      images: {
        url: string;
      }[];
    };
    name: string;
    artists: {
      name: string;
    }[];
    preview_url: string;
    external_urls: {
      spotify: string;
    };
  };
};

const RecommendationCard: React.FC<RecommendationCardProps> = ({ track }) => {
  return (
    <div>
      <img src={track.album.images[0].url} alt={track.name} />
      <h3>{track.name}</h3>
      <p>{track.artists[0].name}</p>
      <audio controls src={track.preview_url}>
        Your browser does not support the audio element.
      </audio>
      <a
        href={track.external_urls.spotify}
        target="_blank"
        rel="noopener noreferrer"
      >
        Listen on Spotify
      </a>
    </div>
  );
};

export default RecommendationCard;
