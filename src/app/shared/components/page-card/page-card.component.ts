import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-page-card',
  templateUrl: './page-card.component.html',
  styleUrls: ['./page-card.component.scss']
})
export class PageCardComponent implements OnInit {
  @Input() page: any;
  constructor() { }

  ngOnInit(): void {
  }

}
