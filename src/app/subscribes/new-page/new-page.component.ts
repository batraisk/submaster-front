import { Component, OnInit, OnDestroy } from '@angular/core';
import {Router} from '@angular/router';
// @ts-ignore
import {PagesService} from '@subscribes-services';
// @ts-ignore
import {toSnakeCaseObject} from '@helpers';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styleUrls: ['./new-page.component.scss']
})
export class NewPageComponent implements OnInit, OnDestroy {
  current = 0;
  page: any;

  constructor(private router: Router, private pagesService: PagesService) {}

  ngOnInit(): void {
    console.log('init new');
    this.page = {};
  }

  setPage(page): void {
    this.page = {...this.page, ...page};
  }

  ngOnDestroy(): void {
    console.log('destroy new');
  }


  pre(): void {
    this.current -= 1;
  }

  next(): void {
    this.current += 1;
  }

  done(): void {
    this.pagesService.createPage(toSnakeCaseObject(this.page)).subscribe(res => {
      this.router.navigate(['/']);
    });
  }

  cancel(): void {
    this.router.navigate(['/']);
  }

  // changeContent(): void {
  //   switch (this.current) {
  //     case 0: {
  //       this.index = 'First-content';
  //       break;
  //     }
  //     case 1: {
  //       this.index = 'Second-content';
  //       break;
  //     }
  //     case 2: {
  //       this.index = 'third-content';
  //       break;
  //     }
  //     default: {
  //       this.index = 'error';
  //     }
  //   }
  // }

}
