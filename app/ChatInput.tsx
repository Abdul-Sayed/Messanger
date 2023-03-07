"use client";

import { FormEvent, useState } from "react";
import useSWR from "swr";
import _debounce from "lodash.debounce";
import { v4 as uuidv4 } from "uuid";
import { messageType } from "../typings";
import fetcher from "../utils/fetchMessages";

function ChatInput() {
  const [input, setInput] = useState("");
  const { data: messages, error, mutate } = useSWR(`/api/getMessages`, fetcher);

  console.log("messages:", messages);

  const session = {
    user: {
      authenticated: true,
      name: "Pajhman",
      image:
        "https://cdn.freebiesupply.com/logos/large/2x/facebook-messenger-logo-png-transparent.png",
    },
  };

  async function addMessage(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!input) return;

    setInput("");

    const messageData: messageType = {
      id: uuidv4(),
      message: input,
      created_at: Date.now(),
      user_name: "Elon Musk",
      profile_pic:
        "https://imgs.search.brave.com/b4AP8Mbimaqili-ROmz9HJNBHzP25aRVbQzn3EeErGU/rs:fit:800:450:1/g:ce/aHR0cHM6Ly9pY2hl/Zi5iYmNpLmNvLnVr/L25ld3MvODAwL2Nw/c3Byb2RwYi83NzI3/L3Byb2R1Y3Rpb24v/XzEwMzMzMDUwM19t/dXNrMy5qcGc",
      email: "dnr@gmail.com",
    };

    const uploadMessageToUpstash = async () => {
      const data = await fetch("/api/addMessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messageData,
        }),
      }).then((res) => res.json());

      console.log("data:", data);
      const message = data.messageData;
      return [message, ...messages!];
    };

    await mutate(uploadMessageToUpstash, {
      optimisticData: [messageData, ...messages!],
      rollbackOnError: true,
    });
  }

  return (
    <form
      className="flex fixed bottom-0 z-50 w-full px-10 py-5 space-x-2 border-t border-gray-100 bg-white"
      onSubmit={addMessage}
    >
      <input
        type="text"
        value={input}
        placeholder="Enter message..."
        onChange={(e) => setInput(e.target.value)}
        className="flex-1 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent px-5 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
      />
      <button
        type="submit"
        disabled={input.length === 0}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Send
      </button>
    </form>
  );
}

export default ChatInput;
