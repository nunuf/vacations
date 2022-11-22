import { useEffect, useState } from 'react';
import UserModel from '../Models/UserModel';
import { authStore } from '../Redux/AuthState';

// Custom Hook

function useUser(): UserModel {

  const [user, setUser] = useState<UserModel>();

  useEffect(() => {

    setUser(authStore.getState().user);
    
    const unsubscribe = authStore.subscribe(() => {
      setUser(authStore.getState().user);
    });
    
    return () => unsubscribe();
    
  }, []);

  return user;
}

export default useUser;