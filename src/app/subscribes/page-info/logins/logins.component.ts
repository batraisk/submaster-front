import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {LoginsService} from '@subscribes-services';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { format } from 'date-fns';
import {ILogin} from '@models';

@Component({
  selector: 'app-logins',
  templateUrl: './logins.component.html',
  styleUrls: ['./logins.component.scss']
})
export class LoginsComponent implements OnInit {
  @Input() page;
  @ViewChild('xlsxLink') xlsxLink: ElementRef;
  pagintation: any = {
    pageIndex: 0,
    pageSize: 20
  };
  total = 0;
  sort: any = {};
  filter: any = null;

  logins: ILogin[] = [];
  constructor(private loginsService: LoginsService) { }

  ngOnInit(): void {
    this.getLogins();
  }

  getLogins(): void {
    // this.loginsService.getLogins(this.page.id).subscribe(res => {
    this.loginsService.getLogins(this.page.id, 0, 1).subscribe(res => {
      this.logins = res.data;
      this.total = res.total_count;
    });
  }

  onChange(result: Date[]): void {
    const { pageSize, pageIndex } = this.pagintation;
    if (result[0]) {
      this.filter = {
        from: format(result[0], 'Y-M-d'),
        to: format(result[1], 'Y-M-d')
      };
    } else {
      this.filter = null;
    }
    this.loginsService.getLogins(this.page.id, pageIndex, pageSize, this.sort, this.filter).subscribe(res => {
      this.logins = res.data;
      this.total = res.total_count;
    });
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    const { pageSize, pageIndex, sort } = params;
    this.sort = sort;
    this.pagintation = {
      pageIndex, pageSize
    };
    this.loginsService.getLogins(this.page.id, pageIndex, pageSize, sort, this.filter).subscribe(res => {
      this.logins = res.data;
      this.total = res.total_count;
    });
  }

  onUpload(): void {
    this.xlsxLink.nativeElement.click();
  }
}
