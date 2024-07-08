import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-best-seller',
  templateUrl: './best-seller.component.html',
  styleUrls: ['./best-seller.component.css'],
})
export class BestSellerComponent {
  bestSeller: any;
  errorMessage: string;

  constructor(private productService: ProductService) {}

  loadProduct(): void {
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.bestSeller = products.filter(
          (item: any) => item.isBestSeller == true
        );
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
