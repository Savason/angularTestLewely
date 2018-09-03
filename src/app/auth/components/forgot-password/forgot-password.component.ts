import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {regExps} from '../../../shared/shared-variables/variables';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  public form: FormGroup;

  getErrorEmailMessage() {
    return this.form.get('email')['errors']['required'] ? 'This field is required' :
      this.form.get('email')['errors']['pattern'] ? 'Not a valid email' : '';
  }

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(regExps.emailPattern)]]
    });
  }

  onSubmit() {
    if (this.form.valid) {
    }
  }

}
