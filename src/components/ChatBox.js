"use client";
import React, { useEffect } from "react";
import { IoMdClose } from "react-icons/io";
function ChatBox({ user, setUser }) {
  useEffect(() => {
    const userData = JSON.parse(sessionStorage.getItem("userName") || null);
    setUser(userData);
  }, [setUser]);
  return (
    <div className="col-span-1 border shadow-sm rounded-sm h-screen sticky">
      <header className="px-4 py-2 border-b flex justify-between items-center">
        <h2 className="font-bold text-2xl">Live Chat</h2>
        <button>
          <IoMdClose className="text-4xl" />
        </button>
      </header>
      <div className="w-full">
        {!user ? (
          <button
            className="btn btn-neutral absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            onClick={() => document.getElementById("my_modal_1").showModal()}
          >
            Be a Participant
          </button>
        ) : (
          <div className="chat chat-start">
            <div className="chat-header">
              Obi-Wan Kenobi
              <time className="text-xs text-blue-700 font-bold ml-4 cursor-pointer">
                2 hours ago
              </time>
            </div>
            <div className="chat-bubble">You were the Chosen One!</div>
          </div>
        )}
      </div>

      <textarea
        className="textarea textarea-bordered w-full absolute bottom-0 left-0 "
        disabled={!user}
        placeholder="Chat"
      ></textarea>
    </div>
  );
}

export default ChatBox;
