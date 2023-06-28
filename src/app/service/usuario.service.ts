import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/usuario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private loginRoute: string = 'http://localhost:8080/login';
  private usuarioRoute: string = 'http://localhost:8080/usuario';

  constructor(private http: HttpClient) { }

  loginUsuario(usuario: Usuario) {
    return this.http.post<Usuario>(this.loginRoute, usuario, {observe: 'response'});
  }

}
