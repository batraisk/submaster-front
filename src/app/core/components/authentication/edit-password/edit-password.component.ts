import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '@core-services';
import {NzMessageService} from 'ng-zorro-antd/message';

@Component({
  selector: 'app-edit-password',
  templateUrl: './edit-password.component.html',
  styleUrls: ['./edit-password.component.scss']
})
export class EditPasswordComponent implements OnInit {
  changePasswordForm: FormGroup;
  errors: any = {};

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authService: AuthenticationService,
    private message: NzMessageService
  ) { }

  ngOnInit(): void {
    this.changePasswordForm = this.fb.group({
        password: ['', Validators.compose([Validators.required])],
        confirmPassword: ['', [Validators.required]],
      }
    );
  }

  get changePasswordFormControl(): any {
    return this.changePasswordForm.controls;
  }

  onSubmit(): void {
    // tslint:disable-next-line:forin
    for (const i in this.changePasswordForm.controls) {
      this.changePasswordForm.controls[i].markAsDirty();
      this.changePasswordForm.controls[i].updateValueAndValidity();
    }
    if (this.changePasswordForm.invalid) {
      return;
    }

    if (this.changePasswordForm.valid) {
      this.authService.changePassword({
        user: {
          reset_password_token: this.activatedRoute.snapshot.queryParams.reset_password_token,
          password: this.changePasswordFormControl.password.value,
          password_confirmation: this.changePasswordFormControl.confirmPassword.value
        }
      }).subscribe(res => {
        this.router.navigate(['/auth/login']);
        // this.toastr.success('Password successfully changed');
      }, err => {
        // this.toastr.error('Something went wrong.');
      });
    }
  }

}
