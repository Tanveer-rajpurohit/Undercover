import React, { useContext, useEffect, useState } from "react";
import PlayGroundContext from "../../../context/PlayGround";
import SocketContext from "../../../context/SocketContext";
import { Send, X } from "lucide-react";

const Chat: React.FC<{ closeChat: () => void }> = ({ closeChat }) => {
  const { game, currentUserId, handelSetGame } = useContext(PlayGroundContext);
  const { socket } = useContext(SocketContext);
  const [newMessage, setNewMessage] = useState("");

  const messages = game?.ChatMessage || [];

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;

    const messagePayload = {
      gameId: game?.id,
      userId: currentUserId,
      message: newMessage,
      roomCode: game?.roomCode
    };

    socket.emit("sendMessage", messagePayload);

    setNewMessage("");
  };

  useEffect(() => {
    if (socket) {
      socket.on("newMessage", (data) => {

        // Update the game context with the new message
        if (game) {
          // Append the new message to the current ChatMessage array
          const updatedGame = {
            ...game,
            ChatMessage: [...game.ChatMessage, data.savedMessage],
          };

          // Update the context with the updated game state
          handelSetGame(updatedGame);
        }
      });
    }

    // Cleanup the event listener on component unmount
    return () => {
      if (socket) {
        socket.off("newMessage");
      }
    };
  }, [socket, game, handelSetGame]);

  return (
    <div className="fixed top-0 right-0 h-full z-50 w-1/3 bg-white shadow-lg flex flex-col transition-transform duration-300 ease-in-out">
      <div className="p-4 border-b flex items-center justify-between">
        <h2 className="text-lg font-bold">Chat</h2>
        <button
          className="text-gray-500 hover:text-gray-800"
          onClick={closeChat}
        >
          <X />
        </button>
      </div>

      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.length === 0 ? (
          <p className="text-center text-gray-500">No messages yet</p>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start space-x-2 ${
                message.userId === currentUserId ? "justify-end" : ""
              }`}
            >
              {message.userId !== currentUserId && (
                
                <img
                  src="/images/default-user.png"
                  alt={message.User.profilePicture}
                  className="w-8 h-8 rounded-full"
                />
              )}
              <div>
                <p
                  className={`text-sm font-semibold ${
                    message.userId === currentUserId
                      ? "text-blue-500"
                      : "text-gray-700"
                  }`}
                >
                  {message.User.name}
                </p>
                <p
                  className={`p-2 rounded-full ${
                    message.userId === currentUserId
                      ? "bg-blue-400 text-white"
                      : "bg-gray-100"
                  }`}
                >
                  {message.message}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="p-4 border-t flex items-center space-x-2">
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 p-2 border rounded-lg"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button onClick={handleSendMessage}>
          <Send className="w-5 h-5 hover:text-blue-700" />
        </button>
      </div>
    </div>
  );
};

export default Chat;
