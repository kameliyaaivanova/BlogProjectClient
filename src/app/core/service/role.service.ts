import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Role } from '../model/Role';
import { environment } from '../../../environments/environment';
import { Pageable } from '../model/Pageable';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient) { }

  addRole(body: Role): Observable<Role> {
    return this.http.post<Role>(environment.apiUrl + 'roles/add', body)
  }

  getRoles(pageNumber: number = 0): Observable<Pageable> {
    return this.http.get<Pageable>(environment.apiUrl + `roles?page=` + pageNumber);
  }

  getRole(id: number): Observable<Role> {
    return this.http.get<Role>(environment.apiUrl + `roles/${id}`);
  }

  updateRole(id: number, body: Role): Observable<Role> {
    return this.http.put<Role>(environment.apiUrl + `roles/${id}`, body);
  }

  deleteRole(id: number) {
    return this.http.delete(environment.apiUrl + `roles/${id}`);
  }
}
