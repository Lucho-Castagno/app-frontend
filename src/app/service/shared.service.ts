import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class sharedService {

  accountWasModified = new EventEmitter<void>();
  newMovements = new EventEmitter<void>();
  private accountId!: number;

  constructor() { }

  notifyUpdatedAccount() {
    this.accountWasModified.emit();
  }

  notifyNewMovements() {
    this.newMovements.emit();
  }

  public setAccountId(id: number) {
    this.accountId = id;
  }

  public getAccountId() {
    return this.accountId;
  }

}
