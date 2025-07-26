import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { UploadedFile } from '../model/UploadedFile';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http: HttpClient) { }

  upload(file: File): Observable<UploadedFile> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    return this.http.post<UploadedFile>(environment.apiUrl + `files/add`, formData);
  }
}
