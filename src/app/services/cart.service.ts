// cart.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, switchMap, tap } from 'rxjs';
import { Product, CartItem, ProductSize, Cart } from '../product';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  // private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  // cartItems$: Observable<CartItem[]> = this.cartItemsSubject.asObservable();
  // getCartTotal(): number {
  //   throw new Error('Method not implemented.');
  // }
  url = 'http://localhost:3000/api/v1';

  private baseUrl = '/api/v1/products';
  private cartItems: CartItem[] = [];
  private cartKey = 'cart';
  private cartItemsSubject = new BehaviorSubject<Product[]>([]);
  cartItems$: Observable<Product[]> = this.cartItemsSubject.asObservable();

  constructor(/*private http: HttpClient*/) {}

  // private create(): Observable<{ cartId: string }> {
  //   return this.http.post<{ cartId: string }>(this.url, {});
  // }

  // getCart(): Cart {
  //   return JSON.parse(localStorage.getItem(this.cartKey) || '{"items":[]}');
  // }
  // saveCart(cart: Cart) {
  //   localStorage.setItem(this.cartKey, JSON.stringify(cart));
  // }

  getCartItems(): Product[] {
    const cart = localStorage.getItem(this.cartKey);
    return cart ? JSON.parse(cart) : [];
  }

  addToCart(product: Product): void {
    const cart = this.getCartItems();
    const productExists = cart.find((item) => item._id === product._id);

    if (!productExists) {
      product.quantity = 1;
      cart.push(product);
    } else {
      productExists.quantity = (productExists.quantity || 1) + 1;
    }

    // Update LocalStorage with the modified cart
    localStorage.setItem(this.cartKey, JSON.stringify(cart));
    console.log('Cart after adding:', cart);
  }

  removeFromCart(productId: string): void {
    let cart = this.getCartItems();
    cart = cart.filter((item) => item._id !== productId);
    localStorage.setItem(this.cartKey, JSON.stringify(cart));
  }

  clearCart(): void {
    localStorage.removeItem(this.cartKey);
  }

  updateQuantity(productId: string, quantity: number): void {
    const cart = this.getCartItems();
    const product = cart.find((item) => item._id === productId);
    if (product) {
      product.quantity = quantity;
      localStorage.setItem(this.cartKey, JSON.stringify(cart));
    }
  }

  //   private getCart(cartId: string): Observable<any> {
  //     return this.http.get(`${this.baseUrl}/${cartId}`)
  //   }

  //   getItem(cartId:string, productId:string){
  //     return this.http.object('/shopping-carts' + cartId + '/items' + productId)
  //   }

  //   private async getOrCreateCartId(){
  //     let cartId = localStorage.getItem('cartId');
  //     if (cartId) return cartId;

  //       let result= await this.create();
  //       localStorage.setItem('cartId', result.key);
  //       return result.key;

  //   }

  //  async addToCart(product: Product) {
  //     let cartId =await this.getOrCreateCartId();
  //     let items$ = this.getItem(cartId, product.$key);
  //     items.take(1).subscribe(item => {
  //       items$.update({product: product, quantity: (item.quantity || 0) + 1 });
  //     })
  //   }

  //  getCartItems(): CartItem[] {
  //   return this.cartItems;
  // }
}
