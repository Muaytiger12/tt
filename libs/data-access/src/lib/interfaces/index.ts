import { TokenResponse } from './auth.interface';
import {
  ChatConnectionWSParams,
  ChatWsService,
} from './chat-ws-service.interface';
import { ChatWs } from './chat-ws.interface';
import { Chat, LastMessageRes, Message } from './chats.interface';
import { Features } from './features.interface';
import { Pageble } from './pageble.interface';
import {
  CommentCreateDTO,
  Comments,
  Post,
  PostCreateDTO,
} from './post.interface';
import { Profile } from './profile.interface';




export type {
  TokenResponse,
  Post,
  Chat,
  Profile,
  Pageble,
  LastMessageRes,
  Message,
  Features,
  Comments,
  PostCreateDTO,
  CommentCreateDTO,
  ChatWs,
  ChatWsService,
  ChatConnectionWSParams
};

