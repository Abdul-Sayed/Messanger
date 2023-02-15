import React from "react";
import ChatInput from "./ChatInput";
import MessageList from "./MessageList";

const Home = () => {
  return (
    <main>
      <MessageList />
      <ChatInput />
    </main>
  );
};

export default Home;
