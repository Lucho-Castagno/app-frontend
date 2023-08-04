import { HttpResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Account } from 'src/app/models/account';
import { AccountService } from 'src/app/service/account.service';
import { ErrorMessageService } from 'src/app/service/error-message.service';
import { sharedService } from 'src/app/service/shared.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html'
})
export class AccountComponent implements OnInit {
  successMessage: string = "";
  errorMessage: string | null = null;
  account!: Account;

  @ViewChild('accountForm') accountForm!: NgForm;

  constructor(private userService: UserService,
    private accountService: AccountService,
    private sharedService: sharedService,
    private errorMessageService: ErrorMessageService) { }

  ngOnInit() {

    this.account = new Account();

    this.sharedService.accountWasModified.subscribe(() => {
      this.getAccount();
    });

    this.getAccount();

  }

  getAccount() {
    this.userService.getAccount().subscribe((response: HttpResponse<any>) =>{
      this.account = response.body as Account;
      this.sharedService.setAccountId(this.account.id);
    }, () => {
      this.errorMessage = this.errorMessageService.getErrorMessage();
    });
  }

  chargeBalance(credit: number): void {
    this.accountService.chargeBalance(this.account.id, credit).subscribe((response: any) => {
      let newAccount: Account = response as Account;
      this.account.balance = newAccount.balance;
      this. successMessage = "Saldo actualizado!"
      this.reset();
      this.sharedService.notifyNewMovements();
    }, () => {
      this.errorMessage = this.errorMessageService.getErrorMessage();
    });
  }

  closeAlert() {
    this.errorMessage = "";
    this.successMessage = "";
  }

  reset() {
    this.accountForm.reset({
        "credit": ""
    });
  }

}
