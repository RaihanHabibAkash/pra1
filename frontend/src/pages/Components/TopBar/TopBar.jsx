import { SignedIn, SignedOut, SignOutButton, UserButton } from '@clerk/clerk-react';
import { LayoutDashboardIcon } from 'lucide-react';
import React from 'react'
import { Link } from 'react-router-dom';
import SignInAuthButton from './components/SignInAuthButton.jsx';
import { authStore } from '@/stores/authStore.js';
import { cn } from '@/lib/utils.js';
import { buttonVariants } from '@/components/ui/button.jsx';

const TopBar = () => {
  const { isAdmin } = authStore(); 

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
        
        <div className="flex items-center gap-4">
         {isAdmin && (
        <Link to={"/admin"} className={cn(
          buttonVariants({ variant: "outline"}) 
          )}>
            <LayoutDashboardIcon className="size-7 md:mr-2" />
            <span className="hidden md:inline">Admin Dashboard</span>
        </Link>
        )}
        
        {/* Will be shown if the user if logged out */}
        <SignedOut>
            <SignInAuthButton />
        </SignedOut>

        {/* Will be shown if user if Logged in */}
        <UserButton />
        </div>

      </div>
    </div>
  )
}

export default TopBar;
