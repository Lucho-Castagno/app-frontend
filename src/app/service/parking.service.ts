import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Parking } from '../models/parking';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class ParkingService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    observe: 'response'
  };

  private parkingRoute: string = 'http://localhost:8080/parkings';

  constructor(private http: HttpClient, private sessionService: SessionService) { }

  startParking(plate: string): Observable<HttpResponse<any>> {
    const params = new HttpParams().set('plate', plate);
    let url = `${this.parkingRoute}/start/${this.sessionService.getSessionId()}`;
    return this.http.post(url, null, { params, observe: 'response', responseType: 'text' });
  }

  finishParking(id: number): Observable<HttpResponse<any>> {
    let url = `${this.parkingRoute}/${id}/finish`;
    return this.http.post(url, null, { observe: 'response', responseType: 'text'});
  }

  getPendingParking(id: number): Observable<HttpResponse<any>> {
    let url = `${this.parkingRoute}/${id}/pending`;
    return this.http.get<Parking>(url, { observe: 'response' });
  }

}
