import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-template5',
  templateUrl: './template5.component.html',
  styleUrls: ['./template5.component.scss']
})
export class Template5Component implements OnInit {
  @Input() device: 'mobile' | 'desktop' = 'mobile';
  @Input() color = 'default';
  @Input() title: '';
  @Input() description: '';
  @Input() timerText: '';
  @Input() time: 0;
  @Input() buttonText: '';
  @Input() timerEnable: false;
  @Input() backgroundUrl: string | null = null;
  @Input() youtube: string | null = null;
  colors: any = {
    default: {
      primary: '#2F54EB',
      bgColor: '#597EF7',
      layoutColor: '#FFF',
      gradient: 'linear-gradient(90deg, #2F54EB 55.12%, #ADC6FF 100%)',
      textColor: '#1F1F1F',
    },
    blue: {
      primary: '#08979C',
      bgColor: '#08979C',
      layoutColor: '#F0F5FF',
      gradient: 'linear-gradient(90deg, #13C2C2 55.12%, #87E8DE 100%)',
      textColor: '#1F1F1F',
    },
    pink: {
      primary: '#EB2F96',
      bgColor: '#EB2F96',
      layoutColor: '#FFF0F6',
      gradient: 'linear-gradient(90deg, #EB2F96 55.12%, #FFADD2 100%)',
      textColor: '#1F1F1F',
    },
    mustard: {
      primary: '#262626',
      bgColor: '#262626',
      layoutColor: '#ffd254',
      gradient: 'linear-gradient(90deg, #262626 55.12%, #8C8C8C 100%)',
      textColor: '#1F1F1F',
    },
    dark: {
      primary: '#722ED1',
      bgColor: '#722ED1',
      layoutColor: '#262626',
      gradient: 'linear-gradient(90deg, #722ED1 55.12%, #D3ADF7 100%)',
      textColor: '#FFF',
    },
    red: {
      primary: '#F21414',
      bgColor: '#FFBBAC',
      layoutColor: '#FFF2E8',
      gradient: 'linear-gradient(90deg, #CF1322 55.12%, #F9C6C3 100%)',
      textColor: '#1F1F1F',
    },
    green: {
      primary: '#008F5C',
      bgColor: '#93D0B2',
      layoutColor: '#EEF2E9',
      gradient: 'linear-gradient(90deg, #008F5C 55.12%, #93D0B2 100%)',
      textColor: '#1F1F1F',
    }
  };
  constructor() { }

  ngOnInit(): void {
  }

  get preparedTime(): string {
    return new Date(this.time * 1000).toISOString().substr(14, 5);
  }

}
