import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private router: Router, private authService: AuthService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const userToken = localStorage.getItem('token');
    let modifiedReq: HttpRequest<any>;
    if (userToken) {
      modifiedReq = req.clone({
        headers: req.headers.set('x-access-token', `${userToken}`).set('detailed', 'true'),
      });     
    } else {
      modifiedReq = req.clone({
        headers: req.headers.set('detailed', 'true'),
      });
    }
    return next.handle(modifiedReq).pipe(tap(() => { },
      (err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.authService.isLoggedIn.next(false);
            this.router.navigate(['/user/login'], { queryParams: { returnUrl:this.router.url } });
            return;
          }
          if (err.status === 403) {
            
            this.router.navigate(['/user/login'], { queryParams: { returnUrl:this.router.url } });
            return;
          }
          return;
        }
      }));
  }
}