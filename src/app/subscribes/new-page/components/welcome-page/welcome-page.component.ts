import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
// @ts-ignore
import {selectFile} from '@helpers';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {
  @Input() page: any;
  @Output() updatePageEmitter = new EventEmitter<any>();
  @ViewChild('fileInput') fileInput: any;
  switchValue = false;
  radioValue = 'natural';
  themes = ['natural', 'gold', 'lime', 'blue', 'magenta', 'yellow', 'purple'];
  view = 'mobile';
  views = ['mobile', 'desktop'];
  pageForm: FormGroup;
  errors: any = {};
  file: File;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.pageForm = this.fb.group({
      welcomeTitle: [this.page.welcomeTitle , [Validators.required]],
      welcomeDescription: [this.page.welcomeDescription , [Validators.required]],
      welcomeButtonText: [this.page.welcomeButtonText , [Validators.required]],
      timerTime: [this.page.timerTime],
      timerText: [this.page.timerText],
      timerEnable: [this.page.timerEnable],
      layout: ['Image on half screen'],
      theme: [this.page.theme , [Validators.required]],
      background: [null],
    });
    this.updatePageEmitter.emit({page: this.pageForm.value, form: this.pageForm});
    this.onChanges();
  }

  onChanges(): void {
    this.pageForm.valueChanges.subscribe(val => {
      this.updatePageEmitter.emit({page: {...this.pageForm.value, background: this.file}, form: this.pageForm});

    });
  }

  onSelectFile(event): void {
    selectFile(event, this);
  }

}
