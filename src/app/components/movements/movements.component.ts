import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Movement } from 'src/app/models/movement';
import { AccountService } from 'src/app/service/account.service';
import { ErrorMessageService } from 'src/app/service/error-message.service';
import { sharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-movements',
  templateUrl: './movements.component.html'
})
export class MovementsComponent implements OnInit {
  
  accountId!: number;
  errorMessage: string | null = null;
  movements: Movement[] = [];

  constructor(private sharedService: sharedService,
    private accountService: AccountService,
    private errorMessageService: ErrorMessageService) { }

  ngOnInit() {
    this.accountId = this.sharedService.getAccountId();

    this.sharedService.newMovements.subscribe(() => {
      this.getAccountMovements(this.accountId);
    });

    this.getAccountMovements(this.accountId);
  }

  getAccountMovements(id: number) {
    this.accountService.getAccountMovements(id).subscribe((response: HttpResponse<any>) => {
      this.movements = response.body;
    }, () => {
      this.errorMessage = this.errorMessageService.getErrorMessage();
    });
  }

  closeAlert() {
    this.errorMessage = "";
  }

}
