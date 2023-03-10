import Pusher from "pusher";
import ClientPusher from "pusher-js";

export const serverPusher = new Pusher({
  appId: process.env.NEXT_PUBLIC_serverPusherAppId!,
  key: process.env.NEXT_PUBLIC_serverPusherKey!,
  secret: process.env.NEXT_PUBLIC_serverPusherSecret!,
  cluster: process.env.NEXT_PUBLIC_serverPusherCluster!,
  useTLS: process.env.NEXT_PUBLIC_serverPusherUseTLS === "true",
});

export const clientPusher = new ClientPusher("80a9914b7341078cdce6", {
  cluster: process.env.NEXT_PUBLIC_clientPusherCluster!,
  forceTLS: process.env.NEXT_PUBLIC_clientPusherForceTLS === "true",
});
