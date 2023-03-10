"use client";

import { useEffect } from "react";
import useSWR from "swr";
import fetcher from "../utils/fetchMessages";
import { messageType } from "../typings";
import MessageComponent from "./MessageComponent";
import { clientPusher } from "../pusher";

function MessageList() {
  // Get the messages from the SWR catch via key 'allMessages'
  const { data: messages, error, mutate } = useSWR<messageType[]>("allMessages", fetcher);

  // Subscribe to pusher on the client, which lets all subscribers know when a message is added
  // Update SWR cache with the newly added message from pusher
  useEffect(() => {
    const channel = clientPusher.subscribe("messages");
    channel.bind("new-message", async (pushedMessage: messageType) => {
      // Don't update the cache if message from pusher is already in cache; message came from you
      if (messages?.find((message) => message.id === pushedMessage.id)) return;
      // Handle case where messages is not yet populated with data; undefined
      if (!messages) {
        await mutate(fetcher);
      } else {
        await mutate(fetcher, {
          optimisticData: [pushedMessage, ...messages!],
          rollbackOnError: true,
        });
      }
    });
  }, [messages, mutate, clientPusher]);

  return (
    <div className="space-y-5 px-5 pt-8 pb-32 max-w-2xl xl:max-w-4xl mx-auto">
      {messages?.map((message) => (
        <MessageComponent key={message.id} message={message} />
      ))}
    </div>
  );
}

export default MessageList;
