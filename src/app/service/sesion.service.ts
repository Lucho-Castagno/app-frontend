import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Credenciales } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class SesionService {

  private loginRoute: string = 'http://localhost:8080/auth/login';

  constructor(private http: HttpClient) { }

  loginUsuario(creds: Credenciales): Observable<HttpResponse<any>> {
    return this.http.post<any>(this.loginRoute, creds, { observe: 'response' }).pipe(
      map((response: HttpResponse<any>) => {
        this.setSesion(response.body);
        return response;
      }));
  }

  setSesion(body: any) {
    localStorage.setItem("sesion", JSON.stringify(body));
  }

  logoutUsuario() {
    localStorage.removeItem('sesion');
  }

  getSesionCelular(): string {
    return JSON.parse(localStorage.getItem("sesion")!).celular;
  }

  getSesionToken(): string {
    return JSON.parse(localStorage.getItem("sesion")!).token;
  }

}
