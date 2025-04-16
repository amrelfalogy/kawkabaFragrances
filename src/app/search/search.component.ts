import { Component, OnDestroy, OnInit } from '@angular/core';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { ProductService } from '../services/product.service';
import { Subscription } from 'rxjs';
import { Product } from '../product';
import { UiService } from '../services/Ui.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit, OnDestroy {
  isVisible: boolean = false;
  isLoading = false;
  private visabilitySubscriotion: Subscription;
  faXmark = faXmark;
  subscription: Subscription;
  filteredProducts: any[]; // Start with an empty array
  products: Product[] = [];

  constructor(
    private productService: ProductService,
    private router: Router,
    private uiService: UiService
  ) {}

 ngOnInit(): void {
    this.subscription = this.uiService.searchVisibility.subscribe(
      (visible) => (this.isVisible = visible)
    );

    this.productService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to get products', err);
        this.isLoading = false;
      }
    });
  }

filter(query: string) {
  this.isLoading = true; // Start loading
  setTimeout(() => {
    if (query) {
      this.filteredProducts = this.products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.company.toLowerCase().includes(query.toLowerCase())
      );
    } else {
      this.filteredProducts = [];
    }
    this.isLoading = false; // Stop loading
  }, 300); // Simulate a delay for filtering
}

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onCloseClick() {
    // this.isVisible = !this.isVisible;
    this.uiService.hideSearch();
    console.log('onCloseClick called');
  }

  toggleVisibility(): void {
    this.isVisible = !this.isVisible;
  }
}
