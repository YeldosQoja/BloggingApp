import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { User } from './user';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private jwtService: JwtService) {}

  login(credentials: {
    username: string;
    password: string;
  }): Observable<{ access: string; refresh: string }> {
    return this.http
      .post<{ access: string; refresh: string }>('token/', credentials)
      .pipe(tap((tokens) => this.setAuth(tokens)));
  }

  register(newUser: User): Observable<any> {
    const { firstName, lastName, username, email, password } = newUser;
    return this.http.post<any>('user/register/', {
      first_name: firstName,
      last_name: lastName,
      username,
      email,
      password,
    });
  }

  setAuth({ access, refresh }: { access: string; refresh: string }): void {
    this.jwtService.saveAccessToken(access);
    this.jwtService.saveRefreshToken(refresh);
  }
}
