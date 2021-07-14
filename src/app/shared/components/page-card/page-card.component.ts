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
  constructor(public translate: TranslateService, private router: Router,) { }

  ngOnInit(): void {
  }

  goToInfo(id: number): void {
    this.router.navigate(['/subscribe-pages', id]);
  }

}
