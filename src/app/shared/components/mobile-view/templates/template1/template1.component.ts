import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-template1',
  templateUrl: './template1.component.html',
  styleUrls: ['./template1.component.scss']
})
export class Template1Component implements OnInit {
  @Input() device: 'mobile' | 'desktop' = 'mobile';
  @Input() color = 'natural';
  @Input() title: '';
  @Input() description: '';
  @Input() timerText: '';
  @Input() time: 0;
  @Input() buttonText: '';
  @Input() timerEnable: false;
  @Input() backgroundUrl: string | null = null;
  @Input() youtube: string | null = null;
  colors: any = {
    natural: {
      primary: '#2F54EB',
      gradient: 'linear-gradient(90deg, #2F54EB 55.12%, #ADC6FF 100%)'
    },
    gold: {
      primary: '#FA541C',
      gradient: 'linear-gradient(90deg, #FA541C 55.12%, #FFBB96 100%)'
    },
    lime: {
      primary: '#7CB305',
      gradient: 'linear-gradient(90deg, #A0D911 55.12%, #EAFF8F 100%)',
    },
    blue: {
      primary: '#1890FF',
      gradient: 'linear-gradient(90deg, #1890FF 55.12%, #91D5FF 100%)',
    },
    magenta: {
      primary: '#EB2F96',
      gradient: 'linear-gradient(90deg, #EB2F96 55.12%, #FFADD2 100%)',
    },
    yellow: {
      primary: '#434343',
      gradient: 'linear-gradient(90deg, #262626 55.12%, #8C8C8C 100%)',
    },
    purple: {
      primary: '#722ED1',
      gradient: 'linear-gradient(90deg, #722ED1 55.12%, #D3ADF7 100%)',
    }
  };
  constructor() { }

  ngOnInit(): void {
  }

  get preparedTime(): string {
    return new Date(this.time * 1000).toISOString().substr(14, 5);
  }

}
