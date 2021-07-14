import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {selectFile} from "@helpers";

@Component({
  selector: 'app-page-settings',
  templateUrl: './page-settings.component.html',
  styleUrls: ['./page-settings.component.scss']
})
export class PageSettingsComponent implements OnInit {
  @Input() page;
  domain = 'https://submaster.com/';
  pageForm: FormGroup;
  themes = ['natural', 'gold', 'lime', 'blue', 'magenta', 'yellow', 'purple'];
  view = 'mobile';
  file: File;

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.pageForm = this.fb.group({
      pageName: [this.page.pageName, [Validators.required]],
      url: [this.page.url, Validators.compose([Validators.required])],
      facebookServerSideToken: [this.page.facebookServerSideToken],
      instagramLogin: [this.page.instagramLogin, Validators.compose([Validators.required])],
      facebookPixelId: [this.page.facebookPixelId],
      yandexMetrika: [this.page.yandexMetrika],

      welcomeTitle: [this.page.welcomeTitle , [Validators.required]],
      welcomeDescription: [this.page.welcomeDescription , [Validators.required]],
      welcomeButtonText: [this.page.welcomeButtonText , [Validators.required]],
      timerTime: [this.page.timerTime],
      timerText: [this.page.timerText],
      timerEnable: [this.page.timerEnable],
      layout: ['Image on half screen'],
      theme: [this.page.theme , [Validators.required]],
      background: [null],

      successTitle: [this.page.successTitle, [Validators.required]],
      successDescription: [this.page.successDescription, [Validators.required]],
      successButtonText: [this.page.successButtonText, [Validators.required]],
      downloadLink: [this.page.downloadLink, [Validators.required]],
      outOfStockTitle: [this.page.outOfStockTitle, [Validators.required]],
      outOfStockDescription: [this.page.outOfStockDescription, [Validators.required]],
    });
  }

  onSelectFile(event): void {
    selectFile(event, this);
  }

}
