import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { StorageService } from './core/service/storage.service';
import { UserService } from './core/service/user.service';
import { Permissions } from './core/model/Permissions';
import { AuthSubject } from './shared/subjects/auth-subject';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'blogging-client';
  hasCategoriesSectionAccess: boolean = false
  hasPostsSectionAccess: boolean = false
  hasRolesSectionAccess: boolean = false
  hasUsersSectionAccess: boolean = false
  hasStatisticsAccess: boolean = false
  isAuthenticated: boolean = false

  constructor(private storageService: StorageService, private userService: UserService) {}

  ngOnInit(): void {
    this.evaluatePermissions()

    AuthSubject.get().subscribe(v => {
      this.evaluatePermissions()
    })
  }

  evaluatePermissions() {
    this.isAuthenticated = this.userService.isAuthenticated()

    this.hasStatisticsAccess = this.isAuthenticated && this.storageService.hasPermission(Permissions.READ_STATISTICS)

    this.hasCategoriesSectionAccess = this.isAuthenticated && this.storageService.hasPermission(Permissions.READ_CATEGORIES) &&
      (this.storageService.hasPermission(Permissions.CREATE_CATEGORIES) || this.storageService.hasPermission(Permissions.UPDATE_CATEGORIES))

      this.hasRolesSectionAccess = this.isAuthenticated && this.storageService.hasPermission(Permissions.READ_ROLES) &&
      (this.storageService.hasPermission(Permissions.CREATE_ROLES) || this.storageService.hasPermission(Permissions.UPDATE_ROLES) || this.storageService.hasPermission(Permissions.DELETE_ROLES))

      this.hasUsersSectionAccess = this.isAuthenticated && this.storageService.hasPermission(Permissions.READ_USERS) &&
      (this.storageService.hasPermission(Permissions.CREATE_USERS) || this.storageService.hasPermission(Permissions.UPDATE_USERS) || this.storageService.hasPermission(Permissions.DELETE_USERS))

      this.hasPostsSectionAccess = this.isAuthenticated && this.storageService.hasPermission(Permissions.READ_POSTS) &&
      (this.storageService.hasPermission(Permissions.CREATE_POSTS) || this.storageService.hasPermission(Permissions.UPDATE_POSTS) || this.storageService.hasPermission(Permissions.DELETE_POSTS))
  }

  shown: boolean = false

  toggleMenu() {
    this.shown = !this.shown
  }

  logout() {
    this.userService.logout()
    window.location.reload()
  }
}
