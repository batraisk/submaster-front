import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '@core-services';
import {NzMessageService} from 'ng-zorro-antd/message';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent implements OnInit {
  forgotForm: FormGroup;
  errors: any = {};
  sent = false;

  constructor(private fb: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private authService: AuthenticationService,
              private message: NzMessageService) { }

  ngOnInit(): void {
    this.forgotForm = this.fb.group({
      email: ['', [Validators.required]],
    });
  }

  get forgotFormControl(): any {
    return this.forgotForm.controls;
  }

  goToLogin(): void {
    this.router.navigate(['/auth/forgot']);
  }

  onSubmit(): void {
    // tslint:disable-next-line:forin
    for (const i in this.forgotForm.controls) {
      this.forgotForm.controls[i].markAsDirty();
      this.forgotForm.controls[i].updateValueAndValidity();
    }
    if (this.forgotForm.invalid) {
      return;
    }
    const forgot: any = {
      user: {
        email: String(this.forgotFormControl.email.value),

      }
    };
    this.authService.verifyEmail(forgot).subscribe(res => {
      this.sent = true;
    }, err => {
      if (!!err.error.error) {
        this.message.error(err.error.error);
        return;
      }
      this.errors = err.error.errors;
      const errorsValues: string[] = Object.keys(err.error.errors);
      errorsValues.forEach(key => {this.forgotForm.get(key).setErrors({incorrect: true}); });
    });
  }
}
