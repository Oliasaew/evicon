import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = false;

  constructor(private router: Router) {}

  login(username: string, password: string): boolean {
    // Replace this with actual authentication logic
    if (username === 'adminFunny' && password === 'CG89jZH#o*QU!fArK3') {
      this.isAuthenticated = true;
      localStorage.setItem('isAuthenticated', 'true');
      this.router.navigate(['/tabs/tab1']);
      return true;
    }
    alert('Invalid username or password');
    return false;
  }

  logout(): void {
    this.isAuthenticated = false;
    localStorage.removeItem('isAuthenticated');
    this.router.navigate(['/login']);
  }

  checkAuthenticated(): boolean {
    this.isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    return this.isAuthenticated;
  }
}
