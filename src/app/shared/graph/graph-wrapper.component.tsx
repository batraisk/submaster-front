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
  selector: 'app-my-component',
  template: `<div #graphContainer id="qwerty"></div>`,
  styleUrls: ['./GraphComponent.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class GraphWrapperComponent implements OnChanges, OnDestroy, AfterViewInit {
  @ViewChild('graphContainer', {static: false}) containerRef: ElementRef;

  @Input() height = 400;
  @Input() width = 400;
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

    ReactDOM.render(<div className={'i-am-classy'}>
      <GraphComponent height={this.height} width={this.width}/>
    </div>, document.getElementById('qwerty'));
  }
}
