import React, { useEffect, useState } from "react";
import ProfileImg from "../../assets/img11.png";
import MessegeIcon from "../../assets/messege.svg";
import Select from "../Forms/SelectDropdown";
import ChatListHeader from "./ChatListHeader";
import ChatList from "./ChatList";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, IRootState } from "../../store/store";
import { filterCustomerList, getCustomerList } from "../../store/reducers/customerSlice";
import { getCopilotConversation, getCustomerConversation } from "../../store/reducers/conversationSlice";
import Loading from "../Loading";
import useWebSocket from "../../utils/sockets";

type OptionsType = {
  value: string, 
  label: string
}

type Customer = {
  CustomerId: any;
  Cust_session_id: any;
  ConvId: any;
  LatestChatDateTime: string | number | Date;
  CustProfilePhoto: string;
  CustomerName: string;
  RecentCustomerMessage: string;
}

export default function ChatCard() {

  const { userData } = useSelector((state: IRootState) => state.auth);
  const { customersList, status } = useSelector((state: IRootState) => state.customer);
  const { customerWebsocketWs, copilotBeRefWs, copilotChatListRefWs, copilotWs, customerCopilotWs } = useWebSocket();
  const currentConversation =  useSelector((state: IRootState) => state.conversation.copilotConversation);
  
  // console.log(customersList, "CUSTOMER")
  const dispatch = useDispatch<AppDispatch>();

  const [selectedOption, setSelectedOption] = useState<OptionsType>({
    value: "All",
    label: "All", 
  });

  const [selectedOptionSecond, setSelectedOptionSecond] = useState<OptionsType>({
    value: "Newest",
    label: "Newest",
  });

  const options = [
    { value: "All", label: "All" },
    { value: "Unread", label: "Unread" },
    { value: "Pending", label: "Pending" },
    { value: "Waiting", label: "Waiting" },
    { value: "Closed", label: "Closed" }
  ];

  const optionsSecond = [
    { value: "Newest", label: "Newest" },
    { value: "Oldest", label: "Oldest" }
  ];

  const handleSelectChange = (selected: { value: string; label: string }) => {
    setSelectedOption(selected);
  };

  const handleSelectChangeTwo = (selected: { value: string; label: string }) => {
    setSelectedOptionSecond(selected);
  };
  
  useEffect(() => {
    if(selectedOption.value == 'All') {
      dispatch(getCustomerList({}))
    }else{
      dispatch(filterCustomerList(selectedOption.value))
    }
  },[selectedOption])

/******  b85ec961-32f2-437b-b2d3-bed9f7c0a69c  *******/
  const sortCustomerList = (data: Customer[]) => {
    const sortedData = [...data];
    sortedData.sort((a, b) =>
      selectedOptionSecond.value === "Newest"
        ? new Date(b.LatestChatDateTime).getTime() -
          new Date(a.LatestChatDateTime).getTime()
        : new Date(a.LatestChatDateTime).getTime() -
          new Date(b.LatestChatDateTime).getTime()
    );
    return sortedData;
  };

  const handleChatClick = (chat:Customer) =>{
    let chatInfo = {
      "customer_id": chat.CustomerId,
      "customer_session_id": chat.Cust_session_id,
      "conv_id":chat.ConvId
    }
    dispatch(getCustomerConversation(chatInfo))
    dispatch(getCopilotConversation(chatInfo))

    const handleChatClick = (chat:Customer) =>{
      let chatInfo = {
        "customer_id": chat.CustomerId,
        "customer_session_id": chat.Cust_session_id,
        "conv_id":chat.ConvId
      }
      dispatch(getCustomerConversation(chatInfo))
      dispatch(getCopilotConversation(chatInfo))
  
      let wsData = {
        customerId: chat.CustomerId,
        customerSessionId: chat.Cust_session_id,
        conversationId: chat.ConvId,
        userId: userData?.userId,
        sessionId: userData?.session_id
      }
  
    customerWebsocketWs(wsData);
    customerCopilotWs(wsData);
    copilotWs(wsData);
    copilotBeRefWs(wsData);
    copilotChatListRefWs(wsData);
    }
  }



  return (
    <div className="bg-white shadow-lg rounded-3xl">
        <ChatListHeader
        profileImg={userData.AgentProfilePhoto}
        name={userData.AgentName}
        role={userData.AgentRole}
        status="With Copilot"
      />
      <div className="p-4 bg-slate-200 flex items-center justify-between">
        <p className="text-2xl font-semibold">People</p>
        <div className="flex gap-3">
          <Select
            options={options}
            selected={selectedOption}
            onChange={handleSelectChange}
            buttonColor="bg-blue-500"
            textColor="text-white"
            optionHoverColor="bg-blue-300"
            optionColor="text-gray-800"
            width="w-28"
            height="h-10"
            className="rounded-none bg-dark-blue"
          />
          <Select
            options={optionsSecond}
            selected={selectedOptionSecond}
            onChange={handleSelectChangeTwo}
            buttonColor="bg-blue-500"
            textColor="text-white"
            optionHoverColor="bg-blue-300"
            optionColor="text-gray-800"
            width="w-28"
            height="h-10"
            className="rounded-none bg-dark-blue"
          />
        </div>
      </div>
      <div className="p-2 h-[calc(100vh-240px)] overflow-y-auto scrollbar-hidden">
            {status === "loading" ? (
              <Loading />
            ) : customersList.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-600">No data available</p>
              </div>
            ) : (
              sortCustomerList(customersList || []).map((chat: Customer, index:number) => (
                
                <ChatList
                  key={index}
                  profileImg={chat.CustProfilePhoto}
                  name={chat.CustomerName}
                  message={chat.RecentCustomerMessage}
                  messageIcon={MessegeIcon}
                  onClick={()=>handleChatClick(chat)}
                />
              ))
            )}
    </div>
    </div>
  );
}
