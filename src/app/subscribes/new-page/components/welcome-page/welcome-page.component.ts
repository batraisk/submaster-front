import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {
  @Input() page: any;
  @Output() updatePageEmitter = new EventEmitter<any>();
  switchValue = false;
  radioValue = 'natural';
  themes = ['natural', 'gold', 'lime', 'blue', 'magenta', 'yellow', 'purple'];
  view = 'mobile';
  views = ['mobile', 'desktop'];
  pageForm: FormGroup;
  errors: any = {};

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.pageForm = this.fb.group({
      welcomeTitle: [this.page.welcomeTitle , [Validators.required]],
      welcomeDescription: [this.page.welcomeDescription , [Validators.required]],
      welcomeButtonText: [this.page.welcomeButtonText , [Validators.required]],
      timerTime: [this.page.timerTime , [Validators.required]],
      timerText: [this.page.timerText , [Validators.required]],
      timerEnable: [this.page.timerEnable , [Validators.required]],
      theme: [this.page.theme , [Validators.required]],
    });
    this.onChanges();
  }

  onChanges(): void {
    this.pageForm.valueChanges.subscribe(val => {
      this.updatePageEmitter.emit(this.pageForm.value);
    });
  }

}
