import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Estacionamiento } from '../models/estacionamiento';
import { SesionService } from './sesion.service';

@Injectable({
  providedIn: 'root'
})
export class EstacionamientoService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    observe: 'response'
  };

  private estacionamientoRoute: string = 'http://localhost:8080/estacionamientos';

  constructor(private http: HttpClient, private sesionService: SesionService) { }

  iniciarEstacionamiento(cadena: string): Observable<HttpResponse<any>> {
    const params = new HttpParams().set('patente', cadena);
    let url = `${this.estacionamientoRoute}/iniciar/${this.sesionService.getSesionCelular()}`;
    return this.http.post(url, null, { params, observe: 'response', responseType: 'text' });
  }

  finalizarEstacionamiento(id: number): Observable<HttpResponse<any>> {
    let url = `${this.estacionamientoRoute}/${id}/finalizar`;
    return this.http.post(url, null, { observe: 'response', responseType: 'text'});
  }

  getEstacionamientoPendiente(celular: string): Observable<HttpResponse<any>> {
    let url = `${this.estacionamientoRoute}/${celular}/pendiente`;
    return this.http.get<Estacionamiento>(url, { observe: 'response' });
  }

}
