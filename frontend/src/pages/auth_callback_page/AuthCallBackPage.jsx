import { Card, CardContent } from '@/components/ui/card';
import { axiosInstance } from '@/lib/axiosConnect';
import { useUser } from '@clerk/clerk-react'
import { Loader } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthCallBackPage = () => {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();
  const syncAttempted = useRef(false);

  useEffect(() => {
    const syncUser = async () => {
      try {
        if(!user || !isLoaded || syncAttempted.current === true ) {
          return
        }

        await axiosInstance.post("/auth/callback", {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          imageUrl: user.imageUrl
        });

        // Api will be called for only one time.
        syncAttempted.current = true;
      } catch (error) {
        console.log("Error in AuthCallBackPage", error);
      } finally {
        navigate("/")
      }

      syncUser();
    }

  }, [ user, isLoaded, syncAttempted, navigate ] );

  return (
    <div className="w-full h-screen bg-black flex justify-center items-center">
      <Card className="w-[80%] max-w-md bg-zinc-800 border-green-500">
        <CardContent className="flex flex-col items-center gap-8">
          <Loader className="size-8 text-green-500 animate-spin" />
          <h3 className="text-md">Logging you in</h3>
        </CardContent>
      </Card>
    </div>
  )
}

export default AuthCallBackPage;



