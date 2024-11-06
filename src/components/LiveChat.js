import React, { useEffect, useState } from "react";
import ChatMessgae from "./ChatMessgae";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../utils/chatSlice";
import { generateRandomName } from "../utils/randomeNameList";

const LiveChat = () => {
  const [liveMessage, setLiveMessage] = useState("");
  const chatMessages = useSelector((store) => store.chat.messages);
  const dispatch = useDispatch();

  useEffect(() => {
    const pollingInterval = setInterval(() => {
      dispatch(
        addMessage({
          name: generateRandomName(),
          message: "hi welcome to chat!",
        })
      );
    }, 1000);
    return () => {
      clearInterval(pollingInterval);
    };
  }, []);

  if (!chatMessages) {
    return null;
  }

  return (
    <>
      <div className="w-full h-[600px] ml-2 p-2 border border-black overflow-y-scroll flex flex-col-reverse">
        <div>
          {chatMessages.map((message, index) => (
            <ChatMessgae
              key={index}
              name={message.name}
              message={message.message}
            />
          ))}
        </div>
      </div>
      <form
        className="flex mt-2"
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(
            addMessage({
              name: "sandy",
              message: liveMessage,
            })
          );
          setLiveMessage("");
        }}
      >
        <input
          className="w-full p-2 ml-2 border border-black"
          type="text"
          value={liveMessage}
          onChange={(e) => setLiveMessage(e.target.value)}
        />
        <button className="px-3  mx-2 bg-green-500 rounded-md text-white font-bold">
          Submit
        </button>
      </form>
    </>
  );
};

export default LiveChat;
