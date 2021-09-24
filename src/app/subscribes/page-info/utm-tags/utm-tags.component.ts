import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {IUTMTag} from '@models';
import {UTMTagsService} from '@subscribes-services';
import {format} from 'date-fns';
import {NzTableQueryParams} from 'ng-zorro-antd/table';

@Component({
  selector: 'app-utm-tags',
  templateUrl: './utm-tags.component.html',
  styleUrls: ['./utm-tags.component.scss']
})
export class UtmTagsComponent implements OnInit {
  @Input() page;
  @Output() openMenu = new EventEmitter<any>();
  @ViewChild('xlsxLink') xlsxLink: ElementRef;
  pagintation: any = {
    pageIndex: 0,
    pageSize: 20
  };
  total = 0;
  sort: any = {};
  filter: any = null;
  isMobile = false;
  utmTags: IUTMTag[] = [];
  constructor(private utmTagsService: UTMTagsService) { }

  ngOnInit(): void {
    this.getUTMTags();
    this.isMobile = document.body.clientWidth < 670;
  }

  getUTMTags(): void {
    // this.loginsService.getLogins(this.page.id).subscribe(res => {
    this.utmTagsService.getUTMTags(this.page.id, 0, 1).subscribe(res => {
      this.utmTags = res.data;
      this.total = res.total_count;
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
    this.utmTagsService.getUTMTags(this.page.id, pageIndex, pageSize, this.sort, this.filter).subscribe(res => {
      this.utmTags = res.data;
      this.total = res.total_count;
    });
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    const { pageSize, pageIndex, sort } = params;
    this.sort = sort;
    this.pagintation = {
      pageIndex, pageSize
    };
    this.utmTagsService.getUTMTags(this.page.id, pageIndex, pageSize, sort, this.filter).subscribe(res => {
      this.utmTags = res.data;
      this.total = res.total_count;
    });
  }

  onUpload(): void {
    this.xlsxLink.nativeElement.click();
  }

}
