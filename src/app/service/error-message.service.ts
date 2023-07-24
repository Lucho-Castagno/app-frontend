import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorMessageService {
  private errorMessage: string | null = null;

  constructor() { }

  setErrorMessage(message: string): void {
    this.errorMessage = message;
  }

  getErrorMessage() : string | null {
    return this.errorMessage;
  }

}
