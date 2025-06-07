import { Profile } from '../../../../../../libs/profile/src/lib/data/interfaces/profile.interface';

export interface Chat {
  id: number;
  userFirst: Profile;
  userSecond: Profile;
  messages: Message[];
  companion?: Profile;
}

export interface Message {
  id: number;
  userFromId: number;
  personalChatId: number;
  text: string;
  createdAt: string | any;
  isRead: true;
  updatedAt: string;
  user?: Profile;
  isMine?: boolean;
}
export interface LastMessageRes {
  id: number;
  userFrom: Profile;
  message: string;
  createdAt?: string;
  unreadMessages?: number;
}
