import type { ConnectionStatus, Message } from "@/types";

export interface ChatState {
  messages: Message[];
  connectionStatus: ConnectionStatus;
  isJoined: boolean;
}

export const initialChatState: ChatState = {
  messages: [],
  connectionStatus: "connecting",
  isJoined: false,
};

export type ChatAction =
  | { type: "CONNECTION_STATUS_CHANGED"; status: ConnectionStatus }
  | { type: "HISTORY_RECEIVED"; messages: Message[] }
  | { type: "MESSAGE_RECEIVED"; message: Message }
  | { type: "RESET" };

export function chatReducer(state: ChatState, action: ChatAction): ChatState {
  switch (action.type) {
    case "CONNECTION_STATUS_CHANGED":
      return {
        ...state,
        connectionStatus: action.status,
        isJoined: action.status === "connected" ? state.isJoined : false,
      };
    case "HISTORY_RECEIVED":
      return {
        ...state,
        messages: action.messages,
        isJoined: true,
      };
    case "MESSAGE_RECEIVED":
      if (state.messages.some((item) => item.id === action.message.id)) {
        return state;
      }
      return { ...state, messages: [...state.messages, action.message] };
    case "RESET":
      return initialChatState;
    default: {
      const exhaustiveCheck: never = action;
      return exhaustiveCheck;
    }
  }
}
