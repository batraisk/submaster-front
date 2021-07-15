import { Component, OnInit, OnDestroy } from '@angular/core';
import {Router} from '@angular/router';
// @ts-ignore
import {PagesService} from '@subscribes-services';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  pages: any[] = []
  constructor(private router: Router, private pagesService: PagesService) { }

  ngOnInit(): void {
    this.pagesService.getPages().subscribe(res => {
      this.pages = res;
    });
  }

  ngOnDestroy(): void {
  }

  goToNewPage(): void {
    // console.log(this.router.)

    this.router.navigate(['/subscribe-pages/new'], { replaceUrl: true });
  }

}
