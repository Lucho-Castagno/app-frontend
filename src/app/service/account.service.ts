import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movement } from '../models/movement';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  accountRoute: string = 'http://localhost:8080/account'

  constructor(private http: HttpClient) { }

  chargeBalance(id: number, credit: number): Observable<HttpResponse<any>> {
    const url = `${this.accountRoute}/${id}/${credit}`;
    return this.http.post<any>(url, null, this.httpOptions);
  }

  getAccountMovements(id: number): Observable<HttpResponse<any>> {
    const url = `${this.accountRoute}/${id}/movements`;
    return this.http.get<Movement[]>(url, { observe: 'response' });
  }

}
