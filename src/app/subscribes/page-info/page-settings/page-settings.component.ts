import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {selectFile, toSnakeCaseObject} from '@helpers';
import {Router} from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import {PagesService} from '@subscribes-services';
import {TranslateService} from '@ngx-translate/core';

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
  translates: any = {};

  constructor(
    private fb: FormBuilder,
    private modal: NzModalService,
    private router: Router, private pagesService: PagesService,
    private translate: TranslateService
  ) {
    const foo: string = this.translate.instant('PAGE.CONFIRM DELETE');
  }

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
      status: [this.page.status === 'active' , [Validators.required]],
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

  onSubmit(): void {
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
    for (const key in property) {
      if (key && key !== 'background' && key !== 'status') {
        formData.append(key, property[key] || '');
      }
    }
    formData.append('status', property.status ? 'active' : 'inactive');
    if (this.file) {
      formData.append('background', this.file);
    }
    this.pagesService.updatePage(this.page.id, formData).subscribe(res => {
      this.router.navigate(['/']);
    });
  }

  showDeleteConfirm(): void {
    this.modal.confirm({
      nzTitle: this.translate.instant('PAGE.CONFIRM DELETE'),
      nzOkText: this.translate.instant('ACTIONS.YES'),
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.removePage(),
      nzCancelText: this.translate.instant('ACTIONS.CANCEL'),
    });
  }

  removePage(): void {
    this.pagesService.removePage(this.page.id).subscribe(res => {
      this.router.navigate(['/']);
    });
  }

}
