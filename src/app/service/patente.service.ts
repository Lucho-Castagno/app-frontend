import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { SesionService } from './sesion.service';

@Injectable({
  providedIn: 'root'
})
export class PatenteService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private patenteRoute: string = 'http://localhost:8080/patentes';
  

  constructor(private http: HttpClient, private sesionService: SesionService) { }

  addPatente(cadena: string): Observable<HttpResponse<any>> {
    const params = new HttpParams().set('cadena', cadena);
    let url = `${this.patenteRoute}/${this.sesionService.getSesionCelular()}/crearPatente`;
    return this.http.post<any>(url, null, { params, observe: 'response' });
  }

}
