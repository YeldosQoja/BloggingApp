import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JwtService {
  constructor(private http: HttpClient) {}

  getAccessToken(): string {
    return window.localStorage.getItem('ACCESS_TOKEN') ?? '';
  }

  getRefreshToken(): string {
    return window.localStorage.getItem('REFRESH_TOKEN') ?? '';
  }

  refreshToken(): Observable<string> {
    const token = this.getRefreshToken();
    return this.http
      .post<{ access: string }>('token/refresh/', { refresh: token })
      .pipe(
        map(({ access }) => access),
        tap(this.saveAccessToken)
      );
  }

  saveAccessToken(token: string): void {
    window.localStorage.setItem('ACCESS_TOKEN', token);
  }

  saveRefreshToken(token: string): void {
    window.localStorage.setItem('REFRESH_TOKEN', token);
  }

  destroyTokens(): void {
    window.localStorage.removeItem('ACCESS_TOKEN');
    window.localStorage.removeItem('REFRESH_TOKEN');
  }
}
