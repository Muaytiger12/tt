import { Component, inject, signal } from '@angular/core';
import { ProfileHeaderComponent } from '../../ui/profile-header/profile-header.component';

import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { switchMap } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { AsyncPipe } from '@angular/common';
import { SvgComponent } from 'common-ui';
import { ImgUrlPipe } from 'common-ui';

import {PostFeedComponent} from 'posts';
import { ProfileService } from '../../data/index';


@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-profile-page',
  imports: [
    ProfileHeaderComponent,
    AsyncPipe,
    RouterLink,
    SvgComponent,
    ImgUrlPipe,
    PostFeedComponent,
  ],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
})
export class ProfilePageComponent {
  profileService = inject(ProfileService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  me$ = toObservable(this.profileService.me);
  subscribers$ = this.profileService.getSubscribersShortList(5);
  isMyPage = signal(false);

  profile$ = this.route.params.pipe(
    switchMap(({ id }) => {
      this.isMyPage.set(id === 'me' || id === this.profileService.me()?.id);
      if (id === 'me') return this.me$;
      return this.profileService.getAccount(id);
    })
  );
  async sendMessage(id: number) {
      this.router.navigate(['/chats', 'new'],{queryParams:{userId:id}});
  }
}
