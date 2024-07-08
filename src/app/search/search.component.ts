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
  isVisible: boolean = true;
  private visabilitySubscriotion: Subscription;
  faXmark = faXmark;
  subscription: Subscription;
  filteredProducts: any[]; // Start with an empty array
  products: Product[] = [];

  constructor(
    private productService: ProductService,
    private router: Router,
    private uiService: UiService
  ) {
    this.subscription = this.uiService.isVisible.subscribe(
      (visible) => (this.isVisible = visible)
    );
  }

  ngOnInit(): void {
    this.subscription = this.productService.getProducts().subscribe({
      next: (products) => {
        this.products = products; // Only initialize products here
        console.log('Received products:', products);
      },
      error: (err) => console.error('Failed to get products', err),
    });
  }

  filter(query: string) {
    console.log(query);
    if (query) {
      this.filteredProducts = this.products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.company.toLowerCase().includes(query.toLowerCase())
      );
    } else {
      this.filteredProducts = []; // Keep empty if no query
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onCloseClick() {
    // this.isVisible = !this.isVisible;
    this.uiService.hide();
    console.log('onCloseClick called');
  }

  toggleVisibility(): void {
    this.isVisible = !this.isVisible;
  }
}
