import { axiosInstance } from '@/lib/axiosConnect';
import { useAuth } from '@clerk/clerk-react';
import React, { useState } from 'react';

const updateApiToken = (token) => {
    if(token) {
        axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`
    } else {
        delet.axiosInstance.defaults.headers.common["Authorization"];
    }
}

const AuthProvider = () => {
  const { getToken, userId } = useAuth();
  const [ isLoading, setIsLoading ] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = getToken();
        updateApiToken(token);
      } catch (error) {
        updateApiToken(null);
        console.log("Error in AuthProvider", error);
      } finally {
        setIsLoading(false);
      }
    }

    initAuth();
  },[getToken]);

}

export default AuthProvider;