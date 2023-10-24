import React from 'react';
import { useState } from 'react';
import { useSession } from 'next-auth/react';

interface SearchComponentProps {
  // onSearch: (query: string, searchType: string) => void;
  // search results
  onSelectItem: (item: any, type: 'track' | 'artist') => void;
  searchType: 'track' | 'artist';
}

const SearchBar: React.FC<SearchComponentProps> = ({ onSelectItem, searchType }) => {
  const { data: session, status } = useSession();
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

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder={searchType === 'track' ? 'Search for a track' : 'Search for an artist'}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="input input-bordered w-full max-w-xs"
        />
      </div>
      <button className="btn" onClick={handleSearch}>
        Search
      </button>

      {/* <h3 className="mb-5 text-lg font-medium text-gray-900 dark:text-white">What are you searching for?</h3>
      <ul className="grid w-full gap-6 md:grid-cols-2">
        <li>
          <input
            type="radio"
            id="hosting-small"
            name="hosting"
            value="hosting-small"
            className="hidden peer"
            required
          />
          <label
            htmlFor="hosting-small"
            className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            <div className="block">
              <div className="w-full text-lg font-semibold">0-50 MB</div>
              <div className="w-full">Good for small websites</div>
            </div>
            <svg
              className="w-5 h-5 ml-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </label>
        </li>
        <li>
          <input type="radio" id="hosting-big" name="hosting" value="hosting-big" className="hidden peer" />
          <label
            htmlFor="hosting-big"
            className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            <div className="block">
              <div className="w-full text-lg font-semibold">500-1000 MB</div>
              <div className="w-full">Good for large websites</div>
            </div>
            <svg
              className="w-5 h-5 ml-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </label>
        </li>
      </ul> */}

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
