import { Component, inject } from '@angular/core';
import { AvatarUploadComponent } from '../../settings-page/avatar-upload/avatar-upload.component';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ProfileService } from '../../../../../../../libs/profile/src/lib/data/services/profile.service';
import { debounceTime, startWith, Subscription, switchMap } from 'rxjs';

@Component({
  selector: 'app-profile-filters',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './profile-filters.component.html',
  styleUrl: './profile-filters.component.scss',
})
export class ProfileFiltersComponent {
  fd = inject(FormBuilder);
  profileService = inject(ProfileService);
  sub = new Subscription();
  formFilters = this.fd.group({
    firstName: [''],
    lastName: [''],
    stack: [''],
  });

  constructor() {
    this.sub = this.formFilters.valueChanges
      .pipe(
        startWith({}),
        debounceTime(400),
        switchMap((formValue) => {
          return this.profileService.filterProfile(formValue);
        })
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
