import React from 'react';
import { useState } from 'react';

interface SearchComponentProps {
  onSearch: (query: string, searchType: string) => void;
}

const SearchBar: React.FC<SearchComponentProps> = ({ onSearch }) => {
  const [query, setQuery] = useState<string>('');
  const [searchType, setSearchType] = useState<string>('track'); // Default to searching for tracks

  const handleSearch = () => {
    if (query.trim() === '') {
      // Don't search if the query is empty
      return;
    }

    onSearch(query, searchType);
  };

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Enter your search query"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border-2 border-gray-300 rounded-lg p-2 text-black"
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
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
