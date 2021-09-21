import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {makeYoutubeEmbed, matchYoutubeUrl, selectFile, toSnakeCaseObject} from '@helpers';
import {Router} from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import {PagesService} from '@subscribes-services';
import {TranslateService} from '@ngx-translate/core';
import {environment} from '@environment';

@Component({
  selector: 'app-page-settings',
  templateUrl: './page-settings.component.html',
  styleUrls: ['./page-settings.component.scss']
})
export class PageSettingsComponent implements OnInit {
  @Input() page;
  @ViewChild('fileInput') fileInput: any;
  @Output() openMenu = new EventEmitter<any>();
  baseUrl = environment.apiUrl;
  domain = 'https://submaster.com/';
  pageForm: FormGroup;
  // themes = ['natural', 'gold', 'lime', 'blue', 'magenta', 'yellow', 'purple'];
  themes = ['default', 'red', 'green', 'blue', 'pink', 'mustard', 'dark'];
  view = 'mobile';
  file: File;
  translates: any = {};
  backgroundUrl: string | null = null;
  backgroundName: string | null = null;
  isVisibleYoutubeModal = false;
  youtubeLink = '';
  isMobile = false;
  youtube: string | null = null;
  fileTypes: string[] = [
    'image/jpeg',
    'image/pjpeg',
    'image/png'
  ];

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
      layout: [this.page.layout],
      // theme: [this.page.theme , [Validators.required]],
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
    if (this.page.background) { this.backgroundUrl = this.baseUrl + this.page.background; }
    this.youtube = this.page.youtube;
    this.isMobile = document.body.clientWidth < 670;
  }

  onSelectFile(event): void {
    this.removeYoutube();
    selectFile(event, this);
    this.updateImageDisplay();
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
    } else if (this.page.background && !this.backgroundUrl) {
      formData.append('background', '_destroy');
    }
    if (this.youtube) {
      formData.append('youtube', this.youtube);
    } else {
      formData.append('youtube', '');
    }
    this.pagesService.updatePage(this.page.id, formData).subscribe(res => {
      this.router.navigate(['/']);
    });
  }

  showMenu(): void {
    this.openMenu.emit();
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

  showModalYoutube(): void {
    this.isVisibleYoutubeModal = true;
  }

  handleOkModal(): void {
    this.youtube = this.youtubeLink;
    this.isVisibleYoutubeModal = false;
    this.removeImage();
  }

  handleCancelModal(): void {
    this.isVisibleYoutubeModal = false;
  }

  somethingChanged(event): void {
    if (matchYoutubeUrl(event.target.value)) {
      this.youtubeLink = makeYoutubeEmbed(event.target.value);
    }
  }

  removeYoutube(): void {
    this.youtubeLink = '';
    this.youtube = null;
  }

  updateImageDisplay(): void {
    if (!this.validFileType(this.file)) {
      return;
    }
    this.backgroundUrl = window.URL.createObjectURL(this.file);
    this.backgroundName = this.file.name;
  }

  removeImage(): void {
    this.backgroundUrl = null;
    this.backgroundName = null;
    this.file = undefined;
  }

  returnFileSize(n): string {
    if (n < 1024) {
      return n + 'bytes';
    } else if (n > 1024 && n < 1048576) {
      return (n / 1024).toFixed(1) + 'KB';
    } else if (n > 1048576) {
      return (n / 1048576).toFixed(1) + 'MB';
    }
  }

  validFileType(file): boolean {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.fileTypes.length; i++) {
      if (file.type === this.fileTypes[i]) {
        return true;
      }
    }

    return false;
  }

}
