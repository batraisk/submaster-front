import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  ViewChild,
  EventEmitter,
  Output
} from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

import {environment} from '@environment';
import {TranslateService} from '@ngx-translate/core';
import {Router} from '@angular/router';
import {PagesService} from '@subscribes-services';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzModalService} from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-page-card',
  templateUrl: './page-card.component.html',
  styleUrls: ['./page-card.component.scss']
})
export class PageCardComponent implements OnInit, AfterViewInit {
  @ViewChild('card', {static: false}) card: ElementRef;
  @ViewChild('picture', {static: false}) picture: ElementRef;
  @Output() updateList = new EventEmitter<any>();
  @Input() page: any;
  fullMode = false;
  isVisibleMenu = false;
  baseUrl = environment.apiUrl;
  background = '';
  switchActive = false;
  src = '';

  constructor(
    public translate: TranslateService,
    private router: Router,
    private renderer: Renderer2,
    private pagesService: PagesService,
    private sanitization: DomSanitizer,
    private modal: NzModalService,
    private message: NzMessageService,
  ) { }

  ngOnInit(): void {
    if (this.page.youtube) {
      this.background = `https://img.youtube.com/vi/${this.getYoutubeId(this.page.youtube)}/0.jpg`;
    } else {
      this.background = this.baseUrl + this.page.background;
    }
    this.switchActive = this.page.status === 'active';
    this.src = `data:image/jpg;base64, ${this.page.instaAvatar}`;
  }

  ngAfterViewInit(): void {
    this.renderer.setStyle(this.picture.nativeElement, 'height', `${this.card.nativeElement.offsetWidth * 2 / 3}px`);
  }

  getYoutubeId(url): string {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);

    if (match && match[2].length === 11) {
      return match[2];
    }
    return '';
  }

  toggleFullMode(): void {
    this.fullMode = !this.fullMode;
  }

  handleCancel(): void {
    this.isVisibleMenu = false;
  }

  showMenu(): void {
    this.isVisibleMenu = true;
  }

  setStatus(): void {
    const status = this.switchActive ? 'active' : 'inactive';
    const formData: any = new FormData();
    formData.append('status', status);
    // formData.append('status', property.status ? 'active' : 'inactive');
    this.pagesService.updatePage(this.page.id, formData).subscribe(res => {
      this.page.status = res.status;
      // this.router.navigate(['/']);
    });
  }

  // getInstaAvatar = (): void => {
  //   fetch(`https://www.instagram.com/${this.page.instagramLogin}/?__a=1`).then(res =>
  //     res.json().then(resp => {
  //       console.log(resp);
  //     }));
  // }
  // https://www.instagram.com/user/?__a=1
  copy(): void {
    this.pagesService.copyPage(this.page.id).subscribe(res => {
      this.message.success(this.translate.instant('PAGE.PAGE COPIED'));
      this.updateList.emit();
      // this.page.status = res.status;
      // this.router.navigate(['/']);
    });
  }
  removePage(): void {
    this.pagesService.removePage(this.page.id).subscribe(res => {
      this.message.success(this.translate.instant('PAGE.REMOVED'));
      this.updateList.emit();
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

  goToInfo(tab: string): void {
    this.router.navigate(['/subscribe-pages', this.page.id], { queryParams: { tab } });
  }

}
