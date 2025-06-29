export interface ChatWsBase {
  status: 'success' | 'error';
}

export interface ChatWsUnreadMessage extends ChatWsBase {
  action: 'unread';
  data: {
    count: number;
  };
}

export interface ChatWsNewMessage extends ChatWsBase {
  action: 'message';
  data: {
    id: number;
    message: string;
    chat_id: number;
    created_at: string;
    author: number;
  };
}
export interface ChatWsErrorMessage extends ChatWsBase {
  message: string
}
export interface ChatWsSendMessage extends ChatWsBase {
  text: string,
  chat_id: number,
}
export type ChatWs = ChatWsUnreadMessage | ChatWsNewMessage | ChatWsErrorMessage | ChatWsSendMessage;
