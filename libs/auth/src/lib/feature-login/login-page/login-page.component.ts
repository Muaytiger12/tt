import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { Router } from '@angular/router';
import { AuthService } from 'data-access';
import { TtInputComponent } from 'common-ui';

@Component({
  selector: 'lib-login-page',
  imports: [ReactiveFormsModule, TtInputComponent],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent implements OnInit {
  authService = inject(AuthService);
  router = inject(Router);
  isPasswordVisible = signal<boolean>(false);
  form = new FormGroup({
    username: new FormControl<string | null>(null, Validators.required),
    password: new FormControl<string | null>(null, Validators.required),
  });
  ngOnInit() {
    this.form.valueChanges
      .subscribe(val => console.log(val))
  }
  onSubmit() {
    if (this.form.valid) {
      // @ts-ignore
      this.authService.login(this.form.value).subscribe(() => {
        this.router.navigate(['']);
      });
    }
  }
}
