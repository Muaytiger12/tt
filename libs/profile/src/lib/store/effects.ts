import { inject, Injectable } from '@angular/core';
import { ProfileService } from 'data-access';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { profileActions } from './actions';
import { map, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileEffects {
  //почему импортит не через алиас ProfileService
  profileService = inject(ProfileService);
  actions$ = inject(Actions);

  filterProfiles = createEffect(() => {
   return this.actions$.pipe(
      ofType(profileActions.filterEvents),
      switchMap(({ filters }) => {
        console.log('EFFECT',filters)
        return this.profileService.filterProfile(filters);
      }),
      map((res) => profileActions.profilesLoaded({ profiles: res.items }))
    );
  });
}
