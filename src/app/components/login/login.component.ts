import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Credenciales } from '../../models/usuario';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { SesionService } from 'src/app/service/sesion.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  errorMessage: string = "";

  @ViewChild('loginForm') loginForm!: NgForm;

  constructor(private sesionService: SesionService, private router: Router) { }

  loginUsuario(celular: string, contraseña: string): void {
    this.sesionService.loginUsuario({celular, contraseña} as Credenciales).subscribe((response: HttpResponse<any>) =>{
      this.router.navigate(['/home']);
    }, (error: HttpErrorResponse) => {
      this.reset();
      this.errorMessage = error.error;
    });
  }

  closeAlert() {
    this.errorMessage = "";
  }

  reset() {
    this.loginForm.reset({
        "celular": "",
        "contraseña": ""
    });
  }

}
