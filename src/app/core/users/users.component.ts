import { Component } from '@angular/core';
import { UserService } from '../service/user.service';
import { User } from '../model/User';
import { RouterLink } from '@angular/router';
import { Pageable } from '../model/Pageable';
import { PageNavComponent } from '../page-nav/page-nav.component';
import { DatePipe } from '@angular/common';
import { StorageService } from '../service/storage.service';
import { Permissions } from '../model/Permissions';

@Component({
  selector: 'app-users',
  imports: [RouterLink, PageNavComponent, DatePipe],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {
  hasUpdatePermission: boolean
  hasDeletePermission: boolean
  hasCreatePermission: boolean

  constructor(private userService: UserService, private storageService: StorageService) {
    this.hasUpdatePermission = storageService.hasPermission(Permissions.UPDATE_USERS)
    this.hasDeletePermission = storageService.hasPermission(Permissions.DELETE_USERS)
    this.hasCreatePermission = storageService.hasPermission(Permissions.CREATE_USERS)
  }

  page: Pageable = {} as Pageable
  users: User[] = []

  getPage(number: number) {
    this.userService.getUsers(number).subscribe((r: Pageable) => {
      this.users = r.content
      this.page = r
    })
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe(r => {
      this.getPage(this.page.number)
    })
  }
}
