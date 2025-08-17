import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(async (usr) => {
      if (usr) {
        setUser(usr);
        await AsyncStorage.setItem('userToken', usr.uid);
      } else {
        setUser(null);
        await AsyncStorage.removeItem('userToken');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = (email, password) => {
    return auth().signInWithEmailAndPassword(email, password);
  };

  const register = (email, password) => {
    return auth().createUserWithEmailAndPassword(email, password);
  };

  const logout = () => {
    return auth().signOut();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
