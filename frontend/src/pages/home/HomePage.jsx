import React, { useEffect } from 'react';
import TopBar from '../Components/TopBar/TopBar.jsx';
import { ScrollArea } from '@/components/ui/scroll-area.jsx';
import { musicStore } from '@/stores/musicStore.js';
import FeaturedSection from './components/FeaturedSection.jsx';
import MadeForYouSection from './components/madeForYouSection/MadeForYouSection.jsx';
import FavGenreSection from './components/favGenreSection/FavGenreSection.jsx';
import FavLanguageSection from './components/favLanguageSection/FavLanguageSection.jsx';
import TrendingSection from './components/trendingSection/TrendingSection.jsx';
import LikedSection from './components/LikedSection.jsx';
import PlayedSection from './components/PlayeSection.jsx';
import { useAuth } from '@clerk/clerk-react';

const HomePage = () => {
  const { isLoaded, isSignedIn } = useAuth();

  if(!isLoaded) return null;

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
    if(!isSignedIn) return;

    fetchFeaturedSongs();
    fetchMadeForYouSongs();
    fetchTrendingSongs();
    fetchFavGenreSongs();
    fetchFavLanguageSongs();
    fetchLikedSongs();
    fetchRecentlyPlayedSongs();
  },[ isSignedIn ]);

  if(!isSignedIn) {
    return(
      <main className="bg-gradient-to-b from-zinc-700 to-zinc-900 rounded-lg h-full">
        <TopBar />
        <div className="mt-20">
          <h2 className="text-green-500 text-4xl sm:text-7xl truncate text-center animate-pulse duration-300">
            Please Log IN
          </h2>
        </div>
      </main>
    );
  } else {
    return (
      <main className="bg-gradient-to-b from-zinc-700 to-zinc-900 rounded-lg h-full">
        <TopBar />
        <ScrollArea className="h-[calc(100vh-180px)]">
          <div className="p-4 sm:p-6 flex flex-col">
            <FeaturedSection />
            <MadeForYouSection />
            <TrendingSection />
            <FavGenreSection />
            <FavLanguageSection />
            <LikedSection />
            <PlayedSection />
          </div>
        </ScrollArea>
      </main>
    );
  }

  
}

export default HomePage;
