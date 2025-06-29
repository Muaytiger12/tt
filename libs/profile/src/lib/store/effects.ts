import { inject, Injectable } from '@angular/core';
import { ProfileService } from 'data-access';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { profileActions } from './actions';
import { map, switchMap, withLatestFrom } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectFilteredProfiles, selectFiltersProfile, selectProfilePageble } from './selectors';

@Injectable({
  providedIn: 'root',
})
export class ProfileEffects {
  //почему импортит не через алиас ProfileService
  profileService = inject(ProfileService);
  actions$ = inject(Actions);
  store = inject(Store);

  filterProfiles = createEffect(() => {
    return this.actions$.pipe(
      ofType(profileActions.filterEvents, profileActions.setPage),
      withLatestFrom(
        this.store.select(selectFiltersProfile),
        this.store.select(selectProfilePageble)
      ),
      switchMap(([_, filters, pageble]) => {
        return this.profileService.filterProfile({
          ...pageble,
          ...filters,
        });
      }),
      map((res) => profileActions.profilesLoaded({ profiles: res.items }))
    );
  });



}
