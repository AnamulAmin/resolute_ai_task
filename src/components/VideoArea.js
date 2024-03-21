"use client";
import React, { useEffect } from "react";
import VideoJS from "./VideoJS";

function VideoArea({ setPlayer }) {
  const playerRef = React.useRef(null);

  const videoJsOptions = {
    autoplay: false,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [
      {
        src: "/videos/video2.mp4",
        type: "video/mp4",
      },
    ],
  };

  const handlePlayerReady = (player) => {
    playerRef.current = player;
    setPlayer(player);

    // You can handle player events here, for example:
    player.on("waiting", () => {
      videojs.log("player is waiting");
    });

    player.on("dispose", () => {
      videojs.log("player will dispose");
    });
  };

  return (
    <>
      <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
    </>
  );
}

export default VideoArea;
