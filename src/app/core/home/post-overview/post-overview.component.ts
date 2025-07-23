import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PostService } from '../../service/post.service';
import { Post } from '../../model/Post';
import { DatePipe } from '@angular/common';
import { ErrorService } from '../../service/error.service';

@Component({
  selector: 'app-post-overview',
  imports: [DatePipe, RouterLink],
  templateUrl: './post-overview.component.html',
  styleUrl: './post-overview.component.scss'
})
export class PostOverviewComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private errorService: ErrorService,
  ) {}

  post: Post = {} as Post
  similarPosts: Post[] = []

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id')

      if (id) {
        this.postService.getPost(parseInt(id)).subscribe(v => {
          this.post = v
        }, (e) => {
          this.errorService.renderApiException(e)
        }, () => {
          this.postService.getPosts(0, this.post.categories[0].id, 6).subscribe(v => {
            this.similarPosts = v.content.filter((p: Post) => p.id != this.post.id)
          })
        })
      }

    });
  }
}
