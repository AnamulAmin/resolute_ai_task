"use client";
import React from "react";
import VideoJS from "./VideoJS";

function VideoArea(props) {
  const playerRef = React.useRef(null);

  const videoJsOptions = {
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [
      {
        src: "/videos/video.mp4",
        type: "video/mp4",
      },
      {
        src: "/videos/video.mp4",
        type: "video/mp4",
      },
    ],
  };

  const handlePlayerReady = (player) => {
    playerRef.current = player;

    // You can handle player events here, for example:
    player.on("waiting", (events) => {
      videojs.log("player is waiting");
      videojs.log("waiting", events);
    });

    player.on("dispose", () => {
      videojs.log("player will dispose");
      videojs.log("dispose", events);
    });
  };
  const HandleCurrentTime = () => {
    const player = playerRef.current;
    console.log(player.cache_.currentTime);
    // player.currentTime(2);
  };

  return (
    <>
      <div>Rest of app here</div>
      <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
      <button onClick={HandleCurrentTime}>Set Current Time</button>
    </>
  );
}

export default VideoArea;
