import { HttpInterceptorFn } from '@angular/common/http';

const baseUrl = 'http://localhost:8000/api/';

export const baseUrlInterceptor: HttpInterceptorFn = (req, next) => {
  req = req.clone({ url: baseUrl + req.url });
  return next(req);
};
