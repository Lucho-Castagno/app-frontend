import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SesionService } from 'src/app/service/sesion.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private sesionService: SesionService, private router: Router) { }

  cerrarSesion() {
    this.sesionService.logoutUsuario();
    this.router.navigateByUrl("/");
  }

}
