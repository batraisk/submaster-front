import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-template3',
  templateUrl: './template3.component.html',
  styleUrls: ['./template3.component.scss']
})
export class Template3Component implements OnInit {
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
      bgColor: '#D6E4FF',
      layoutColor: '#FFF',
      gradient: 'linear-gradient(90deg, #2F54EB 55.12%, #ADC6FF 100%)',
      textColor: '#1F1F1F',
    },
    blue: {
      primary: '#08979C',
      bgColor: '#BEEAEC',
      layoutColor: '#F0F5FF',
      gradient: 'linear-gradient(90deg, #13C2C2 55.12%, #87E8DE 100%)',
      textColor: '#1F1F1F',
    },
    pink: {
      primary: '#EB2F96',
      bgColor: '#FFD6E7',
      layoutColor: '#FFF0F6',
      gradient: 'linear-gradient(90deg, #EB2F96 55.12%, #FFADD2 100%)',
      textColor: '#1F1F1F',
    },
    mustard: {
      primary: '#262626',
      bgColor: '#9d853f',
      layoutColor: '#ffd254',
      gradient: 'linear-gradient(90deg, #262626 55.12%, #8C8C8C 100%)',
      textColor: '#1F1F1F',
    },
    dark: {
      primary: '#722ED1',
      bgColor: '#9255de',
      layoutColor: '#262626',
      gradient: 'linear-gradient(90deg, #722ED1 55.12%, #D3ADF7 100%)',
      textColor: '#FFF',
    }
  };
  constructor() { }

  ngOnInit(): void {
  }

  get preparedTime(): string {
    return new Date(this.time * 1000).toISOString().substr(14, 5);
  }

}
