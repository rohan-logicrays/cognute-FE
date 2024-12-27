import React from "react";
import ThreeDots from "../../assets/three-dots-vertical.svg";

interface ChatBotHeaderProps {
  title: string; // Header title
  headerTags?: { key: string; value: string }[]; // Key-value pairs for additional info in the header
  profileImage: string;
}

const ChatBotHeader: React.FC<ChatBotHeaderProps> = ({ title, headerTags, profileImage }) => {
  return (
    <div className="flex flex-col w-full">
      <div className="">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              className="w-12 h-12 rounded-full object-cover cursor-pointer"
              src={profileImage}
              alt=""
            />
            <h2 className="text-xl text-white font-semibold font-clashDisplay">{title}</h2>
          </div>
          <img className="cursor-pointer" src={ThreeDots} alt="" />
        </div>
        <div className="grid grid-cols-2 gap-3 mt-2">
          {headerTags && (
            <>
              {headerTags.map((tag) => (
                <div key={tag.key} className="bg-input-blue px-4 py-2 rounded-3xl flex items-center justify-between gap-3">
                  <span className="text-sm text-slate-400 font-Satoshi font-medium">{tag.key}</span> <span className="text-sm text-white font-bold font-Satoshi">{tag.value}</span>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatBotHeader;
