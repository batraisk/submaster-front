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
  currentFrom: any;

  constructor(private router: Router, private pagesService: PagesService) {}

  ngOnInit(): void {
    this.page = {};
  }

  setPage(event): void {
    console.log(event)
    const {page, form} = event;
    console.log('page', page)
    // console.log(page.value)
    this.page = {...this.page, ...page};
    this.currentFrom = form;
  }

  ngOnDestroy(): void {
  }

  pre(): void {
    this.current -= 1;
  }

  next(): void {
    // tslint:disable-next-line:forin
    for (const i in this.currentFrom.controls) {
      this.currentFrom.controls[i].markAsDirty();
      this.currentFrom.controls[i].updateValueAndValidity();
    }
    if (this.currentFrom.invalid) {
      return;
    }
    this.current += 1;
  }

  done(): void {
    // tslint:disable-next-line:forin
    for (const i in this.currentFrom.controls) {
      this.currentFrom.controls[i].markAsDirty();
      this.currentFrom.controls[i].updateValueAndValidity();
    }
    if (this.currentFrom.invalid) {
      return;
    }
    const formData: any = new FormData();
    const property = toSnakeCaseObject(this.page);
    for (const key in property) {
      if (key) {
        formData.append(key, property[key]);
      }
    }
    if (this.page.background) {
      formData.append('background', this.page.background);
    }
    this.pagesService.createPage(formData).subscribe(res => {
      this.router.navigate(['/']);
    });
  }

  cancel(): void {
    this.router.navigate(['/']);
  }
}
