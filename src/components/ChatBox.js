"use client"
import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import io from "socket.io-client";

function ChatBox({ user, setUser, player }) {
  const [socket, setSocket] = useState(null);
  const [conversation, setConversation] = useState([]);

  useEffect(() => {
    const userData = JSON.parse(sessionStorage.getItem("userName")) || null;
    setUser(userData);

    const socketInstance = io.connect("https://resolute-ai-task-server.vercel.app", {
      transports: ["websocket"],
    });
    setSocket(socketInstance);

    socketInstance.on("connect", () => {
      console.log("Connected to server");
    });

    const fetchConversation = async () => {
      try {
        const res = await fetch("https://resolute-ai-task-server.vercel.app/get_conversation");
        const conversationData = await res.json();
        setConversation(conversationData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchConversation();
  }, [setUser]);

  const sendMessage = (e) => {
    const messageElement = e.target;
    let currentTime;
    if (player) {
      currentTime = player?.cache_?.currentTime;
    }

    if (e.key === "Enter" && messageElement.value.trim() !== "") {
      socket.emit("message", {
        message: messageElement.value.trim(),
        userName: user.userName,
        timestamp: currentTime,
      });

      messageElement.value = "";
    }
  };

  const handleModal = () => {
    document.getElementById("my_modal_1").showModal();
  };

  const handleCurrentTime = (time) => {
    if (player) {
      player.currentTime(time);
    }
  };

  return (
    <div className="col-span-1 border shadow-sm rounded-sm h-screen sticky">
      <header className="px-4 py-2 border-b flex justify-between items-center">
        <h2 className="font-bold text-2xl">Live Chat</h2>
        <button>
          <IoMdClose className="text-4xl" />
        </button>
      </header>
      <div className="w-full overflow-auto h-[78%] relative" id="messageArea">
        {!user ? (
          <div
            className="bg-neutral-800 text-white whitespace-nowrap rounded-xl px-6 py-2 cursor-pointer absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            onClick={handleModal}
          >
            Be a Participant
          </div>
        ) : (
          <div className="w-full">
            {conversation.map((item) => (
              <div className="chat chat-start" key={item._id}>
                <div className="chat-header">
                  {item.userName}
                  <time
                    className="text-xs text-blue-700 font-bold ml-4 cursor-pointer"
                    onClick={() => handleCurrentTime(item.timestamp)}
                  >
                    {item.timestamp}
                  </time>
                </div>
                <div className="chat-bubble">{item.message}</div>
              </div>
            ))}
          </div>
        )}
      </div>
      <textarea
        className="textarea textarea-bordered w-full absolute bottom-0 left-0"
        disabled={!user}
        placeholder="Chat"
        onKeyUp={sendMessage}
      ></textarea>
    </div>
  );
}

export default ChatBox;
