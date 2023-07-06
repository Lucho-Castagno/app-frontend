import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CtaEstacionamientoService {

  ctaCorrienteActualizada = new EventEmitter<void>();

  constructor() { }

  notificarActualizacionCtaCorriente() {
    this.ctaCorrienteActualizada.emit();
  }

}
