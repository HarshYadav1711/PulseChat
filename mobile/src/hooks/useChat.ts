import { useCallback, useEffect, useRef, useState } from "react";
import { Alert } from "react-native";
import { SOCKET_EVENTS } from "@/config/constants";
import { createChatSocket } from "@/services/socket";
import type { ConnectionStatus, Message, Session } from "@/types";

interface UseChatOptions {
  session: Session;
}

interface UseChatResult {
  messages: Message[];
  connectionStatus: ConnectionStatus;
  sendMessage: (text: string) => void;
}

export function useChat({ session }: UseChatOptions): UseChatResult {
  const [messages, setMessages] = useState<Message[]>([]);
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>("connecting");
  const socketRef = useRef(createChatSocket());

  const joinChat = useCallback(() => {
    socketRef.current.emit(SOCKET_EVENTS.JOIN, {
      userId: session.userId,
      username: session.username,
    });
  }, [session.userId, session.username]);

  useEffect(() => {
    const socket = socketRef.current;

    const handleConnect = () => {
      setConnectionStatus("connected");
      joinChat();
    };

    const handleDisconnect = () => {
      setConnectionStatus("disconnected");
    };

    const handleReconnectAttempt = () => {
      setConnectionStatus("connecting");
    };

    const handleHistory = (payload: { messages: Message[] }) => {
      setMessages(payload.messages);
    };

    const handleNewMessage = (payload: { message: Message }) => {
      setMessages((current) => {
        if (current.some((item) => item.id === payload.message.id)) {
          return current;
        }

        return [...current, payload.message];
      });
    };

    const handleError = (payload: { message: string }) => {
      Alert.alert("Chat error", payload.message);
    };

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on("reconnect_attempt", handleReconnectAttempt);
    socket.on(SOCKET_EVENTS.HISTORY, handleHistory);
    socket.on(SOCKET_EVENTS.NEW_MESSAGE, handleNewMessage);
    socket.on(SOCKET_EVENTS.ERROR, handleError);

    if (socket.connected) {
      handleConnect();
    }

    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("reconnect_attempt", handleReconnectAttempt);
      socket.off(SOCKET_EVENTS.HISTORY, handleHistory);
      socket.off(SOCKET_EVENTS.NEW_MESSAGE, handleNewMessage);
      socket.off(SOCKET_EVENTS.ERROR, handleError);
      socket.disconnect();
    };
  }, [joinChat]);

  const sendMessage = useCallback(
    (text: string) => {
      const trimmed = text.trim();

      if (!trimmed || connectionStatus !== "connected") {
        return;
      }

      socketRef.current.emit(SOCKET_EVENTS.SEND_MESSAGE, {
        userId: session.userId,
        username: session.username,
        text: trimmed,
      });
    },
    [connectionStatus, session.userId, session.username],
  );

  return {
    messages,
    connectionStatus,
    sendMessage,
  };
}
