import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { Plate } from '../models/plate';
import { Account } from '../models/account';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private userRoute: string = 'http://localhost:8080/users';
  private registerRoute: string = 'http://localhost:8080/auth/register';

  constructor(private http: HttpClient, private sessionService: SessionService) { }

  signUpUser(user: User): Observable<HttpResponse<any>> {
    return this.http.post(this.registerRoute, user, { observe: 'response', responseType: 'text' });
  }

  getPlates(): Observable<HttpResponse<any>> {
    const url = `${this.userRoute}/${this.sessionService.getSessionId()}/plates`;
    return this.http.get<Plate[]>(url, { observe: 'response' });
  }

  getAccount(): Observable<HttpResponse<any>> {
    const url = `${this.userRoute}/${this.sessionService.getSessionId()}/account`;
    return this.http.get<Account>(url, { observe: 'response' });
  }

}
