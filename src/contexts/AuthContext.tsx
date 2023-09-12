import { useState,useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { auth } from "../firebase.ts";
import React from "react"
import { User } from "firebase/auth";
 
type AuthContextProps = {
  user: User | null | undefined;
}

export const AuthContext = React.createContext<AuthContextProps>({user:null});

 


type AuthProviderProps = {
 children: React.ReactNode;
}
  

export const AuthProvider = ({children}:AuthProviderProps) => {

   const [loading, setLoading] =useState(true)

   const [user, setUser] =useState<User|null>(null);
   const navigate = useNavigate();

   useEffect(() => {
     auth.onAuthStateChanged((USER) => {
       setUser(USER);
       setLoading(false);
     if (user) {
      navigate('/chats')
     } 
     })
     
   },[user,navigate]);

 
const value = {user};


return (
    <AuthContext.Provider value={value}>
        {!loading && children}
    </AuthContext.Provider>
);


}
