// import {Injectable} from '@angular/core';
// import {
//   HttpRequest, HttpHandler, HttpEvent, HttpInterceptor,
//   HttpErrorResponse
// } from '@angular/common/http';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/observable/throw';
// import {Observable} from 'rxjs';
// import {tap} from 'rxjs/operators';
//
// @Injectable()
// export class ResponseExceptionInterceptor implements HttpInterceptor {
//
//   constructor() {
//   }
//
//   intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//
//     return next.handle(request).pipe(
//       tap((ev: HttpEvent<any>) => {
//       })
//     )
//       .catch(response => {
//         if (response instanceof HttpErrorResponse) {
//           switch (response.status) {
//             case 403:
//               break;
//             case 404:
//               break;
//             case 500:
//               break;
//           }
//         }
//         return Observable.throw(response);
//       });
//   }
// }
