import { Component, OnInit, OnDestroy } from '@angular/core';
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
export class DashboardComponent implements OnInit, OnDestroy {
  pages: any[] = [];
  stats: any = null;
  mode = 'date';
  date = new Date();
  statsList = ['clicks', 'subscribers', 'ctr'];

  constructor(
    private router: Router,
    private pagesService: PagesService,
    private statisticsService: StatisticsService,
    private navigationService: NavigationService,
  ) { }

  ngOnInit(): void {
    this.navigationService.header = 'MY PAGES';
    this.pagesService.getPages().subscribe(res => {
      this.pages = res;
    });
    const params = {
      date: format(this.date, 'Y-M-d'),
      mode: this.mode
    };
    this.getStats(params);
  }

  getStats(params = null): void {
    this.statisticsService.getStats(params).subscribe(res => {
      this.stats = res.data;
      this.statsList.forEach(caption => {
        this.stats[caption].total_count = kFormatter(this.stats[caption].total_count);
        if (this.stats[caption].trend < 0) {
          this.stats[caption].trendDirection = 'down';
          this.stats[caption].trend = Math.abs(this.stats[caption].trend);
        } else {
          this.stats[caption].trendDirection = 'up';
        }
      });
    });
  }

  ngOnDestroy(): void {
    this.navigationService.resetHeader();
  }

  goToNewPage(): void {
    // console.log(this.router.)

    this.router.navigate(['/subscribe-pages/new'], { replaceUrl: true });
  }

  changeStateRange(e): void {
    const params = {
      date: format(e, 'Y-M-d'),
      mode: this.mode
    };
    this.getStats(params);
  }

}
