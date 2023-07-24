import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/service/session.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {

  constructor(private sessionService: SessionService, private router: Router) { }

  logOutUser() {
    this.sessionService.logoutUser();
    this.router.navigateByUrl("/");
  }

}
