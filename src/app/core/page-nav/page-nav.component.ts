import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Pageable } from '../model/Pageable';
import { ActivatedRoute, Params, Router, RouterState } from '@angular/router';

@Component({
  selector: 'app-page-nav',
  imports: [],
  templateUrl: './page-nav.component.html',
  styleUrl: './page-nav.component.scss'
})

export class PageNavComponent implements OnInit {
  @Input()
  page: Pageable = { totalElements: 0 } as Pageable

  @Output()
  pageChangedEvent = new EventEmitter<number>();

  pageNumber: number = 0

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      let page = params['page'];

      if (page) {
        this.pageNumber = parseInt(page)
      }

      this.pageChangedEvent.emit(this.pageNumber)
    });
  }

  changePage(number: number) {
    if (number < 0 || number > (this.page.totalPages - 1)) {
      return
    }

    const qParams: Params = { page: number };
    this.router.navigate([], { relativeTo: this.route, queryParams: qParams, queryParamsHandling: 'merge' })
  }
}