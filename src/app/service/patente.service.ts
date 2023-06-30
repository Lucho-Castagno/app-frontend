import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Patente } from '../models/patente';
import { Observable, catchError, throwError } from 'rxjs';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class PatenteService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private patenteRoute: string = 'http://localhost:8080/patentes';
  

  constructor(private http: HttpClient, private usuarioService: UsuarioService) { }

  addPatente(cadena: string): Observable<Patente> {
    const params = new HttpParams().set('cadena', cadena);
    let url = `${this.patenteRoute}/${this.usuarioService.getSesion().getCelular()}/crearPatente`;
    return this.http.post<Patente>(url, null,{ params }).pipe(
      catchError(error => {
        console.log("error en la solicitud");
        return throwError(error);
      })
    );
  }

}
