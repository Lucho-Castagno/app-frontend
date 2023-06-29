import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Usuario } from '../models/usuario';
import { Observable, catchError, throwError, throwIfEmpty } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private sesion!: Usuario;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private loginRoute: string = 'http://localhost:8080/login';
  private usuarioRoute: string = 'http://localhost:8080/usuario';

  constructor(private http: HttpClient) { }

  loginUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.loginRoute, usuario, this.httpOptions).pipe(
      catchError(error => {
        console.log("error en la solicitud");
        return throwError(error);
      })
    );
  }

  setUsuario(usuario: Usuario): void {
    this.sesion = usuario;
  }

  getUsuario(): Usuario {
    return this.sesion;
  }

}
