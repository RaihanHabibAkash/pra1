import { SignedIn, SignedOut, SignOutButton } from '@clerk/clerk-react';
import { LayoutDashboardIcon } from 'lucide-react';
import React from 'react'
import { Link } from 'react-router-dom';
import SignInAuthButton from './components/SignInAuthButton.jsx';

const TopBar = () => {
    const isAdmin = true;


  return (
    <div className="w-full h-10 bg-zinc-800/90 flex justify-between 
      items-center backdrop-blur-lg sticky top-0 p-4 z-10">
      
      <div className="flex items-center gap-8">

        <div className="flex items-center gap-2">
          <a href="https://github.com/RaihanHabibAkash" target="_blank">
            <img src="../public/photos/logo.png" alt="Ash Music Player Logo" className="h-8" />
          </a>
            <p className="text-base">Music Player</p>
        </div>

         {isAdmin && (
        <Link to={"/admin"}>
            <LayoutDashboardIcon className="size-7" />
        </Link>
        )}
        
      </div>

      <div className="mr-4">
        <SignedOut>
            <SignInAuthButton />
        </SignedOut>

        <SignedIn>
            <SignOutButton />
        </SignedIn>
      </div>
      
    </div>
  )
}

export default TopBar;
