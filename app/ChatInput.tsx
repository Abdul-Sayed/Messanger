"use client";

import { FormEvent, useState } from "react";
import useSWR from "swr";
import _debounce from "lodash.debounce";
import { v4 as uuidv4 } from "uuid";
import { messageType } from "../typings";
import fetcher from "../utils/fetchMessages";
import { useSession } from "next-auth/react";

function ChatInput() {
  const { data: session } = useSession();
  const [input, setInput] = useState("");

  // Get all the messages, store it in messages variable
  const { data: messages, error, mutate } = useSWR<messageType[]>("allMessages", fetcher);

  console.log("messages:", messages);

  async function addMessage(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!input || !session?.user?.name) return;

    const messageToSend = input;
    const messageData: messageType = {
      id: uuidv4(),
      message: messageToSend,
      created_at: Date.now(),
      user_name: session?.user?.name!,
      profile_pic: session?.user?.image!,
      email: session?.user?.email!,
    };
    setInput("");

    console.log(messageData);

    // Post the message to Upstash database
    const uploadMessageToUpstash = async () => {
      const messageObj = await fetch("/api/addMessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messageData,
        }),
      }).then((res) => res.json());

      console.log("data:", messageObj);
      const newMessage = messageObj.messageData;
      return [newMessage, ...messages!];
    };

    // Mutate the SWR cache. Initially use the client side messageData, then replace it with the server returned newMessage.
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
        disabled={!session?.user?.name}
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
