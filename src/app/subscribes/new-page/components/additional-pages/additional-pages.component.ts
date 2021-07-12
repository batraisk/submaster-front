import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-additional-pages',
  templateUrl: './additional-pages.component.html',
  styleUrls: ['./additional-pages.component.scss']
})
export class AdditionalPagesComponent implements OnInit {
  @Input() page: any;
  @Output() updatePageEmitter = new EventEmitter<any>();
  pageForm: FormGroup;
  errors: any = {};

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.pageForm = this.fb.group({
      successTitle: [this.page.successTitle, [Validators.required]],
      successDescription: [this.page.successDescription, [Validators.required]],
      successButtonText: [this.page.successButtonText, [Validators.required]],
      downloadLink: [this.page.downloadLink, [Validators.required]],
      outOfStockTitle: [this.page.outOfStockTitle, [Validators.required]],
      outOfStockDescription: [this.page.outOfStockDescription, [Validators.required]],
    });
    this.updatePageEmitter.emit({page: this.pageForm.value, form: this.pageForm});
    this.onChanges();
  }
  onChanges(): void {
    this.pageForm.valueChanges.subscribe(val => {
      this.updatePageEmitter.emit({page: this.pageForm.value, form: this.pageForm});
    });
  }
}
