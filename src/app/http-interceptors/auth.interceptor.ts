import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('ACCESS_TOKEN') ?? '';
  const authReq = req.clone({
    setHeaders: {
      Authorization: token ? `Bearer ${token}` : '',
    },
  });
  return next(authReq);
};
