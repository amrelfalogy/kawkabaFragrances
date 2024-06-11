import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-unisex',
  templateUrl: './unisex.component.html',
  styleUrls: ['./unisex.component.css'],
})
export class unisexComponent implements OnInit {
  title = 'unisex fragrances';
  products: any;
  selectedProduct: any;

  constructor(private productsData: ProductService) {}

  ngOnInit() {
    this.productsData.getProducts().subscribe((result: any) => {
      this.products = result.filter((item: any) => item.gender == 'unisex');
      console.log(this.products);
    });
  }
}
