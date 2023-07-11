import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Usuario } from '../models/usuario';
import { Observable, Subject, catchError, throwError } from 'rxjs';
import { Patente } from '../models/patente';
import { CtaCorriente } from '../models/cta-corriente';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private loginRoute: string = 'http://localhost:8080/login';
  private usuarioRoute: string = 'http://localhost:8080/usuarios';

  constructor(private http: HttpClient) { }

  loginUsuario(usuario: Usuario): Observable<HttpResponse<any>> {
    return this.http.post<any>(this.loginRoute, usuario, { observe: 'response' }).pipe(
      catchError(error => {
        return throwError(error);
      })
    );
  }

  registrarUsuario(usuario: Usuario): Observable<HttpResponse<any>> {
    return this.http.post(this.usuarioRoute, usuario, { observe: 'response', responseType: 'text' }).pipe(
      catchError(error => {
        return throwError(error);
      })
    );
  }

  getPatentes(): Observable<HttpResponse<any>> {
    const url = `${this.usuarioRoute}/${this.getSesion().celular}/patentes`;
    return this.http.get<Patente[]>(url, { observe: 'response' }).pipe(
      catchError(error => {
        return throwError(error);
      })
    );
  }

  getCuentaCorriente(): Observable<HttpResponse<any>> {
    const url = `${this.usuarioRoute}/${this.getSesion().celular}/cuenta`;
    return this.http.get<CtaCorriente>(url, { observe: 'response' }).pipe(
      catchError(error => {
        return throwError(error);
      })
    );
  }

  getSesion(): Usuario {

    return JSON.parse(localStorage.getItem("sesion")!);
    
  }

}
