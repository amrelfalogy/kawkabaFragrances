// import { Injectable } from '@angular/core';
// import {
//   Auth,
//   authState,
//   createUserWithEmailAndPassword,
//   updateProfile,
// } from '@angular/fire/auth';
// import { signInWithEmailAndPassword } from '@firebase/auth';
// import { from } from 'rxjs';
// import { switchMap } from 'rxjs/operators';

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthenticationService {
//   currentUser$ = authState(this.auth);

//   constructor(private auth: Auth) {}

//   login(username: string, password: string) {
//     return from(signInWithEmailAndPassword(this.auth, username, password));
//   }

//   signup(name: string, email: string, password: string) {
//     return from(
//       createUserWithEmailAndPassword(this.auth, email, password)
//     ).pipe(switchMap(({ user }) => updateProfile(user, { displayName: name })));
//   }

//   logut() {
//     return from(this.auth.signOut());
//   }
// }

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private baseUrl = 'http://localhost:3000/api/v1';
  private currentUserSubject = new BehaviorSubject<any>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http
      .post(`${this.baseUrl}/auth/login`, { email, password })
      .pipe(tap((user) => this.currentUserSubject.next(user)));
  }

  signup(
    name: string,
    email: string,
    password: string,
    passwordConfirmT: string
  ): Observable<any> {
    return this.http
      .post(`${this.baseUrl}/auth/signup`, {
        name,
        email,
        password,
        passwordConfirmT,
      })
      .pipe(tap((user) => this.currentUserSubject.next(user)));
  }

  logout(): Observable<any> {
    return this.http
      .post(`${this.baseUrl}/auth/logout`, {})
      .pipe(tap(() => this.currentUserSubject.next(null)));
  }
}
