import { Component, OnInit } from '@angular/core';
import { Post } from '../model/Post';
import { Category } from '../model/Category';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { CategoryService } from '../service/category.service';
import { PostService } from '../service/post.service';
import { Pageable } from '../model/Pageable';
import { PageNavComponent } from '../page-nav/page-nav.component';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UserService } from '../service/user.service';
import { StorageService } from '../service/storage.service';

@Component({
  selector: 'app-home',
  imports: [NgbTooltipModule, PageNavComponent, DatePipe, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  categories: Category[] = []

  selectedCategory: Category = { id: 0, title: 'General', createdAt: new Date().getMilliseconds() }

  page: Pageable = {} as Pageable
  posts: Post[] = []

  constructor(private postService: PostService, private categoryService: CategoryService, private router: Router, private route: ActivatedRoute, private userService: UserService, private storageService: StorageService) { }


  ngOnInit(): void {
    this.categoryService.getCategories(0, 200).subscribe(p => {
      this.categories = p.content
      this.categories.unshift({ id: 0, title: 'General', createdAt: new Date().getMilliseconds() })
    })

    this.route.queryParams.subscribe(params => {
      let categoryId = params['categoryId'];

      if (categoryId) {
        this.selectedCategory.id = categoryId

        if (categoryId > 0) {
          this.categoryService.getCategory(categoryId).subscribe(v => {
            this.selectedCategory = v
          })
        } else {
          this.selectedCategory.title = "General"
        }

      }
    });
  }

  getPage(number: number) {
    this.postService.getPosts(number, this.selectedCategory.id).subscribe((r: Pageable) => {
      this.page = r
      this.posts = r.content
    })
  }

 likePost(post: Post): void {
  
    const currentUser = this.storageService.getUser();

    if (currentUser !== null) {
      this.postService.toggleLike(post.id!).subscribe(updatedPost => {
        post.likes = updatedPost.likes;
      });
    } else {
      console.warn('User is not logged in!');
    }
  }

  swipeRight() {
    this.categories.push(this.categories.shift()!)
  }

  swipeLeft() {
    this.categories.unshift(this.categories.pop()!)
  }
}