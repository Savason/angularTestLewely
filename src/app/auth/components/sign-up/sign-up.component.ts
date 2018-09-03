import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import {matchOtherValidator} from '../../../shared/validators/comfirn-password';
import {AuthService} from '../../services/auth.service';
import {UserModel} from '../../../shared/models/user-model';
import {regExps} from '../../../shared/shared-variables/variables';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  sub1: Subscription;
  sub2: Subscription;
  SystemRoles = [
    {value: 'Admin', viewValue: 'Admin'},
    {value: 'Customer', viewValue: 'Customer'},
    {value: 'Team member', viewValue: 'Team member'}
  ];
  TeamRoles = [
    {value: 'PM', viewValue: 'PM'},
    {value: 'BE', viewValue: 'BE'},
    {value: 'FE', viewValue: 'FE'},
    {value: 'QA', viewValue: 'QA'},
    {value: 'FS', viewValue: 'FS'},
    {value: 'DevOps', viewValue: 'DevOps'},
    {value: 'Architect', viewValue: 'Architect'},
  ];


  getErrorEmailMessage() {
    return this.form.get('username')['errors']['required'] ? 'This field is required' :
      this.form.get('username')['errors']['pattern'] ? 'Not a valid email' :
        this.form.get('username')['errors']['forbiddenEmail'] ? 'This email is already taken' :
          '';
  }

  getErrorUserNameMessage() {
    return this.form.get('name')['errors']['required'] ? 'This field is required' :
      '';
  }

  getErrorSystemRolesMessage() {
    return this.form.get('systemRole')['errors']['required'] ? 'This field is required' :
      '';
  }

  getErrorTeamRolesMessage() {
    return this.form.get('teamRole')['errors']['required'] ? 'This field is required' :
      '';
  }

  getErrorPasswordMessage() {
    return this.form.get('password')['errors']['required'] ? 'This field is required' :
      this.form.get('password')['errors']['minlength'] ? 'Please enter at least 6 characters' :
        '';
  }

  getErrorConfirmPasswordMessage() {
    return this.form.get('confirmPassword')['errors']['required'] ? 'This field is required' :
      this.form.get('confirmPassword')['errors']['minlength'] ? 'Please enter at least 6 characters' :
        this.form.get('confirmPassword')['errors']['matchOther'] ? 'Passwords do not match' :
          '';
  }


  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: ['', [Validators.required, Validators.pattern(regExps.emailPattern)], this.forbiddenEmails.bind(this)],
      name: ['', [Validators.required]],
      systemRole: ['', [Validators.required]],
      teamRole: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6), matchOtherValidator('password')]],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const {username, name, systemRole, teamRole, password} = this.form.value;
      const user = new UserModel(username, name, systemRole, teamRole, password);
      console.log(user);
      this.sub1 = this.authService.createNewUser(user)
        .subscribe(() => {
          this.router.navigate(['/auth/login'], {
            queryParams: {
              nowCanLogin: true
            }
          });
        });
    }
  }

  forbiddenEmails(control: FormControl): Promise<any> {
    return new Promise((resolve) => {
      this.sub2 = this.authService.getUserByEmail(control.value)
        .subscribe((data) => {
          if (data === true) {
            resolve({forbiddenEmail: true});
          } else {
            resolve(null);
          }
        });
    });
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
