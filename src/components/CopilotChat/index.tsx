import React, { useState } from 'react'
import ChatBotHeader from '../ChatBot/ChatBotHeader'
import ChatBotMessage from '../ChatBot/ChatBotMessege'
import ChatBotFooter from '../ChatBot/ChatBotFooter'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, IRootState } from '../../store/store';
import { sendMessageToCopilot } from '../../store/reducers/messagesSlice';

function index() {
  const currentConversation:any =  useSelector((state: IRootState) => state.conversation.copilotConversation);
  const { userData } = useSelector((state: IRootState) => state.auth);
  const [messageByCustomer, setMessegeByCustomer] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  
  if(!currentConversation){
    return null
  }
  const { customerSessionId, ConvId, CustomerName , LoanId , CustomerId, CustProfilePhoto, conversations} = currentConversation 

  const handleSendMessage = () => {
    const messageData = {
      user_id: userData?.userId,
      session_id: userData?.session_id,
      customer_session_id: customerSessionId,
      customer_id: CustomerId,
      cust_conv_id: ConvId,
      message: messageByCustomer,
      datetime: new Date().toISOString(),
      is_agent_message_to_copilot: "1",
      is_agent_edited_copilot_message: "1",
      copilot_msg_id: "2",
      is_direct_agent_message: "1",
    };

    dispatch(sendMessageToCopilot(messageData));
  };
  
  return (
    <div className="bg-copilot-gray shadow-lg rounded-3xl relative">
    <div className="p-6 flex items-center gap-4 shadow-2xl shadow-gray-950">
      <ChatBotHeader
        title={CustomerName}
        headerTags={[{ key: "Loan ID", value: LoanId }, { key: "Customer ID", value: CustomerId}]}
        profileImage={CustProfilePhoto}  
          />
    </div>
    {conversations?.length > 0 ? <ChatBotMessage conversations={conversations} avatar={CustProfilePhoto} agentData={userData} /> : 'Start a converstation'}
    <ChatBotFooter bgColor='bg-copilot-gray' onClick={handleSendMessage} setMessage={setMessegeByCustomer}/>
  </div>
  // <div className='text-center'>Welcome to Copilot!</div>
  )
}

export default index