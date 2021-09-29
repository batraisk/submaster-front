import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {UserService} from '@core-services';
import { en_US, ru_RU, NzI18nService } from 'ng-zorro-antd/i18n';

@Component({
  selector: 'app-localizer',
  templateUrl: './localizer.component.html',
  styleUrls: ['./localizer.component.scss']
})
export class LocalizerComponent implements OnInit {
  @ViewChild('menu') menu: ElementRef;
  @ViewChild('toggleButton') toggleButton: any;
  open = false;
  langs = [{
    icon: 'assets/images/icons/USA.svg',
    label: 'English',
    code: 'en',
  }, {
    icon: 'assets/images/icons/Rus.svg',
    label: 'Русский',
    code: 'ru',
  }];
  activeLocale: any = this.langs[0];
  constructor(
    private renderer: Renderer2,
    public translate: TranslateService,
    private userService: UserService,
    private i18n: NzI18nService,
  ) {
    translate.addLangs(['en', 'ru']);
  }

  ngOnInit(): void {
    const browserLang = this.translate.getBrowserLang();
    const locale = this.userService.currentUserInfo.locale;
    const code = locale || (browserLang.match(/en|ru/) ? browserLang : 'en');
    this.translate.use(code);
    code === 'ru' ? this.i18n.setLocale(ru_RU) : this.i18n.setLocale(en_US);
    this.activeLocale = this.langs.filter(lang => lang.code === code)[0];

    this.renderer.listen('window', 'click', (e: Event) => {
      if (this.open && !this.toggleButton.elementRef.nativeElement.contains(e.target) && e.target !== this.menu.nativeElement){
        this.open = false;
      }
    });
  }

  toggleOpen(): void {
    this.open = true;
  }

  setLang(locale: any): void {

    this.userService.setLocale(locale.code).subscribe(res => {
      this.userService.currentUserInfo = res;
      this.activeLocale = locale;
      this.translate.use(locale.code);
      locale.code === 'ru' ? this.i18n.setLocale(ru_RU) : this.i18n.setLocale(en_US);
    });
  }
}
