import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validator, Validators, ValidatorFn, AbstractControl, ValidationErrors} from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { HotToastService } from '@ngneat/hot-toast';

export function passwordsMatchValidator(): ValidatorFn{
  return(control: AbstractControl): ValidationErrors | null =>{
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if(password && confirmPassword && password !==confirmPassword){
      return{
        passwordsDontMatch: true
      }
    }
    return null;
  };
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {
  title ='ReactiveSignUp'
  formStatus;

  // url = 'http://localhost:3000/api/signUp';
  // private baseUrl = '/api/signUp';

  signupForm = new FormGroup(
    {
      name: new FormControl('', Validators.required),
      email:new FormControl('', [Validators.required, Validators.email]),
      password:new FormControl('', Validators.required),
      confirmPassword:new FormControl('', Validators.required),
    },  {validators: passwordsMatchValidator()} 
    
  ); 

  constructor( private http :HttpClient, 
    private router: Router,
    private authService: AuthenticationService,
    private toast: HotToastService
  ){}

  ngOnInit(): void {
      

    this.signupForm.statusChanges.subscribe((value)=> {
      console.log(value)
      this.formStatus= value;
    })

  }
 
  get name(){
    return this.signupForm.get('fullname');
  }
  get phone(){
    return this.signupForm.get('phone');
  }
  get email(){
    return this.signupForm.get('email');
  }
  get password(){
    return this.signupForm.get('password');
  }
  get confirmPassword(){
    return this.signupForm.get('confirmPassword');
  }

  submit(){
    if(!this.signupForm.valid)return;
    const{name,email,password}= this.signupForm.value;
    this.authService.signup(name, email, password).pipe(
      this.toast.observe({
        success: 'Congrats! You are all signed up',
        loading: 'Signing in...',
        error: ({message}) => `${message}`
      })
    ).subscribe(() => {
      this.router.navigate(['/home']);
    }) 
  }

}
