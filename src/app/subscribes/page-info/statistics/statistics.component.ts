import {Component, Input, OnInit} from '@angular/core';
import { StatisticsService } from '@subscribes-services';
import {kFormatter} from "@helpers";
import {format} from "date-fns";

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
  @Input() page;
  stats: any;
  mode = 'date';
  date = new Date();
  statsList = ['clicks', 'subscribers', 'ctr'];

  constructor(private statisticsService: StatisticsService) { }

  ngOnInit(): void {
    this.getStats();
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

  changeStateRange(e): void {
    const params = {
      date: format(e, 'Y-M-d'),
      mode: this.mode
    };
    this.getStats(params);
  }

}
