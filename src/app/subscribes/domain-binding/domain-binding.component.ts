import {Component, OnDestroy, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {DomainsService} from '@subscribes-services';
import {IDomain} from '@models';
import {NzTableQueryParams} from 'ng-zorro-antd/table';
import {FormBuilder} from '@angular/forms';
import {NavigationService} from '@navigation-services';

export interface TreeNodeInterface {
  key: string;
  url: string;
  status?: number;
  pages?: string;
  level?: number;
  expand?: boolean;
  children?: TreeNodeInterface[];
  parent?: TreeNodeInterface;
}

@Component({
  selector: 'app-domain-binding',
  templateUrl: './domain-binding.component.html',
  styleUrls: ['./domain-binding.component.scss']
})
export class DomainBindingComponent implements OnInit, OnDestroy {
  domain = '';
  domains: IDomain[];
  mapOfExpandedData: { [key: string]: TreeNodeInterface[] } = {};
  panels = [
    {
      active: false,
      name: 'DOMAIN.HOW ADD',
      disabled: false,
      content: 'DOMAIN.HOW ADD CONTENT'
    },
    {
      active: false,
      name: 'DOMAIN.HOW VERIFY',
      disabled: false,
      content: 'DOMAIN.HOW VERIFY CONTENT'
    }
  ];

  pagintation: any = {
    pageIndex: 0,
    pageSize: 20
  };
  total = 0;
  sort: any = {};

  constructor(
    private translate: TranslateService,
    private domainsService: DomainsService,
    private navigationService: NavigationService
  ) { }

  ngOnInit(): void {
    this.navigationService.header = 'DOMAIN BINDING';
    // this.domainsService.getDomains().subscribe(res => {
    //   this.domains = res.data;
    //   this.total = res.total_count;
    // });
  }

  getDomains(params = {pageSize: 20, pageIndex: 1, sort: null}): void {
    const { pageSize, pageIndex, sort } = params;
    this.sort = sort;
    this.pagintation = {
      pageIndex, pageSize
    };
    this.domainsService.getDomains(pageIndex, pageSize, sort).subscribe(res => {
      this.domains = this.mapDate(res.data);
      this.total = res.total_count;

      this.domains.forEach((item: any) => {
        this.mapOfExpandedData[item.key] = this.convertTreeToList(item);
      });
    });
  }

  mapDate(data: any[]): any[] {
    return data.map((domain, i) => {
      if (domain.pages && domain.pages.length > 0) {
        return {
          key: i,
          ...domain,
          pages: domain.pages[0].page_name,
          children: domain.pages.map((page, j) => ({key: `${i}-${j}`, url: '', status: '', pages: page.page_name}))
        };
      }
      return {...domain, key: i};
    });
  }

  createDomain(): void {
    const req: IDomain = {url: this.domain};
    this.domainsService.createDomain(req).subscribe(res => {
      this.domain = '';
      this.getDomains();
    });
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    const { pageSize, pageIndex, sort } = params;
    this.sort = sort;
    this.pagintation = {
      pageIndex, pageSize
    };
    this.getDomains({pageIndex, pageSize, sort});
  }

  deleteDomain(domainId: number): void {
    this.domainsService.deleteDomain(domainId).subscribe(res => {
      this.getDomains();
    });
  }

  collapse(array: TreeNodeInterface[], data: TreeNodeInterface, $event: boolean): void {
    if (!$event) {
      if (data.children) {
        data.children.forEach(d => {
          const target = array.find(a => a.key === d.key)!;
          target.expand = false;
          this.collapse(array, target, false);
        });
      } else {
        return;
      }
    }
  }

  convertTreeToList(root: TreeNodeInterface): TreeNodeInterface[] {
    const stack: TreeNodeInterface[] = [];
    const array: TreeNodeInterface[] = [];
    const hashMap = {};
    stack.push({ ...root, level: 0, expand: false });

    while (stack.length !== 0) {
      const node = stack.pop()!;
      this.visitNode(node, hashMap, array);
      if (node.children) {
        for (let i = node.children.length - 1; i >= 0; i--) {
          stack.push({ ...node.children[i], level: node.level! + 1, expand: false, parent: node });
        }
      }
    }

    return array;
  }

  visitNode(node: TreeNodeInterface, hashMap: { [key: string]: boolean }, array: TreeNodeInterface[]): void {
    if (!hashMap[node.key]) {
      hashMap[node.key] = true;
      array.push(node);
    }
  }

  ngOnDestroy(): void {
    this.navigationService.resetHeader();
  }

}
