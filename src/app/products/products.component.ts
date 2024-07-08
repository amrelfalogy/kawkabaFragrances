import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';
import { Product } from '../product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products: Product[];
  title = "Women's fragrances";
  selectedProduct: any;
  errorMessage: string | undefined;

  constructor(private service: ProductService) {}

  loadProduct(): void {
    this.service.getProducts().subscribe({
      next: (products) => {
        this.products = products;
        console.log('Products loaded:', products);
      },
      error: (err) => {
        console.error('Error retrieving products:', err);
        this.errorMessage = 'Error loading products';
      },
    });
  }
  ngOnInit(): void {
    this.loadProduct();
  }
}
