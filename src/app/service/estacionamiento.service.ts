import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioService } from './usuario.service';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstacionamientoService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private estacionamientoRoute: string = 'http://localhost:8080/estacionamientos';

  constructor(private http: HttpClient, private usuarioService: UsuarioService) { }

  iniciarEstacionamiento(cadena: string) {
    const params = new HttpParams().set('patente', cadena);
    let url = `${this.estacionamientoRoute}/iniciar/${this.usuarioService.getSesion().getCelular()}`;
    return this.http.post<string>(url, null, { params }).pipe(
      catchError(error => {
        console.log(error);
        return error;
      })
    );
  }

}
