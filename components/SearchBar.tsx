import React from 'react';
import { useState } from 'react';
import { useSession } from 'next-auth/react';

interface SearchComponentProps {
  // onSearch: (query: string, searchType: string) => void;
  // search results
  onSelectItem: (item: any, type: 'track' | 'artist') => void;
}

const SearchBar: React.FC<SearchComponentProps> = ({ onSelectItem }) => {
  const { data: session, status } = useSession();
  const [searchType, setSearchType] = useState<'track' | 'artist'>('track'); // ['track', 'artist'
  const [query, setQuery] = useState<string>('');
  // const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searchResults, setSearchResults] = useState<any>({});

  const getTrackData = async () => {
    const res = await fetch(`/api/search?query=${query}&type=track`);
    const data = await res.json();
    if (!res.ok) {
      console.error(data);
      return;
    }
    console.log(data);
    return data;
  };

  const getArtistData = async () => {
    const res = await fetch(`/api/search?query=${query}&type=artist`);
    const data = await res.json();
    if (!res.ok) {
      console.error(data);
      return;
    }
    console.log(data);
    return data;
  };

  const handleSearch = async () => {
    if (query.trim() === '') {
      // Don't search if the query is empty
      return;
    }

    if (!session) return;
    console.log(query, searchType);

    const data = searchType === 'track' ? await getTrackData() : await getArtistData();

    console.log('got data!11', data);
    if (!data) return;

    setSearchResults(data);
  };

  const handleSearchTypeChange = () => {
    setSearchType(searchType === 'track' ? 'artist' : 'track');
  };

  return (
    <div>
      <div className="flex gap-2 sm:flex-column">
        <input
          type="text"
          placeholder={searchType === 'track' ? 'Search for a track' : 'Search for an artist'}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="input input-bordered  max-w-xl flex-grow"
        />
        <div className="join">
          <input
            className="join-item btn"
            type="radio"
            name="options"
            aria-label="Artist"
            checked={searchType === 'artist'}
            onChange={() => handleSearchTypeChange()}
          />
          <input
            className="join-item btn"
            type="radio"
            name="options"
            aria-label="Track"
            checked={searchType === 'track'}
            onChange={() => handleSearchTypeChange()}
          />
        </div>
      </div>
      <button className="btn" onClick={handleSearch}>
        Search
      </button>

      {/* <h3 className="mb-5 text-lg font-medium text-gray-900 dark:text-white">What are you searching for?</h3> */}

      {Object.keys(searchResults).length !== 0 &&
        (!!searchResults.tracks ? (
          <div>
            {searchResults.tracks.items.map((track: any) => (
              <div
                key={track.id}
                onClick={() => {
                  onSelectItem(track, searchType), setSearchResults({});
                }}
                className="flex flex-col items-center justify-center p-4 border border-gray-300 rounded-md cursor-pointer"
              >
                <h2>{track.name}</h2>
                <p>{track.artists[0].name}</p>
              </div>
            ))}
          </div>
        ) : (
          <div>
            {searchResults.artists.items.map((artist: any) => (
              <div
                key={artist.id}
                onClick={() => {
                  onSelectItem(artist, searchType), setSearchResults({});
                }}
                className="flex flex-col items-center justify-center p-4 border border-gray-300 rounded-md cursor-pointer"
              >
                <h2>{artist.name}</h2>
              </div>
            ))}
          </div>
        ))}
    </div>
  );
};

export default SearchBar;
