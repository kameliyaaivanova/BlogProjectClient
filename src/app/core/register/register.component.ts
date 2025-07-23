import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { UserService } from '../service/user.service';
import { User } from '../model/User';
import { Role } from '../model/Role';
import { ErrorService } from '../service/error.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  submitted: boolean = false

  constructor(private userService: UserService, private route: Router, private errorService: ErrorService) {}

  registerForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern('^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\\D*\\d)[A-Za-z\\d!$%@#£€*?&]{8,}$')]),
    repeatPassword: new FormControl('', [Validators.required])
  })


  get username() {
    return this.registerForm.get('username')
  }

  get email() {
    return this.registerForm.get('email')
  }

  get password() {
    return this.registerForm.get('password')
  }

  get repeatPassword() {
    return this.registerForm.get('repeatPassword')
  }

  submit() {
    this.submitted = true

    console.log('here')

    if (this.registerForm.invalid) {
      return
    }

    const payload = { ...this.registerForm.value, role: {} as Role } as User

    this.userService.registerUser(payload).subscribe(v => {
      this.route.navigate(['/login'])
    }, (e: HttpErrorResponse) => {
      this.errorService.renderApiException(e)
    })
  }

  isPropertyInvalid(property: AbstractControl | null | undefined) {
    return property?.invalid && (property?.dirty || property?.touched || this.submitted)
  }
}
