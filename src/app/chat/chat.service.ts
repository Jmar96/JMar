import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  apiServerUrl: string = 'http://localhost:3000/chats';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  //read
  list(page: number){
    return this.http.get(this.apiServerUrl + '?page=' + page);
  }
  //create
  saveChat(data: any): Observable<any>{
    let API_URL = this.apiServerUrl;
    console.log(data);
    return this.http.post(API_URL, data).pipe(
      catchError(this.handleErrors)
    )
  }


  //handle API errors
  handleErrors(error: HttpErrorResponse){
    if (error.error instanceof ErrorEvent){
      console.error('An error occured:', error.error.message);
    } else{
      console.error('Backend returned code ${error.status},'+ error.status + 'body was: ${error.error}'+ error.error);
    }
    return throwError('Something bad happened; please try again later.');
  };

  
}
