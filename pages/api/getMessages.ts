import type { NextApiRequest, NextApiResponse } from "next";
import redis from "../../redis";
import { messageType } from "../../typings";

type Data = {
  messages: messageType[];
};
type Error = {
  body: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data | Error>) {
  if (req.method !== "GET") {
    res.status(405).json({ body: "Method Not Allowed" });
    return;
  }

  // GET all the messages from Upstash via redis. Convert them to objects and sort them by newest first.
  const messagesRes = await redis.hvals("messages");
  const messages: messageType[] = messagesRes
    .map((message) => JSON.parse(message))
    .sort((a: messageType, b: messageType) => b.created_at - a.created_at);

  res.status(200).json({ messages });
}
