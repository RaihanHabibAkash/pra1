import { axiosInstance } from '@/lib/axiosConnect.js';
import { useAuth } from '@clerk/clerk-react';
import { Loader } from 'lucide-react';
import React, { useEffect, useState } from 'react';

// Every request using axiosInstance will automatically include this header:
const updateApiToken = (token) => {
  if(token){
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}` 
  } else {
    delete axiosInstance.defaults.headers.common["Authorization"]
  }
}

const AuthProvider = ({ children }) => {
  const { getToken, userId } = useAuth();
  const [ isLoading, setIsLoading ] = useState(true);

  useEffect(() => {
    const getAuth = async () => {
      try {
        const token = await getToken();
        updateApiToken(token);
      } catch (error) {
        updateApiToken(null);
        console.log("Error in AuthProvider", error);
      } finally{
        setIsLoading(false)
      }
    }

    getAuth();
  }, [getToken]);

  if(isLoading){
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <Loader className="w-12 h-12 text-white animate-spin" />
      </div>
    );
  } else {
    return (<div>{children}</div>);
  }

}

export default AuthProvider;