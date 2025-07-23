import { Component, OnInit } from '@angular/core';
import { Category } from '../model/Category';
import { Router, RouterLink } from '@angular/router';
import { CategoryService } from '../service/category.service';
import { Pageable } from '../model/Pageable';
import { PageNavComponent } from "../page-nav/page-nav.component";
import { DatePipe } from '@angular/common';
import { StorageService } from '../service/storage.service';
import { Permissions } from '../model/Permissions';

@Component({
  selector: 'app-categories',
  imports: [RouterLink, PageNavComponent, DatePipe],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {

  page: Pageable = {} as Pageable
  categories: Category[] = []
  hasUpdatePermission: boolean
  hasCreatePermission: boolean

  constructor(private categoryService: CategoryService, private storageService: StorageService) {
    this.hasUpdatePermission = storageService.hasPermission(Permissions.UPDATE_CATEGORIES)
    this.hasCreatePermission = storageService.hasPermission(Permissions.CREATE_CATEGORIES)
  }

  getPage(number: number) {
    this.categoryService.getCategories(number).subscribe((r: Pageable) => {
      this.categories = r.content
      this.page = r
    })
  }
}
