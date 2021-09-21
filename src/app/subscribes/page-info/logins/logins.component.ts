import {Component, ElementRef, Input, OnInit, ViewChild, EventEmitter, Output} from '@angular/core';
import {LoginsService} from '@subscribes-services';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { format } from 'date-fns';
import {ILogin} from '@models';
import {environment} from '@environment';


@Component({
  selector: 'app-logins',
  templateUrl: './logins.component.html',
  styleUrls: ['./logins.component.scss']
})
export class LoginsComponent implements OnInit {
  @Input() page;
  @ViewChild('xlsxLink') xlsxLink: ElementRef;
  @Output() openMenu = new EventEmitter<any>();
  pagintation: any = {
    pageIndex: 1,
    pageSize: 20
  };
  total = 0;
  sort: any = {};
  filter: any = null;
  baseUrl = environment.apiUrl;
  dowloadLink = '';
  isMobile = false;

  logins: ILogin[] = [];
  mobileData: any[] = [];
  constructor(private loginsService: LoginsService) { }

  ngOnInit(): void {
    this.getLogins();
    this.dowloadLink = `${this.baseUrl}/api/v1/subscribe_pages/{{page.id}}/logins/report.xlsx`;
    this.isMobile = document.body.clientWidth < 670;
  }

  getLogins(): void {
    // this.loginsService.getLogins(this.page.id).subscribe(res => {
    this.loginsService.getLogins(this.page.id, 1, 20).subscribe(res => {
      this.logins = res.data;
      this.total = res.total_count;
      this.prepareMobileData(this.logins);
    });
  }

  showMenu(): void {
    this.openMenu.emit();
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

  prepareMobileData(logins: ILogin[]): void {
    if (!this.isMobile) { return; }
    const res: any = [];
    const temp: any = {};
    logins.forEach(login => {
      if (!temp[login.date]) { temp[login.date] = []; }
      temp[login.date].push(login);
    });
    Object.keys(temp).forEach(date => {
      res.push({date, data: temp[date]});
    });

    this.mobileData = this.mobileData.concat(res);
  }

  loadMore(): void {
    const {pageSize, pageIndex} = this.pagintation;
    this.pagintation = {
      pageIndex: pageIndex + 1, pageSize: this.pagintation.pageSize
    };
    this.loginsService.getLogins(this.page.id, this.pagintation.pageIndex, pageSize).subscribe(res => {
      this.logins = res.data;
      this.total = res.total_count;
      this.prepareMobileData(this.logins);
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
      this.prepareMobileData(this.logins);
      // console.log(this.logins);
    });
  }

  onUpload(): void {
    this.xlsxLink.nativeElement.click();
  }
}
