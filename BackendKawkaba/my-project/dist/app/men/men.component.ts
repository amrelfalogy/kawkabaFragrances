import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/product.service';

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

  constructor(private productsData: ProductService) {}

  getProductDetails(productId: number) {
    this.productsData.getProductDetails(productId).subscribe((product: any) => {
      this.productDetailes = product;
      console.log(product);
    });
  }

  ngOnInit() {
    this.productsData.getProducts().subscribe((result: any) => {
      this.products = result.filter((item: any) => item.for_gender == 'men');
      console.log(this.products);
    });
  }

  // fetchProductsByGender(gender: string) {
  //   this.productService.getProductsByGender(gender).subscribe((data) => {
  //     this.products = data;
  //   });
  //   console.log(Response);
  // }

  // showDetails(product: any) {
  //   this.selectedProduct = product;
  // }
}
