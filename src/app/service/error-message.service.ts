import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorMessageService {
  private mensajeError: string | null = null;

  constructor() { }

  setMensajeError(mensaje: string): void {
    this.mensajeError = mensaje;
  }

  getMensajeError() : string | null {
    return this.mensajeError;
  }

}
