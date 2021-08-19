import { Component, OnInit, OnDestroy } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {NavigationService} from '@navigation-services';
import {FaqService} from '@core-services';
import {IFaq} from '@models';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit, OnDestroy {
  faqs: IFaq[] = [];

  constructor(
    private translate: TranslateService,
    private faqService: FaqService,
    private navigationService: NavigationService
  ) { }

  ngOnInit(): void {
    this.navigationService.header = 'FAQ';

    this.faqService.getFaqs().subscribe(res => {
      this.faqs = res;
    });
  }

  ngOnDestroy(): void {
    this.navigationService.resetHeader();
  }

}
