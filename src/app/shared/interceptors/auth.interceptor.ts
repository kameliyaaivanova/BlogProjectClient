import { HttpInterceptorFn } from '@angular/common/http';
import { StorageService } from '../../core/service/storage.service';
import { inject } from '@angular/core';
import { Utils } from '../../utils';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const bearerFreeEndpoints: string[] = ['login', 'register'];
  const authToken = inject(StorageService).getJwt()

  let authRequest = req;
  const pathname = Utils.getPathname(req.url);

  if (authToken && pathname && bearerFreeEndpoints.indexOf(pathname) === -1) {
    authRequest = req.clone({
      headers: req.headers.append('Authorization', 'Bearer ' + authToken )
    });
  }

  return next(authRequest);
};
