import { Component, OnInit, ViewChild } from '@angular/core';
import { UsuarioService } from '../../service/usuario.service';
import { Router } from '@angular/router';
import { Usuario } from '../../models/usuario';
import { NgForm } from '@angular/forms';

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

    this.usuarioService.loginUsuario({celular, contraseña, email} as Usuario).subscribe((response) =>{

      this.usuarioService.setUsuario( new Usuario(response.celular, response.contraseña, response.email ));

      this.router.navigate(['/home']);
      
    }, (error) => {
      this.reset();
      console.log('Error en el servicio: ', error);
      this.errorMessage = "Celular y/o contraseña incorrectos.";

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
