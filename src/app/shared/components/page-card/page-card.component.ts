import {Component, Input, OnInit} from '@angular/core';
import {environment} from '@environment';
import {TranslateService} from '@ngx-translate/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-page-card',
  templateUrl: './page-card.component.html',
  styleUrls: ['./page-card.component.scss']
})
export class PageCardComponent implements OnInit {
  @Input() page: any;
  baseUrl = environment.apiUrl;
  background = '';
  constructor(public translate: TranslateService, private router: Router) { }

  ngOnInit(): void {
    if (this.page.youtube) {
      this.background = `https://img.youtube.com/vi/${this.getYoutubeId(this.page.youtube)}/0.jpg`;
    } else {
      this.background = this.baseUrl + this.page.background;
    }
  }

  getYoutubeId = (url): string => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);

    if (match && match[2].length === 11) {
      return match[2];
    }
    return '';
  };

  goToInfo(id: number): void {
    this.router.navigate(['/subscribe-pages', id]);
  }

}
