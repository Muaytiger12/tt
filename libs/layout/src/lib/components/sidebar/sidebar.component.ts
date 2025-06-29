import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';

import { AsyncPipe, NgFor } from '@angular/common';

import { RouterLink, RouterLinkActive } from '@angular/router';

import { firstValueFrom, Subscription } from 'rxjs';
import { ImgUrlPipe, SubscriberCardComponent, SvgComponent } from 'common-ui';
import { AuthService, ChatsService, ProfileService } from 'data-access';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';


@Component({
  selector: 'lib-sidebar',
  imports: [
    SvgComponent,
    NgFor,
    SubscriberCardComponent,
    RouterLink,
    AsyncPipe,
    ImgUrlPipe,
    RouterLinkActive,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent implements OnInit {
  profileService = inject(ProfileService);
  unread = inject(ChatsService).unreadChatMessages;
  chatService = inject(ChatsService);
  authService = inject(AuthService);
  destroyRef = inject(DestroyRef);
  subscribers$ = this.profileService.getSubscribersShortList();
  me = this.profileService.me;
  wsSubscribtion!: Subscription;
  menuItems = [
    { label: 'Моя Страница', icon: 'home', link: 'profile/me' },
    { label: 'Чаты', icon: 'chat', link: 'chats' },
    { label: 'Поиск', icon: 'search', link: 'search' },
    { label: 'Эксперименты', icon: 'caldron', link: 'experimental' },
  ];

  ngOnInit() {
    firstValueFrom(this.profileService.getMe());
    this.connectWS();
  }

 async reconnect() {
   await firstValueFrom(this.authService.refreshAuthToken());
    this.connectWS();
  }

  connectWS() {
    this.wsSubscribtion.unsubscribe();
    this.wsSubscribtion = this.chatService
      .connectWs()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.reconnect());
  }
}
