import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pageable } from '../model/Pageable';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  constructor(private http: HttpClient) { }

  getActivity(pageNumber: number = 0): Observable<Pageable> {
    return this.http.get<Pageable>(environment.apiUrl + `activity?page=` + pageNumber);
  }

  getDeletedFiles(pageNumber: number = 0): Observable<Pageable> {
    return this.http.get<Pageable>(environment.apiUrl + `deleted-files?page=` + pageNumber);
  }
}

