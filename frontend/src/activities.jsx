import React, { useState, useEffect } from "react";

const Playing = ({ activity }) => {
//I Did not use Any AI to for code generation, I have written this convert Discord Official Code get from Inspect and Convert it To React JSX

  const [elapsedTime, setElapsedTime] = useState("");

  const formatedTime = (start) => {
    const now = Date.now();
    let diff = Math.floor((now - start) / 1000);
    const days = Math.floor(diff / 86400);
    diff %= 86400;
    const hours = Math.floor(diff / 3600);
    diff %= 3600;
    const minutes = Math.floor(diff / 60);
    const seconds = diff % 60;
    const format = (num) => num.toString().padStart(2, "0");
    if (days > 0) return `${days}:${format(hours)}:${format(minutes)}:${format(seconds)}`;
    if (hours > 0) return `${format(hours)}:${format(minutes)}:${format(seconds)}`;
    if (minutes > 0) return `${format(minutes)}:${format(seconds)}`;
    return `00:${format(seconds)}`;
  };


  useEffect(() => {
    if (activity?.timestamps?.start) {
    const interval = setInterval(() => {
      setElapsedTime(formatedTime(activity.timestamps.start));
    }, 1000);

    return () => clearInterval(interval);
  }
  }, [activity?.timestamps?.start]);

  return (
    <div className="overlay_c0bea0 biteSize_c0bea0 card__39ec2 card__39ec2 activity__5be3e">

      {/*Type*/}
      <header className="header__39ec2">
        <h1 className="text-xs/medium_cf4812 defaultColor__5345c headerText__39ec2" data-text-variant="text-xs/medium" style={{ color: "white" }}>
          <div className="overflow__82b15">Playing</div>
        </h1>
      </header>


      <div className="body__39ec2">
        <div className="content__39ec2">

          {/* Image Container */}
          {activity.assets ? (
            <div className="imagePosition_ef9ae7">
              <svg width="60" height="60" className="svg__2338f imageContainer_ef9ae7" viewBox="0 0 60 60">
                <foreignObject x="0" y="0" width="60" height="60" overflow="visible" mask={activity.assets.small_image ? "url(#svg-mask-content-image-60)" : ""}>
                  <img
                    className="contentImage__42bf5 contentImage_ef9ae7 aspectRatio_ef9ae7"
                    src={"https://"+activity.assets.large_image.split('https/').pop()}
                    alt="largeimg"
                    style={{ maxWidth: "60px", minHeight: "60px" }}
                  />
                </foreignObject>
              </svg>
              {activity?.assets?.small_image && (
                <div className="smallImageContainer_ef9ae7">
                  <img
                    className="contentImage__42bf5 contentImage_ef9ae7"
                    src={'https://'+activity.assets.small_image.split('https/').pop()}
                    alt="smallimg"
                    style={{ maxWidth: "24px", minHeight: "24px" }}
                  />
                </div>
              )}
            </div>
          ) : (
            <svg className="contentImage" aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="white" viewBox="0 0 24 24" style={{ maxWidth: "60px" }}>
              <path fill="white" fillRule="evenodd" d="M5 2a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V5a3 3 0 0 0-3-3H5Zm6.81 7c-.54 0-1 .26-1.23.61A1 1 0 0 1 8.92 8.5 3.49 3.49 0 0 1 11.82 7c1.81 0 3.43 1.38 3.43 3.25 0 1.45-.98 2.61-2.27 3.06a1 1 0 0 1-1.96.37l-.19-1a1 1 0 0 1 .98-1.18c.87 0 1.44-.63 1.44-1.25S12.68 9 11.81 9ZM13 16a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm7-10.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0ZM18.5 20a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM7 18.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0ZM5.5 7a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" clipRule="evenodd" />
            </svg>
          )}

          {/* Activity Information */}
          <div className="details__39ec2">
            <div>
              <div className="heading-sm/semibold_cf4812" data-text-variant="heading-sm/semibold" style={{ color: "var(--text-normal)" }}>
                <div className="overflow__82b15">{activity.name}</div> {/* Name of Activity */}
              </div>
              {activity.details && (<div className="text-xs/normal_cf4812" data-text-variant="text-xs/normal" style={{ color: "white" }}>
                <div className="overflow__82b15">{activity.details}</div> {/* Details*/}
              </div>
              )}

              {(activity.state || activity?.assets?.large_text) && (
                <div className="text-xs/normal_cf4812" data-text-variant="text-xs/normal" style={{ color: "var(--text-normal)" }}>
                  <div className="overflow__82b15">
                    {activity.state || activity?.assets?.large_text}
                  </div>
                </div>
              )}

            </div>


            {/* Timestamp */}
            
            {activity.timestamps && (<div className="badgesContainer__635ed badges__39ec2">
              <div className="badgeContainer__635ed">
                <svg aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none" viewBox="0 0 24 24">
                  <path fill="#ffffff" fillRule="evenodd" d="M20.97 4.06c0 .18.08.35.24.43.55.28.9.82 1.04 1.42.3 1.24.75 3.7.75 7.09v4.91a3.09 3.09 0 0 1-5.85 1.38l-1.76-3.51a1.09 1.09 0 0 0-1.23-.55c-.57.13-1.36.27-2.16.27s-1.6-.14-2.16-.27c-.49-.11-1 .1-1.23.55l-1.76 3.51A3.09 3.09 0 0 1 1 17.91V13c0-3.38.46-5.85.75-7.1.15-.6.49-1.13 1.04-1.4a.47.47 0 0 0 .24-.44c0-.7.48-1.32 1.2-1.47l2.93-.62c.5-.1 1 .06 1.36.4.35.34.78.71 1.28.68a42.4 42.4 0 0 1 4.4 0c.5.03.93-.34 1.28-.69.35-.33.86-.5 1.36-.39l2.94.62c.7.15 1.19.78 1.19 1.47ZM20 7.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0ZM15.5 12a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM5 7a1 1 0 0 1 2 0v1h1a1 1 0 0 1 0 2H7v1a1 1 0 1 1-2 0v-1H4a1 1 0 1 1 0-2h1V7Z" clipRule="evenodd"></path>
                </svg>
                <div className="tabularNumbers__4bd52 text-xs/medium_cf4812 timestamp__230d2 bold__230d2" style={{ color: "#ffffff" }}>{elapsedTime}</div>
              </div>
            </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};



const Listening = ({ activity }) => {

  const [elapsedTime, setElapsedTime] = useState("");
  const [currentTime, setCurrentTime] = useState(0);
  const duration = Math.floor((activity?.timestamps?.end - activity?.timestamps?.start) / 1000);


  useEffect(() => {
    if (activity?.timestamps?.start && activity?.timestamps?.end) {
      const intervalId = setInterval(() => {
        setCurrentTime(() => {
          const now = Date.now();
          const elapsed = Math.floor((now - activity.timestamps.start) / 1000);
          if (elapsed < duration) {
            return elapsed;
          }
          clearInterval(intervalId);
          return duration;
        });
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [activity?.timestamps?.start, activity?.timestamps?.end, duration]);

  const formatedTimeWithoutEnd = (start) => {
    const now = Date.now();
    let diff = Math.floor((now - start) / 1000);
    const days = Math.floor(diff / 86400);
    diff %= 86400;
    const hours = Math.floor(diff / 3600);
    diff %= 3600;
    const minutes = Math.floor(diff / 60);
    const seconds = diff % 60;
    const format = (num) => num.toString().padStart(2, "0");
    if (days > 0) return `${days}:${format(hours)}:${format(minutes)}:${format(seconds)}`;
    if (hours > 0) return `${format(hours)}:${format(minutes)}:${format(seconds)}`;
    if (minutes > 0) return `${format(minutes)}:${format(seconds)}`;
    return `00:${format(seconds)}`;
  };

  useEffect(() => {
    if (activity?.timestamps?.start && !activity?.timestamps?.end) {
      const interval = setInterval(() => {
        setElapsedTime(formatedTimeWithoutEnd(activity.timestamps.start));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [activity?.timestamps?.start, activity?.timestamps?.end]);

  const progressPercentage = (currentTime / duration) * 100;

  const formatTime = (duration) => {
    const days = (duration / 86400) | 0;
    const hours = ((duration % 86400) / 3600) | 0;
    const mins = ((duration % 3600) / 60) | 0;
    const secs = duration % 60;

    return days > 0
      ? `${days.toString().padStart(2, "0")}:${hours.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
      : hours > 0
        ? `${hours.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
        : mins > 0
          ? `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
          : `00:${secs.toString().padStart(2, "0")}`;
  };



  return (
    <div className="overlay_c0bea0 biteSize_c0bea0 card__39ec2 card__39ec2 activity__5be3e">
      <header className="header__39ec2">
        <h1 className="text-xs/medium_cf4812 defaultColor__5345c headerText__39ec2" data-text-variant="text-xs/medium" style={{ color: "white" }}>
          <div className="overflow__82b15">
            Listening To {activity?.details ? activity.name : ""}
          </div>
        </h1>
      </header>

      <div className="body__39ec2">
        <div className="content__39ec2">

          {/* Image Container */}
          {activity?.assets ? (
            <div className="imagePosition_ef9ae7">
              {activity.assets?.large_image ? (<svg width="60" height="60" className="svg__2338f imageContainer_ef9ae7" viewBox="0 0 60 60">
                <foreignObject x="0" y="0" width="60" height="60" overflow="visible" mask={activity.assets.small_image ? "url(#svg-mask-content-image-60)" : ""}>
                  <img className="contentImage__42bf5 contentImage_ef9ae7 aspectRatio_ef9ae7" src={"https://i.scdn.co/image/"+activity.assets.large_image.split('spotify:').pop()} alt="largeimg" style={{ maxWidth: "60px", minHeight: "60px" }} />
                </foreignObject>
              </svg>) :
                (<svg className="contentImage" aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="white" viewBox="0 0 24 24" style={{ maxWidth: "60px" }}>
                  <path fill="white" fillRule="evenodd" d="M5 2a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V5a3 3 0 0 0-3-3H5Zm6.81 7c-.54 0-1 .26-1.23.61A1 1 0 0 1 8.92 8.5 3.49 3.49 0 0 1 11.82 7c1.81 0 3.43 1.38 3.43 3.25 0 1.45-.98 2.61-2.27 3.06a1 1 0 0 1-1.96.37l-.19-1a1 1 0 0 1 .98-1.18c.87 0 1.44-.63 1.44-1.25S12.68 9 11.81 9ZM13 16a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm7-10.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0ZM18.5 20a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM7 18.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0ZM5.5 7a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" clipRule="evenodd" />
                </svg>)}

              {activity?.assets?.small_image && (
                <div className="smallImageContainer_ef9ae7">
                  <img className="contentImage__42bf5 contentImage_ef9ae7" src={activity.assets.small_image} alt="smallimg" style={{ maxWidth: "24px", minHeight: "24px" }} />
                </div>
              )}
            </div>
          ) : (
            <svg className="contentImage" aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="white" viewBox="0 0 24 24" style={{ maxWidth: "60px" }}>
              <path fill="white" fillRule="evenodd" d="M5 2a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V5a3 3 0 0 0-3-3H5Zm6.81 7c-.54 0-1 .26-1.23.61A1 1 0 0 1 8.92 8.5 3.49 3.49 0 0 1 11.82 7c1.81 0 3.43 1.38 3.43 3.25 0 1.45-.98 2.61-2.27 3.06a1 1 0 0 1-1.96.37l-.19-1a1 1 0 0 1 .98-1.18c.87 0 1.44-.63 1.44-1.25S12.68 9 11.81 9ZM13 16a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm7-10.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0ZM18.5 20a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM7 18.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0ZM5.5 7a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" clipRule="evenodd" />
            </svg>
          )}




          {/* Activity Information */}
          <div className="details__39ec2">
            <div>
              <div className="heading-sm/semibold_cf4812" data-text-variant="heading-sm/semibold" style={{ color: "var(--text-normal)" }}>
                <div className="overflow__82b15">{activity.details ? activity.details : activity.name}</div>
              </div>

              {activity.state && (<div className="text-xs/normal_cf4812" data-text-variant="text-xs/normal" style={{ color: "white" }}>
                <div className="overflow__82b15">{activity.state}</div>
              </div>
              )}

              {activity?.assets?.large_text && (<div className="text-xs/normal_cf4812" data-text-variant="text-xs/normal" style={{ color: "var(--text-normal)" }}>
                <div className="overflow__82b15">{activity.assets.large_text}</div>
              </div>
              )}
            </div>

            {/* Timestamp */}
            {activity?.timestamps && (<div className="badgesContainer__635ed badges__39ec2">
              {/* Music Icon */}
              {activity.timestamps.start && !activity.timestamps.end && (
                <div className="badgeContainer__635ed">
                  <svg aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none" viewBox="0 0 24 24">
                    <path fill="white" d="M12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" className=""></path><path fill="white" fillRule="evenodd" d="M18.03 2.8a11 11 0 1 0 2.52 2.28c-.28-.34-.8-.13-.8.31v7.37c0 1-.4 1.95-1.1 2.65l-.78.78a.6.6 0 0 0-.14.53c.08.53-.08 1.1-.5 1.52l-1 1a1.75 1.75 0 1 1-2.47-2.48l1-1c.42-.41.99-.57 1.52-.49.2.03.4 0 .53-.14l.78-.78c.42-.42.66-1 .66-1.6V3.22a.49.49 0 0 0-.22-.41ZM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-7-2a1 1 0 0 0 1-1 6 6 0 0 1 6-6 1 1 0 1 0 0-2 8 8 0 0 0-8 8 1 1 0 0 0 1 1Z" clipRule="evenodd"></path>
                  </svg>
                  <div className="tabularNumbers__4bd52 text-xs/medium_cf4812 timestamp__230d2 bold__230d2" style={{ color: "#ffffff" }}>{elapsedTime}</div>
                </div>
              )}

              {/* Progress Bar */}
              {activity.timestamps.start && activity.timestamps.end && (
                <div className="container__8e51c">
                  <div className="text-xs/normal_cf4812 text__8e51c" data-text-variant="text-xs/normal" style={{ color: "var(--text-normal)" }}>{formatTime(currentTime)}</div>
                  <div className="bar__8e51c">
                    <div className="progress__8e51c" style={{ width: `${progressPercentage}%` }}></div>
                  </div>
                  <div className="text-xs/normal_cf4812 text__8e51c" data-text-variant="text-xs/normal" style={{ color: "var(--text-normal)" }}>{formatTime(duration)}</div>
                </div>
              )}
            </div>)}
          </div>
        </div>
      </div>
    </div>
  );
};

const Watching = ({ activity }) => {


  const [elapsedTime, setElapsedTime] = useState("");
  const [currentTime, setCurrentTime] = useState(0);
  const duration = Math.floor((activity?.timestamps?.end - activity?.timestamps?.start) / 1000);


  useEffect(() => {
    if (activity?.timestamps?.start && activity?.timestamps?.end) {
      const intervalId = setInterval(() => {
        setCurrentTime(() => {
          const now = Date.now();
          const elapsed = Math.floor((now - activity.timestamps.start) / 1000);
          if (elapsed < duration) {
            return elapsed;
          }
          clearInterval(intervalId);
          return duration;
        });
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [activity?.timestamps?.start, activity?.timestamps?.end, duration]);

  const formatedTimeWithoutEnd = (start) => {
    const now = Date.now();
    let diff = Math.floor((now - start) / 1000);
    const days = Math.floor(diff / 86400);
    diff %= 86400;
    const hours = Math.floor(diff / 3600);
    diff %= 3600;
    const minutes = Math.floor(diff / 60);
    const seconds = diff % 60;
    const format = (num) => num.toString().padStart(2, "0");
    if (days > 0) return `${days}:${format(hours)}:${format(minutes)}:${format(seconds)}`;
    if (hours > 0) return `${format(hours)}:${format(minutes)}:${format(seconds)}`;
    if (minutes > 0) return `${format(minutes)}:${format(seconds)}`;
    return `00:${format(seconds)}`;
  };

  useEffect(() => {
    if (activity?.timestamps?.start && !activity?.timestamps?.end) {
      const interval = setInterval(() => {
        setElapsedTime(formatedTimeWithoutEnd(activity.timestamps.start));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [activity?.timestamps?.start, activity?.timestamps?.end]);

  const progressPercentage = (currentTime / duration) * 100;

  const formatTime = (duration) => {
    const days = (duration / 86400) | 0;
    const hours = ((duration % 86400) / 3600) | 0;
    const mins = ((duration % 3600) / 60) | 0;
    const secs = duration % 60;

    return days > 0
      ? `${days.toString().padStart(2, "0")}:${hours.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
      : hours > 0
        ? `${hours.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
        : mins > 0
          ? `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
          : `00:${secs.toString().padStart(2, "0")}`;
  };



  return (
    <div className="overlay_c0bea0 biteSize_c0bea0 card__39ec2 card__39ec2 activity__5be3e">
      <header className="header__39ec2">
        <h1 className="text-xs/medium_cf4812 defaultColor__5345c headerText__39ec2" data-text-variant="text-xs/medium" style={{ color: "white" }}>
          <div className="overflow__82b15">
            Watching {activity?.details ? activity.name : ""}
          </div>
        </h1>
      </header>

      <div className="body__39ec2">
        <div className="content__39ec2">

          {/* Image Container */}
          {activity?.assets ? (
            <div className="imagePosition_ef9ae7">
              {activity.assets?.large_image ? (<svg width="60" height="60" className="svg__2338f imageContainer_ef9ae7" viewBox="0 0 60 60">
                <foreignObject x="0" y="0" width="60" height="60" overflow="visible" mask={activity.assets.small_image ? "url(#svg-mask-content-image-60)" : ""}>
                  <img className="contentImage__42bf5 contentImage_ef9ae7 aspectRatio_ef9ae7" src={activity.assets.large_image} alt="largeimg" style={{ maxWidth: "60px", minHeight: "60px" }} />
                </foreignObject>
              </svg>) :
                (<svg className="contentImage" aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="white" viewBox="0 0 24 24" style={{ maxWidth: "60px" }}>
                  <path fill="white" fillRule="evenodd" d="M5 2a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V5a3 3 0 0 0-3-3H5Zm6.81 7c-.54 0-1 .26-1.23.61A1 1 0 0 1 8.92 8.5 3.49 3.49 0 0 1 11.82 7c1.81 0 3.43 1.38 3.43 3.25 0 1.45-.98 2.61-2.27 3.06a1 1 0 0 1-1.96.37l-.19-1a1 1 0 0 1 .98-1.18c.87 0 1.44-.63 1.44-1.25S12.68 9 11.81 9ZM13 16a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm7-10.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0ZM18.5 20a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM7 18.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0ZM5.5 7a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" clipRule="evenodd" />
                </svg>)}

              {activity.assets.small_image && (
                <div className="smallImageContainer_ef9ae7">
                  <img className="contentImage__42bf5 contentImage_ef9ae7" src={activity.assets.small_image} alt="smallimg" style={{ maxWidth: "24px", minHeight: "24px" }} />
                </div>
              )}
            </div>
          ) : (
            <svg className="contentImage" aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="white" viewBox="0 0 24 24" style={{ maxWidth: "60px" }}>
              <path fill="white" fillRule="evenodd" d="M5 2a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V5a3 3 0 0 0-3-3H5Zm6.81 7c-.54 0-1 .26-1.23.61A1 1 0 0 1 8.92 8.5 3.49 3.49 0 0 1 11.82 7c1.81 0 3.43 1.38 3.43 3.25 0 1.45-.98 2.61-2.27 3.06a1 1 0 0 1-1.96.37l-.19-1a1 1 0 0 1 .98-1.18c.87 0 1.44-.63 1.44-1.25S12.68 9 11.81 9ZM13 16a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm7-10.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0ZM18.5 20a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM7 18.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0ZM5.5 7a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" clipRule="evenodd" />
            </svg>
          )}




          {/* Activity Information */}
          <div className="details__39ec2">
            <div>
              <div className="heading-sm/semibold_cf4812" data-text-variant="heading-sm/semibold" style={{ color: "var(--text-normal)" }}>
                <div className="overflow__82b15">{activity.details ? activity.details : activity.name}</div>
              </div>

              {activity.state && (<div className="text-xs/normal_cf4812" data-text-variant="text-xs/normal" style={{ color: "white" }}>
                <div className="overflow__82b15">{activity.state}</div>
              </div>
              )}

              {activity?.assets?.large_text && (<div className="text-xs/normal_cf4812" data-text-variant="text-xs/normal" style={{ color: "var(--text-normal)" }}>
                <div className="overflow__82b15">{activity.assets.large_text}</div>
              </div>
              )}
            </div>

            {/* Timestamp */}
            {activity?.timestamps && (<div className="badgesContainer__635ed badges__39ec2">
              {/* Music Icon */}
              {activity.timestamps.start && !activity.timestamps.end && (
                <div className="badge-container" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <svg aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none" viewBox="0 0 24 24">
                    <path fill="white" d="M4 3a3 3 0 0 0-3 3v9a3 3 0 0 0 3 3h16a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3H4ZM6 20a1 1 0 1 0 0 2h12a1 1 0 1 0 0-2H6Z" />
                  </svg>
                  <div style={{ color: 'white', fontWeight: 'bold', fontSize: '12px' }}>{elapsedTime}</div></div>
              )}

              {/* Progress Bar */}
              {activity.timestamps.start && activity.timestamps.end && (
                <div className="container__8e51c">
                  <div className="text-xs/normal_cf4812 text__8e51c" data-text-variant="text-xs/normal" style={{ color: "var(--text-normal)" }}>{formatTime(currentTime)}</div>
                  <div className="bar__8e51c">
                    <div className="progress__8e51c" style={{ width: `${progressPercentage}%` }}></div>
                  </div>
                  <div className="text-xs/normal_cf4812 text__8e51c" data-text-variant="text-xs/normal" style={{ color: "var(--text-normal)" }}>{formatTime(duration)}</div>
                </div>
              )}
            </div>)}
          </div>
        </div>
      </div>
    </div>
  );
};


export { Playing, Listening, Watching };





