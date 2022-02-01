import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { Comments } from '../interface/comments';

@Injectable({
  providedIn: 'root'
})

export class ControlsService {
  private apiServer = "http://localhost:3000";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Comments[]> {
    return this.httpClient.get<Comments[]>(this.apiServer + '/comments/')
  }

  getCurrentUser(): Observable<Comments[]> {
    return this.httpClient.get<Comments[]>(this.apiServer + '/currentUser/')
  }

  createReply(id: number, comments: string) {
    return this.httpClient.put(this.apiServer + id, JSON.stringify(comments), this.httpOptions);
  }


}
