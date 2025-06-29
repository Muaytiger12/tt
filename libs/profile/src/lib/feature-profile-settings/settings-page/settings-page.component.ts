import { ChangeDetectionStrategy, Component, effect, inject, ViewChild } from '@angular/core';

import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { AvatarUploadComponent, ProfileHeaderComponent } from '../../ui';
import { ProfileService } from 'data-access';
import { StackInputComponent } from 'common-ui';
import {
  AddressInputComponent
} from '../../../../../common-ui/src/lib/components/address-input/address-input.component';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-settings-page',
  imports: [
    ProfileHeaderComponent,
    ReactiveFormsModule,
    AvatarUploadComponent,
    StackInputComponent,
    AddressInputComponent,
  ],
  templateUrl: './settings-page.component.html',
  styleUrl: './settings-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsPageComponent {
  fb = inject(FormBuilder);
  profileService = inject(ProfileService);
  @ViewChild(AvatarUploadComponent) avatarUploader!: AvatarUploadComponent;
  profile = this.profileService.me;
  form = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    username: [{ value: '', disabled: true }, Validators.required],
    description: [''],
    stack: [{ value: '', disabled: true }],
    city: ['', Validators.required],
  });

  constructor() {
    effect(() => {
      this.form.patchValue({
        ...this.profileService.me(),
      });
    });
  }

  onSave() {
    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();
    if (this.form.invalid) return;

    if (this.avatarUploader.avatar) {
      firstValueFrom(
        this.profileService.uploadAvatar(this.avatarUploader.avatar)
      );
    }

    firstValueFrom(
      // @ts-ignore
      this.profileService.patchProfile({
        ...this.form.value,
      })
    );
  }
}
