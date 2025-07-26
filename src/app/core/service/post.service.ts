import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../model/Post';
import { environment } from '../../../environments/environment';
import { Pageable } from '../model/Pageable';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) {}

  addPost(body: Post): Observable<Post> {
    return this.http.post<Post>(environment.apiUrl + 'posts/add', body)
  }

 toggleLike(postId: number): Observable<Post> {
  return this.http.put<Post>(`${environment.apiUrl}posts/${postId}/like`, {});
}

  getPosts(pageNumber: number = 0, categoryId?: number, size?: number): Observable<Pageable> {
    let params = "?page=" + pageNumber

    if (categoryId && categoryId > 0) {
      params += "&categoryId=" + categoryId
    }
    if (size) {
      params += "&size=" + size
    }

    return this.http.get<Pageable>(environment.apiUrl + `posts` + params);
  }

  getPost(id: number): Observable<Post> {
    return this.http.get<Post>(environment.apiUrl + `posts/${id}`);
  }

  updatePost(id: number, body: Post): Observable<Post> {
    return this.http.put<Post>(environment.apiUrl + `posts/${id}`, body);
  }

  deletePost(id: number) {
    return this.http.delete(environment.apiUrl + `posts/${id}`);
  }

}
