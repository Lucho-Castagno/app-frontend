import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Credentials } from '../../models/user';
import { NgForm } from '@angular/forms';
import { HttpResponse } from '@angular/common/http';
import { SessionService } from 'src/app/service/session.service';
import { ErrorMessageService } from 'src/app/service/error-message.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  errorMessage: string | null = null;

  @ViewChild('loginForm') loginForm!: NgForm;

  constructor(private sessionService: SessionService,
    private router: Router,
    private errorMessageService: ErrorMessageService) { }

  loginUser(cellphone: string, password: string): void {
    this.sessionService.loginUser({cellphone, password} as Credentials).subscribe((response: HttpResponse<any>) =>{
      this.router.navigate(['/home']);
    }, () => {
      this.errorMessage = this.errorMessageService.getErrorMessage();
    });
  }

  closeAlert() {
    this.errorMessage = "";
  }

  reset() {
    this.loginForm.reset({
        "cellphone": "",
        "password": ""
    });
  }

}
