import { Component, OnInit } from '@angular/core';
import { Post } from '../model/Post';
import { PostService } from '../service/post.service';
import { RouterLink } from '@angular/router';
import { Category } from '../model/Category';
import { CategoryService } from '../service/category.service';
import { Pageable } from '../model/Pageable';
import { PageNavComponent } from '../page-nav/page-nav.component';
import { StorageService } from '../service/storage.service';
import { Permissions } from '../model/Permissions';

@Component({
  selector: 'app-posts',
  imports: [RouterLink, PageNavComponent],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss'
})
export class PostsComponent {
  hasUpdatePermission: boolean
  hasDeletePermission: boolean
  hasCreatePermission: boolean

  constructor(private postService: PostService, private categoryService: CategoryService, private storageService: StorageService) {
    this.hasUpdatePermission = storageService.hasPermission(Permissions.UPDATE_POSTS)
    this.hasDeletePermission = storageService.hasPermission(Permissions.DELETE_POSTS)
    this.hasCreatePermission = storageService.hasPermission(Permissions.CREATE_POSTS)
  }

  page: Pageable = {} as Pageable
  posts: Post[] = []

  getPage(number: number) {
    this.postService.getPosts(number).subscribe((r: Pageable) => {
      this.posts = r.content
      this.page = r
    })
  }

  deletePost(id: number) {
    this.postService.deletePost(id).subscribe(r => {
      this.getPage(this.page.number)
    })
  }
}
