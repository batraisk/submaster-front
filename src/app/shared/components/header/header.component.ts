import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
// @ts-ignore
import {NavigationService} from '@navigation-services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  title = '';
  params = {};
  constructor(public router: Router, public navigationService: NavigationService) {
  }

  ngOnInit(): void {

  }

}
