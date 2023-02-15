import { messageType } from "../typings";

const fetcher = async () => {
  const res = await fetch("/api/getMessages");
  const data = await res.json();
  const messages: messageType[] = data.messages;
  return messages;
};

export default fetcher;
