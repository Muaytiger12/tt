// import { ChatConnectionWSParams, ChatWsService } from '../interfaces/chat-ws-service.interface';
// import { ChatWs } from '../interfaces/chat-ws.interface';
// import { WebSocketSubject } from 'rxjs/internal/observable/dom/WebSocketSubject';
// import { webSocket } from 'rxjs/webSocket';
// import { finalize, Observable, tap } from 'rxjs';
//
// export class ChatWsRxjsService implements ChatWsService {
//   #socket: WebSocketSubject<ChatWs> | null = null;
//
//   connect(params: ChatConnectionWSParams): Observable<ChatWs> {
//     if (!this.#socket){
//       this.#socket = webSocket({
//         url:params.url,
//         protocol: [params.token]
//
//       })
//     }
//
//     return this.#socket.asObservable().pipe(
//       tap(mess => params.handleMessage(mess)),
//       finalize(() => console.log('onclose after send message with rxjs'))
//     )
//   }
//
//   disconnect(): void {
//     this.#socket?.complete()
//   }
//
//   sendMessage(text: string, chatId: number): void {
//     // @ts-ignore
//     this.#socket?.next({
//       text,
//       chat_id: chatId
//     });
//   }
//
// }
