import { SignedOut, UserButton } from '@clerk/clerk-react';
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
    <div className="w-full h-14 bg-zinc-900 flex items-center backdrop-blur-lg sticky top-0 p-4 z-10 
    border-t-2 border-b-2 border-green-500/35 rounded-lg justify-around">
      
        <div className="flex items-center gap-2">
          <a href="https://github.com/RaihanHabibAkash" target="_blank">
            <img src="../public/photos/logo.png" alt="Ash Music Player Logo" className="h-8" />
          </a>
            <p className="text-bold hidden sm:inline">Music Player</p>
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
        </div>

        <div className="flex items-center">
        {/* Will be shown if the user if logged out */}
        <SignedOut>
            <SignInAuthButton />
        </SignedOut>

        {/* Will be shown if user if Logged in */}
        <UserButton />
        </div>

    </div>
  )
}

export default TopBar;
