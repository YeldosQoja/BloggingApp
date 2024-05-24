import { APP_INITIALIZER, ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { baseUrlInterceptor } from './http-interceptors/base-url.interceptor';
import { authInterceptor } from './http-interceptors/auth.interceptor';
import { AuthService } from './auth.service';
import { JwtService } from './jwt.service';
import { EMPTY } from 'rxjs';

const initAuth = (authService: AuthService, jwtService: JwtService) => {
  return () =>
    jwtService.getAccessToken() ? authService.getCurrentUser() : EMPTY;
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([baseUrlInterceptor, authInterceptor])),
    {
      provide: APP_INITIALIZER,
      useFactory: initAuth,
      deps: [AuthService, JwtService],
      multi: true,
    },
  ],
};
