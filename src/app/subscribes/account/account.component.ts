import { Component, OnInit, OnDestroy } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
// @ts-ignore
import {NavigationService} from '@navigation-services';
import {AccountService} from '@core-services';
import {ReferralInvitationsService} from '@subscribes-services';
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
  errorsInvate: any = {};
  isMobile = false;
  isVisibleInviteModal = false;
  isSending = false;
  inviteForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private navigationService: NavigationService,
    private accountService: AccountService,
    private message: NzMessageService,
    private translate: TranslateService,
    private customValidator: CustomValidationService,
    private invitationsService: ReferralInvitationsService,
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
    this.isMobile = document.body.clientWidth < 670;
    this.inviteForm = this.fb.group({
      recipient_email: ['', [Validators.required]],
    });
  }

  get inviteFormControl(): any {
    return this.inviteForm.controls;
  }

  handleOkInviteModal(): void {
     // tslint:disable-next-line:forin
    for (const i in this.inviteForm.controls) {
      this.inviteForm.controls[i].markAsDirty();
      this.inviteForm.controls[i].updateValueAndValidity();
    }
    if (this.inviteForm.invalid) {
      return;
    }
    this.isSending = true;
    const email = String(this.inviteFormControl.recipient_email.value);
    this.invitationsService.sendInvite(email).subscribe(res => {
      this.isVisibleInviteModal = false;
      this.isSending = false;
      this.inviteForm.reset();
      this.message.success(`${this.translate.instant('PROFILE.SUCCESS SEND')} ${email}`);
    }, err => {
      this.isSending = false;
      if (!!err.error.errors) {
        this.message.error(err.error.errors);
        return;
      }
      this.errorsInvate = err.error;
      const errorsValues: string[] = Object.keys(err.error);
      errorsValues.forEach(key => {this.inviteForm.get(key).setErrors({incorrect: true}); });
    });
  }

  handleCancelInviteModal(): void {
    this.inviteForm.reset();
    this.isVisibleInviteModal = false;
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

  sendInvite(): void {
    this.isVisibleInviteModal = true;
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
