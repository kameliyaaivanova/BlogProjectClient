import { CanActivateFn, Router } from '@angular/router';
import { StorageService } from '../../core/service/storage.service';
import { inject } from '@angular/core';
import { Permissions } from '../../core/model/Permissions';

export const statsGuard: CanActivateFn = (route, state) => {
  const permissions = inject(StorageService).getUser()?.permissions
  const router = inject(Router)

  if (!permissions) {
    router.navigate(['/'])
    return false
  }

  if (permissions.indexOf(Permissions.READ_STATISTICS) !== -1) {
    return true
  }

  router.navigate(['/'])
  return false
};
