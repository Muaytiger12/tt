import { Route } from '@angular/router';
import { ChatsPageComponent, ChatWorkspaceComponent } from '../feature-chats-workspace';




export const chatsRoutes: Route[] = [
  {
    path: '',
    component: ChatsPageComponent,
    children: [
      {
        path: ':id',
        component: ChatWorkspaceComponent,
      },
    ],
  },
];
