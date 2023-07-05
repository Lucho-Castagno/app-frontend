import { Component, OnInit, ViewChild } from '@angular/core';
import { UsuarioService } from '../../service/usuario.service';
import { Router } from '@angular/router';
import { Usuario } from '../../models/usuario';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  errorMessage: string = "";

  @ViewChild('loginForm') loginForm!: NgForm;

  constructor(private usuarioService: UsuarioService, private router: Router) { }

  loginUsuario(celular: string, contraseña: string): void {
    let email: string = "";
    this.usuarioService.loginUsuario({celular, contraseña, email} as Usuario).subscribe((response: HttpResponse<any>) =>{
      if (response.status === 200) {
        this.usuarioService.setSesion( response.body );
        this.router.navigate(['/home']);
      } 
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
