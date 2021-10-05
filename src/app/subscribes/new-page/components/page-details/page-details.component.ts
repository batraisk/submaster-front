import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {DomainsService} from '@subscribes-services';
import {NzMessageService} from 'ng-zorro-antd/message';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-page-details',
  templateUrl: './page-details.component.html',
  styleUrls: ['./page-details.component.scss']
})
export class PageDetailsComponent implements OnInit {
  @Input() page: any;
  @Output() updatePageEmitter = new EventEmitter<any>();
  @Output() nextEmitter = new EventEmitter<any>();
  domain = 'https://submaster.com/';
  pageForm: FormGroup;
  isMobile = false;
  errors: any = {};
  domains: any[] = [{id: 0, url: 'submaster.pro'}];

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private domainsService: DomainsService,
    private message: NzMessageService,
    private translate: TranslateService,
  ) { }

  ngOnInit(): void {
    this.pageForm = this.fb.group({
      pageName: [this.page.pageName, [Validators.required]],
      url: [this.page.url || '', Validators.compose([Validators.required])],
      privacyPolicy: [this.page.privacyPolicy],
      facebookServerSideToken: [this.page.facebookServerSideToken],
      instagramLogin: [this.page.instagramLogin, Validators.compose([Validators.required])],
      facebookPixelId: [this.page.facebookPixelId],
      yandexMetrika: [this.page.yandexMetrika],
      domainId: [this.page.domainId || 0],
    });
    this.updatePageEmitter.emit({page: this.pageForm.value, form: this.pageForm});
    this.onChanges();
    this.isMobile = document.body.clientWidth < 670;
    this.getDomains();
  }

  getDomains(): void {
    this.domainsService.getDomains(1, 100).subscribe(data => {
      this.domains = [{id: 0, url: 'submaster.pro'}, ...data.data.filter(item => item.status === 'connected')];
    });
  }

  onCopy(value): void {
    const aux = document.createElement('input');
    aux.setAttribute('value', this.returnLink);
    document.body.appendChild(aux);
    aux.select();
    document.execCommand('copy');

    document.body.removeChild(aux);
    this.message.success(this.translate.instant('ACTIONS.COPIED'));
  }

  get returnLink(): string {

    const activeDomain = this.domains.filter(domain => domain.id === this.pageForm.get('domainId').value)[0];
    if (!activeDomain) { return ''; }
    return `${activeDomain.url}/pages/${this.pageForm.get('url').value}/enter_login?action=check`;
  }

  onChanges(): void {
    this.pageForm.valueChanges.subscribe(val => {
      this.updatePageEmitter.emit({page: this.pageForm.value, form: this.pageForm});
    });
  }
}
