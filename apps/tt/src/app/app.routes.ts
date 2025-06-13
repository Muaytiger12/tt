import { Routes } from '@angular/router';


import {
  ProfileEffects,
  profileFeature,
  ProfilePageComponent,
  SearchPageComponent,
  SettingsPageComponent
} from 'profile';
import { chatsRoutes } from 'chat';
import { FormsComponent } from 'experimental';
import { canActivateAuth, LoginPageComponent } from 'auth';
import { LayoutComponent } from 'layout';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';








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
        providers: [ provideState(profileFeature),provideEffects(ProfileEffects) ]
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
        path: 'experimental',
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
