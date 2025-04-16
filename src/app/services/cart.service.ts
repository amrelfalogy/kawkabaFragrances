// cart.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, switchMap, tap } from 'rxjs';
import { Product, CartItem, ProductSize, Cart } from '../product';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartKey = 'cart';
  private cartItemsSubject = new BehaviorSubject<Product[]>(this.getCartItems());
  cartItems$ = this.cartItemsSubject.asObservable();

  constructor(private http: HttpClient) {}

  private saveCart(cart: Product[]): void {
    localStorage.setItem(this.cartKey, JSON.stringify(cart));
    this.cartItemsSubject.next(cart); // ✅ Notify subscribers
  }

  getCartItems(): Product[] {
    const cart = localStorage.getItem(this.cartKey);
    return cart ? JSON.parse(cart) : [];
  }

  addToCart(product: Product): void {
    const cart = this.getCartItems();
    const existingProduct = cart.find((item) => item._id === product._id);

    if (existingProduct) {
      existingProduct.quantity = (existingProduct.quantity || 1) + 1;
    } else {
      product.quantity = 1;
      cart.push(product);
    }

    this.saveCart(cart); // ✅ Update localStorage and notify
  }

  removeFromCart(productId: string): void {
    let cart = this.getCartItems();
    cart = cart.filter((item) => item._id !== productId);
    this.saveCart(cart); // ✅
  }

  clearCart(): void {
    this.saveCart([]); // ✅ Clears localStorage and updates observable
  }

  updateQuantity(productId: string, quantity: number): void {
    const cart = this.getCartItems();
    const product = cart.find((item) => item._id === productId);
    if (product) {
      product.quantity = quantity;
    }
    this.saveCart(cart); // ✅
  }
}
