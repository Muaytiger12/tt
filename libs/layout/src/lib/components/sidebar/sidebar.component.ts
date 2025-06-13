import { Component, inject } from '@angular/core';

import { AsyncPipe, NgFor } from '@angular/common';

import { RouterLink, RouterLinkActive } from '@angular/router';

import { firstValueFrom } from 'rxjs';
import { ImgUrlPipe, SubscriberCardComponent, SvgComponent } from 'common-ui';
import { ProfileService } from 'data-access';


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
})
export class SidebarComponent {
  profileService = inject(ProfileService);
  subscribers$ = this.profileService.getSubscribersShortList();
  me = this.profileService.me;
  menuItems = [
    { label: 'Моя Страница', icon: 'home', link: 'profile/me' },
    { label: 'Чаты', icon: 'chat', link: 'chats' },
    { label: 'Поиск', icon: 'search', link: 'search' },
    { label: 'Эксперименты', icon: 'caldron', link: 'experimental' },
  ];

  ngOnInit() {
    firstValueFrom(this.profileService.getMe());
  }
}
