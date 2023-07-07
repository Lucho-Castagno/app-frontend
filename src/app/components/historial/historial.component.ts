import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Movimiento } from 'src/app/models/movimiento';
import { CtaCorrienteService } from 'src/app/service/cta-corriente.service';
import { sharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {
  
  ctaCorrienteId!: number;
  errorMessage: string = ""; 
  movimientos: Movimiento[] = [];

  constructor(private sharedService: sharedService, private ctaCorrienteService: CtaCorrienteService) { }

  ngOnInit() {
    this.ctaCorrienteId = this.sharedService.getCtaId();
    this.getMovimientosCuenta(this.ctaCorrienteId);
  }

  getMovimientosCuenta(id: number) {
    this.ctaCorrienteService.getMovimientosCuenta(id).subscribe((response: HttpResponse<any>) => {
      this.movimientos = response.body;
    }, (error: HttpErrorResponse) => {
      this.errorMessage = error.error;
    });
  }

  closeAlert() {
    this.errorMessage = "";
  }

}
