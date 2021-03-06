import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
// @ts-ignore
import {AuthenticationService, UserService} from '@core-services';
// @ts-ignore
import {IUserInfo, IUserRegister} from '@models';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errors: any = {};

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authService: AuthenticationService,
    private message: NzMessageService,
    private userService: UserService,
    private translate: TranslateService,
  ) { }

  ngOnInit(): void {
    const queryParams = this.activatedRoute.snapshot.queryParams;
    if (queryParams?.confirmation_token) {
      this.authService.confirmEmail(queryParams?.confirmation_token).subscribe((res) => {
        this.message.success(this.translate.instant('AUTH.VERIFICATION DONE'));
        // localStorage.setItem('currentUser', JSON.stringify(res.body));
        // localStorage.setItem('token', res.headers.get('Authorization'));
        // this.router.navigate(['/']);
      }, err => {
        this.message.error(this.translate.instant('AUTH.VERIFICATION FAILED'));
      });
    }
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', Validators.compose([Validators.required])],
    });
  }

  get loginFormControl(): any {
    return this.loginForm.controls;
  }

  onSubmit(): any {
    // tslint:disable-next-line:forin
    for (const i in this.loginForm.controls) {
      this.loginForm.controls[i].markAsDirty();
      this.loginForm.controls[i].updateValueAndValidity();
    }
    if (this.loginForm.invalid) {
      return;
    }
    const user: IUserRegister = {
      email: String(this.loginFormControl.email.value),
      password: String(this.loginFormControl.password.value),
    };
    this.authService.login(user).subscribe(res => {
      if (res) {
        console.log('res', res)
        const currentUser = localStorage.getItem('currentUser');
        localStorage.setItem('currentUser', JSON.stringify(res.body));
        localStorage.setItem('token', res.headers.get('Authorization'));
        this.userService.getUserInfo().subscribe((info: IUserInfo) => {
          this.userService.currentUserInfo = info;
        });
        this.router.navigate(['/']);
      }}, err => {
      if (!!err.error.error) {
        this.message.error(err.error.error);
        return;
      }
      this.errors = err.error.errors;
      const errorsValues: string[] = Object.keys(err.error.errors);
      errorsValues.forEach(key => {this.loginForm.get(key).setErrors({incorrect: true}); });
    });
  }

}
