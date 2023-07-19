import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/service/usuario.service';

import { Location } from '@angular/common';
import { ErrorMessageService } from 'src/app/service/error-message.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  errorMessage: string | null = null;
  successMessage: string = "";

  @ViewChild('signupForm') signupForm!: NgForm;

  constructor(private usuarioService: UsuarioService,
    private location: Location,
    private errorMessageService: ErrorMessageService) { }

  registrarUsuario(celular: string, contraseña: string, email: string): void {
    this.usuarioService.registrarUsuario({celular, contraseña, email} as Usuario).subscribe((response: HttpResponse<any>) => {
      this.successMessage = response.body;
    }, () => {
      this.errorMessage = this.errorMessageService.getMensajeError();
    });
  }

  closeAlert() {
    this.errorMessage = "";
    this.successMessage = "";
  }

  reset() {
    this.signupForm.reset({
        "celular": "",
        "contraseña": "",
        "email": ""
    });
  }

  alLogin() {
    this.location.back();
  }

}
