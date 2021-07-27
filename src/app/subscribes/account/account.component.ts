import { Component, OnInit, OnDestroy } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
// @ts-ignore
import {NavigationService} from '@navigation-services';
import {AccountService} from '@core-services';
import {toSnakeCaseObject} from '@helpers';
import {NzMessageService} from 'ng-zorro-antd/message';
import {TranslateService} from '@ngx-translate/core';
// @ts-ignore
import {CustomValidationService} from '@validation-services';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit, OnDestroy {
  pageForm: FormGroup;
  errors: any = {};
  constructor(
    private fb: FormBuilder,
    private navigationService: NavigationService,
    private accountService: AccountService,
    private message: NzMessageService,
    private translate: TranslateService,
    private customValidator: CustomValidationService,
  ) { }

  ngOnInit(): void {
    this.navigationService.header = 'ACCOUNT';
    this.pageForm = this.fb.group({
      email: ['', [Validators.email]],
      username: [''],
      password: [''],
      newPassword: [''],
      confirmPassword: [''],
    },
      {
        validators: this.customValidator.MatchPassword('newPassword', 'confirmPassword'),
      });
  }

  ngOnDestroy(): void {
    this.navigationService.resetHeader();
  }

  get pageFormControl(): any {
    return this.pageForm.controls;
  }

  get canSend(): boolean {
    if (!this.pageFormControl.email.value &&
      !(this.pageFormControl.password.value || this.pageFormControl.newPassword.value)) {
      return false;
    }
    return true;
  }

  submit(): void {
    // tslint:disable-next-line:forin
    for (const i in this.pageForm.controls) {
      this.pageForm.controls[i].markAsDirty();
      this.pageForm.controls[i].updateValueAndValidity();
    }
    if (this.pageForm.invalid) {
      return;
    }
    const formData: any = new FormData();
    const property = toSnakeCaseObject(this.pageForm.value);

    this.accountService.updateProfile(property).subscribe(res => {
      if (!!this.pageForm.controls.email.value) {
        this.message.success(this.translate.instant('AUTH.EMAIL CHANGED'));
      }
      if (!!this.pageForm.controls.password.value) {
        this.message.success(this.translate.instant('AUTH.PASSWORD CHANGED'));
      }
    }, err => {
      if (!!err.error) {
        this.message.error(JSON.stringify(err.error));
        return;
      }
      this.errors = err.error;
      const errorsValues: string[] = Object.keys(err.error);
      errorsValues.forEach(key => {this.pageForm.get(key).setErrors({incorrect: true}); });
    });
  }

}
