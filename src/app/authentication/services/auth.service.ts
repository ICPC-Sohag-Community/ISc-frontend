import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient);

  // Varibles
  currentUser = signal<any>(null);
  isAuth = signal<boolean>(false);

  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly IS_AUTH = 'IS_AUTH';
  private readonly CURRENT_USER = 'CURRENT_USER';

  constructor(private router: Router) {
    const savedIsAuth = localStorage.getItem(this.IS_AUTH);
    this.isAuth.set(savedIsAuth ? JSON.parse(savedIsAuth) : false);

    const savedCurrentUser = localStorage.getItem(this.CURRENT_USER);
    this.currentUser.set(
      savedCurrentUser ? JSON.parse(savedCurrentUser) : null
    );
  }

  /// All Funs.

  // Login Fun.
  loginUser(userBody: {
    userNameuserName: string;
    password: string;
    rememberMe: boolean;
  }): Observable<any> {
    return this.http
      .post<any>(`${environment.BASE_URL}/api/Auth/login`, userBody)
      .pipe(
        tap((res: any) => {
          if (res.statusCode === 200) {
            this.doLoggedUser(res.data.token, res.data);
          }
        })
      );
  }

  // fun to store token of the user in localStorage and user data
  private doLoggedUser(token: string, userData: any) {
    this.setToken(token);
    this.setCurrentUser(userData);
  }

  getToken(): string {
    return localStorage.getItem(this.JWT_TOKEN) || '';
  }

  private setToken(token: string): void {
    localStorage.setItem(this.JWT_TOKEN, token);
  }

  // Is LoggedIn
  setIsAuth(isAuth: boolean): void {
    this.isAuth.set(isAuth);
    localStorage.setItem(this.IS_AUTH, JSON.stringify(isAuth));
  }

  // Current User
  setCurrentUser(userData: any): void {
    if (userData) {
      this.currentUser.set(userData);
      localStorage.setItem(this.CURRENT_USER, JSON.stringify(userData));
    }
  }

  updateUserRoles(newRole: any, action: string): void {
    let savedCurrentUser = JSON.parse(
      localStorage.getItem(this.CURRENT_USER) || '{}'
    );
    if (savedCurrentUser) {
      if (action === 'add') {
        savedCurrentUser.roles = [...savedCurrentUser.roles, newRole];
      } else {
        savedCurrentUser.roles = newRole;
      }
      localStorage.setItem(this.CURRENT_USER, JSON.stringify(savedCurrentUser));
    }
  }

  // LogOut Fun.
  logout() {
    localStorage.removeItem(this.JWT_TOKEN);
    localStorage.removeItem(this.CURRENT_USER);
    this.setIsAuth(false);
    this.router.navigateByUrl('/login');
  }

  // Register Fun.
  createUser(userBody: any): Observable<any> {
    return this.http.post<any>(
      `${environment.BASE_URL}/api/Authentication/Register`,
      userBody
    );
  }

  sendConfirmationEmail(email: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const params = new HttpParams().set('email', email);
    return this.http.post(
      `${environment.BASE_URL}/api/Authentication/SendConfirmationEmail`,
      null,
      { headers: headers, params: params }
    );
  }
  checkEmailConfirmOtp(email: string, otp: number): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const params = new HttpParams().set('email', email).set('otp', otp);
    return this.http.get<any>(
      `${environment.BASE_URL}/api/Authentication/CheckEmailConfirmOtp`,
      { headers: headers, params: params }
    );
  }
}
