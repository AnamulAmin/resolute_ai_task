"use client"; // Indicates the usage of client-side code

import React, { useEffect, useState } from "react"; // Importing React and necessary hooks
import { IoMdClose } from "react-icons/io"; // Importing IoMdClose icon from react-icons
import io from "socket.io-client"; // Importing socket.io client library

// Function component for Chat Box
function ChatBox({ user, setUser, player }) {
  const [socket, setSocket] = useState(null); // State for socket connection
  const [conversation, setConversation] = useState(null); // State for conversation

  // Function to send message
  const sendMessage = (e) => {
    const messageElement = e.target;
    console.log(player?.cache_?.currentTime); // Logging current time if player exists
    let currentTime;
    if (player) {
      currentTime = player?.cache_?.currentTime;
    }

    if (e.key === "Enter") {
      socket.emit("message", {
        message: messageElement.value.trim(),
        userName: user.userName,
        timestamp: currentTime,
      });

      socket.on("conversation", (data) => {
        setConversation(data); // Updating conversation state with received data
        const messageArea = document.getElementById("messageArea");

        messageArea.scrollTop = messageArea.scrollHeight; // Scroll to bottom of message area
      });
      messageElement.value = ""; // Clearing message input field
    }
  };

  // Effect hook to set up socket connection and fetch conversation
  useEffect(() => {
    const userData = JSON.parse(sessionStorage.getItem("userName") || null); // Getting user data from session storage
    setUser(userData); // Setting user data

    const socketInstance = io(
      // "http://localhost:5000"
      "https://resolute-ai-task-server.vercel.app"
    ); // Connecting to socket server
    setSocket(socketInstance); // Setting socket instance

    // Event listener for socket connection
    socketInstance.on("connect", () => {
      console.log("Connected to server");
    });

    // Function to fetch conversation from server
    const fetchConversation = async () => {
      try {
        const res = await fetch(
          "https://resolute-ai-task-server.vercel.app/get_conversation"
        ); // Fetching conversation data from server
        const conversationData = await res.json(); // Parsing conversation data
        setConversation(conversationData); // Setting conversation state with fetched data
      } catch (error) {
        console.log(error); // Logging error if fetch fails
      }
    };
    fetchConversation(); // Calling fetchConversation function
  }, [setUser]); // Dependency array for useEffect hook

  // Function to handle current time of player
  const HandleCurrentTime = (time) => {
    player.currentTime(time); // Setting current time of player
  };

  const handleModal = () => {
    document.getElementById("my_modal_1").showModal();
  };

  // Rendering the Chat Box component
  return (
    <div className="col-span-1 border shadow-sm rounded-sm h-screen sticky">
      {/* Chat Box Header */}
      <header className="px-4 py-2 border-b flex justify-between items-center">
        <h2 className="font-bold text-2xl">Live Chat</h2>
        {/* Close Button */}
        <button>
          <IoMdClose className="text-4xl" />
        </button>
      </header>
      {/* Message Area */}
      <div className="w-full overflow-auto h-[78%] relative" id="messageArea">
        {!user ? (
          // Button to prompt user to be a participant
          <div
            className="bg-neutral-800 text-white whitespace-nowrap rounded-xl px-6 py-2 cursor-pointer absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            onClick={handleModal}
          >
            Be a Participant
          </div>
        ) : (
          // Rendering conversation messages if user is present
          <div className="w-full">
            {conversation &&
              conversation.map((item) => (
                <div className="chat chat-start" key={item._id}>
                  <div className="chat-header">
                    {/* User Name */}
                    {item.userName}
                    {/* Timestamp */}
                    <time
                      className="text-xs text-blue-700 font-bold ml-4 cursor-pointer"
                      onClick={() => HandleCurrentTime(item?.timestamp)}
                    >
                      {item?.timestamp}
                    </time>
                  </div>
                  {/* Message */}
                  <div className="chat-bubble">{item.message}</div>
                </div>
              ))}
          </div>
        )}
      </div>

      {/* Message Input Field */}
      <textarea
        className="textarea textarea-bordered w-full absolute bottom-0 left-0 "
        disabled={!user} // Disabling input field if user is not present
        placeholder="Chat"
        onKeyUp={sendMessage} // Handling key press events for sending message
      ></textarea>
    </div>
  );
}

export default ChatBox; //  Exporting ChatBox component
