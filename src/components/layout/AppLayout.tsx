import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import ChatCard from "../ChatList";
import SettingIcon from "../../assets/Setting menu.svg";
import MessegeIcon from "../../assets/group_messege.png";
import UserIcon from "../../assets/img11.png";
import CompanyIcon from "../../assets/sidelogo.png";
import CollapseIcon from "../../assets/collapseIcon.svg";
import Chat from "../ChatBot/ChatBotMessege";
import ChatList from "../ChatBot/index";
import CopilotChat from "../CopilotChat/index"
import useWebSocket from "../../utils/sockets";
import { useSelector } from "react-redux";
import { IRootState } from "../../store/store";

const AppLayout = () => {

  const { userData } = useSelector((state: IRootState) => state.auth);
  // const { connectSocket1, connectSocket2, disconnectWebSocket } = useWebSocket();

  // // Example handshake data for socket 1
  // const handshakeData1 = {
  //     user_id: userData?.userId || "",
  //     session_id: userData?.session_id || "",
  //     customer_id: 1000,
  //     customer_session_id: "f4527410-90a4-490f-8410-ef346dca7277",
  //     role: "agent",
  //     message: "Handshake",
  //     chat_source: "customer"
  // };

  // // Example handshake data for socket 2
  // const handshakeData2 = {
  //   user_id: userData?.userId || "",
  //     session_id: userData?.session_id || "",
  //     customer_id: 1000,
  //     customer_session_id: "f4527410-90a4-490f-8410-ef346dca7277",
  //     role: "customer",
  //     message: "Handshake",
  //     chat_source: "copilot_backend"
  // };

  // useEffect(() => {
  //   connectSocket1("ws://localhost:8765", handshakeData1);
  //   connectSocket2("ws://localhost:8765", handshakeData2);

  //   // Cleanup WebSocket connections when the component unmounts
  //   return () => {
  //     disconnectWebSocket("socket1");
  //     disconnectWebSocket("socket2");
  //   };
  // }, [connectSocket1, connectSocket2, disconnectWebSocket]);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const icons = [
    {
      id: "Collapse Icon",
      icon: <img className="w-6 sm:w-9" src={CollapseIcon} />,
      bgColor: `bg-gray-200 ${isCollapsed ? "rotate-180" : "" }`,
      onClick: () => setIsCollapsed((prev) => !prev),
    },
    {
      id: "message",
      icon: <img src={MessegeIcon} alt="Messages" />,
      bgColor: "bg-blue-100",
      onClick: () => console.log("Message got clicked!"),
    },
    {
      id: "settings",
      icon: <img src={SettingIcon} alt="Settings" />,
      bgColor: "bg-gray-200",
    },
  ];

  return (
    <>
      {/*  */}
      <div className={`bg-slate-100 grid ${isCollapsed ? "sm:grid-cols-[100px_1fr_1fr] grid-cols-1": "md:grid-cols-2 lg:grid-cols-3 grid-cols-1"} gap-3 p-3 h-screen `}>
        <div className="block sm:grid grid-cols-[100px_auto] gap-3">
          <Sidebar
            logo={CompanyIcon}
            icons={icons}
            profileImage={UserIcon}
            containerStyles="w-full bg-white shadow-lg p-3 sm:p-6 rounded-3xl"
          />
          {/* <div className={isCollapsed ? "hidden" : ""}> */}
        {!isCollapsed && <ChatCard /> }  
          {/* </div> */}
        </div>
        <ChatList />
        {/* <div className="bg-orange-400 w-full"> chat Two </div> */}
        <CopilotChat />
      </div>
    </>
  );
};

export default AppLayout;
