import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../model/Category';
import { environment } from '../../../environments/environment';
import { Pageable } from '../model/Pageable';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  addCategory(body: Category): Observable<Category> {
    return this.http.post<Category>(environment.apiUrl + 'categories/add', body)
  }

  getCategories(pageNumber: number = 0, size?: number): Observable<Pageable> {
    let params = "?page=" + pageNumber

    if (size) {
      params += "&size=" + size
    }

    return this.http.get<Pageable>(environment.apiUrl + `categories` + params);
  }

  getCategory(id: number): Observable<Category> {
    return this.http.get<Category>(environment.apiUrl + `categories/${id}`);
  }

  updateCategory(id: number, body: Category): Observable<Category> {
    return this.http.put<Category>(environment.apiUrl + `categories/${id}`, body);
  }
}