import { LOCAL_STORAGE_KEYS } from 'constants/local-storage';

import { HttpInterceptorFn } from '@angular/common/http';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem(LOCAL_STORAGE_KEYS.TOKEN_KEY);
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  return next(req);
};
