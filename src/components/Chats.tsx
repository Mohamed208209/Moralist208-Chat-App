import { useNavigate } from 'react-router-dom';
import {  useEffect, useState } from 'react';
import { auth } from "../firebase.ts";
import { useAuth } from '../contexts/useAuth.tsx';

import axios from "axios"
import { ChatEngine } from 'react-chat-engine';

export const Chats = () => {
  const {user} = useAuth()  
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true)

  const handleLogout = async () => {
    await auth.signOut();
    navigate("/")
  }

  const getFile = async (url:string) => {
    const response = await fetch(url);
    const data = await response.blob();
    return new File([data], "userPhoto.jpg", {type: 'image/jpeg'});
  }

  useEffect(() => {
    if (!user) {
      navigate('/')
      return;
    }

    axios.get('https://api.chatengine.io/users/me', {
      headers: {
        "project-id": import.meta.env.VITE_APP_CHAT_ENGINE_ID,
        "user-name" : user.email,
        "user-secret": user.uid
      }
    })
    .then(() => {
      setLoading(false)
    })
    .catch(() => {
      const formdata = new FormData();
      if (user && user.email && user.displayName && user.uid && user.photoURL) {
        formdata.append('email', user.email);
        formdata.append('username', user.email);
        formdata.append('secret', user.uid);

        getFile(user.photoURL).then((avatar) => {
          formdata.append('avatar', avatar, avatar.name);

          axios.post("https://api.chatengine.io/users", formdata, {
            headers: {"private-key": import.meta.env.VITE_APP_CHAT_ENGINE_KEY}
          })
          .then(() => setLoading(false))
          .catch((error) => console.log(error))
        })
      }
    });
  }, [user, navigate]);

  if (!user || loading) return 'loading...';

  return (
    <div className="chats-page">
      <div className="nav-bar">
        <div className="logo-tab">
          Moralist208 Chat
        </div>
        <div onClick={handleLogout} className="logout-tab">
          Logout
        </div>
      </div>
      <ChatEngine
        height="86.5vh"
        projectID={import.meta.env.VITE_APP_CHAT_ENGINE_ID}
        userName={user.email}
        userSecret={user.uid}
        onNewMessage={() =>{new Audio('https://chat-engine-assets.s3.amazonaws.com/click.mp3').play(); setLoading(prevLoading => !prevLoading);}}
      />
    </div>
  );
}
