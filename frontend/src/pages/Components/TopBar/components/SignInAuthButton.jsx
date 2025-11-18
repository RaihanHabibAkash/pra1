import { Button } from '@/components/ui/button';
import { useSignIn } from '@clerk/clerk-react'
import React from 'react'

// For TopBar.jsx
const SignInAuthButton = () => {
    const { signIn, isLoaded} = useSignIn();

    const signInWithGoogle = () => {
        signIn.authenticateWithRedirect({
            strategy: "oauth_google",
            redirectUrl: "/sso-callback",
            redirectUrlComplete: "/auth-callback"
        });
    }

    if(!isLoaded){
        return null;
    } else {
        return (
            <div className="flex">
                <Button onClick={signInWithGoogle} variant="secondary" className="bg-zinc-700/70 cursor-pointer hover:text-cyan-500" >
                    Continue with Google
                </Button>
            </div>
        );
    }   


  
}

export default SignInAuthButton;
