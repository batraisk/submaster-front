import { Component, OnInit, OnDestroy } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
// @ts-ignore
import {NavigationService} from '@navigation-services';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit, OnDestroy {
  pageForm: FormGroup;
  constructor(private fb: FormBuilder, private navigationService: NavigationService) { }

  ngOnInit(): void {
    this.navigationService.header = 'ACCOUNT';
    this.pageForm = this.fb.group({
      email: [''],
      username: [''],
      password: [''],
      newPassword: [''],
      confirmPassword: [''],
    });
  }

  ngOnDestroy(): void {
    this.navigationService.resetHeader();
  }

  submit(): void {

  }

}
