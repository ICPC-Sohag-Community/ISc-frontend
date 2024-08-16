import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url.includes('/api/Auth/login')) {
    return next(req);
  }

  const authService = inject(AuthService);
  const JWT_TOKEN = authService.getToken();

  req = req.clone({
    setHeaders: {
      Authorization: JWT_TOKEN ? `Bearer ${JWT_TOKEN}` : '',
    },
  });

  return next(req);
};
