import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../../service/post.service';
import { Post } from '../../model/Post';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoryService } from '../../service/category.service';
import { Category } from '../../model/Category';
import { QuillModule } from 'ngx-quill'
import { Pageable } from '../../model/Pageable';
import { ErrorService } from '../../service/error.service';
import { FileService } from '../../service/file.service';
import { environment } from '../../../../environments/environment';
import { UploadedFile } from '../../model/UploadedFile';

@Component({
  selector: 'app-post-detail',
  imports: [QuillModule, ReactiveFormsModule],
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.scss'
})
export class PostDetailComponent {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postService: PostService,
    private categoryService: CategoryService,
    private errorService: ErrorService,
    private fileService: FileService
  ) {}

  post: Post = {} as Post
  allCategories: Category[] = []

  quillModules = {
    toolbar: [
      ['code-custom', 'info-custom', 'warn-custom', 'danger-custom'],
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote'],

      [{ 'header': [1, 2, 3, 4, 5] }],
      [{ 'list': 'ordered'}],
      [{ 'script': 'sub'}, { 'script': 'super' }],

      [{ 'color': [] }, { 'background': [] }],
      [{ 'align': [] }],

      ['clean'],

      ['link', 'video']
    ]
  };

  selectedCategories: Category[] = []
  submitted: boolean = false
  previewImage: String = ''
  selectedFile: File|null = null

  form = new FormGroup({
    title: new FormControl(this.post.title, [Validators.required, Validators.minLength(3)]),
    description: new FormControl(this.post.description, [Validators.required, Validators.minLength(3)]),
    content: new FormControl(this.post.content, [Validators.required, Validators.minLength(5)])
  })

  ngOnInit(): void {
    const postId = Number.parseInt(this.route.snapshot.paramMap.get('id')!);

     if (!isNaN(postId)) {
      this.postService.getPost(postId).subscribe(p => {
        this.post = p
        this.selectedCategories = p.categories
        this.previewImage = p.logo

        this.form.setValue({ title: p.title, description: p.description, content: p.content })

        this.categoryService.getCategories(0, 200).subscribe((result: Pageable) => {
          const selectedCategoriesIds = this.selectedCategories.map(c => c.id)
          this.allCategories = result.content.filter(c => selectedCategoriesIds.indexOf(c['id']) === -1)
        })
      })
    } else {
      this.categoryService.getCategories(0, 100).subscribe(v => {
        this.allCategories = v.content
      })
    }
  }

  get title() {
    return this.form.get('title')
  }

  get description() {
    return this.form.get('description')
  }

  get content() {
    return this.form.get('content')
  }

  onSubmit(): void {
    this.submitted = true

    if (this.form.invalid || this.selectedCategories.length == 0 || this.selectedCategories.length > 3 || (!this.selectedFile && !this.post.logo)) {
      return
    }

    let uploadedFilePath = ''

    if (this.selectedFile) {
      this.fileService.upload(this.selectedFile).subscribe((v: UploadedFile) => {
        uploadedFilePath = environment.apiUrl + "files/" + v.uuid
      }, (e) => {
        this.errorService.renderApiException(e)
      }, () => {
        this.addOrUpdatePost(uploadedFilePath)
      })
    } else {
      this.addOrUpdatePost()
    }
  }

  selectFile(event: Event): void {
    const htmlInputElement = event.target as HTMLInputElement;

    if (htmlInputElement.files) {
      this.selectedFile = htmlInputElement.files.item(0);

      if (this.selectedFile) {
        const reader = new FileReader();

        reader.onload = (e: ProgressEvent<FileReader>) => {
          this.previewImage = e.target?.result as string;
        };

        reader.readAsDataURL(this.selectedFile);
      }
    }
  }

  addOrUpdatePost(uploadedFilePath?: String) {
    const logoValue = uploadedFilePath ? uploadedFilePath : this.post.logo

    const post = { ...this.form.value, categories: this.selectedCategories, logo: logoValue } as Post

      if (this.post.id) {
        this.postService.updatePost(this.post.id, post).subscribe(v => {
          this.router.navigate(['/posts'])
        }, (e: Error) => {
          this.errorService.renderApiException(e)
        })
      } else {
        this.postService.addPost(post).subscribe(v => {
          this.router.navigate(['/posts'])
        }, (e: Error) => {
          this.errorService.renderApiException(e)
        })
      }
  }

  choose(category: Category): void {
    this.allCategories = this.allCategories.filter(v => v.id != category.id)

    this.selectedCategories.push(category)
  }

  removeSelected(category: Category): void {
    this.selectedCategories = this.selectedCategories.filter(v => v.id != category.id)

    this.allCategories.push(category)
  }
}
