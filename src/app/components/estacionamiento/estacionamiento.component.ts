import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Estacionamiento } from 'src/app/models/estacionamiento';
import { Patente } from 'src/app/models/patente';
import { sharedService } from 'src/app/service/shared.service';
import { EstacionamientoService } from 'src/app/service/estacionamiento.service';
import { PatenteService } from 'src/app/service/patente.service';
import { UsuarioService } from 'src/app/service/usuario.service';
import { SesionService } from 'src/app/service/sesion.service';
import { ErrorMessageService } from 'src/app/service/error-message.service';

@Component({
  selector: 'app-estacionamiento',
  templateUrl: './estacionamiento.component.html',
  styleUrls: ['./estacionamiento.component.css']
})
export class EstacionamientoComponent {
  patentes: Patente[] = [];
  estacionamientoPendiente: boolean = false;
  estacionamiento!: Estacionamiento;
  errorMessage: string | null = null;
  successMessage: string = "";

  @ViewChild('patenteForm') patenteForm!: NgForm;

  constructor(private usuarioService: UsuarioService,
    private sesionService: SesionService,
    private patenteService: PatenteService,
    private estacionamientoService: EstacionamientoService,
    private sharedService: sharedService,
    private errorMessageService: ErrorMessageService) { }

  ngOnInit() {
    this.estacionamientoPendiente = false;
    this.getPatentes();
    this.getEstacionamientoPendiente();
  }

  getPatentes(): void {
    this.usuarioService.getPatentes().subscribe((response: HttpResponse<any>) => { 
      this.patentes = response.body; 
    }, () => {
      this.errorMessage = this.errorMessageService.getMensajeError();
    });
  }

  getEstacionamientoPendiente(): void {
    this.estacionamientoService.getEstacionamientoPendiente(this.sesionService.getSesionCelular()).subscribe((response: HttpResponse<any>) => {
      if (response.body != null) {
        this.estacionamiento = response.body;
        this.estacionamientoPendiente = true;
      }
    }, () => {
      this.errorMessage = this.errorMessageService.getMensajeError();
    });
  }

  addPatente(cadena: string): void {
    if(!cadena) { 
      this.errorMessage = "Debe ingresar el numero de patente"; 
      return;
    };
    this.patenteService.addPatente(cadena).subscribe((reponse: HttpResponse<any>) => {
      this.patentes.push(reponse.body);
    }, () => {
      this.errorMessage = this.errorMessageService.getMensajeError();
    });
  }

  iniciarEstacionamiento(cadena: string) {
    this.estacionamientoService.iniciarEstacionamiento(cadena).subscribe((response: HttpResponse<any>) => {
      this.successMessage = response.body;
      this.getEstacionamientoPendiente();
    }, () => {
      this.errorMessage = this.errorMessageService.getMensajeError();
      this.getEstacionamientoPendiente();
    });
  }

  finalizarEstacionamiento(id: number) {
    this.estacionamientoService.finalizarEstacionamiento(id).subscribe((response: HttpResponse<any>) => {
      this.successMessage = response.body;
      this.estacionamientoPendiente = false;
      this.sharedService.notificarActualizacionCtaCorriente();
    }, () => {
      this.errorMessage = this.errorMessageService.getMensajeError();
    });
  }

  closeAlert() {
    this.errorMessage = "";
    this.successMessage = "";
  }

  reset() {
    this.patenteForm.reset({
        "cadena": ""
    });
  }

}
