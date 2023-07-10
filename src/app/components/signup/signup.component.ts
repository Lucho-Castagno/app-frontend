import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/service/usuario.service';

import { Location } from '@angular/common';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  errorMessage: string = "";

  @ViewChild('signupForm') signupForm!: NgForm;

  constructor(private usuarioService: UsuarioService, private location: Location) { }

  registrarUsuario(celular: string, contraseña: string, email: string): void {

    if(!celular || !contraseña || !email) {
      this.errorMessage = "Todos los campos son requeridos."
      return;
    }

    this.usuarioService.registrarUsuario({celular, contraseña, email} as Usuario).subscribe((response: HttpResponse<any>) => {
      this.alLogin();
    }, (error: HttpErrorResponse) => {
      this.reset();
      this.errorMessage = error.error;
    });
  }

  closeAlert() {
    this.errorMessage = "";
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
