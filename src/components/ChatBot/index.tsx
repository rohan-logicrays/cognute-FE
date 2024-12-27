import React, { useState } from "react";
import ProfileImg from "../../assets/img11.png";
import ChatBotMessage from "./ChatBotMessege";
import ChatFooter from "./ChatBotFooter";
import ChatBotHeader from "./ChatBotHeader";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, IRootState } from "../../store/store";
import { sendMessageToCustomer } from "../../store/reducers/messagesSlice";

export interface Conversation {
  CustomerName: string;
  LoanId: string;
  ConvId: number;
  CustomerId: string;
  CustProfilePhoto: string
  conversations: any;
  customerSessionId: string
}


export default function index() {
  const currentConversation:any =  useSelector((state: IRootState) => state.conversation.customerConversation) ;
    const { userData } = useSelector((state: IRootState) => state.auth);
    const [messageByCustomer, setMessegeByCustomer] = useState("");
    const dispatch = useDispatch<AppDispatch>();
  
  if(!currentConversation){
    return null
  }
  const { customerSessionId, ConvId, CustomerName , LoanId , CustomerId, CustProfilePhoto, conversations} = currentConversation 
  
  const handleSendMessage = () => {
    const messageData = {
      user_id: userData?.userId, // Replace with actual user ID
      session_id: userData?.session_id, // Replace with actual session ID
      customer_session_id: customerSessionId, // Replace with actual customer session ID
      customer_id: CustomerId,
      conv_id: ConvId,
      message: messageByCustomer,
      datetime: new Date().toISOString(), // Format datetime as needed
      is_direct_agent_message: "1", // or 0 based on your logic
    };
    dispatch(sendMessageToCustomer(messageData))
  }

  return (
    <div className="bg-dark-blue shadow-lg rounded-3xl relative">
      <div className="p-6 flex items-center gap-4 shadow-2xl shadow-gray-950">
        <ChatBotHeader
          title={CustomerName}
          headerTags={[{ key: "Loan ID", value: LoanId }, { key: "Customer ID", value: CustomerId}]}
          profileImage={CustProfilePhoto}
        />
      </div>
      {conversations?.length > 0 ? <ChatBotMessage conversations={conversations} avatar={CustProfilePhoto} agentData={userData} /> : 'Start a converstation'}
      <ChatFooter bgColor="bg-dark-blue" onClick={handleSendMessage} setMessage={setMessegeByCustomer}/>
    </div>
  );
}
