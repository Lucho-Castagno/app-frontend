import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CtaCorriente } from 'src/app/models/cta-corriente';
import { CtaCorrienteService } from 'src/app/service/cta-corriente.service';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
  styleUrls: ['./cuenta.component.css']
})
export class CuentaComponent {

  errorMessage: string = "";
  cuenta!: CtaCorriente;

  @ViewChild('cuentaForm') cuentaForm!: NgForm;

  ngOnInit() {
    this.cuenta = new CtaCorriente();
    this.getCuentaCorriente();
  }

  constructor(private usuarioService: UsuarioService, private ctaCorrienteService: CtaCorrienteService) { }

  getCuentaCorriente() {
    this.usuarioService.getCuentaCorriente().subscribe((response: HttpResponse<any>) =>{
      this.cuenta = response.body as CtaCorriente;
    }, (error: HttpErrorResponse) => {
      this.errorMessage = error.error;
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
      this.reset();
    }, (error: HttpErrorResponse) => {
      this.errorMessage = error.error;
    });
  }

  closeAlert() {
    this.errorMessage = "";
  }

  reset() {
    this.cuentaForm.reset({
        "monto": ""
    });
  }

}
