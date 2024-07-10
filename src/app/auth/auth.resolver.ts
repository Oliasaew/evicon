import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthResolver implements Resolve<boolean> {
  constructor(private authService: AuthService, private router: Router) {}

  resolve(): boolean {
    if (this.authService.checkAuthenticated()) {
      this.router.navigate(['/tabs/tab1']);
      return false; // Do not load component
    }
    return true; // Load component
  }
}
