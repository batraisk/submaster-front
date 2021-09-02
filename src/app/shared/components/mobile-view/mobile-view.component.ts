import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-mobile-view',
  templateUrl: './mobile-view.component.html',
  styleUrls: ['./mobile-view.component.scss']
})
export class MobileViewComponent implements OnInit {
  @Input() device: 'mobile' | 'desktop' = 'desktop';
  // @Input() color: 'natural' | 'gold' | 'lime' | 'blue' | 'magenta' | 'yellow' | 'purple' = 'natural';
  @Input() color: 'default' | 'pink' | 'mustard' | 'dark' = 'default';
  @Input() template: 'template_1' | 'template_2' | 'template_3' | 'template_4' | 'template_5' | 'template_6';
  @Input() title: '';
  @Input() description: '';
  @Input() timerText: '';
  @Input() time: '';
  @Input() buttonText: '';
  @Input() timerEnable: false;
  @Input() youtube: string | null;
  @Input() backgroundUrl: string | null;

  constructor() { }

  ngOnInit(): void {
  }

}
