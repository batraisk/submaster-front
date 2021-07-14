import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { PagesService } from '@subscribes-services';

@Component({
  selector: 'app-page-info',
  templateUrl: './page-info.component.html',
  styleUrls: ['./page-info.component.scss']
})
export class PageInfoComponent implements OnInit {
  pageId: number;
  page: any;

  constructor(private pagesService: PagesService, private activatedRoute: ActivatedRoute) {
    this.activatedRoute
      .params
      .subscribe(params => (this.pageId = params.id)
      );
  }

  ngOnInit(): void {
    this.pagesService.getPage(this.pageId).subscribe(page => {
      this.page = page;
    });
  }

}
