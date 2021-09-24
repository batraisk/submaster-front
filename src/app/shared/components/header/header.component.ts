import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
// @ts-ignore
import {NavigationService} from '@navigation-services';
import {UserService} from '@core-services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  title = '';
  params = {};
  constructor(
    public router: Router,
    public navigationService: NavigationService,
    private userService: UserService) {
  }

  get balance(): string {
    return this.userService.balance.getValue();
  }
  ngOnInit(): void {

  }

  get isOpen(): boolean {
    return this.navigationService.isOpenMenu.getValue();
  }

  toggleMenu(): void {
    this.navigationService.toggleMenu();
  }
}
