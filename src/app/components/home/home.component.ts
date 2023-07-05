import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private usuarioService: UsuarioService, private router: Router) { }

  cerrarSesion() {
    this.usuarioService.setSesion(new Usuario());
    this.router.navigateByUrl("/");
  }

}
