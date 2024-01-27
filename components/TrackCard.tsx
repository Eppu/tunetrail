import { SearchType } from '@/types';

interface TrackCardProps {
  onRemoveItem: (item: any, type: SearchType.Track) => void;
  track: any;
}

const TrackCard: React.FC<TrackCardProps> = ({ onRemoveItem, track }) => {
  console.log(track);
  const artistString = track.artists.map((artist: any) => artist.name).join(', ');
  return (
    <div className="group card card-side bg-base-100 shadow-xl w-auto h-50 relative">
      {/* <span className="badge badge-ghost badge-sm absolute -top-2 -right-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="inline-block w-4 h-4 stroke-current"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </span> */}
      <div className="flex flex-row gap-6 px-4 py-2">
        <figure className="w-14">
          <img className="mask mask-squircle" src={track.album.images[0].url} alt={track.name} />
        </figure>
        <h2 className="card-title">
          {artistString} - {track.name}
        </h2>
      </div>
      <div
        className="absolute inset-0 card bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center backdrop-blur cursor-pointer"
        onClick={() => onRemoveItem(track, SearchType.Track)}
      >
        <p className="text-white text-2xl">Remove</p>
      </div>
    </div>
  );
};

export default TrackCard;
