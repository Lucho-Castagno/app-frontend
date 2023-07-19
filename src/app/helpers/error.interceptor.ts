import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { ErrorMessageService } from '../service/error-message.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private errorMessageService: ErrorMessageService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status == 403) {
          this.errorMessageService.setMensajeError("Usuario y/o contraseña incorrecta.");
        } else {
          this.errorMessageService.setMensajeError(error.error);
        }
        return throwError(() => error);
      })
    );
  }

}
