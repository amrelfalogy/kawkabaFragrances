import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-men',
  templateUrl: './men.component.html',
  styleUrls: ['./men.component.css'],
})
export class MenComponent implements OnInit {
  title = "Men's fragrances";
  products: any;
  selectedProduct: any;
  productDetailes: any;
  errorMessage: string;

  constructor(private service: ProductService, private router: Router) {}

  // getProductDetails(productId: number) {
  //   this.service.getProductDetails(productId).subscribe((product: any) => {
  //     this.productDetailes = product;
  //     console.log(product);
  //   });
  // }

  loadProduct(): void {
    this.service.getProducts().subscribe({
      next: (products) => {
        this.products = products.filter(
          (item: any) => item.for_gender == 'for men'
        );
        console.log('Products loaded:', products);
      },
      error: (err) => {
        console.error('Error retrieving products:', err);
        this.errorMessage = 'Error loading products';
      },
    });
  }

  ngOnInit() {
    this.loadProduct();
  }
}
