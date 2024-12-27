import { useRef } from "react";

interface UseWebSocketProps {
  url: string; // WebSocket server URL
  handshakeData: {
    user_id?: string;
    session_id?: string;
    role?: string;
    from?: string;
    chat_source?: string;
    customer_session_id: string;
    message_type?: string;
    message?: string;
    customer_id?: number;
  }; // Data to send as a handshake message
}

const useWebSocket = () => {
  const customerWebsocketRef = useRef<WebSocket | null>(null);
  const customerCopilotRef = useRef<WebSocket | null>(null);
  const copilotRef = useRef<WebSocket | null>(null);
  const copilotBeRef = useRef<WebSocket | null>(null);
  const copilotChatListRef = useRef<WebSocket | null>(null);
  const url = "ws://localhost:8765"

  const connectWebSocket = (url: string, handshakeData: any, socketRef: any) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.close();
      console.log("WebSocket connection closed");
    }

    const socket = new WebSocket(url);
    socketRef.current = socket;

    // Event: Connection Opened
    socket.onopen = () => {
      console.log("WebSocket connected");

      // Send handshake message
      const data = JSON.stringify(handshakeData);
      socket.send(data);
      console.log("Handshake message sent:", data);
    };

    // Event: Message Received
    socket.onmessage = (event) => {
      console.log("Message received from server:", event.data);
    };

    // Event: Connection Closed
    socket.onclose = () => {
      console.log("WebSocket disconnected");
      socketRef.current = null; // Reset ref on close
    };

    // Event: Error Occurred
    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };
  };

  const customerWebsocketWs = (wsData: any) => {
    const handshakeData = {
      user_id: wsData.userId || "",
      session_id: wsData.sessionId || "",
      customer_id: wsData.customerId,
      customer_session_id: wsData.customerSessionId,
      role: "agent",
      message: "Handshake",
      chat_source: "customer",
      message_type: "text"
    };
    connectWebSocket(url, handshakeData, customerWebsocketRef);
  };

  const customerCopilotWs = (wsData: any) => {
    const handshakeData = {
      user_id: wsData.userId || "",
      session_id: wsData.sessionId || "",
      customer_id: wsData.customerId,
      customer_session_id: wsData.customerSessionId,
      from:"customer",
      role: "agent",
      message: "Handshake",
      chat_source: "copilot",
      message_type: "text"
    };
    connectWebSocket(url, handshakeData, customerCopilotRef);
  };

  const copilotWs = (wsData: any) => {
    const handshakeData = {
      user_id: wsData.userId || "",
      session_id: wsData.sessionId || "",
      customer_id: wsData.customerId,
      customer_session_id: wsData.customerSessionId,
      from:"copilot",
      role: "customer",
      message: "Handshake",
      chat_source: "copilot",
      message_type: "text"
    };
    connectWebSocket(url, handshakeData, copilotRef);
  };

  const copilotBeRefWs = (wsData: any) => {
    const handshakeData = {
      user_id: wsData.userId || "",
      session_id: wsData.sessionId || "",
      customer_id: wsData.customerId,
      customer_session_id: wsData.customerSessionId,
      role: "customer",
      message: "Handshake",
      chat_source: "copilot_backend",
      message_type: "text"
    };
    connectWebSocket(url, handshakeData, copilotBeRef);
  };

  const copilotChatListRefWs = (wsData: any) => {
    const handshakeData = {
      user_id: wsData.userId || "",
      session_id: wsData.sessionId || "",
      role: "copilot",
      from: "copilot",
      message: "Handshake",
      chat_source: "copilot_new_customer",
      message_type: "text"
    };
    connectWebSocket(url, handshakeData, copilotChatListRef);
  };

  const disconnectWebSocket = (socketRef: any) => {
    if (socketRef.current) {
      socketRef.current.close();
      console.log("WebSocket connection closed");
    }
  };

  return { customerWebsocketWs, customerCopilotWs, copilotWs, copilotBeRefWs, copilotChatListRefWs, disconnectWebSocket };
};

export default useWebSocket;