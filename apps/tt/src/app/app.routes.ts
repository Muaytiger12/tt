import { Routes } from '@angular/router';
import { LoginPageComponent } from '../../../../libs/auth/src/lib/feature-login/login-page/login-page.component';
import { SearchPageComponent } from '../../../../libs/profile/src/lib/feature-profile-list/search-page/search-page.component';
import { ProfilePageComponent } from 'profile';
import { LayoutComponent } from '../../../../libs/layout/src/lib/layout/layout.component';

import { SettingsPageComponent } from '../../../../libs/profile/src/lib/feature-profile-settings/settings-page/settings-page.component';
import { chatsRoutes } from '../../../../libs/chat/src/lib/feature-chats-workspace/chats-page/chatsRoutes';
import { FormsComponent } from './experimantal/src/lib/forms/forms.component';
import {canActivateAuth} from 'auth';


export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'profile/me',
        pathMatch: 'full',
      },
      {
        path: 'profile/:id',
        component: ProfilePageComponent,
      },
      {
        path: 'search',
        component: SearchPageComponent,
      },
      {
        path: 'settings',
        component: SettingsPageComponent,
      },
      {
        path: 'chats',
        loadChildren: () => chatsRoutes,
      },
      {
        path: 'experimantal',
        component: FormsComponent,
      },
    ],
    canActivate: [canActivateAuth],
  },
  {
    path: 'login',
    component: LoginPageComponent,
  },
];
