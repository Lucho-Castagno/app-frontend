import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Patente } from 'src/app/models/patente';
import { EstacionamientoService } from 'src/app/service/estacionamiento.service';
import { PatenteService } from 'src/app/service/patente.service';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-estacionamiento',
  templateUrl: './estacionamiento.component.html',
  styleUrls: ['./estacionamiento.component.css']
})
export class EstacionamientoComponent {
  patentes: Patente[] = [];
  errorMessage: string = "";

  @ViewChild('patenteForm') patenteForm!: NgForm;

  constructor(private usuarioService: UsuarioService, private patenteService: PatenteService, private estacionamientoService: EstacionamientoService) { }

  ngOnInit() {
    this.getPatentes();
  }

  getPatentes(): void {
    this.usuarioService.getPatentes().subscribe((patentes: Patente[]) => { 
      this.patentes = patentes 
    }, (error) => {
      console.log('Error en el servicio: ', error);
      this.errorMessage = "Celular y/o contraseña incorrectos.";
    });
  }

  addPatente(cadena: string): void {
    if(!cadena) { 
      this.errorMessage = "debe ingresar el numero de patente"; 
      return;
    };
    this.patenteService.addPatente(cadena).subscribe((patente: Patente) => {
      this.patentes.push(patente);
    }, (error) => {
      this.errorMessage = "Error en el formato de la cadena.";
    });
  }

  iniciarEstacionamiento(cadena: string) {
    this.estacionamientoService.iniciarEstacionamiento(cadena).subscribe((message) => {
      this.errorMessage = "iniciado";
    }, (error) => {
      this.errorMessage = "error";
    });
  }

  closeAlert() {
    this.errorMessage = "";
  }

  reset() {
    this.patenteForm.reset({
        "cadena": ""
    });
  }

}
