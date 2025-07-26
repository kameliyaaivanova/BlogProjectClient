import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Permission } from '../model/Permission';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  constructor(private http: HttpClient) { }

  get(): Observable<Permission[]> {
    return this.http.get<Permission[]>(environment.apiUrl + `permissions`);
  }
}
