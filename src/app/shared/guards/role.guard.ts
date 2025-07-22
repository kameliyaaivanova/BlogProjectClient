import { CanActivateFn, Router } from '@angular/router';
import { StorageService } from '../../core/service/storage.service';
import { inject } from '@angular/core';
import { Permissions } from '../../core/model/Permissions';

export const roleGuard: CanActivateFn = (route, state) => {
  const permissions = inject(StorageService).getUser()?.permissions
  const router = inject(Router)

  if (!permissions) {
    router.navigate(['/'])
    return false
  }

  const hasReadPermissions = permissions.indexOf(Permissions.READ_ROLES) !== -1
  const hasMutatingPermissions =
    permissions.indexOf(Permissions.CREATE_ROLES) !== -1 || permissions.indexOf(Permissions.UPDATE_ROLES) !== -1 || permissions.indexOf(Permissions.DELETE_ROLES) !== -1

  if (hasReadPermissions && hasMutatingPermissions) {
    return true
  }

  router.navigate(['/'])
  return false
};
