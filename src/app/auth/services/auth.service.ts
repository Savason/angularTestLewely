import {Injectable} from '@angular/core';
import {BaseApi} from '../../shared/base-api/base-api';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserModel} from '../../shared/models/user-model';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  })
};

@Injectable()
export class AuthService extends BaseApi {

  constructor(public http: HttpClient,
              private router: Router) {
    super(http);
  }

  login({username, password}): Observable<any> {
    const headers = new HttpHeaders({
      'Access-Control-Allow-Headers': 'Accept,Accept-Charset,Accept-Encoding,Accept-Language,Authorization,' +
      'Connection,Content-Type,Cookie,DNT,Host,Keep-Alive,Origin,Referer,User-Agent,X-CSRF-Token,X-Requested-With',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Origin': 'http://localhost:4200/',
      'Access-Control-Expose-Headers': 'Authorization',
      'Access-Control-Allow-Credentials': 'true',
      'Authorization': 'Basic ' + btoa('lewely:secret'),
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    return this.post(`oauth/token`, `grant_type=password&username=${username}&password=${password}`, {headers: headers})
      .pipe(map((response: any) => {
        console.log(response);
        localStorage.clear();
        if (response.access_token) {
          localStorage.setItem('access_token', JSON.stringify(response.access_token));
        }
        return response;
      }));
  }

  getUserByEmail(userName: string): Observable<any> {
    return this.get(`users/check_email/${userName}`);
  }

  createNewUser(user: UserModel): Observable<any> {
    return this.post(`users`, user, httpOptions);
  }

  logout() {
    window.localStorage.clear();
    this.router.navigateByUrl(`auth/login`);
  }
}
