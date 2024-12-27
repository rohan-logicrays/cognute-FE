import React from "react";

// Define the types for the component's props
interface ChatHeaderProps {
  profileImg: string;
  name: string;
  role: string;
  status: string;
}

const ChatListHeader: React.FC<ChatHeaderProps> = ({ profileImg, name, role, status }) => {
  return (
    <div className="p-6 flex items-center gap-4">
      <img
        className="w-24 h-24 rounded-full object-cover"
        src={profileImg}
        alt={`${name}'s profile`}
      />
      <div>
        <h4 className="text-2xl font-semibold text-dark-blue font-clashDisplay">{name}</h4>
        <p className="text-sm text-gray-500 font-normal font-Satoshi">{role}</p>
        <span className="text-red-500 font-bold font-Satoshi">{status}</span>
      </div>
    </div>
  );
};

export default ChatListHeader;
