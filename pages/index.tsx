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

  const handleSelect = (item: any, type: string) => {
    type === 'track'
      ? setSelectedSongs([...selectedSongs, item])
      : setSelectedArtists([...selectedArtists, item]);
  };

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <LoginButton />
      <div className="flex gap-5 items-center justify-center w-full">
        <SearchBar onSelectItem={handleSelect} searchType="track" />
        <SearchBar onSelectItem={handleSelect} searchType="artist" />
      </div>
      <h2>selected songs</h2>
      {selectedSongs.map((song) => (
        <div key={song.id}>
          <h2>{song.name}</h2>
          <p>{song.artists[0].name}</p>
        </div>
      ))}

      <h2>selected artists</h2>
      {selectedArtists.map((artist) => (
        <div key={artist.id}>
          <h2>{artist.name}</h2>
        </div>
      ))}
    </main>
  );
}
