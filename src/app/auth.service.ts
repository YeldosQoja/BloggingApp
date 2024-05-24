import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  EMPTY,
  Observable,
  delay,
  map,
  retry,
  shareReplay,
  tap,
} from 'rxjs';
import { User } from './user';
import { JwtService } from './jwt.service';
import { RegisterForm } from './register-form';

type UserCredentials = {
  access: string;
  refresh: string;
  user: User;
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);

  public isAuthenticated = this.currentUserSubject.pipe(map(Boolean));

  constructor(private http: HttpClient, private jwtService: JwtService) {}

  getCurrentUser(): Observable<User> {
    return this.http.get<User>('profile/user/').pipe(
      retry({
        delay: (err, retryCount) => {
          return this.jwtService.refreshToken();
        },
      }),
      tap((user) => void this.currentUserSubject.next(user)),
      shareReplay()
    );
  }

  login(credentials: {
    username: string;
    password: string;
  }): Observable<UserCredentials> {
    return this.http
      .post<UserCredentials>('login/', credentials)
      .pipe(tap((tokens) => this.setAuth(tokens)));
  }

  register(newUser: RegisterForm): Observable<User> {
    const { firstName, lastName, username, email, password } = newUser;
    return this.http
      .post<User>('register/', {
        first_name: firstName,
        last_name: lastName,
        username,
        email,
        password,
      })
      .pipe(tap((user) => this.currentUserSubject.next(user)));
  }

  setAuth({ access, refresh, user }: UserCredentials): void {
    this.jwtService.saveAccessToken(access);
    this.jwtService.saveRefreshToken(refresh);
    this.currentUserSubject.next(user);
  }

  purgeAuth(): void {
    this.jwtService.destroyTokens();
    this.currentUserSubject.next(null);
  }
}
