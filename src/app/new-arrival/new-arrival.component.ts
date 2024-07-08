import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../product';

@Component({
  selector: 'app-new-arrival',
  templateUrl: './new-arrival.component.html',
  styleUrls: ['./new-arrival.component.css'],
})
export class NewArrivalComponent {
  newArrivals: any;
  errorMessage: string;

  constructor(private productService: ProductService) {}

  loadProduct(): void {
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.newArrivals = products.filter(
          (item: any) => item.isNewArrival == true
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
