import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const userToken = localStorage.getItem('token');
    if (userToken) {
      let modifiedReq = req.clone({
        headers: req.headers.set('x-access-token', `${userToken}`).set('detailed', 'true'),
      });
      return next.handle(modifiedReq);
    }
    let modifiedReq = req.clone({
      headers: req.headers.set('detailed', 'true'),
    });
    return next.handle(modifiedReq);
  }
}