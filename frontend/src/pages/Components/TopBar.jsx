import { SignedIn, SignedOut, SignOutButton } from '@clerk/clerk-react';
import { LayoutDashboardIcon } from 'lucide-react';
import React from 'react'
import { Link } from 'react-router-dom';
import SignInAuthButton from './SubComponents/SignInAuthButton.jsx';

const TopBar = () => {
    const isAdmin = true;


  return (
    <div className="w-full h-10 bg-zinc-800/90 flex justify-between 
      items-center backdrop-blur-lg sticky top-0 p-2">
      

      <div className="">
        <SignedOut>
            <SignInAuthButton />
        </SignedOut>

        <SignedIn>
            <SignOutButton />
        </SignedIn>
      </div>


      <div className="flex items-center gap-2">
        {isAdmin && (
        <Link to={"/admin"}>
            <LayoutDashboardIcon className="m-4" />
        </Link>
      )}
        <img src="../public/photos/logo.png" alt="Ash Music Player Logo" className="h-10" />
        <p>Music Player</p>
      </div>

      
    </div>
  )
}

export default TopBar;
