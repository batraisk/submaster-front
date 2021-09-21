import {AfterViewInit, Component, ElementRef, Input, OnInit, Renderer2, ViewChild} from '@angular/core';
import {environment} from '@environment';
import {TranslateService} from '@ngx-translate/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-page-card',
  templateUrl: './page-card.component.html',
  styleUrls: ['./page-card.component.scss']
})
export class PageCardComponent implements OnInit, AfterViewInit {
  @ViewChild('card', {static: false}) card: ElementRef;
  @ViewChild('picture', {static: false}) picture: ElementRef;
  @Input() page: any;
  fullMode = false;
  isVisibleMenu = false;
  baseUrl = environment.apiUrl;
  background = '';
  constructor(public translate: TranslateService, private router: Router, private renderer: Renderer2) { }

  ngOnInit(): void {
    if (this.page.youtube) {
      this.background = `https://img.youtube.com/vi/${this.getYoutubeId(this.page.youtube)}/0.jpg`;
    } else {
      this.background = this.baseUrl + this.page.background;
    }
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

  // getInstaAvatar = (): void => {
  //   fetch(`https://www.instagram.com/${this.page.instagramLogin}/?__a=1`).then(res =>
  //     res.json().then(resp => {
  //       console.log(resp);
  //     }));
  // }
  // https://www.instagram.com/user/?__a=1

  goToInfo(tab: string): void {
    this.router.navigate(['/subscribe-pages', this.page.id], { queryParams: { tab } });
  }

}
