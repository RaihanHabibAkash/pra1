import React, { useEffect } from 'react';
import TopBar from '../Components/TopBar/TopBar.jsx';
import { ScrollArea } from '@/components/ui/scroll-area.jsx';
import { musicStore } from '@/stores/musicStore.js';
import FeaturedSection from './components/FeaturedSection.jsx';
import MadeForYouSection from './components/MadeForYouSection.jsx';
import TrendingSection from './components/TrendingSection.jsx';
import FavGenreSection from './components/FavGenreSection.jsx';
import FavLanguageSection from './components/FavLanguageSection.jsx';
import LikedSongsSection from './components/LikedSongsSection.jsx';
import RecentlyPlayedSection from './components/RecentlyPlayedSection.jsx';

const HomePage = () => {
  const { 
    fetchFeaturedSongs, 
    fetchMadeForYouSongs, 
    fetchTrendingSongs, 
    fetchFavGenreSongs,
    fetchFavLanguageSongs,
    fetchLikedSongs,
    fetchRecentlyPlayedSongs
  } = musicStore();

  useEffect(() => {
    fetchFeaturedSongs();
    fetchMadeForYouSongs();
    fetchTrendingSongs();
    fetchFavGenreSongs();
    fetchFavLanguageSongs();
    fetchLikedSongs();
    fetchRecentlyPlayedSongs();
  },[ 
     fetchFeaturedSongs,
      fetchMadeForYouSongs,
      fetchTrendingSongs,
      fetchFavGenreSongs,
      fetchFavLanguageSongs,
      fetchLikedSongs,
      fetchRecentlyPlayedSongs 
    ]);

  return (
    <main className="bg-gradient-to-b from-zinc-700 to-zinc-900 rounded-lg h-full">
      <TopBar />
      <ScrollArea className="h-[calc(100vh-200px)]">
        <div className="p-4 sm:p-6 flex flex-col">
          <FeaturedSection />
          <MadeForYouSection />
          <TrendingSection />
          <FavGenreSection />
          <FavLanguageSection />
          <LikedSongsSection />
          <RecentlyPlayedSection />

        </div>
      </ScrollArea>
    </main>
  );
}

export default HomePage;
