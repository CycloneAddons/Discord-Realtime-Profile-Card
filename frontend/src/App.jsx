
import React, { useState, useEffect } from 'react';
import { WebSocketProvider, useWebSocket } from './ws';
import CardProfile from './profileCard';

const convertThemeColors = (colors) =>
  colors.map((color) => `#${color.toString(16).padStart(6, '0')}`);

const App = () => {
  const { data } = useWebSocket(); 
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (data) {
      const parsedData = JSON.parse(data);
      setUserData(parsedData.data); 
    }
  }, [data]);

  if (!userData) {
    return <div>Loading...</div>;
  }

  const themesColor = convertThemeColors(userData.user_profile?.theme_colors || []);

  return (
    <div className="App">
      <CardProfile
        themesColor={themesColor}
        apiUrl="https://camilo404.azurewebsites.net/v1/"
        ProfileId={process.env.REACT_APP_USERID}
        userData={userData}
      />
    </div>
  );
}

export default function WrappedApp() {
  return (
    <WebSocketProvider>
      <App />
    </WebSocketProvider>
  );
}
