import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../service/usuario.service';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario';
import { HomeComponent } from '../home/home.component';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  usuario: Usuario = new Usuario();

  constructor(private usuarioService: UsuarioService, private router: Router) { }

  loginUsuario() {
    this.usuarioService.loginUsuario(this.usuario).subscribe(data =>{
      console.log(data);
    })
  }

}
