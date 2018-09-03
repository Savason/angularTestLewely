import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

import {AuthService} from '../../services/auth.service';
import {Subscription} from 'rxjs';
import {regExps} from '../../../shared/shared-variables/variables';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  sub1: Subscription;
  sub2: Subscription;

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private authService: AuthService) {
  }

  getErrorEmailMessage() {
    return this.form.get('username')['errors']['required'] ? 'This field is required' :
      this.form.get('username')['errors']['pattern'] ? 'Not a valid email' :
        this.form.get('username')['errors']['forbiddenEmail'] ? `The email you have entered doesn't match any accounts` :
          '';
  }

  getErrorPasswordMessage() {
    return this.form.get('password')['errors']['required'] ? 'This field is required' :
      this.form.get('password')['errors']['minlength'] ? 'Please enter at least 6 characters' :
        this.form.get('password')['errors']['invalidPassword'] ? 'Invalid password combination' :
          '';
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: ['', [Validators.required, Validators.pattern(regExps.emailPattern)], this.forbiddenEmails.bind(this)],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const loginData = this.form.value;
      this.sub1 = this.authService.login(loginData)
        .subscribe((data) => {
          if (data) {
            this.router.navigateByUrl('');
          } else {
            this.router.navigateByUrl('auth/login');
          }
        }, error1 => {
          console.log(error1);
          if (error1.status === 400 && error1.error.error === 'invalid_grant') {
            this.form.controls['password'].setErrors({'invalidPassword': true});
          }
        });
    }
  }

  forbiddenEmails(control: FormControl): Promise<any> {
    return new Promise((resolve) => {
      this.sub2 = this.authService.getUserByEmail(control.value)
        .subscribe((data) => {
          if (data === false) {
            resolve({forbiddenEmail: true});
          } else {
            resolve(null);
          }
        });
    });
  }

  toForgotPassword() {
    this.router.navigateByUrl(`auth/forgot_password`);
  }

  ngOnDestroy() {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
    if (this.sub2) {
      this.sub2.unsubscribe();
    }
  }
}
