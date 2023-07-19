import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Movimiento } from 'src/app/models/movimiento';
import { CtaCorrienteService } from 'src/app/service/cta-corriente.service';
import { ErrorMessageService } from 'src/app/service/error-message.service';
import { sharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {
  
  ctaCorrienteId!: number;
  errorMessage: string | null = null;
  movimientos: Movimiento[] = [];

  constructor(private sharedService: sharedService,
    private ctaCorrienteService: CtaCorrienteService,
    private errorMessageService: ErrorMessageService) { }

  ngOnInit() {
    this.ctaCorrienteId = this.sharedService.getCtaId();

    this.sharedService.nuevosMovimientos.subscribe(() => {
      this.getMovimientosCuenta(this.ctaCorrienteId);
    });

    this.getMovimientosCuenta(this.ctaCorrienteId);
  }

  getMovimientosCuenta(id: number) {
    this.ctaCorrienteService.getMovimientosCuenta(id).subscribe((response: HttpResponse<any>) => {
      this.movimientos = response.body;
    }, () => {
      this.errorMessage = this.errorMessageService.getMensajeError();
    });
  }

  closeAlert() {
    this.errorMessage = "";
  }

}
