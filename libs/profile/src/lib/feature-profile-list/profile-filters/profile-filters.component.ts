import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { debounceTime, startWith, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import {profileActions, selectFilteredProfiles} from '../../store';
import {toObservable} from '@angular/core/rxjs-interop';




@Component({
  selector: 'lib-profile-filters',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './profile-filters.component.html',
  styleUrl: './profile-filters.component.scss',
})
export class ProfileFiltersComponent {
  fb = inject(FormBuilder);
  sub = new Subscription();
  store = inject(Store);
  formFilters = this.fb.group({
    firstName: [''],
    lastName: [''],
    stack: [''],
  });

  constructor() {


    this.sub = this.formFilters.valueChanges
      .pipe(startWith({}), debounceTime(400))
      .subscribe((form) => {

        this.store.dispatch(profileActions.filterEvents({filters: form}))

      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
