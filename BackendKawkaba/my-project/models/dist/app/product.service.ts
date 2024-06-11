// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class ProductService {

//   url = 'http://localhost:3000/api/products';

//   private baseUrl = '/api/products';

//   constructor( private http: HttpClient ) { }
// getProducts(){
//   // get the products listing from APi
//   return this.http.get(this.url )
// }
// getProductDetails(productId: number): Observable<any> {
//     const url = `${this.baseUrl}/${productId}`;
//     return this.http.get(url);
//   }

// }
