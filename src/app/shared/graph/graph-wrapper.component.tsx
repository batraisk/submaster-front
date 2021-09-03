import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { GraphComponent } from './graph.component';
import * as React from 'react';

import * as ReactDOM from 'react-dom';

const containerElementName = 'graphContainer';
import { render } from 'react-dom';
window.React = React;
@Component({
  selector: 'app-stats-graph',
  template: `<div #graphContainer [id]="dataName"></div>`,
  styleUrls: ['./GraphComponent.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class GraphWrapperComponent implements OnChanges, OnDestroy, AfterViewInit {
  @ViewChild('graphContainer', {static: false}) containerRef: ElementRef;

  @Input() height = 400;
  @Input() dataName = '';
  @Input() countName = '';
  @Input() width = 400;
  @Input() data: any = null;
  @Input() public counter = 10;
  @Output() public componentClick = new EventEmitter<void>();

  constructor() {
    this.handleDivClicked = this.handleDivClicked.bind(this);
  }

  public handleDivClicked(): void {
    if (this.componentClick) {
      this.componentClick.emit();
      this.render();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.render();
  }

  ngAfterViewInit(): void {
    this.render();
  }

  ngOnDestroy(): void {
    ReactDOM.unmountComponentAtNode(this.containerRef.nativeElement);
  }

  private render(): void {
    const {counter} = this;
    const el = document.getElementById(this.dataName);

    if (el && this.data) {
      ReactDOM.render(<div className={'i-am-classy'}>
        <GraphComponent data={this.data} countName={this.countName} height={this.height} width={this.width}/>
      </div>, document.getElementById(this.dataName));
    }
  }
}
