import { Component, OnInit, OnDestroy } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {NavigationService} from '@navigation-services';
import {PaymentsService, UserService} from '@core-services';
import {NzTableQueryParams} from 'ng-zorro-antd/table';
import {NzMessageService} from 'ng-zorro-antd/message';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss']
})
export class BalanceComponent implements OnInit, OnDestroy {
  inputValue = '';
  promo = '';
  value = 1000;
  total = 0;
  pagintation: any = {
    pageIndex: 0,
    pageSize: 20
  };
  isMobile = false;
  sort: any = {};
  payments: any[] = [];
  currency = 'RUB'; // USD
  mobileData: any[] = [];
  currencyStr = '';
  minimalPriceStr = '';
  price = 0;
  errors: any = {};

  constructor(
    private translate: TranslateService,
    private navigationService: NavigationService,
    private paymentsService: PaymentsService,
    private message: NzMessageService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.navigationService.header = 'BALANCE';
    this.paymentsService.getPayments(0, this.pagintation.pageSize).subscribe(res => {
      this.payments = res.data;
      this.total = res.total_count;
      this.prepareMobileData(this.payments);
    });

    // findUserCountry()
    //   .then(response => {
    //     if (response.country !== 'Russia') {
    //       this.currency = 'USD';
    //     }
    //     // console.log('Country: ', response.country);
    //   });
    this.isMobile = document.body.clientWidth < 670;
    if (!this.userService.currentUserInfo) { return; }
    this.price = this.userService.currentUserInfo.price;
    if (this.userService.currentUserInfo.country !== 'RU') {
      this.currency = 'USD';
      this.currencyStr = 'USD';
      this.minimalPriceStr = '10 USD';
    } else {
      this.currency = 'RUB';
      this.currencyStr = this.translate.currentLang === 'ru' ? 'руб.' : 'RUB';
      this.minimalPriceStr = '1000 руб.';
    }
  }

  loadMore(): void {
    const {pageSize, pageIndex} = this.pagintation;
    this.pagintation = {
      pageIndex: pageIndex + 1, pageSize: this.pagintation.pageSize
    };
    this.paymentsService.getPayments(this.pagintation.pageIndex, this.pagintation.pageSize).subscribe(res => {
      this.payments = res.data;
      this.total = res.total_count;
      this.prepareMobileData(this.payments);
    });
  }

  get balance(): string {
    return this.userService.balance.getValue();
  }

  ngOnDestroy(): void {
    this.navigationService.resetHeader();
  }
  get currencyIcon(): string {
    return this.currency === 'RUB' ? '₽' : '$';
  }

  handleBlurValue(): void {
    this.validateValue();
  }

  handleChangeValue(): void {
    if (this.errors && this.errors.value) { delete this.errors.value; }
  }

  validateValue(): void {
    if (this.value >= 1000) { return; }
    this.message.error(`${this.translate.instant('BALANCE.MIN PAYMENT IS')} ${this.minimalPriceStr}`);
    this.value = 1000;
    // this.errors = {...this.errors, value: `${this.translate.instant('BALANCE.MIN PAYMENT IS')} ${this.minimalPriceStr}`  }
  }

  onPay(): void {
    this.validateValue();
    this.paymentsService.getPaymentLink({amount: this.value}).subscribe(url => {
      window.location.href = url.url;
    });
  }

  applyPromoCode(): void {
    this.paymentsService.applyPromoCode(this.promo).subscribe(res => {
      if (res.errors) {
        this.message.error(this.getErrorMsg(res.errors));
      } else {
        this.message.success(this.translate.instant(`BALANCE.PROMOCODE ACTIVATED`));
        this.userService.getUserInfo().subscribe();
        this.promo = '';
      }
    });
  }

  getErrorMsg(errors): string {
    if (errors.code) {
      return this.translate.instant(`BALANCE.code_${errors.code[0]}`);
    }
    if (errors.promocode) {
      return this.translate.instant(`BALANCE.promocode_${errors.promocode[0]}`);
    }
    return '';
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    const { pageSize, pageIndex, sort } = params;
    this.sort = sort;
    this.pagintation = {
      pageIndex, pageSize
    };
    this.paymentsService.getPayments( pageIndex, pageSize, sort).subscribe(res => {
      this.payments = res.data;
      this.total = res.total_count;
    });
  }

  prepareMobileData(payments: any[]): void {
    if (!this.isMobile) { return; }
    const res: any = [];
    const temp: any = {};
    payments.forEach(patment => {
      if (!temp[patment.orderTime]) { temp[patment.orderTime] = []; }
      temp[patment.orderTime].push(patment);
    });
    Object.keys(temp).forEach(date => {
      res.push({date, data: temp[date]});
    });

    this.mobileData = this.mobileData.concat(res);
  }

}
