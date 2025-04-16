import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Product } from '../product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  url = 'http://localhost:3000/api/v1/products';

  private baseUrl = '/api/v1/products';

  constructor(private http: HttpClient) {}
  getProducts(): Observable<Product[]> {
    // get the products listing from APi
    return this.http.get<{ data: Product[] }>(this.url).pipe(
      map((respone) => respone.data),
      catchError((error) => {
        console.error('Error fetching products:', error);
        return throwError(error);
      })
    );
  }
  getProductById(id: string): Observable<any> {
    const url = `${this.url}/${id}`;
    console.log('Constructed URL:', url);
    return this.http.get<{ data: Product }>(url).pipe(
      map((response) => response.data),
      catchError((error) => {
        console.error('Error fetching product by ID:', error);
        return throwError(error);
      })
    );
  }

}
