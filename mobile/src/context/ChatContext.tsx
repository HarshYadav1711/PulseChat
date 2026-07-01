import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  type ReactNode,
} from "react";
import { Alert } from "react-native";
import { isChatReady } from "@/config/connectionStatus";
import { ChatSocketService } from "@/services/chatSocketService";
import { chatReducer, initialChatState } from "@/state/chatReducer";
import type { ConnectionStatus, Message, Session } from "@/types";
import { isValidMessageText, normalizeMessageText } from "@/utils/messageValidation";

interface ChatContextValue {
  messages: Message[];
  connectionStatus: ConnectionStatus;
  sendMessage: (text: string) => boolean;
}

const ChatContext = createContext<ChatContextValue | null>(null);

interface ChatProviderProps {
  session: Session;
  children: ReactNode;
}

export function ChatProvider({ session, children }: ChatProviderProps) {
  const [state, dispatch] = useReducer(chatReducer, initialChatState);
  const socketServiceRef = useRef(new ChatSocketService());

  useEffect(() => {
    const service = socketServiceRef.current;

    service.connect(session, {
      onConnectionStatusChange: (status) => {
        dispatch({ type: "CONNECTION_STATUS_CHANGED", status });
      },
      onHistory: (messages) => {
        dispatch({ type: "HISTORY_RECEIVED", messages });
      },
      onNewMessage: (message) => {
        dispatch({ type: "MESSAGE_RECEIVED", message });
      },
      onError: (message) => {
        Alert.alert("Chat error", message);
      },
    });

    return () => {
      service.disconnect();
      dispatch({ type: "RESET" });
    };
  }, [session.userId, session.username]);

  const sendMessage = useCallback(
    (text: string): boolean => {
      if (!isChatReady(state.connectionStatus) || !isValidMessageText(text)) {
        return false;
      }

      socketServiceRef.current.sendMessage(normalizeMessageText(text));
      return true;
    },
    [state.connectionStatus],
  );

  const value = useMemo(
    () => ({
      messages: state.messages,
      connectionStatus: state.connectionStatus,
      sendMessage,
    }),
    [sendMessage, state.connectionStatus, state.messages],
  );

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

export function useChat(): ChatContextValue {
  const context = useContext(ChatContext);

  if (!context) {
    throw new Error("useChat must be used within ChatProvider.");
  }

  return context;
}
