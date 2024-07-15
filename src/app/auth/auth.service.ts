import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { Auth, getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { environment } from 'src/environments/environment.prod';

const firebaseConfig = environment.firebaseConfig;
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private app: FirebaseApp = initializeApp(firebaseConfig);
  private auth: Auth = getAuth(this.app);
  private isAuthenticated = false;
  private user: string = '';


  constructor(private router: Router) {}

  async login(email: string, password: string):Promise<boolean> {
    try {
      const userCredential = await signInWithEmailAndPassword(
        this.auth,
        email,
        password
      );

      // Signed in
      this.isAuthenticated = true;
      this.user = userCredential.user.uid;

      // Store authentication state and user information
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('user', this.user);
    } catch (error: unknown) {
      if (error instanceof Error) {
        // Check if errorMessage contains invalid-credential
        if (error.message.includes('invalid-credential')) {
          alert('Invalid email or password');
        } else {
          console.error(error);
        }
      } else {
        console.error('An unknown error occurred:', error);
      }
    }
    return this.isAuthenticated;
  }

  get getApp(): FirebaseApp{
    return this.app;
  }

  get getAuth(): Auth {
    return this.auth;
  }

  logout(): boolean {
    this.isAuthenticated = false;
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    return true;
  }

  checkAuthenticated(): boolean {
    this.isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    return this.isAuthenticated;
  }

  getUser(): string {
    return this.user;
  }

 
}
