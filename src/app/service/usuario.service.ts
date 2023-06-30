import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from '../models/usuario';
import { Observable, catchError, throwError } from 'rxjs';
import { Patente } from '../models/patente';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private sesion!: Usuario;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private loginRoute: string = 'http://localhost:8080/login';
  private usuarioRoute: string = 'http://localhost:8080/usuarios';

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

  getPatentes(): Observable<Patente[]> {
    const url = `${this.usuarioRoute}/${this.sesion.celular}/patentes`;
    return this.http.get<Patente[]>(url).pipe(
      catchError(error => {
        console.log("error al recibir patentes");
        return throwError(error);
      })
    );
  }

  getSesion(): Usuario {
    return this.sesion;
  }

}
