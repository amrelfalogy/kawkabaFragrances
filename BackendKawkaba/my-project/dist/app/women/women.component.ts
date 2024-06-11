import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-women',
  templateUrl: './women.component.html',
  styleUrls: ['./women.component.css']
})
export class WomenComponent implements OnInit {

  title = "Women's fragrances";
  products : any ;
 selectedProduct: any;

 constructor(private productsData: ProductService) {}

 ngOnInit() {
   this.productsData.getProducts().subscribe((result:any)=>{
   this.products = (result.filter((item:any)=>item.gender=="women"))
     console.log(this.products)
    })
  }
}

