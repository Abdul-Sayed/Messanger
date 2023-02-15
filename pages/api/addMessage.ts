import type { NextApiRequest, NextApiResponse } from "next";
import redis from "../../redis";
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
  // Replace the timestamp of the user with that of the server
  const newMessage = { ...messageData, created_at: Date.now() };
  // send the message to Upstash
  redis.hset("messages", newMessage.id, JSON.stringify(newMessage));
  res.status(200).json({ messageData: newMessage });
}
