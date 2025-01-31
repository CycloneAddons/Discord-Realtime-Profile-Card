import React, { useState, useEffect } from 'react';
import './Info.css';

const VolumeControl = ({ ProfileId, displayName }) => {
  const [volume, setVolume] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [socialData, setSocialData] = useState(null);

  useEffect(() => {
    if (ProfileId === '333014456399560705') {
      setSocialData({
        whatsapp: "https://wa.me/+14093631162",
        steam: "http://steamcommunity.com/id/zentirog",
        instagram: "https://instagram.com/zentirog",
        youtube: "https://youtube.com/@zentirog"
      });
    } else if (ProfileId === '769225935153004636') {
      setSocialData({
        github: "https://github.com/CycloneAddons",
        steam: "https://steamcommunity.com/id/CycloneAddons/",
        instagram: "https://instagram.com/cycloneaddons",
        youtube: "https://youtube.com/@CycloneAddons"
      });
    } else {
      setSocialData(null);// Currently Not Available For ALl Users Adding Soon ❤️
    }
  }, [ProfileId]);

  useEffect(() => {
    const video = document.getElementById('bgvideo');
    if (video) {
      video.volume = volume / 100;
      video.muted = isMuted;
    }
  }, [volume, isMuted]);

  const handleVolumeChange = (event) => {
    setVolume(event.target.value);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div className="info-section">
      <p className="text-title">Hi, This Is {displayName}</p>
      
      {socialData && (
        <section className="glowing-icons">
          <ul className="icon-list">
            {socialData.github && (
              <li>
                <a href={socialData.github} target="_blank" className="hovered" rel="noreferrer">
                  <i className="fab fa-github"></i>
                </a>
              </li>
            )}
            {socialData.youtube && (
              <li>
                <a href={socialData.youtube} target="_blank" className="hovered" rel="noreferrer">
                  <i className="fab fa-youtube"></i>
                </a>
              </li>
            )}
            {socialData.instagram && (
              <li>
                <a href={socialData.instagram} target="_blank" className="hovered" rel="noreferrer">
                  <i className="fab fa-instagram"></i>
                </a>
              </li>
            )}
            {socialData.steam && (
              <li>
                <a href={socialData.steam} target="_blank" className="hovered" rel="noreferrer">
                  <i className="fab fa-steam"></i>
                </a>
              </li>
            )}
            {socialData.whatsapp && (
              <li>
                <a href={socialData.whatsapp} target="_blank" className="hovered" rel="noreferrer">
                  <i className="fab fa-whatsapp"></i>
                </a>
              </li>
            )}
          </ul>
        </section>
      )}
      
      <div id="sound-slider__container" className="mt-5">
        <i 
          className={`iconVolume text-white hovered bx bxs-volume-${isMuted ? 'mute' : 'full'} bx-tada bx-flip-vertical`} 
          onClick={toggleMute}
        ></i>
        <input 
          type="range" 
          value={volume} 
          min="0" 
          max="100" 
          id="sound-slider" 
          onInput={handleVolumeChange}
          className="hovered" 
        />
        <p id="volume">{volume}</p>
      </div>
    </div>
  );
};

export default VolumeControl;
