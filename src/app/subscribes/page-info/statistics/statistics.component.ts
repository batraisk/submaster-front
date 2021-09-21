import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { StatisticsService } from '@subscribes-services';
import {kFormatter} from '@helpers';
import {format} from 'date-fns';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
  @Input() page;
  @Output() openMenu = new EventEmitter<any>();
  stats: any;
  mode = 'date';
  isMobile = false;
  date = new Date();
  statsList = ['clicks', 'subscribers', 'ctr'];

  constructor(private statisticsService: StatisticsService) { }

  ngOnInit(): void {
    const params = {
      date: format(this.date, 'Y-M-d'),
      mode: this.mode
    };
    this.getStats(params);
    this.isMobile = document.body.clientWidth < 670;
  }

  getStats(params = null): void {
    this.statisticsService.getPageStats(this.page.id, params).subscribe(res => {
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

  showMenu(): void {
    this.openMenu.emit();
  }

  changeStateRange(e): void {
    const params = {
      date: format(e, 'Y-M-d'),
      mode: this.mode
    };
    this.getStats(params);
  }

}
