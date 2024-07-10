import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { passwordValidator } from '../validators/password-validator';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
  ],
})
export class LoginPage {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, passwordValidator()]],
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      // Handle the login logic here
      console.log(
        'Login successful with username:',
        username,
        'and password:',
        password
      );
      // Perform login logic here
      if (username === 'adminFunny' && password === 'CG89jZH#o*QU!fArK3') {
        // Redirect to tabs/tabs1 if login is successful
        this.router.navigate(['/tabs/tab1']);
      } else {
        // Handle login failure
        alert('Invalid username or password');
      }
    }
  }
}
