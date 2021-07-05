import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {
  switchValue = false;
  radioValue = 'natural';
  themes = ['natural', 'gold', 'lime', 'blue', 'magenta', 'yellow', 'purple'];
  view = 'mobile';
  views = ['mobile', 'desktop'];

  constructor() { }

  ngOnInit(): void {
  }

}
