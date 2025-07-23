import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Category } from '../../model/Category';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoryService } from '../../service/category.service';
import { ErrorService } from '../../service/error.service';

@Component({
  selector: 'app-category-detail',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './category-detail.component.html',
  styleUrl: './category-detail.component.scss'
})
export class CategoryDetailComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private categoryService: CategoryService, private errorService: ErrorService) {}

  category: Category = { title: '', createdAt: new Date().getMilliseconds() }
  submitted: boolean = false

  form = new FormGroup({
    title: new FormControl(this.category.title, [Validators.required, Validators.minLength(3)])
  })

  ngOnInit(): void {
    const categoryId = Number.parseInt(this.route.snapshot.paramMap.get('id')!);

     if (!isNaN(categoryId)) {
      this.categoryService.getCategory(categoryId).subscribe(c => {
        this.category = c
        this.form.setValue({ title: this.category.title })
      })
    }
  }

  get title() {
    return this.form.get('title')
  }

  onSubmit() {
    this.submitted = true

    if (this.form.invalid) {
      return
    }

    if (this.category.id) {
      this.categoryService.updateCategory(this.category.id, this.form.value as Category).subscribe(v => {
        this.router.navigate(['/categories'])
      }, (e: Error) => {
        this.errorService.renderApiException(e)
      })
    } else {
      this.categoryService.addCategory(this.form.value as Category).subscribe(v => {
        this.router.navigate(['/categories'])
      }, (e: Error) => {
        this.errorService.renderApiException(e)
      })
    }
  }

}
