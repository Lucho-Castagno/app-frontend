import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { SessionService } from '../service/session.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private sessionService: SessionService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    if (request.url.includes('/auth/register') || request.url.includes('/auth/login')) {
      return next.handle(request);
    } else {
      const token = this.sessionService.getSessionToken();

      if (token) {
        const cloned = request.clone({
          headers: request.headers.set('Authorization', `Bearer ${token}`)
        })
        return next.handle(cloned);
      }
    }
    
    return next.handle(request);
  }
}
