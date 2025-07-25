import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../service/user.service';
import { User } from '../../model/User';
import { RoleService } from '../../service/role.service';
import { Role } from '../../model/Role';
import { Pageable } from '../../model/Pageable';
import { ErrorService } from '../../service/error.service';

@Component({
  selector: 'app-user-detail',
  imports: [ReactiveFormsModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private roleService: RoleService,
    private errorService: ErrorService
  ) {}

  user: User = {} as User
  roles: Role[] = []
  submitted: boolean = false

  form = new FormGroup({
    username: new FormControl(this.user.username, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
    email: new FormControl(this.user.email, [Validators.required, Validators.email]),
    role: new FormControl(0, [Validators.min(1)]),
    password: new FormControl(null),
  })

  ngOnInit(): void {
    const userId = Number.parseInt(this.route.snapshot.paramMap.get('id')!);

     if (!isNaN(userId)) {
      this.userService.getUser(userId).subscribe(v => {
        this.user = v

        this.form.setValue({ username: v.username, email: v.email, role: 0, password: null })

        if (v.role?.id) {
          this.form.get('role')?.setValue(v.role.id)
        }
      })
    }

    this.roleService.getRoles().subscribe((r: Pageable) => {
      this.roles = r.content
    })
  }

  get username() {
    return this.form.get('username')
  }

  get email() {
    return this.form.get('email')
  }

  get role() {
    return this.form.get('role')
  }

  get password() {
    return this.form.get('password')
  }

  onSubmit() {
    this.submitted = true

    if (this.form.invalid) {
      return
    }

    const payload = { ...this.form.value, role: { id: this.role?.value } } as User

    if (this.user.id) {
      this.userService.updateUser(this.user.id, payload).subscribe(v => {
        this.router.navigate(['/users'])
      }, (e: Error) => {
        this.errorService.renderApiException(e)
      })
    } else {
      this.userService.addUser(payload).subscribe(v => {
        this.router.navigate(['/users'])
      }, (e: Error) => {
        this.errorService.renderApiException(e)
      })
    }
  }
}
