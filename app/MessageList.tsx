"use client";

import { useEffect } from "react";
import useSWR from "swr";
import fetcher from "../utils/fetchMessages";
import { messageType } from "../typings";
import MessageComponent from "./MessageComponent";
import { clientPusher } from "../pusher";

type Props = {
  initialMessages: messageType[];
};
function MessageList({ initialMessages }: Props) {
  // Get the messages from the SWR catch via key 'allMessages'
  const { data: messages, error, mutate } = useSWR<messageType[]>("allMessages", fetcher);

  // Subscribe to pusher on the client
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
          // If messages from SWR are available, optimistically render the message from pusher first
          optimisticData: [pushedMessage, ...messages!],
          rollbackOnError: true,
        });
      }
    });
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
      ("");
    };
  }, [messages, mutate, clientPusher]);

  return (
    <div className="space-y-5 px-5 pt-8 pb-32 max-w-2xl xl:max-w-4xl mx-auto">
      {(messages || initialMessages).map((message) => (
        <MessageComponent key={message.id} message={message} />
      ))}
    </div>
  );
}

export default MessageList;
