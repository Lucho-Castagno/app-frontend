import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class PlateService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private plateRoute: string = 'http://localhost:8080/plates';
  

  constructor(private http: HttpClient, private sessionService: SessionService) { }

  addPlate(plate: string): Observable<HttpResponse<any>> {
    const params = new HttpParams().set('plate', plate);
    let url = `${this.plateRoute}/${this.sessionService.getSessionId()}/create`;
    return this.http.post<any>(url, null, { params, observe: 'response' });
  }

}
