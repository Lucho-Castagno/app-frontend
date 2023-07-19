import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Usuario } from '../models/usuario';
import { Observable, Subject, catchError, throwError } from 'rxjs';
import { Patente } from '../models/patente';
import { CtaCorriente } from '../models/cta-corriente';
import { SesionService } from './sesion.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private usuarioRoute: string = 'http://localhost:8080/usuarios';
  private registerRoute: string = 'http://localhost:8080/auth/register';

  constructor(private http: HttpClient, private sesionService: SesionService) { }

  registrarUsuario(usuario: Usuario): Observable<HttpResponse<any>> {
    return this.http.post(this.registerRoute, usuario, { observe: 'response', responseType: 'text' });
  }

  getPatentes(): Observable<HttpResponse<any>> {
    const url = `${this.usuarioRoute}/${this.sesionService.getSesionCelular()}/patentes`;
    return this.http.get<Patente[]>(url, { observe: 'response' });
  }

  getCuentaCorriente(): Observable<HttpResponse<any>> {
    const url = `${this.usuarioRoute}/${this.sesionService.getSesionCelular()}/cuenta`;
    return this.http.get<CtaCorriente>(url, { observe: 'response' });
  }

}
