import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useParams } from 'react-router-dom';
import { useWebSocket } from './ws';
import CardProfile from './profileCard';
import VolumeControl from './Info';
import Background from './background';
import DiscordIdPage from './NoId';
const convertThemeColors = (colors) =>
  colors.map((color) => `#${color.toString(16).padStart(6, '0')}`);

const App = () => {
  const { id } = useParams();
  const { data } = useWebSocket(id);
  const [userData, setUserData] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (data) {
      const parsedData = JSON.parse(data);
      if (parsedData.code === 404) {
        setNotFound(true);
        return;
      }
      setUserData(parsedData?.data);
    }
  }, [data]);

  if (notFound) {
    return (
      <h1 style={{ color: 'white', textAlign: 'center', marginTop: '20%' }}>
        User Not Found In Our Server: <a href='https://discord.gg/cYAYkQVSsN'>https://discord.gg/cYAYkQVSsN</a>
      </h1>
    );
  }

  if (!userData) return <div>Loading...</div>;

  const themesColor = userData.user_profile?.theme_colors?.length
    ? convertThemeColors(userData.user_profile.theme_colors)
    : ['#5c5c5cde', '#404040ad'];

  return (
    <div className="App">
      <VolumeControl ProfileId={id} displayName={userData?.user?.global_name || userData?.user?.username} />
      <CardProfile
        themesColor={themesColor}
        ProfileId={id}
        userData={userData}
      />
    <Background
    ProfileId={id}
     />
      
    </div>
  );
};

export default function WrappedApp() {
  return (
    <Router>
      <Routes>
        <Route path="/:id" element={<App />} />
        <Route path="/" element={<DiscordIdPage />} /> 
      </Routes>
    </Router>
  );
}