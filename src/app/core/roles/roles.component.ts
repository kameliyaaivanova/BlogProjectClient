import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Role } from '../model/Role';
import { RoleService } from '../service/role.service';
import { PageNavComponent } from '../page-nav/page-nav.component';
import { Pageable } from '../model/Pageable';
import { DatePipe } from '@angular/common';
import { ErrorService } from '../service/error.service';
import { StorageService } from '../service/storage.service';
import { Permissions } from '../model/Permissions';

@Component({
  selector: 'app-roles',
  imports: [RouterLink, PageNavComponent, DatePipe],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.scss'
})
export class RolesComponent {
  hasUpdatePermission: boolean
  hasDeletePermission: boolean
  hasCreatePermission: boolean

  page: Pageable = {} as Pageable
  roles: Role[] = []

  constructor(private roleService: RoleService, private errorService: ErrorService, private storageService: StorageService) {
    this.hasUpdatePermission = storageService.hasPermission(Permissions.UPDATE_ROLES)
    this.hasDeletePermission = storageService.hasPermission(Permissions.DELETE_ROLES)
    this.hasCreatePermission = storageService.hasPermission(Permissions.CREATE_ROLES)
  }

  getPage(number: number) {
    this.roleService.getRoles(number).subscribe((r: Pageable) => {
      this.roles = r.content
      this.page = r
    })
  }

  deleteRole(id: number) {
    this.roleService.deleteRole(id).subscribe(r => {
      this.getPage(this.page.number)
    }, (e: Error) => {
      this.errorService.renderApiException(e)
    })
  }
}
