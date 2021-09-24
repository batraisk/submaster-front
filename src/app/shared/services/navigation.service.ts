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
      // debugger
      this.headerTitle =  title.match(/(.*?)(?=\s\{\{)/g)[0];
      this.headerParamsPrivate =  {value: title.match(/(?<=\{\{).*(?=\}\})/g)[0]};
    } else {
      this.headerTitle = title;
      // this.headerTitle = title;
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
