import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  headerTitle = '';
  headerParamsPrivate: any = {value: ''};
  isOpenMenu = new BehaviorSubject<boolean>(false);

  constructor() { }

  set header(title: string) {
    if (title.indexOf('{{') !== -1) {
      this.headerTitle =  title.match(/(.*?)(?=\s\{\{)/g)[0];
      const startIndex = title.indexOf('{{');
      const endIndex = title.indexOf('}}');
      // console.log('title.match(/(?<=\\{\\{).*(?=\\}\\})/g)[0]', title.match(/(?<=\{\{).*(?=\}\})/g)[0]);
      // this.headerParamsPrivate =  {value: title.match(/(?<=\{\{).*(?=\}\})/g)[0]};
      this.headerParamsPrivate =  {value: title.slice(startIndex + 2, endIndex)};
    } else {
      this.headerTitle = title;
      this.headerParamsPrivate = {value: ''};
    }
  }

  get header(): string { return this.headerTitle; }

  get headerParams(): string { return this.headerParamsPrivate; }

  openMenu(): void {
    this.isOpenMenu.next(true);
  }

  closeMenu(): void {
    this.isOpenMenu.next(false);
  }

  toggleMenu(): void {
    const isOpen = this.isOpenMenu.getValue();
    this.isOpenMenu.next(!isOpen);
  }

  resetHeader(): void {
    this.header = '';
    this.headerParamsPrivate = {value: ''};
  }
}
