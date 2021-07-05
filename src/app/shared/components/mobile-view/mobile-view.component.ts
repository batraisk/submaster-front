import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-mobile-view',
  templateUrl: './mobile-view.component.html',
  styleUrls: ['./mobile-view.component.scss']
})
export class MobileViewComponent implements OnInit {
  @Input() device: 'mobile' | 'desktop' = 'mobile';

  constructor() { }

  ngOnInit(): void {
  }

}
