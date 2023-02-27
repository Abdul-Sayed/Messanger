import { messageType } from "../typings";
import Image from "next/image";

type props = {
  message: messageType;
};
const MessageComponent = ({ message }: props) => {
  const isUser = true;

  return (
    <div className={`flex w-fit ${isUser && "ml-auto"}`}>
      <div className={`flex-shrink-0 ${isUser && "order-2"}`}>
        <Image
          className="rounded-full mx-2 my-1 w-12 h-12 object-cover"
          height={450}
          width={800}
          src={message.profile_pic}
          alt="Profile Picture"
        />
      </div>

      <div>
        <p
          className={`text-[0.65rem] px-[2px] pb-[2px] ${
            isUser ? "text-blue-400 text-right" : "text-red-400 text-left"
          }`}
        >
          {message.user_name}
        </p>
        <div className="flex items-end">
          <div
            className={`px-3 py-2 rounded-lg w-fit text-white ${
              isUser ? "text-blue-400 text-right" : "text-red-400 text-left"
            }`}
          >
            <p>{message.message}</p>
          </div>
          <p className={`text-[0.65rem] italic px-2 text-gray-300 ${isUser && "order-(-1)"}`}>
            {new Date(message.created_at).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MessageComponent;
