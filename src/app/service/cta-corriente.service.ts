import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Movimiento } from '../models/movimiento';

@Injectable({
  providedIn: 'root'
})
export class CtaCorrienteService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  ctaRoute: string = 'http://localhost:8080/cuenta'

  constructor(private http: HttpClient) { }

  addSaldoCuenta(id: number, monto: number): Observable<HttpResponse<any>> {
    const url = `${this.ctaRoute}/${id}/${monto}`;
    return this.http.post<any>(url, null, this.httpOptions).pipe(
      catchError(error => {
        return throwError(error);
      })
    );
  }

  getMovimientosCuenta(id: number): Observable<HttpResponse<any>> {
    const url = `${this.ctaRoute}/${id}/movimientos`;
    return this.http.get<Movimiento[]>(url, { observe: 'response' }).pipe(
      catchError(error => {
        return throwError(error);
      })
    );
  }

}
