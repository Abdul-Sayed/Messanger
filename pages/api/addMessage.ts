import type { NextApiRequest, NextApiResponse } from "next";
import redis from "../../redis";
import { serverPusher } from "../../pusher";
import { messageType } from "../../typings";

type Data = {
  messageData: messageType;
};
type Error = {
  body: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data | Error>) {
  if (req.method !== "POST") {
    res.status(405).json({ body: "Method Not Allowed" });
    return;
  }
  const { messageData } = req.body;
  // Replace the timestamp of the user with that of the server, for global time syncing
  const newMessage = { ...messageData, created_at: Date.now() };
  console.log(newMessage);
  // send the message to Upstash as a hash, with the message id as the key
  await redis.hset("messages", newMessage.id, JSON.stringify(newMessage));
  // ping Pusher to let all subscribers know a message has been sent
  await serverPusher.trigger("messages", "new-message", newMessage);

  res.status(200).json({ messageData: newMessage });
}
