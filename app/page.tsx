import ChatInput from "./ChatInput";
import MessageList from "./MessageList";
import Header from "./Header";
import { messageType } from "../typings";
import Providers from "./providers";
import { getServerSession } from "next-auth/next";

const Home = async () => {
  const session = await getServerSession();

  const data = await fetch(
    `${process.env.VERCEL_URL || "http://localhost:3000"}/api/getMessages`
  ).then((res) => res.json());

  const messages: messageType[] = data.messages;
  console.log(session);
  return (
    <main className={`${!session?.user?.name && "hidden"}`}>
      <Providers session={session}>
        <Header />
        <MessageList initialMessages={messages} />
        <ChatInput />
      </Providers>
    </main>
  );
};

export default Home;
