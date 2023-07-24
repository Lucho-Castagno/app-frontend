import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html'
})
export class PageNotFoundComponent {

  constructor (private router: Router) {}

  redirectUser() {

    // si el usuario no esta autenticado, lo redirige a login.
    this.router.navigateByUrl("/home");

  }

}
