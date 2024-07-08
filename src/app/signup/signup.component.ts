import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validator,
  Validators,
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { HotToastService } from '@ngneat/hot-toast';

export function passwordsMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const passwordConfirm = control.get('passwordConfirm')?.value;

    if (password && passwordConfirm && password !== passwordConfirm) {
      return {
        passwordsDontMatch: true,
      };
    }
    return null;
  };
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  title = 'ReactiveSignUp';
  message: string | null = null;
  messageClass: string | null = null;
  formStatus: any;

  // url = 'http://localhost:3000/api/signUp';
  // private baseUrl = '/api/signUp';

  signupForm = new FormGroup(
    {
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      passwordConfirm: new FormControl('', Validators.required),
    },
    { validators: passwordsMatchValidator() }
  );

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthenticationService,
    private toast: HotToastService
  ) {}

  ngOnInit(): void {
    this.signupForm.statusChanges.subscribe((value) => {
      console.log(value);
      this.formStatus = value;
    });
  }

  get name() {
    return this.signupForm.get('name');
  }
  get phone() {
    return this.signupForm.get('phone');
  }
  get email() {
    return this.signupForm.get('email');
  }
  get password() {
    return this.signupForm.get('password');
  }
  get passwordConfirm() {
    return this.signupForm.get('passwordConfirm');
  }

  submit() {
    if (!this.signupForm.valid) return;
    this.message = 'Signing up...';
    this.messageClass = 'loading';

    const { name, email, password, passwordConfirm } = this.signupForm.value;
    console.log({ name, email, password, passwordConfirm });

    this.authService.signup(name, email, password, passwordConfirm).subscribe(
      () => {
        this.message = 'Congrats! You are all signed up';
        this.messageClass = 'success';
        this.router.navigate(['/home']);
      },
      (error) => {
        this.message = 'There was an error!';
        this.messageClass = 'error';
        console.error(error);
      }
    );
  }
}
