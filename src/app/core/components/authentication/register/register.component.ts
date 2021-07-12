import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
// @ts-ignore
import {AuthenticationService} from '@core-services';
// @ts-ignore
import {IUserRegister} from '@models';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  errors: any = {};

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private router: Router,
    private message: NzMessageService
  ) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required]],
      username: ['', [Validators.required]],
      password: ['', Validators.compose([Validators.required])],
      accept: [false, Validators.compose([Validators.requiredTrue])],
    });
  }

  get registerFormControl(): any {
    return this.registerForm.controls;
  }

  getError(input: string): void {
    return this.errors.email;
  }

  onSubmit(): any {
    // tslint:disable-next-line:forin
    for (const i in this.registerForm.controls) {
      this.registerForm.controls[i].markAsDirty();
      this.registerForm.controls[i].updateValueAndValidity();
    }
    console.log('this.registerForm', this.registerForm)
    if (this.registerForm.invalid) {
      return;
    }
    const user: IUserRegister = {
      email: String(this.registerFormControl.email.value),
      password: String(this.registerFormControl.password.value),
      password_confirmation: String(this.registerFormControl.password.value),
    };
    this.authService.register(user).subscribe(res => {
      if (res) {
        this.router.navigate(['/auth/login']);
        this.message.success('You should check your email');
      }}, err => {

      this.errors = err.error.errors;
      const errorsValues: string[] = Object.keys(err.error.errors);
      errorsValues.forEach(key => {this.registerForm.get(key).setErrors({incorrect: true}); });
    });
  }

}
