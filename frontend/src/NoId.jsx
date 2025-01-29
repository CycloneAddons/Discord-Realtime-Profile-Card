import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DiscordIdPage = () => {
  const [discordId, setDiscordId] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setDiscordId(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (discordId) {
      // Redirect to the profile page with the provided ID
      navigate(`/${discordId}`);
    }
  };

  return (
    <div 
  style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    flexDirection: 'column',
    textAlign: 'center',
    backgroundColor: '#2f3136', // Optional background color
  }}
>
  <h1 style={{color: "white"}}>Enter Your Discord Profile ID</h1>
  <form onSubmit={handleSubmit}>
    <input
      type="text"
      placeholder="Discord Profile ID"
      value={discordId}
      onChange={handleInputChange}
      style={{
        padding: '10px',
        fontSize: '16px',
        margin: '5px',
        borderRadius: '5px',
        border: '1px solid #ccc',
      }}
    />
    <br />
    <button
      type="submit"
      style={{
        padding: '10px 20px',
        backgroundColor: '#7289da',
        fontSize: '16px',
        borderRadius: '5px',
        border: 'none',
      }}
    >
      Submit
    </button>
  </form>
  <h2 style={{color: "white"}}>Make sure you are on Our Server Otherwise It Won't Work</h2>
  <h2 style={{color: "white"}}><a href='https://discord.gg/cYAYkQVSsN' style={{color: "blue"}}>https://discord.gg/cYAYkQVSsN</a></h2>
  <h3 style={{color: "white"}}>Don't worry if you don't want to join our server, try with my</h3>
  <h3 style={{color: "white"}}>Discord Profile Id: Click This ➡️ <a href='/769225935153004636' style={{color: "lightgreen", marginBottom: "10px"}}>769225935153004636</a></h3>
</div>

  );
};

export default DiscordIdPage;
