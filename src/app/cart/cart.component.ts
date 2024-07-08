import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartDataService } from '../services/cartData.service';
import { CartService } from '../services/cart.service';
import { Product } from '../product';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { UiService } from '../services/Ui.service';
import { Subscription } from 'rxjs';
// import { Location } from '@angular/common';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit, OnDestroy {
  faXmark = faXmark;
  // product: Product[] = [];
  cartItems: Product[] = [];
  isVisible: boolean = false;
  subscription: Subscription;

  constructor(
    private cartService: CartService,
    private uiService: UiService // private location: Location
  ) {
    this.subscription = this.uiService.isVisible.subscribe(
      (visible) => (this.isVisible = visible)
    );
  }

  loadCart(): void {
    this.cartItems = this.cartService.getCartItems();
  }

  ngOnInit() {
    this.loadCart();
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onCloseClick() {
    this.uiService.hide();
    console.log('onCloseClick called');
  }
  toggleVisibility(): void {
    this.isVisible = !this.isVisible;
  }

  removeFromCart(productId: string): void {
    this.cartService.removeFromCart(productId);
    this.loadCart();
  }

  clearCart(): void {
    this.cartService.clearCart();
    this.cartItems = [];
  }

  increaseQuantity(item: Product): void {
    item.quantity++;
    this.cartService.updateQuantity(item._id, item.quantity);
  }

  decreaseQuantity(item: Product): void {
    if (item.quantity > 1) {
      item.quantity--;
      this.cartService.updateQuantity(item._id, item.quantity);
    }
  }

  // getCartTotal(): number {
  //   return this.cartDataService.getCartTotal();
  // }
}
