import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ProfileService } from './profile.service';
import { Chat,LastMessageRes,Message } from '../interfaces';
import { ChatWsService } from '../interfaces/chat-ws-service.interface';
import { ChatsWsNativeService } from './chats-ws-native.service';
import { AuthService } from './auth.service';
import {ChatWs} from '../interfaces/chat-ws.interface';
import { isNewMessage, isUnreadMessage } from '../interfaces/type-guard';

@Injectable({
  providedIn: 'root',
})
export class ChatsService {
  http = inject(HttpClient);
  me = inject(ProfileService).me;
  baseApiUrl = 'https://icherniakov.ru/yt-course/';
  chatsUrl = `${this.baseApiUrl}chat/`;
  messageUrl = `${this.baseApiUrl}message/`;
  activeChatMessages = signal<Message[]>([]);
  unreadChatMessages = signal<number>(0);
  #authService = inject(AuthService);
  wsAdapter: ChatWsService = new ChatsWsNativeService();

  createChat(userId: number) {
    return this.http.post<Chat>(`${this.chatsUrl}${userId}`, {});
  }
  connectWs() {
    return this.wsAdapter.connect({
      url: `${this.baseApiUrl}chat/ws`,
      token: this.#authService.token ?? '',
      handleMessage: this.handleWSMessage,
    }) as Observable<ChatWs>;
  }

  handleWSMessage = (message: ChatWs) => {
    if (!('action' in message)) return;
    if (isUnreadMessage(message)) {
      this.unreadChatMessages.set(message.data.count);
    }
    if (isNewMessage(message)) {
      this.activeChatMessages.set([
        ...this.activeChatMessages(),
        {
          id: message.data.id,
          userFromId: message.data.author,
          personalChatId: message.data.chat_id,
          text: message.data.message,
          createdAt: message.data.created_at,
          isRead: false,
          isMine: false,
        },
      ]);
    }
  };

  getMyChats() {
    return this.http.get<LastMessageRes[]>(`${this.chatsUrl}get_my_chats/`);
  }

  getChatById(userId: number) {
    return this.http.get<Chat>(`${this.chatsUrl}${userId}`).pipe(
      map((chat) => {
        const patchedMessages = chat.messages.map((message) => {
          return {
            ...message,
            user:
              chat.userFirst.id === message.userFromId
                ? chat.userFirst
                : chat.userSecond,
            isMine: message.userFromId === this.me()!.id,
          };
        });
        this.activeChatMessages.set(patchedMessages);

        return {
          ...chat,
          companion:
            chat.userFirst.id === this.me()!.id
              ? chat.userSecond
              : chat.userFirst,
          messages: patchedMessages,
        };
      })
    );
  }

  // sendMessage(chatId: number, message: string) {
  //   return this.http.post(
  //     `${this.messageUrl}send/${chatId}`,
  //     {},
  //     { params: { message } }
  //   );
  // }
}
