import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { baseUrlInterceptor } from "./base-url.interceptor";
import { authInterceptor } from "./auth.interceptor";

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: baseUrlInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: authInterceptor, multi: true },
];
