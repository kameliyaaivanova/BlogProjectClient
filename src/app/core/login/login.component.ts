import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../service/user.service';
import { Login } from '../model/Login';
import { ErrorService } from '../service/error.service';
import { LoginResponse } from '../model/LoginResponse';
import { StorageService } from '../service/storage.service';
import { JwtService } from '../service/jwt.service';
import { AuthSubject } from '../../shared/subjects/auth-subject';

@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  submitted: boolean = false

  constructor(
    private userService: UserService,
    private errorService: ErrorService,
    private storageService: StorageService,
    private jwtService: JwtService,
    private router: Router
  ) {}

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  })

  get username() {
    return this.loginForm.get('username')
  }

  get password() {
    return this.loginForm.get('password')
  }

  submit() {
    this.submitted = true

    if (this.loginForm.invalid) {
      return;
    }

    this.userService.login(this.loginForm.value as Login).subscribe((res: LoginResponse) => {
      const token = res.token;
      const userToken = this.jwtService.decodeToken(token)

      if (userToken) {
        this.storageService.storeUser(userToken);
      }
      this.storageService.storeJwt(token);
      this.storageService.storeRefreshToken(res.refreshToken)

      AuthSubject.get().next(true);

      this.router.navigate(['/']);
    }, (e) => {
      this.errorService.renderApiException(e)
    })
  }

  isPropertyInvalid(property: AbstractControl | null | undefined) {
    return property?.invalid && this.submitted
  }
}