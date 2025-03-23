import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-women',
  templateUrl: './women.component.html',
  styleUrls: ['./women.component.css'],
})
export class WomenComponent implements OnInit {
  title = "Women's fragrances";
  products: any;
  selectedProduct: any;
  errorMessage: string;
  isLoading: boolean = false;

  constructor(private service: ProductService, private router: Router) {}

  loadProduct(): void {
    this.isLoading = true;
    this.service.getProducts().subscribe({
      next: (products) => {
        this.isLoading = false;
        this.products = products.filter(
          (item: any) => item.for_gender == 'for women'
        );
        console.log('Products loaded:', products);
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Error retrieving products:', err);
        this.errorMessage = 'Error loading products';
      },
    });
  }

  ngOnInit() {
    this.loadProduct();
  }
}
