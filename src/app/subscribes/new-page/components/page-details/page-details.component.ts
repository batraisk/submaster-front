import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

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

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.pageForm = this.fb.group({
      pageName: [this.page.pageName, [Validators.required]],
      url: [this.page.url, Validators.compose([Validators.required])],
      facebookServerSideToken: [this.page.facebookServerSideToken],
      instagramLogin: [this.page.instagramLogin, Validators.compose([Validators.required])],
      facebookPixelId: [this.page.facebookPixelId],
      yandexMetrika: [this.page.yandexMetrika],
    });
    this.updatePageEmitter.emit({page: this.pageForm.value, form: this.pageForm});
    this.onChanges();
    this.isMobile = document.body.clientWidth < 670;
  }

  onChanges(): void {
    this.pageForm.valueChanges.subscribe(val => {
      this.updatePageEmitter.emit({page: this.pageForm.value, form: this.pageForm});
    });
  }
}
