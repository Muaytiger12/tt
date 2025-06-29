import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ProfileCardComponent } from '../../ui';
import { ProfileFiltersComponent } from '../profile-filters/profile-filters.component';
import { Store } from '@ngrx/store';

import { WaIntersectionObserver } from '@ng-web-apis/intersection-observer';
import { profileActions, selectFilteredProfiles } from '../../store';



@Component({
  selector: 'lib-search-page',
  imports: [
    ProfileCardComponent,
    ProfileFiltersComponent,
    WaIntersectionObserver,
  ],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchPageComponent {
  store = inject(Store);
  profiles = this.store.selectSignal(selectFilteredProfiles);

  timeToFetch() {
    this.store.dispatch(profileActions.setPage({}));
  }

  onIntersection(entries: IntersectionObserverEntry[]) {
    if (!entries.length) return;
    if (entries[0].intersectionRatio > 0) {
      this.timeToFetch();
    }
  }
}
