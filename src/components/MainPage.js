"use client";
import React, { useEffect, useState } from "react";
import VideoArea from "./VideoArea";
import ChatBox from "./ChatBox";
import ParticipantFormModal from "./ParticipantFormModal";

function MainPage(props) {
  const [user, setUser] = useState(null);
  const [player, setPlayer] = useState(null);

  return (
    <main className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      <div className="col-span-2">
        <VideoArea setPlayer={setPlayer} />
      </div>
      <div className="col-span-1">
        <ChatBox user={user} setUser={setUser} player={player} />
      </div>
      <ParticipantFormModal setUser={setUser} />
    </main>
  );
}

export default MainPage;
