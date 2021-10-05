import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
// @ts-ignore
import {AuthenticationService} from '@core-services';
import {ReferralInvitationsService} from '@subscribes-services';
// @ts-ignore
import {IUserRegister} from '@models';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  errors: any = {};
  referral: any;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private router: Router,
    private message: NzMessageService,
    private translate: TranslateService,
    private activatedRoute: ActivatedRoute,
    private invitationsService: ReferralInvitationsService,
  ) { }

  ngOnInit(): void {
    const queryParams = this.activatedRoute.snapshot.queryParams;
    if (queryParams?.referral_token) {
      this.invitationsService.getReferral(queryParams?.referral_token).subscribe(res => {
        if (res && res.status && res.status === 'created') {
          this.referral = res;
          this.initForm();
        } else {
          this.message.error(this.translate.instant('AUTH.REFERRAL LINK NOT ACTIVE'));
          this.initForm();
        }
      });
    } else {
      this.initForm();
    }
  }

  initForm(): void {
    const email = this.referral ? this.referral.recipient_email : '';
    const accessToken = this.referral ? this.referral.access_token : '';
    this.registerForm = this.fb.group({
      email: [email, [Validators.required]],
      username: ['', [Validators.required]],
      password: ['', Validators.compose([Validators.required])],
      accept: [false, Validators.compose([Validators.requiredTrue])],
      invite_token: [accessToken],
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
    if (this.registerForm.invalid) {
      return;
    }
    const user: IUserRegister = {
      email: String(this.registerFormControl.email.value),
      password: String(this.registerFormControl.password.value),
      password_confirmation: String(this.registerFormControl.password.value),
    };
    if (this.referral.access_token) { user.invite_token = this.referral.access_token; }

    this.authService.register(user).subscribe(res => {
      if (res) {
        this.router.navigate(['/auth/login']);
        this.message.success(this.translate.instant('AUTH.CHECK EMAIL'));
      }}, err => {

      this.errors = err.error.errors;
      const errorsValues: string[] = Object.keys(err.error.errors);
      errorsValues.forEach(key => {this.registerForm.get(key).setErrors({incorrect: true}); });
    });
  }

}
