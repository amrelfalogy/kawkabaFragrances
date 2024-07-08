import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  message: string | null = null;
  messageClass: string | null = null;

  isLoggedIn = false;

  constructor(
    private authService: AuthenticationService,
    private http: HttpClient,
    private router: Router,
    private toast: HotToastService
  ) {}

  ngOnInit(): void {}

  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }

  submit() {
    if (!this.loginForm.valid) {
      return;
    }
    this.message = 'Logging in...';
    this.messageClass = 'loading';

    const { email, password } = this.loginForm.value;
    this.authService.login(email, password).subscribe(
      () => {
        this.message = 'Logged in successfully!';
        this.messageClass = 'success';
        this.isLoggedIn = true;
        this.router.navigate(['/home']);
      },
      (error) => {
        this.message = 'There was an error!';
        this.messageClass = 'error';
      }
    );
  }
}
