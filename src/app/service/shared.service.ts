import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class sharedService {

  ctaCorrienteActualizada = new EventEmitter<void>();
  nuevosMovimientos = new EventEmitter<void>();
  private ctaCorrienteId!: number;

  constructor() { }

  notificarActualizacionCtaCorriente() {
    this.ctaCorrienteActualizada.emit();
  }

  notificarNuevosMovimientos() {
    this.nuevosMovimientos.emit();
  }

  public setCtaId(id: number) {
    this.ctaCorrienteId = id;
  }

  public getCtaId() {
    return this.ctaCorrienteId;
  }

}
