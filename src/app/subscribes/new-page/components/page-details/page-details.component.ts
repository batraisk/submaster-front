import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-details',
  templateUrl: './page-details.component.html',
  styleUrls: ['./page-details.component.scss']
})
export class PageDetailsComponent implements OnInit {
  domain = 'https://submaster.com/';
  constructor() { }

  ngOnInit(): void {
  }

}
