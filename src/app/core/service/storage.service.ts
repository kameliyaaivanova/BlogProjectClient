import { Injectable } from '@angular/core';
import { Token } from '../model/Token';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private static USER: string = 'user';
  private static JWT: string = "jwt";
  private static REFRESH_TOKEN: string = "refreshToken";

  storeUser(data: Token): void {
    localStorage.setItem(StorageService.USER, JSON.stringify(data));
  }

  storeJwt(jwt: string): void {
    localStorage.setItem(StorageService.JWT, jwt);
  }

  clearJwt(): void {
    localStorage.removeItem(StorageService.JWT);
  }

  storeRefreshToken(refreshToken: string): void {
    localStorage.setItem(StorageService.REFRESH_TOKEN, refreshToken);
  }

  clearRefreshToken(): void {
    localStorage.removeItem(StorageService.REFRESH_TOKEN);
  }

  clearUser(): void {
    localStorage.removeItem(StorageService.USER);
  }

  getUser(): Token|null {
    const userdata = localStorage.getItem(StorageService.USER)

    if (userdata) {
      return JSON.parse(userdata);
    }

    return null
  }

  getJwt(): string|null {
    return localStorage.getItem(StorageService.JWT);
  }

  getRefreshToken(): string|null {
    return localStorage.getItem(StorageService.REFRESH_TOKEN);
  }

  hasPermission(permission: String): boolean {
    const user = this.getUser()

    if (!user) {
      return false
    }

    return user.permissions.indexOf(permission) !== -1
  }
}
