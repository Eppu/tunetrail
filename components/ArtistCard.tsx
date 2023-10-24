interface ArtistCardProps {
  onRemoveItem: (item: any, type: 'artist') => void;
  artist: any;
}

const ArtistCard: React.FC<ArtistCardProps> = ({ onRemoveItem, artist }) => {
  return (
    <div className="group card card-side bg-base-100 shadow-xl w-auto h-50 relative">
      <div className="flex flex-row gap-6 px-4 py-2">
        <figure className="w-14">
          <img className="mask mask-squircle" src={artist.images[0].url} alt={artist.name} />
        </figure>
        <h2 className="card-title">{artist.name}</h2>
      </div>
      <div
        className="absolute inset-0 card bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 flex items-center justify-center backdrop-blur cursor-pointer"
        onClick={() => onRemoveItem(artist, 'artist')}
      >
        <p className="text-white text-2xl">Remove</p>
      </div>
    </div>
  );
};

export default ArtistCard;
