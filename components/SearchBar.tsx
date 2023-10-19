import React from 'react';
import { useState } from 'react';
import { useSession } from 'next-auth/react';

interface SearchComponentProps {
  // onSearch: (query: string, searchType: string) => void;
  // search results
  onSelectItem?: (item: any) => void;
}

const SearchBar: React.FC<SearchComponentProps> = ({ onSelectItem }) => {
  const { data: session, status } = useSession();
  const [query, setQuery] = useState<string>('');
  const [searchType, setSearchType] = useState<string>('track'); // Default to searching for tracks
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const handleSearch = async () => {
    if (query.trim() === '') {
      // Don't search if the query is empty
      return;
    }

    if (!session) return;
    console.log(query, searchType);

    // Fetch results from /api/search with GET request. Then handle errors.
    const res = await fetch(`/api/search?query=${query}&type=${searchType}`);
    const data = await res.json();
    if (!res.ok) {
      console.error(data);
      return;
    }
    console.log(data);

    // get all the results from the items array. they can either be under tracks or artists
    const results = data.tracks?.items || data.artists?.items || [];
    setSearchResults(results);
    console.log('search results: ', results);
    return data;
  };

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder={
            searchType === 'track'
              ? 'Search for a track'
              : 'Search for an artist'
          }
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="input input-bordered w-full max-w-xs"
        />
      </div>
      <div>
        <label>
          <input
            type="radio"
            value="track"
            checked={searchType === 'track'}
            onChange={() => setSearchType('track')}
          />
          Track
        </label>
        <label>
          <input
            type="radio"
            value="artist"
            checked={searchType === 'artist'}
            onChange={() => setSearchType('artist')}
          />
          Artist
        </label>
      </div>
      <button className="btn" onClick={handleSearch}>
        Search
      </button>
      {searchResults.length > 0 && (
        <div className="grid grid-cols-2 gap-4">
          {searchResults.map((item) => (
            <div
              key={item.id}
              className="flex flex-col items-center justify-center"
            >
              <p className="text-center">{item.name}</p>
              <button
                className="btn btn-sm"
                onClick={() => onSelectItem && onSelectItem(item)}
              >
                Select
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
