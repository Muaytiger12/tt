import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { catchError, tap, throwError } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { TokenResponse } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient);
  public baseApiUrl = 'https://icherniakov.ru/yt-course/auth/';
  cookie = inject(CookieService);
  token: string | null = null;
  refreshToken: string | null = null;
  router = inject(Router);

  get isAuth() {
    if (!this.token) {
      this.token = this.cookie.get('token');
      this.refreshToken = this.cookie.get('refreshToken');
    }
    return !!this.token;
  }

  login(payload: { username: string , password: string }) {
    const fd = new FormData();
    fd.append('username', payload.username);
    fd.append('password', payload.password);
    return this.http
      .post<TokenResponse>(`${this.baseApiUrl}token`, fd)
      .pipe(tap((val) => this.saveTokens(val)));
  }

  refreshAuthToken() {
    return this.http
      .post<TokenResponse>(`${this.baseApiUrl}refresh`, {
        refresh_token: this.refreshToken,
      })
      .pipe(
        tap((val) => this.saveTokens(val)),
        catchError((err) => {
          this.logout();
          return throwError(err);
        })
      );
  }

  logout() {
    this.cookie.deleteAll();
    this.token = null;
    this.refreshToken = null;
    this.router.navigate(['/login']);
  }
  saveTokens(res: TokenResponse) {
    this.token = res.access_token;
    this.refreshToken = res.refresh_token;

    this.cookie.set('token', this.token);
    this.cookie.set('refreshToken', this.refreshToken);
  }
}
