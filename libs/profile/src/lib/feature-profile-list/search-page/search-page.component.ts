import { Component, inject } from '@angular/core';
import { ProfileCardComponent } from '../../ui';
import { ProfileFiltersComponent } from '../profile-filters/profile-filters.component';
import { Store } from '@ngrx/store';

import { profileActions, selectFilteredProfiles, selectSaveFiltersProfile } from '../../store';

@Component({

  selector: 'lib-search-page',
  imports: [ProfileCardComponent, ProfileFiltersComponent],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss',
})
export class SearchPageComponent {
  store = inject(Store);
  profiles = this.store.selectSignal(selectSaveFiltersProfile);

}
