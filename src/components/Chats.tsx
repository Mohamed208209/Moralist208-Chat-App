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
        "project-id": "f48a9187-ba74-470d-ac86-a0131dd7f2c1",
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
            headers: {"private-key": "57c1d316-3730-4f44-9c9d-5f4e68c378f3"}
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
        projectID={"f48a9187-ba74-470d-ac86-a0131dd7f2c1"}
        userName={user.email}
        userSecret={user.uid}

      />
    </div>
  );
}
