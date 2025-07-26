import { Injectable } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Token } from '../model/Token';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  private jwt: JwtHelperService;

  constructor() {
    this.jwt = new JwtHelperService();
  }

  decodeToken(token: string): Token|null {
    return this.jwt.decodeToken(token);
  }

  isExpired(token: string): boolean {
    return this.jwt.isTokenExpired(token);
  }

  getExpiration(token: string): Date|null {
    return this.jwt.getTokenExpirationDate(token);
  }
}
