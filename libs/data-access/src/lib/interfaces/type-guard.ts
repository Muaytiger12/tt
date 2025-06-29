import { ChatWs, ChatWsNewMessage, ChatWsUnreadMessage } from './chat-ws.interface';

export function isUnreadMessage(message:ChatWs):message is ChatWsUnreadMessage {
return 'action' in message && message.action === 'unread';
}
export function isNewMessage(message:ChatWs):message is ChatWsNewMessage {
return 'action' in message && message.action === 'message';
}
