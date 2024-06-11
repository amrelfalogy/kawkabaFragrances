import { Injectable } from '@angular/core';
import { Auth, authState, createUserWithEmailAndPassword, updateProfile } from '@angular/fire/auth';
import { signInWithEmailAndPassword } from '@firebase/auth';
import { from } from 'rxjs';  
import { switchMap } from 'rxjs/operators';  

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  
  currentUser$ = authState(this.auth);

  constructor(private auth: Auth) { }

  login(username:string, password:string){
    return from(signInWithEmailAndPassword(this.auth,username,password));
  }

  signup(name: string, email: string, password:string){
    return from (createUserWithEmailAndPassword(this.auth, email,password)
    ).pipe(switchMap(({user}) =>  updateProfile(user,{displayName:name})));
  }

  logut(){
    return from(this.auth.signOut());
  }

}
