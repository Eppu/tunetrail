import React from 'react';
import { useState, useMemo, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import debounce from 'lodash.debounce';
import { SearchType, TSearchType } from '@/types';

interface SearchComponentProps {
  // onSearch: (query: string, searchType: string) => void;
  // search results
  onSelectItem: (item: any, type: TSearchType) => void;
}

const SearchBar: React.FC<SearchComponentProps> = ({ onSelectItem }) => {
  const { data: session, status } = useSession();
  const [searchType, setSearchType] = useState<TSearchType>(SearchType.Track);
  const [query, setQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<any>({});

  // run search when query changes
  useEffect(() => {
    const debouncedSearch = debounce(() => handleSearch(query), 300);
    debouncedSearch();
    return debouncedSearch.cancel;
  }, [query, searchType]);

  const getTrackData = async (query: string) => {
    const res = await fetch(`/api/search?query=${query}&type=track`);
    const data = await res.json();
    if (!res.ok) {
      console.error(data);
      return;
    }
    console.log(data);
    return data;
  };

  const getArtistData = async (query: string) => {
    const res = await fetch(`/api/search?query=${query}&type=artist`);
    const data = await res.json();
    if (!res.ok) {
      console.error(data);
      return;
    }
    console.log(data);
    return data;
  };

  const handleSearch = async (query: string) => {
    if (query.trim() === '') {
      // Don't search if the query is empty, set search results to empty object and return
      setSearchResults({});

      return;
    }

    if (!session) return;

    const data = searchType === SearchType.Track ? await getTrackData(query) : await getArtistData(query);

    if (!data) return;

    setSearchResults(data);
  };

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSearchTypeChange = () => {
    setSearchType(searchType === SearchType.Track ? SearchType.Artist : SearchType.Track);
  };

  return (
    <div className="flex w-full justify-center">
      <div className="flex gap-2 flex-grow justify-center flex-col max-w-2xl">
        <div className="flex flex-row flex-grow ">
          <input
            type="text"
            placeholder={searchType === SearchType.Track ? 'Search for a track' : 'Search for an artist'}
            // value={query}
            autoFocus={true}
            onChange={(e) => handleQueryChange(e)}
            className="input input-bordered w-full max-w-2xl"
          />

          <div className="join">
            <input
              className="join-item btn"
              type="radio"
              name="options"
              aria-label="Artist"
              checked={searchType === SearchType.Artist}
              onChange={() => handleSearchTypeChange()}
            />
            <input
              className="join-item btn"
              type="radio"
              name="options"
              aria-label="Track"
              checked={searchType === SearchType.Track}
              onChange={() => handleSearchTypeChange()}
            />
          </div>
        </div>
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
      {/* <button className="btn" onClick={handleSearch}>
        Search
      </button> */}

      {/* <h3 className="mb-5 text-lg font-medium text-gray-900 dark:text-white">What are you searching for?</h3> */}
    </div>
  );
};

export default SearchBar;
