import Atropos from 'atropos/react';
import React, { useState, useEffect } from 'react';
import './profileCard.css';
import 'atropos/css';
import { Desktop, Web, Mobile } from './platformSvg';
import EffectRenderer from './profileEffects';
import { toHTML } from 'discord-markdown';
const CardProfile = ({
  themesColor,
  ProfileId,
  userData,
}) => {
  const [message, setMessage] = useState('');
  const [userBioFormatted, setUserBioFormatted] = useState('');
  const statusColors = {
    idle: "#f0b232",
    dnd: "#f23f43",
    online: "#23a55a",
    offline: "#80848e"
  };

  const statusColor = statusColors[userData.status] || "#593695";

  useEffect(() => {
    if (userData?.user_profile?.bio) {
      console.log(userData.user);

      setUserBioFormatted(toHTML(userData.user_profile.bio));
    }
  }, [userData]);


  //Body margin controler according to badges  
  useEffect(() => {
    const profileHeader = document.querySelector('.profile-header');
    const profileBody = document.querySelector('.profile-body');
    if (profileHeader && profileBody) {
      const itemsCount = userData?.badges?.length + 5 || 0;

      let marginTop = 15;
      if (itemsCount >= 7) {
        marginTop = 35;
      }
      profileBody.style.marginTop = `${marginTop}px`;
    }
  }, [userData]);


  //Currently The Most Use less thing
  const handleSendMessage = () => {
    console.log(`Message sent: ${message}`);
    setMessage('');
  };

  return (
    <Atropos className="atropos atropos-card">
      <div className="atropos-scale">
        <div className="atropos-rotate">
          <div className="atropos-inner">
            {userData && (
              <div className="my-[0.45rem]" >
                <div
                  className="card nitro-card"
                  style={{ '--color1': themesColor[0], '--color2': themesColor[1] }}
                 >
                  <EffectRenderer selectedId={userData?.user_profile?.profile_effect?.id} atroposO="1.5" />

                  <div className="card-header">
                    <svg width="100%" height="100%">
                      <defs>
                        <mask id="uid_124">
                          <rect fill="white" x="0" y="0" width="100%" height="100%" />
                          <circle fill="black" cx="57.5" cy="125" r="50.3"></circle>
                        </mask>
                      </defs>
                      <foreignObject x="0" y="0" width="100%" height="100%" mask="url(#uid_124)" >
                        <div

                          className="banner-img"
                          style={{
                            backgroundImage: `url(${userData.user.banner
                                ? `https://cdn.discordapp.com/banners/${ProfileId}/${userData.user.banner}.webp?animated=true&size=2048`
                                : `https://singlecolorimage.com/get/${userData.user.banner_color.replace('#', "")}/400x150`
                              })`,
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "cover"
                          }}
                        ></div>
                      </foreignObject>
                    </svg>
                  </div>


                  <div className="card-body">
                    <div className="profile-header" data-atropos-offset="2.5">
                      <a
                        href={`https://discord.com/users/${ProfileId}`}
                        target="_blank"
                        rel="noopener noreferrer"

                      >

                        <div className="profile-logo">
                          {userData?.user?.avatar_decoration_data?.asset && (
                            <img
                              className="avatar-decoration"
                              src={`https://cdn.discordapp.com/avatar-decoration-presets/${userData.user.avatar_decoration_data.asset}.png`}
                              alt="Avatar decoration"
                              style={{
                                mask: 'url(#svg-mask-avatar-decoration-status-round-80)', // Apply the mask here
                                WebkitMask: 'url(#svg-mask-avatar-decoration-status-round-80)', // For WebKit browsers
                              }}
                            />
                          )}

                          <svg viewBox="0 0 138 138" aria-hidden="true" style={{ position: 'absolute', top: "6px", right: "-7px", zIndex: "1" }}>

                            <mask id="svg-mask-avatar-status-round-32" maskContentUnits="objectBoundingBox" viewBox="0 0 1 1">
                              <circle fill="white" cx="0.5" cy="0.5" r="0.5"></circle>
                              <circle fill="black" cx="0.78200" cy="0.85690" r="0.1569"></circle>
                            </mask>
                            <mask id="svg-mask-avatar-decoration-status-round-80" maskContentUnits="objectBoundingBox"
                              viewBox="0 0 1 1">
                              <rect fill="white" x="0" y="0" width="100%" height="100%"></rect>
                              <circle fill="black" cx="0.7347666666666667" cy="0.79119999" r="0.13283333333333334"></circle>
                            </mask>
                            <mask id="svg-mask-status-online" maskContentUnits="objectBoundingBox" viewBox="0 0 1 1">
                              <circle fill="white" cx="0.5" cy="0.5" r="0.5"></circle>
                            </mask>
                            <mask id="svg-mask-status-idle" maskContentUnits="objectBoundingBox" viewBox="0 0 1 1">
                              <circle fill="white" cx="0.5" cy="0.5" r="0.5"></circle>
                              <circle fill="black" cx="0.25" cy="0.25" r="0.375"></circle>
                            </mask>
                            <mask id="svg-mask-status-dnd" maskContentUnits="objectBoundingBox" viewBox="0 0 1 1">
                              <circle fill="white" cx="0.5" cy="0.5" r="0.5"></circle>
                              <rect fill="black" x="0.125" y="0.375" width="0.75" height="0.25" rx="0.125" ry="0.125"></rect>
                            </mask>
                            <mask id="svg-mask-status-offline" maskContentUnits="objectBoundingBox" viewBox="0 0 1 1">
                              <circle fill="white" cx="0.5" cy="0.5" r="0.5"></circle>
                              <circle fill="black" cx="0.5" cy="0.5" r="0.25"></circle>
                            </mask>
                            <mask id="svg-mask-status-streaming" maskContentUnits="objectBoundingBox" viewBox="0 0 1 1">
                              <circle fill="white" cx="0.5" cy="0.5" r="0.5"></circle>
                              <polygon fill="black" points="0.35,0.25 0.78301275,0.5 0.35,0.75"></polygon>
                            </mask>

                            {/* Status */}
                            <circle fill="black" r="20" cx="100" cy="100" style={{ opacity: .45 }}></circle>
                            <rect width="24" height="24" x="88" y="88" fill={statusColor} mask={`url(#svg-mask-status-${userData.status})`} className="pointerEvents_c51b4e"></rect>
                          </svg>

                          <img
                            src={`https://cdn.discordapp.com/avatars/${ProfileId}/${userData.user.avatar}.webp?animated=${userData.user.avatar.startsWith('a_')}`}
                            alt="Avatar"
                            style={{
                              mask: 'url(#svg-mask-avatar-status-round-32)', // Apply the mask here
                              WebkitMask: 'url(#svg-mask-avatar-status-round-32)', // For WebKit browsers
                            }}
                          />
                        </div>
                      </a>


                      <div className="badges-container">
                        {userData?.badges?.map((badge, index) => (
                          <div className="badge-item" key={index}>
                            <a
                              href={badge.link || '#'}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="badge-link"
                            >
                              {badge.id === 'desktop' ? (
                                <Desktop fill={badge.color} />
                              ) : badge.id === 'mobile' ? (
                                <Mobile fill={badge.color} />
                              ) : badge.id === 'web' ? (
                                <Web fill={badge.color} />
                              ) : (
                                <img
                                  src={`https://cdn.discordapp.com/badge-icons/${badge.icon}.png`}
                                  alt={badge.id}
                                />
                              )}
                              <div className="tooltip tooltip-up">
                                {badge.description}
                              </div>
                            </a>
                          </div>
                        ))}

                      </div>
                    </div>


                    <div className="profile-body" data-atropos-offset="2.5">
                      <div className="global-name flex justify-between items-center">
                        <p>
                          {userData?.user?.global_name || userData?.user?.username}
                        </p>
                      </div>
                      <div className="username">
                        <div className="pro-guild">
                          <p>
                            {userData?.user?.username}
                            {userData?.user_profile?.pronouns ? ` • ${userData.user_profile.pronouns}` : ''}
                            {userData.user.clan && (
                              <span className="guild-info">
                                <img
                                  src={`https://cdn.discordapp.com/clan-badges/${userData.user.clan.identity_guild_id}/${userData.user.clan.badge}.png?size=16`}
                                  alt="Guild Icon"
                                  className="guild-icon"
                                />
                                <span>{userData.user.clan.tag}</span>
                              </span>
                            )}
                          </p>
                        </div>

                      </div>
                      <hr />
                      {userData?.user_profile?.bio && (
                        <div className="basic-infos">
                          <div className="category-title">About Me</div>
                          <div
                            className="markdown"
                            dangerouslySetInnerHTML={{
                              __html: userBioFormatted.replace(/\n/g, '<br>'),
                            }}
                          ></div>
                        </div>
                      )}
                      {userData?.connected_accounts?.length > 0 && (
                        <div className="connected-accounts">
                          <div className="category-title">Connected accounts</div>
                          <div className="badges-connected-accounts">
                            {userData.connected_accounts.map((account, index) => (
                              <div
                                className="badge-connected-account"
                                key={index}
                              >
                                <a
                                  href={`https://${account.type === "steam" ? `steamcommunity.com/profiles/${account.id}`
                                    : account.type === "github" ? `github.com/${account.name}`
                                      : account.type === "spotify" ? `open.spotify.com/user/${account.id}`
                                        : account.type === "twitter" ? `x.com/${account.name}`
                                          : account.type === "xbox" ? `xbox.com/en-IN/play/user/${account.name}`
                                            : account.type === "youtube" ? `youtube.com/channel/${account.id}`
                                              : account.type === "roblox" ? `roblox.com/users/${account.id}/profile`
                                                : account.type === "reddit" ? `reddit.com/user/${account.name}`
                                                  : account.type === "domain" ? account.name
                                                    : account.type + ".com/" + account.name}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <img
                                    src={`./connections/${account.type}.svg`}
                                    alt={account.type}
                                    width="24px"
                                    height="24px"
                                  />
                                </a>
                                <div className="tooltip tooltip-down">
                                  {account.name}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      <div className="message">
                        <input
                          type="text"
                          placeholder={`Send a message to @${userData?.user?.username}`}
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          onKeyUp={(e) => {
                            if (e.key === 'Enter') handleSendMessage();
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Atropos>
  );
};

export default CardProfile;

