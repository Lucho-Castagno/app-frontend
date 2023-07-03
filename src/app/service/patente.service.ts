import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
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

  addPatente(cadena: string): Observable<HttpResponse<any>> {
    const params = new HttpParams().set('cadena', cadena);
    let url = `${this.patenteRoute}/${this.usuarioService.getSesion().celular}/crearPatente`;
    return this.http.post<any>(url, null, { params, observe: 'response' }).pipe(
      catchError(error => {
        return throwError(error);
      })
    );
  }

}
