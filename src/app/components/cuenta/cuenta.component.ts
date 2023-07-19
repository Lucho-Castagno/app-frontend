import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CtaCorriente } from 'src/app/models/cta-corriente';
import { CtaCorrienteService } from 'src/app/service/cta-corriente.service';
import { ErrorMessageService } from 'src/app/service/error-message.service';
import { sharedService } from 'src/app/service/shared.service';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
  styleUrls: ['./cuenta.component.css']
})
export class CuentaComponent implements OnInit {
  successMessage: string = "";
  errorMessage: string | null = null;
  cuenta!: CtaCorriente;

  @ViewChild('cuentaForm') cuentaForm!: NgForm;

  constructor(private usuarioService: UsuarioService,
    private ctaCorrienteService: CtaCorrienteService,
    private sharedService: sharedService,
    private errorMessageService: ErrorMessageService) { }

  ngOnInit() {

    this.cuenta = new CtaCorriente();

    this.sharedService.ctaCorrienteActualizada.subscribe(() => {
      this.getCuentaCorriente();
    });

    this.getCuentaCorriente();

  }

  getCuentaCorriente() {
    this.usuarioService.getCuentaCorriente().subscribe((response: HttpResponse<any>) =>{
      this.cuenta = response.body as CtaCorriente;
      this.sharedService.setCtaId(this.cuenta.id);
    }, () => {
      this.errorMessage = this.errorMessageService.getMensajeError();
    });
  }

  cargarSaldo(monto: number): void {
    if (!monto) {
      this.errorMessage = "Ingrese un monto a cargar.";
      return;
    }
    this.ctaCorrienteService.addSaldoCuenta(this.cuenta.id ,monto).subscribe((response: any) => {
      let nuevaCuenta: CtaCorriente = response as CtaCorriente;
      this.cuenta.saldo = nuevaCuenta.saldo;
      this. successMessage = "Saldo actualizado!"
      this.reset();
      this.sharedService.notificarNuevosMovimientos();
    }, () => {
      this.errorMessage = this.errorMessageService.getMensajeError();
    });
  }

  closeAlert() {
    this.errorMessage = "";
    this.successMessage = "";
  }

  reset() {
    this.cuentaForm.reset({
        "monto": ""
    });
  }

}
