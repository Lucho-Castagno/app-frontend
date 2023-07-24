import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Credentials } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private loginRoute: string = 'http://localhost:8080/auth/login';

  constructor(private http: HttpClient) { }

  loginUser(creds: Credentials): Observable<HttpResponse<any>> {
    return this.http.post<any>(this.loginRoute, creds, { observe: 'response' }).pipe(
      map((response: HttpResponse<any>) => {
        this.setSession(response.body);
        return response;
      }));
  }

  setSession(body: any) {
    localStorage.setItem("session", JSON.stringify(body));
  }

  logoutUser() {
    localStorage.removeItem('session');
  }

  getSessionId(): number {
    return JSON.parse(localStorage.getItem("session")!).id;
  }

  getSessionToken(): string {
    return JSON.parse(localStorage.getItem("session")!).token;
  }

}
