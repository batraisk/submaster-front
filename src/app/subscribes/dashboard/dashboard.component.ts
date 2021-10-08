import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import {Router} from '@angular/router';
import { getISOWeek, format } from 'date-fns';
// @ts-ignore
import {PagesService, StatisticsService} from '@subscribes-services';
// @ts-ignore
import {NavigationService} from '@navigation-services';
import {kFormatter} from '@helpers';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit, OnDestroy {
  pages: any[] = [];
  stats: any = null;
  mode = 'date';
  date = new Date();
  isShowStats = false;
  isDesktop = false;

  constructor(
    private router: Router,
    private pagesService: PagesService,
    private statisticsService: StatisticsService,
    public navigationService: NavigationService,
  ) { }

  ngOnInit(): void {
    this.navigationService.header = 'MY PAGES';
    this.getPages();
  }

  getPages(): void {
    this.pagesService.getPages().subscribe(res => {
      this.pages = res;
    });
  }

  ngAfterViewInit(): void {
    this.isDesktop = document.body.clientWidth >= 1024;
  }

  showStats(): void {
    this.isShowStats = true;
  }

  ngOnDestroy(): void {
    this.navigationService.resetHeader();
  }

  goToNewPage(): void {
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/subscribe-pages/new'], { replaceUrl: true });
  }

  closeStats(): void {
    this.isShowStats = false;
  }
}
