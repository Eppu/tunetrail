import SearchBar from '@/components/SearchBar';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import ArtistCard from '@/components/ArtistCard';
import TrackCard from '@/components/TrackCard';
import { SearchType } from '@/types';
import RecommendationCard from '@/components/RecommendationCard';
import { SearchButton } from '@/components/SearchButton';
import RecommendationList from '@/components/RecommendationList';

export default function Home() {
  const { data: session, status } = useSession();

  const [selectedSongs, setSelectedSongs] = useState<any[]>([]);
  const [selectedArtists, setSelectedArtists] = useState<any[]>([]);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);

  const handleSelect = (item: any, type: string) => {
    type === SearchType.Track
      ? setSelectedSongs([...selectedSongs, item])
      : setSelectedArtists([...selectedArtists, item]);
  };

  const handleRemove = (item: any, type: string) => {
    type === SearchType.Track
      ? setSelectedSongs(selectedSongs.filter((song) => song.id !== item.id))
      : setSelectedArtists(selectedArtists.filter((artist) => artist.id !== item.id));
  };

  const getRecommendations = async () => {
    setIsSearching(true);
    // get the ids of the selected songs and artists
    const songIds = selectedSongs.map((song) => song.id);
    const artistIds = selectedArtists.map((artist) => artist.id);

    if (songIds.length === 0 && artistIds.length === 0) {
      console.log('no songs or artists selected');
      return;
    }

    const res = await fetch(`/api/recommendations?artists=${artistIds}&tracks=${songIds}`);
    const data = await res.json();
    if (!res.ok) {
      console.log('error', data);
      setIsSearching(false);
      return;
    }
    console.log('data', data);
    setRecommendations(data.tracks);
    setIsSearching(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Main content */}
      <main className="container mx-auto mt-4 p-4">
        <Navbar />
        <div className="flex flex-col gap-5 items-center justify-center w-full">
          <h2 className="my-4 text-">
            Select 1-5 of your favourite songs and hit Search to get recommended with new songs you may like!
          </h2>
          {(selectedSongs.length > 0 || selectedArtists.length > 0) && (
            <div
              className="flex gap-5 mb-6 items-center justify-center w-full max-md:flex-col max-md:gap-1 max-md:items-start max-md:justify-start"
              style={{ border: '1px solid black' }}
            >
              {selectedSongs.map((song) => (
                <TrackCard key={song.id} onRemoveItem={handleRemove} track={song} />
              ))}
              {selectedArtists.map((artist) => (
                <ArtistCard key={artist.id} onRemoveItem={handleRemove} artist={artist} />
                // <div key={artist.id}>
                //   <h2>{artist.name}</h2>
                // </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-center gap-2">
          <SearchBar onSelectItem={handleSelect} />
        </div>
        <div className="flex flex-col gap-5 items-center justify-center w-full pt-6">
          {
            // if no songs or artists are selected, display a tooltip to prompt the user to select some
            selectedSongs.length === 0 && selectedArtists.length === 0 ? (
              <div
                className="tooltip tooltip-primary"
                data-tip="Select at least 1 song or artist to search for recommendations!"
              >
                <SearchButton disabled={true} onClick={() => getRecommendations()} />
              </div>
            ) : (
              <SearchButton
                disabled={selectedSongs.length === 0 && selectedArtists.length === 0}
                onClick={() => getRecommendations()}
                isLoading={isSearching}
              />
            )
          }
        </div>
        <RecommendationList recommendations={recommendations} />
      </main>

      <Footer />
    </div>
  );
}
