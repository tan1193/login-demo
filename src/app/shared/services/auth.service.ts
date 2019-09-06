import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { User } from 'src/app/models/user';
import { HttpClient } from '@angular/common/http';
@Injectable()
export class AuthService {
  loggedIn = false;
  private BASE_URL = 'http://localhost:1337';
  constructor(private router: Router, private http: HttpClient) { }

  logIn(login: string, password: string) {
    this.loggedIn = true;
    // this.router.navigate(['/']);
    const url = `${this.BASE_URL}/login`;
    return this.http.post<User>(url, { email: login, password });
  }

  logOut() {
    this.loggedIn = false;
    this.router.navigate(['/login-form']);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  get isLoggedIn() {
    return this.loggedIn;
  }
}

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private router: Router, private authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const isLoggedIn = this.authService.isLoggedIn;
    const isLoginForm = route.routeConfig.path === 'login-form';

    if (isLoggedIn && isLoginForm) {
      this.router.navigate(['/']);
      return false;
    }

    if (!isLoggedIn && !isLoginForm) {
      this.router.navigate(['/login-form']);
    }
    return true;
    // return isLoggedIn || isLoginForm;
    // if (!this.authService.getToken()) {
    //   this.router.navigate(['/login-form']);
    //   return false;
    // }
   // this.router.navigate(['/login-form']);
  }

}
