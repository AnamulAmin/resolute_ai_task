"use client";
import React, { useState } from "react";
import VideoArea from "./VideoArea";
import ChatBox from "./ChatBox";
import ParticipantFormModal from "./ParticipantFormModal";

function MainPage(props) {
  const [user, setUser] = useState(null);
  return (
    <main className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      <div className="col-span-2">
        <VideoArea />
      </div>
      <div className="col-span-1">
        <ChatBox user={user} setUser={setUser} />
      </div>
      <ParticipantFormModal setUser={setUser} />
    </main>
  );
}

export default MainPage;
