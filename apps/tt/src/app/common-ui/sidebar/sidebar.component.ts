import { Component, inject } from '@angular/core';
import { SvgComponent } from '../../../../../../libs/common-ui/src/lib/components/svg/svg.component';
import { AsyncPipe, JsonPipe, NgFor } from '@angular/common';
import { SubscriberCardComponent } from '../subscriber-card/subscriber-card.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ProfileService } from '../../../../../../libs/profile/src/lib/data/services/profile.service';
import { firstValueFrom } from 'rxjs';
import { ImgUrlPipe } from '../../../../../../libs/common-ui/src/lib/pipes/img-url.pipe';

@Component({
  selector: 'app-sidebar',
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
  ];

  ngOnInit() {
    firstValueFrom(this.profileService.getMe());
  }
}
