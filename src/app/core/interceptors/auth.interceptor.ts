import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { IToken } from '../models/common/response-data.model';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private inject: Injector
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let authservice = this.inject.get(AuthService);
    let authreq = request;
    if (authservice.getToken() !== null) {
      authreq = this.addTokenHeader(authreq, authservice.getToken()?.accessToken);
    }

    return next.handle(authreq).pipe(
      catchError((err) => {
        if (!authservice.isLogged()) {
          authservice.doLogout();
          return throwError(() => err);
        }
        else if (err.status === 401) {
          return this.handleRefrehToken(request, next);
        } else {
          return throwError(() => err);
        }

      })
    );
  }

  handleRefrehToken(request: HttpRequest<any>, next: HttpHandler) {
    let authservice = this.inject.get(AuthService);

    return authservice.generateRefreshToken().pipe(
      switchMap((data: IToken) => {
        authservice.setToken(data);
        return next.handle(this.addTokenHeader(request, data.accessToken));
      }),
      catchError((err) => {
        if (err.status === 401) {
          authservice.doLogout();
        }
        return throwError(() => err);
      }),
    );
  }

  addTokenHeader(request: HttpRequest<any>, accessToken: any) {
    return request.clone({ headers: request.headers.set('Authorization', 'bearer ' + accessToken) });
  }
}
