import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { Comments } from '../interface/comments';

@Injectable({
  providedIn: 'root'
})
export class ControlsService {
  allReplies: any;
  constructor(private httpClient: HttpClient) { }

  private apiServer = "http://localhost:3000";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  // getData() {
  //   this.http.get('http://localhost:3000/comments').subscribe((res) => {
  //     this.allData = res;
  //     console.log("TUTTO: ", this.allData);

  //     this.allData.map((res: any) => {
  //       this.allReplies = res.replies;
  //       console.log("Risposte: ", this.allReplies);
  //     })
  //   })
  // }

  getAll(): Observable<Comments[]> {
    return this.httpClient.get<Comments[]>(this.apiServer + '/comments/')
  }

  createReply(id: number, product: string) {
    return this.httpClient.put('http://localhost:3000/comments/' + id, JSON.stringify(product), this.httpOptions);
  }


}
