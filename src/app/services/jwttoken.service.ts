import { Injectable } from '@angular/core';
import { jwtDecode, JwtPayload } from 'jwt-decode';

interface MyJwtPayload extends JwtPayload {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class JWTTokenService {
  private jwtToken: string | null = null;
  private decodedToken: MyJwtPayload | null = null;

  constructor() {
    this.loadToken();
  }

  private loadToken() {
    this.jwtToken = localStorage.getItem('jwt-token');
    if (this.jwtToken) {
      this.decodedToken = jwtDecode<MyJwtPayload>(this.jwtToken);
    }
  }

  getUser() {
    return this.decodedToken ? this.decodedToken.username : null;
  }

  isAuthenticated(): boolean {
    return !!this.getUser();
  }

  setToken(token: string) {
    this.jwtToken = token;
    localStorage.setItem('jwt-token', token);
    this.decodedToken = jwtDecode<MyJwtPayload>(token);
  }

  removeToken() {
    this.jwtToken = null;
    this.decodedToken = null;
    localStorage.removeItem('jwt-token');
  }
}
