import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private apiUrl = 'http://localhost:3000/api/users';

  isConnected = signal(!!localStorage.getItem('token'));

  constructor(private http: HttpClient) {}

  verifPassword(password: string, confirmPassword: string): boolean {
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);

    if (password !== confirmPassword || password.length < 8 || !hasUppercase || !hasNumber) {
      return false;
    }
    return true;
  }

  register(username: string, email: string, password: string) {
    return this.http.post(`${this.apiUrl}/register`, { username, email, password });
  }

  login(usernameOrEmail: string, password: string) {
    const isEmail = usernameOrEmail.includes('@');
    const body = isEmail
      ? { email: usernameOrEmail, password }
      : { username: usernameOrEmail, password };

    return this.http.post<{ token: string, user: any }>(`${this.apiUrl}/login`, body);
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
    this.isConnected.set(true);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    this.isConnected.set(false);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('token') !== null;
  }
}