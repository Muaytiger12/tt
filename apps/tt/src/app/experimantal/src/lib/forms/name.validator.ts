import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
} from '@angular/forms';
import { map, Observable } from 'rxjs';
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Profile } from '../../../../../../../../libs/profile/src/lib/data/interfaces/profile.interface';

@Injectable({
  providedIn: 'root',
})
export class NameValidator implements AsyncValidator {
  http = inject(HttpClient);

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    return this.http
      .get<Profile[]>(`https://icherniakov.ru/yt-course/account/test_accounts`)
      .pipe(
        map((users) => {
          return users.filter((u) => u.firstName === control.value).length > 0
            ? null
            : {
                nameValid: {
                  message: `Имя должно быть одним из списка ${users
                    .map((u) => u.firstName)
                    .join(', ')}`,
                },
              };
        })
      );
  }
}
