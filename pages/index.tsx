import Image from 'next/image';
import { Inter } from 'next/font/google';
import LoginButton from '@/components/login-btn';
import SearchBar from '@/components/SearchBar';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const { data: session, status } = useSession();

  const [selectedSongs, setSelectedSongs] = useState<any[]>([]);
  const [selectedArtists, setSelectedArtists] = useState<any[]>([]);
  const [recommendations, setRecommendations] = useState<any[]>([]);

  const handleSelect = (item: any, type: string) => {
    type === 'track' ? setSelectedSongs([...selectedSongs, item]) : setSelectedArtists([...selectedArtists, item]);
  };

  const getRecommendations = async () => {
    // get the ids of the selected songs and artists
    const songIds = selectedSongs.map((song) => song.id);
    const artistIds = selectedArtists.map((artist) => artist.id);
    // call api/recommendations
    // use artists and tracks as query params.
    // both should be comma separated lists of ids
    console.log('songsids', songIds);
    console.log('artistids', artistIds);
    const res = await fetch(`/api/recommendations?artists=${artistIds}&tracks=${songIds}`);
    const data = await res.json();
    console.log('data', data);
    setRecommendations(data.tracks);
  };

  return (
    <main className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}>
      <LoginButton />
      <div className="flex gap-5 items-center justify-center w-full">
        <SearchBar onSelectItem={handleSelect} searchType="track" />
        <SearchBar onSelectItem={handleSelect} searchType="artist" />
      </div>
      <button
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => getRecommendations()}
      >
        Button
      </button>
      {recommendations.length > 0 && JSON.stringify(recommendations.map((rec) => rec.name))}
      <div className="flex gap-5 items-center justify-center w-full">
        <div
          className="flex flex-col gap-5 items-center justify-center w-1/2"
          style={{ border: '1px solid black', height: '50vh' }}
        >
          <h2>selected songs</h2>
          {selectedSongs.map((song) => (
            <div key={song.id}>
              <h2>{song.name}</h2>
              <p>{song.artists[0].name}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-5 items-center justify-center w-full">
        <div
          className="flex flex-col gap-5 items-center justify-center w-1/2"
          style={{ border: '1px solid black', height: '50vh' }}
        >
          <h2>selected artists</h2>
          {selectedArtists.map((artist) => (
            <div key={artist.id}>
              <h2>{artist.name}</h2>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
