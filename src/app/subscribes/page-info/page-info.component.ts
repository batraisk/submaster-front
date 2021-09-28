import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { PagesService } from '@subscribes-services';
// @ts-ignore
import {NavigationService} from '@navigation-services';

@Component({
  selector: 'app-page-info',
  templateUrl: './page-info.component.html',
  styleUrls: ['./page-info.component.scss']
})
export class PageInfoComponent implements OnInit {
  pageId: number;
  page: any;
  indexTab = 0;
  isMobile = false;
  isVisibleMenu = false;

  constructor(
    private pagesService: PagesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private navigationService: NavigationService,
  ) {
    this.activatedRoute
      .params
      .subscribe(params => {
        this.pageId = params.id;
      });
    this.activatedRoute.queryParams.subscribe( paramMap => {
      const tab = paramMap.tab;
      if (tab) {
        switch (tab) {
          case 'logins':
            this.indexTab = 0;
            break;
          case 'statistics':
            this.indexTab = 1;
            break;
          case 'utm':
            this.indexTab = 2;
            break;
          case 'edit':
            this.indexTab = 3;
            break;
          default:
            this.indexTab = 0;
        }
      }
    });
  }

  handleCancel(): void {
    this.isVisibleMenu = false;
  }

  openMenu(): void {
    this.isVisibleMenu = true;
  }

  goToInfo(tab: string): void {
    this.router.navigate(['/subscribe-pages', this.page.id], { queryParams: { tab } });
    this.isVisibleMenu = false;
  }

  goToPage(): void {
    window.location.href = this.page.linkToPage;
  }

  close(): void {
    this.router.navigate(['/subscribes-pages']);
  }

  ngOnInit(): void {
    this.pagesService.getPage(this.pageId).subscribe(page => {
      this.page = page;
      this.navigationService.header = `CUSTOM {{${page.pageName}}}`;
    });
    this.isMobile = document.body.clientWidth < 670;
  }

  setIndex(index: number): void {
    this.indexTab = index;
  }

}
