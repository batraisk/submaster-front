import { Component, OnInit, OnDestroy } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {NavigationService} from '@navigation-services';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss']
})
export class BalanceComponent implements OnInit, OnDestroy {
  inputValue = '';
  promo = '';
  value1 = 30;
  billings = [
    {
      date: '2020-11-08',
      amount: '50',
      status: 'completed',
    }, {
      date: '2020-11-08',
      amount: '50',
      status: 'in_progress',
    }
  ];

  constructor(
    private translate: TranslateService,
    private navigationService: NavigationService
  ) { }

  ngOnInit(): void {
    this.navigationService.header = 'BALANCE';
  }

  ngOnDestroy(): void {
    this.navigationService.resetHeader();
  }

}
