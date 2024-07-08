import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../product';

@Injectable({
  providedIn: 'root',
})
export class CartDataService {
  private cartItemsSubject = new BehaviorSubject<Product[]>([]);
  cartItems$: Observable<Product[]> = this.cartItemsSubject.asObservable();

  addToCart(product: Product) {
    // Implement logic to add product to cart
    // Update cartItemsSubject accordingly
  }

  removeFromCart(productId: number) {
    // Implement logic to remove product from cart
    // Update cartItemsSubject accordingly
  }

  clearCart() {
    // Implement logic to clear cart
    // Update cartItemsSubject accordingly
  }

  // getCartTotal(): number {
  //   let total = 0;
  //   // Access cartItems through the subscribed values
  //   this.cartItems$.subscribe((cartItems) => {
  //     for (const product of cartItems) {
  //       total += product.price * product.quantity;
  //     }
  //   });
  //   return total;
  // }
}
