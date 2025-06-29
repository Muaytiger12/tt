import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, startWith, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { profileActions, selectFilteredProfiles, selectFiltersProfile } from '../../store';




@Component({
  selector: 'lib-profile-filters',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './profile-filters.component.html',
  styleUrl: './profile-filters.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileFiltersComponent {
  fb = inject(FormBuilder);
  sub = new Subscription();
  store = inject(Store);
  saveProfiles = this.store.selectSignal(selectFiltersProfile);
  formFilters = this.fb.group({
    firstName: [''],
    lastName: [''],
    stack: [''],
  });

  constructor() {
      const filters = this.saveProfiles() ?? {};
      this.formFilters.patchValue(filters);
      this.store.dispatch(profileActions.filterEvents({ filter: filters }));

      this.sub = this.formFilters.valueChanges
        .pipe(debounceTime(400))
        .subscribe((form) => {
          this.store.dispatch(profileActions.filterEvents({ filter: form }));
        });
  }


  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
