import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoleService } from '../../service/role.service';
import { Role } from '../../model/Role';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Permission } from '../../model/Permission';
import { PermissionService } from '../../service/permission.service';
import { ErrorService } from '../../service/error.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-role-detail',
  imports: [ReactiveFormsModule],
  templateUrl: './role-detail.component.html',
  styleUrl: './role-detail.component.scss'
})
export class RoleDetailComponent {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private roleService: RoleService,
    private permissionService: PermissionService,
    private errorService: ErrorService
  ) {}

  role: Role = { name: '', permissions: [], createdAt: new Date().getMilliseconds() }
  submitted: boolean = false
  permissions: Permission[] = []

  selectedPermissions: Permission[] = []
  selectedPermissionsIds: number[] = []

  form = new FormGroup({
    name: new FormControl(this.role.name, [Validators.required, Validators.minLength(3)]),
    permissions: new FormControl(this.role.permissions, [Validators.required])
  })

  ngOnInit(): void {
    const roleId = Number.parseInt(this.route.snapshot.paramMap.get('id')!);

     if (!isNaN(roleId)) {
      this.roleService.getRole(roleId).subscribe(v => {
        this.role = v

        this.selectedPermissions = v.permissions
        this.form.setValue({ name: this.role.name, permissions: v.permissions })

        this.permissionService.get().subscribe(result => {
          const selectedPermissionsIds = this.selectedPermissions.map(p => p.id)
          this.permissions = result.filter(p => selectedPermissionsIds.indexOf(p.id) === -1)
        })
      })
    } else {
      this.permissionService.get().subscribe(result => {
        this.permissions = result
      })
    }
  }

  choose(permission: Permission): void {
    this.permissions = this.permissions.filter(v => v.id != permission.id)

    this.selectedPermissions.push(permission)
  }

  removeSelected(permission: Permission): void {
    this.selectedPermissions = this.selectedPermissions.filter(v => v.id != permission.id)

    this.permissions.push(permission)
  }

  get name() {
    return this.form.get('name')
  }

  onSubmit() {
    this.submitted = true

    if (this.selectedPermissions.length == 0) {
      return
    }

    const data = { name: this.form.get('name')?.value, permissions: this.selectedPermissions  }

    if (this.role.id) {
      this.roleService.updateRole(this.role.id, data as Role).subscribe(v => {
        this.router.navigate(['/roles'])
      }, (e: Error) => {
        this.errorService.renderApiException(e)
      })
    } else {
      this.roleService.addRole(data as Role).subscribe(v => {
        this.router.navigate(['/roles'])
      }, (e: Error) => {
        this.errorService.renderApiException(e)
      })
    }
  }
}
