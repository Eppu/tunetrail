import { Inter } from 'next/font/google';
import SearchBar from '@/components/SearchBar';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import ArtistCard from '@/components/ArtistCard';
import TrackCard from '@/components/TrackCard';
import RecommendationCard from '@/components/RecommendationCard';
import { SearchType } from '@/types';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const { data: session, status } = useSession();

  const [selectedSongs, setSelectedSongs] = useState<any[]>([]);
  const [selectedArtists, setSelectedArtists] = useState<any[]>([]);
  const [recommendations, setRecommendations] = useState<any[]>([]);

  const handleSelect = (item: any, type: string) => {
    type === SearchType.Track
      ? setSelectedSongs([...selectedSongs, item])
      : setSelectedArtists([...selectedArtists, item]);
  };

  const handleRemove = (item: any, type: string) => {
    type === SearchType.Track
      ? setSelectedSongs(selectedSongs.filter((song) => song.id !== item.id))
      : setSelectedArtists(
          selectedArtists.filter((artist) => artist.id !== item.id)
        );
  };

  const getRecommendations = async () => {
    // get the ids of the selected songs and artists
    const songIds = selectedSongs.map((song) => song.id);
    const artistIds = selectedArtists.map((artist) => artist.id);

    if (songIds.length === 0 && artistIds.length === 0) {
      console.log('no songs or artists selected');
      return;
    }
    // console.log('songsids', songIds);
    // console.log('artistids', artistIds);
    const res = await fetch(
      `/api/recommendations?artists=${artistIds}&tracks=${songIds}`
    );
    const data = await res.json();
    if (!res.ok) {
      console.log('error', data);
      return;
    }
    console.log('data', data);
    setRecommendations(data.tracks);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      {/* Main content */}
      <main className="container mx-auto mt-4 p-4">
        <div className="flex justify-center gap-2">
          <SearchBar onSelectItem={handleSelect} />
        </div>
        <div>
          {(selectedSongs.length > 0 || selectedArtists.length > 0) && (
            <div className="flex flex-col gap-5 items-center justify-center w-full pt-2">
              <h2>Your favorites (5 max)</h2>
              <div
                className="flex gap-5 mb-6 items-center justify-center w-full max-md:flex-col max-md:gap-1 max-md:items-start max-md:justify-start"
                style={{ border: '1px solid black' }}
              >
                {selectedSongs.map((song) => (
                  <TrackCard
                    key={song.id}
                    onRemoveItem={handleRemove}
                    track={song}
                  />
                ))}
                {selectedArtists.map((artist) => (
                  <ArtistCard
                    key={artist.id}
                    onRemoveItem={handleRemove}
                    artist={artist}
                  />
                  // <div key={artist.id}>
                  //   <h2>{artist.name}</h2>
                  // </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-5 items-center justify-center w-full pt-6">
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => getRecommendations()}
          >
            Search
          </button>
        </div>
        {recommendations.length > 0 && (
          // for each recommendation, display a card with the song info
          <div className="flex flex-col gap-5 items-center justify-center w-full pt-6">
            <h2>Recommendations</h2>
            <div className="flex flex-col gap-5 items-center justify-center w-full max-md:flex-col max-md:gap-1 max-md:items-start max-md:justify-start">
              {recommendations.map((track) => (
                <RecommendationCard key={track.id} track={track} />
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
