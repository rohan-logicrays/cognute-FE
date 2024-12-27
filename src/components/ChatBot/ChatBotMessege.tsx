import React, { useEffect, useState } from "react";
import UserImg from "../../assets/img11.png";
import UserImg2 from "../../assets/group_messege.png";
import Checked from "../../assets/bubble-checked.svg";
import CopilotAvatar from "../../assets/Ellipse 49-1.png"

// Types for props
interface ChatMessageProps {
  Message?: any;
  Datetime?: any;
  Role?: any;
  sender: "Customer" | "Agent" | "Copilot";
  message: string;
  time: string;
  avatar?: string; // Optional for custom avatars
}

// ChatMessage Component
const ChatMessage: React.FC<ChatMessageProps> = ({
  sender,
  message,
  time,
  avatar,
}) => {
  const isAgent = sender === "Agent";
  const renderMessage = (message:string) => {
    const isHTML = /<\/?[a-z][\s\S]*>/i.test(message); // Check if it's HTML
    if (isHTML) {
      return <div className="overflow-auto scrollbar-hidden" dangerouslySetInnerHTML={{ __html: message }} />; // Render as HTML
    }
    return <p>{message}</p>; // Render as plain text
  };
  return (
    <div className={`flex ${isAgent ? "justify-end" : "justify-start"} mb-4`}>
      {!isAgent && (
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-300 mr-3">
          <img src={avatar || UserImg} alt="Avatar" className="rounded-full" />
        </div>
      )}
      <div>
        <div
          style={
            isAgent
              ? { borderBottomRightRadius: "0px" }
              : { borderBottomLeftRadius: "0px" }
          }
          className={`${
            isAgent ? "bg-sender text-white" : "bg-customer text-gray-900"
          } rounded-lg rounded-br-0 p-4 max-w-md shadow-lg text-sm font-medium font-Satoshi`}
        >
          {renderMessage(message)}
          {sender === "Copilot" && (
            <div className="text-white flex items-center gap-1.5 px-2 py-1 bg-red-600 rounded-full font-medium text-[11.88px] leading-[16.04px] max-w-fit">
              <svg
                className="w-4 h-4"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
              >
                <path
                  d="M11.0775 0.509644H5.03879C2.01944 0.509644 0.509766 2.01932 0.509766 5.03867V14.8515C0.509766 15.2667 0.849442 15.6064 1.2646 15.6064H11.0775C14.0968 15.6064 15.6065 14.0967 15.6065 11.0774V5.03867C15.6065 2.01932 14.0968 0.509644 11.0775 0.509644ZM10.7001 8.62414H8.62426V10.6999C8.62426 11.0094 8.36762 11.2661 8.05814 11.2661C7.74865 11.2661 7.49201 11.0094 7.49201 10.6999V8.62414H5.41621C5.10672 8.62414 4.85008 8.3675 4.85008 8.05801C4.85008 7.74853 5.10672 7.49189 5.41621 7.49189H7.49201V5.41608C7.49201 5.1066 7.74865 4.84996 8.05814 4.84996C8.36762 4.84996 8.62426 5.1066 8.62426 5.41608V7.49189H10.7001C11.0095 7.49189 11.2662 7.74853 11.2662 8.05801C11.2662 8.3675 11.0095 8.62414 10.7001 8.62414Z"
                  fill="white"
                />
              </svg>
              Add to conversation
            </div>
          )}
        </div>
        <div className="flex gap-2 justify-end items-end">
          <p className="text-xs text-gray-500 mt-2 text-right">{time}</p>
          {isAgent && <img src={Checked} alt="" />}
        </div>
      </div>
      {isAgent && (
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-300 ml-3">
          <img src={avatar || UserImg2} alt="Avatar" className="rounded-full" />
        </div>
      )}
    </div>
  );
};
interface conversation {
  conversations: ChatMessageProps[];
  avatar: string;
  agentData: any
}

// Chat Component
const ChatBotMessage: React.FC<conversation> = ({
  conversations = [],
  avatar,
  agentData
}) => {
  const [messeges, setMesseges] = useState<ChatMessageProps[]>([]);

  const getAvatar = (role: string) => {
    switch (role) {
      case "Customer":
        return avatar; // Replace with the image for "Customer"
      case "Agent":
        return agentData?.AgentProfilePhoto;
      case "Copilot":
        return CopilotAvatar;
      default:
        return UserImg2; 
    }
  };
  
  const formatMessages = () =>
    conversations.map((message) => ({
      sender: message.Role,
      message: message.Message,
      time: message.Datetime.split(" ")[1].slice(0, 5),
      avatar: getAvatar(message.Role),
    }));

  useEffect(() => {
    if (conversations?.length > 0) {
      setMesseges(formatMessages());
    }
  }, [conversations]);

  if (!conversations) {
    return null;
  }
  return (
    <div className="p-6 text-white h-[calc(100vh-273px)] overflow-y-auto scrollbar-hidden">
      <div className="text-black">
        {messeges?.map(
          (msg: ChatMessageProps, index: React.Key | null | undefined) => (
            <ChatMessage
              key={index}
              sender={msg.sender}
              message={msg.message}
              time={msg.time}
              avatar={msg.avatar}
            />
          )
        )}
      </div>
    </div>
  );
};

export default ChatBotMessage;
