import React from "react";

interface ChatItemProps {
  profileImg: string;
  name: string;
  message: string;
  messageIcon: string;
  onClick: () => void;
}

const ChatList: React.FC<ChatItemProps> = ({ profileImg, name, message, messageIcon, onClick }) => {
  return (
    <div className="p-2 flex items-center justify-between hover:bg-blue-100 active:bg-blue-200 cursor-pointer" onClick={onClick}>
      <div className="flex items-center gap-3">
        <img className="w-14 h-14 rounded-full object-cover" src={profileImg} alt={name} />
        <div className="w-64">
          <h4 className="text-[16px] font-semibold text-dark-blue font-clashDisplay">{name}</h4>
          <p className="text-[13px] font-bold text-black font-Satoshi truncate">{message}</p>
        </div>
      </div>
      <div className="p-2 bg-slate-200 rounded-full">
        <img className="w-6 h-6" src={messageIcon} alt="Message Icon" />
      </div>
    </div>
  );
};

export default ChatList;
