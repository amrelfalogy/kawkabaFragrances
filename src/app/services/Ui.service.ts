// ui.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UiService {
  private cartVisible$ = new BehaviorSubject<boolean>(false);
  private searchVisible$ = new BehaviorSubject<boolean>(false);

  // Public Observables
  cartVisibility = this.cartVisible$.asObservable();
  searchVisibility = this.searchVisible$.asObservable();

  // Cart controls
  showCart() {
    this.hideSearch(); // Ensure only one is open
    this.cartVisible$.next(true);
  }

  hideCart() {
    this.cartVisible$.next(false);
  }

  toggleCart() {
    const current = this.cartVisible$.value;
    current ? this.hideCart() : this.showCart();
  }

  // Search controls
  showSearch() {
    this.hideCart(); // Ensure only one is open
    this.searchVisible$.next(true);
  }

  hideSearch() {
    this.searchVisible$.next(false);
  }

  toggleSearch() {
    const current = this.searchVisible$.value;
    current ? this.hideSearch() : this.showSearch();
  }
}
