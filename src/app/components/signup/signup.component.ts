import { HttpResponse } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/service/user.service';

import { Location } from '@angular/common';
import { ErrorMessageService } from 'src/app/service/error-message.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html'
})
export class SignupComponent {
  errorMessage: string | null = null;
  successMessage: string = "";

  @ViewChild('signupForm') signupForm!: NgForm;

  constructor(private userService: UserService,
    private location: Location,
    private errorMessageService: ErrorMessageService) { }

  signUpUser(cellphone: string, password: string, email: string): void {
    this.userService.signUpUser({cellphone, password, email} as User).subscribe((response: HttpResponse<any>) => {
      this.successMessage = response.body;
    }, () => {
      this.errorMessage = this.errorMessageService.getErrorMessage();
    });
  }

  closeAlert() {
    this.errorMessage = "";
    this.successMessage = "";
  }

  reset() {
    this.signupForm.reset({
        "cellphone": "",
        "password": "",
        "email": ""
    });
  }

  toLogin() {
    this.location.back();
  }

}
