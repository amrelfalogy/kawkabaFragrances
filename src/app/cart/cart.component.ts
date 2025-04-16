import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Product } from '../product';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { UiService } from '../services/Ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit, OnDestroy {
  faXmark = faXmark;
  cartItems: Product[] = [];
  private cartSubscription: Subscription;

  constructor(
    private cartService: CartService,
    private uiService: UiService
  ) {}

  ngOnInit() {
    // ✅ Subscribing to live cart updates
    this.cartSubscription = this.cartService.cartItems$.subscribe((items) => {
      this.cartItems = items;
    });
  }

  ngOnDestroy() {
    // 🔐 Always clean up subscriptions to avoid memory leaks
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

  onCloseClick() {
    this.uiService.hideCart();
    console.log('onCloseClick called');
  }

  removeFromCart(productId: string): void {
    this.cartService.removeFromCart(productId);
    // ❌ No need to call loadCart anymore
  }

  clearCart(): void {
    this.cartService.clearCart();
    // ✅ The cartItems will auto-clear because of the subscription
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
}
