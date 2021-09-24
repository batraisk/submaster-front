import {Component, Input, OnInit, EventEmitter, Output} from '@angular/core';
import {StatisticsService} from '@subscribes-services';
import {format} from 'date-fns';
import {kFormatter} from '@helpers';

@Component({
  selector: 'app-mobile-dashboard-statistics',
  templateUrl: './mobile-dashboard-statistics.component.html',
  styleUrls: ['./mobile-dashboard-statistics.component.scss']
})
export class MobileDashboardStatisticsComponent implements OnInit {
  @Input() customClass: '';
  stats: any = null;
  mode = 'date';
  date = new Date();
  statWidth = 0;
  statHeight = 0;
  @Output() closeMenu = new EventEmitter<any>();
  statsList = ['clicks', 'subscribers', 'ctr'];

  constructor(private statisticsService: StatisticsService) { }

  ngOnInit(): void {
    const params = {
      date: format(this.date, 'Y-M-d'),
      mode: this.mode
    };
    this.getStats(params);
    this.statWidth = document.body.clientWidth - 143;
    this.statHeight = Math.round(this.statWidth * 1.5 / 3);
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

  close(): void {
    this.closeMenu.emit();
  }

  changeStateRange(e): void {
    const params = {
      date: format(e, 'Y-M-d'),
      mode: this.mode
    };
    this.getStats(params);
  }

}
