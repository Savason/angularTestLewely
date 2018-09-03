import {Injectable} from '@angular/core';
import {
  HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {AuthService} from '../../auth/services/auth.service';
import {Router} from '@angular/router';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService,
              private router: Router) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    const access_token = JSON.parse(localStorage.getItem('access_token'));

    if (access_token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${access_token}`
        }
      });
    }
    return next.handle(request).pipe(
      tap(error => {
        return false;
      }, error => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401) {
            this.authService.logout();
          }
        }
      })
    );
  }
}
