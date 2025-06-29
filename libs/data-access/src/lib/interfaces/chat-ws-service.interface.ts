import { ChatWs } from './chat-ws.interface';
import { Observable } from 'rxjs';

export interface ChatConnectionWSParams {
  url: string;
  token: string;
  handleMessage: (message: ChatWs) => void;
}

export interface ChatWsService {
  connect: (params: ChatConnectionWSParams) => void | Observable<ChatWs>;
  sendMessage: (text: string, chatId: number) => void;
  disconnect: () => void;
}
