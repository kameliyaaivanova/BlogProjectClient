import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User } from '../model/User';
import { Login } from '../model/Login';
import { Pageable } from '../model/Pageable';
import { StorageService } from './storage.service';
import { JwtService } from './jwt.service';
import { Token } from '../model/Token';
import { LoginResponse } from '../model/LoginResponse';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private storageService: StorageService, private jwtService: JwtService) { }

  addUser(body: User): Observable<User> {
    return this.http.post<User>(environment.apiUrl + 'users/add', body)
  }

  login(credentials: Login): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(environment.apiUrl + 'login', credentials, { withCredentials: true })
  }

  registerUser(body: User): Observable<User> {
    return this.http.post<User>(environment.apiUrl + 'register', body)
  }

  getUsers(pageNumber: number = 0): Observable<Pageable> {
    return this.http.get<Pageable>(environment.apiUrl + `users?page=` + pageNumber);
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(environment.apiUrl + `users/${id}`);
  }

  updateUser(id: number, body: User): Observable<User> {
    return this.http.put<User>(environment.apiUrl + `users/${id}`, body);
  }

  deleteUser(id: number) {
    return this.http.delete(environment.apiUrl + `users/${id}`);
  }

  getCurrentUserId(): number | null {
    const currentUser: Token|null = this.storageService.getUser();
    return currentUser ? currentUser.id : null;  // Returns null if no user is found
  }

  isAuthenticated() {
    const jwt = this.storageService.getJwt()
    const refreshToken = this.storageService.getRefreshToken()

    if ((jwt && !this.jwtService.isExpired(jwt)) || (refreshToken && !this.jwtService.isExpired(refreshToken))) {
      return true;
    }

    return false
  }

  logout() {
    this.storageService.clearJwt()
    this.storageService.clearRefreshToken()
    this.storageService.clearUser()
  }
}
