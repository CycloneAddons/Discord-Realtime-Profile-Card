import React from 'react';

const Background = ({ ProfileId }) => {
  const videoSrc = ProfileId === "333014456399560705" ? "https://cloud-77h0v9npv-hack-club-bot.vercel.app/0bgvideo.mp4" : "https://cloud-amvfaraoa-hack-club-bot.vercel.app/0vn20250129_191021__1_.mp4";

  return (
    <div style={{ 
      position: 'absolute', 
      top: 0, 
      left: 0, 
      right: 0, 
      bottom: 0, 
      overflow: 'hidden', 
      zIndex: -1 
    }}>
      <video 
        src={videoSrc} 
        type="video/mp4"
        id='bgvideo' 
        autoPlay 
        loop 
        muted 
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          opacity: 0.3,
          width: '100%',
          height: '90%',
          objectFit: 'cover'
        }} 
      />
    </div>
  );
};

export default Background;
