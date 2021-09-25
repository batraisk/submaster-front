import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
// @ts-ignore
import {selectFile, matchYoutubeUrl, makeYoutubeEmbed} from '@helpers';

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
  radioValue = 'default';
  themes = ['default', 'red', 'green', 'blue', 'pink', 'mustard', 'dark'];
  view = 'mobile';
  views = ['mobile', 'desktop'];
  pageForm: FormGroup;
  errors: any = {};
  file: File;
  fileTypes: string[] = [
    'image/jpeg',
    'image/pjpeg',
    'image/png'
  ];
  backgroundUrl: string | null = null;
  backgroundName: string | null = null;
  isVisibleYoutubeModal = false;
  youtubeLink = '';
  youtube: string | null = null;
  isMobile = false;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.pageForm = this.fb.group({
      welcomeTitle: [this.page.welcomeTitle , [Validators.required]],
      welcomeDescription: [this.page.welcomeDescription , [Validators.required]],
      welcomeButtonText: [this.page.welcomeButtonText , [Validators.required]],
      timerTime: [this.page.timerTime],
      timerText: [this.page.timerText],
      timerEnable: [this.page.timerEnable],
      layout: ['template_1'],
      theme: ['default' , [Validators.required]],
      background: [null],
    });
    this.updatePageEmitter.emit({page: this.pageForm.value, form: this.pageForm});
    this.onChanges();
    this.isMobile = document.body.clientWidth < 670;
  }

  onChanges(): void {
    this.pageForm.valueChanges.subscribe(val => {
      this.updatePageEmitter.emit({page: {...this.pageForm.value, background: this.file, youtube: this.youtube}, form: this.pageForm});

    });
  }

  showModalYoutube(): void {
    this.isVisibleYoutubeModal = true;
  }

  handleOkModal(): void {
    this.youtube = this.youtubeLink;
    this.isVisibleYoutubeModal = false;
    this.removeImage();
    this.onChanges();
  }

  handleCancelModal(): void {
    this.isVisibleYoutubeModal = false;
  }

  onSelectFile(event): void {
    this.removeYoutube();
    selectFile(event, this);
    this.updateImageDisplay();
    this.updatePageEmitter.emit({page: {...this.pageForm.value, background: this.file, youtube: null}, form: this.pageForm});
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
    this.updatePageEmitter.emit({page: {...this.pageForm.value, background: this.file}, form: this.pageForm});
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

  somethingChanged(event): void {
    if (matchYoutubeUrl(event.target.value)) {
      this.youtubeLink = makeYoutubeEmbed(event.target.value);
    }
  }

  removeYoutube(): void {
    this.youtubeLink = '';
    this.youtube = null;

    this.updatePageEmitter.emit({page: {...this.pageForm.value, youtube: null}, form: this.pageForm});
  }
}
