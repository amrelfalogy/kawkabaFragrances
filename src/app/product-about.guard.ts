// import { Injectable } from '@angular/core';
// import {
//   ActivatedRouteSnapshot,
//   CanActivate,
//   CanLoad,
//   Router,
//   RouterStateSnapshot,
//   UrlSegment,
//   UrlTree,
// } from '@angular/router';
// import { Observable } from 'rxjs';

// type CanActivateFnType = CanActivateFn<ActivatedRouteSnapshot, RouterStateSnapshot>;
// type CanLoadFnType = CanLoadFn<Route, UrlSegment[]>;

// @Injectable({
//   providedIn: 'root',
// })
// export class ProductAboutGuard implements CanLoad, CanActivate {
//   constructor(private router: Router) {}

//   canLoad(
//     route: Route,
//     segments: UrlSegment[]
//   ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
//     const productIndex = +segments[segments.length - 1].path;
//     if (isNaN(productIndex) || productIndex < 0) {
//       // Invalid product index, redirect to error page or another route
//       this.router.navigate(['/error']);
//       return false;
//     }
//     return true;
//   }

//   canActivate(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot
//   ): CanActivateFnType {
//     return (next: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
//       const productIndex = +next.paramMap.get('index');
//       if (isNaN(productIndex) || productIndex < 0) {
//         // Invalid product index, redirect to error page or another route
//         this.router.navigate(['/error']);
//         return false;
//       }
//       return true;
//     };
//   }
// }
