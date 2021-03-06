import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comments } from '../interface/comments';

@Injectable({
  providedIn: 'root'
})

export class ControlsService {
  showDelete: Boolean = false;
  idCard: any;
  idPadre: any;

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

  createReply(id: number, comments: any) {
    return this.httpClient.put(this.apiServer + '/comments/' + id, comments).subscribe(() => window.location.reload())
  }

  createComment(comments: any) {
    return this.httpClient.post(this.apiServer + '/comments/', comments).subscribe(() => window.location.reload())
  }

  getId(id: number) {
    return this.httpClient.get<Comments>(this.apiServer + '/comments/' + id)
  }

  randomNumber(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  deleteReply(id: number) {
    return this.httpClient.delete(this.apiServer + '/comments/' + id).subscribe(() => window.location.reload())
  }




}
