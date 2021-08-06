import { Component, OnInit, OnDestroy } from '@angular/core';
import {Router} from '@angular/router';
// @ts-ignore
import {PagesService} from '@subscribes-services';
// @ts-ignore
import {NavigationService} from '@navigation-services';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  pages: any[] = [];
  mode = 'date';

  constructor(
    private router: Router,
    private pagesService: PagesService,
    private navigationService: NavigationService,
  ) { }

  ngOnInit(): void {
    this.navigationService.header = 'MY PAGES';
    this.pagesService.getPages().subscribe(res => {
      this.pages = res;
    });
  }

  ngOnDestroy(): void {
    this.navigationService.resetHeader();
  }

  goToNewPage(): void {
    // console.log(this.router.)

    this.router.navigate(['/subscribe-pages/new'], { replaceUrl: true });
  }

}
