import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

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
  constructor(private renderer: Renderer2, public translate: TranslateService) {
    translate.addLangs(['en', 'ru']);
    translate.setDefaultLang('en');

    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|ru/) ? browserLang : 'en');
    translate.setDefaultLang('en');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('en');
  }

  ngOnInit(): void {
    const code = this.translate.currentLang;
    this.activeLocale = this.langs.filter(lang => lang.code === code)[0];

    this.renderer.listen('window', 'click', (e: Event) => {
      if (this.open && !this.toggleButton.elementRef.nativeElement.contains(e.target) && e.target !== this.menu.nativeElement){
        console.log('close')
        this.open = false;
      }
    });
  }

  toggleOpen(): void {
    // this.open = !this.open;
    this.open = true;
  }

  setLang(locale: any): void {
    this.activeLocale = locale;
    this.translate.use(locale.code);
  }
}
