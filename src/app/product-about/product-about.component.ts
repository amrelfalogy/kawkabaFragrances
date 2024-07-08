import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Router,
} from '@angular/router';
import { ProductService } from '../services/product.service';
import { CartItem, Product, ProductSize } from '../product';
import { CartService } from '../services/cart.service';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-product-about',
  templateUrl: './product-about.component.html',
  styleUrls: ['./product-about.component.css'],
})
export class ProductAboutComponent {
  faStar = faStar;
  product: Product | undefined;
  quantity = 1;
  errorMessage: string;
  // selectedSize: string;
  isDescriptionTruncated: boolean = true;
  // selectedPrice: number;
  private routeSub: Subscription | undefined;
  // showFullDescription: boolean = false;
  defaultPrice: number = 300; // Default price for the base size (50ml)

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private service: ProductService,
    private router: Router
  ) {}

  toggleDescription() {
    this.isDescriptionTruncated = !this.isDescriptionTruncated;
  }

  // onSelectSize(size: ProductSize) {
  //   this.selectedPrice = size.price;
  // }
  // onSelectSize(selectedVolume: string) {
  //   const size = this.sizes.find((size) => size.volume === selectedVolume);
  //   if (size) {
  //     this.selectedPrice = this.defaultPrice * size.multiplier;
  //   } else {
  //     this.selectedPrice = this.defaultPrice; // Fallback to default price if no size is matched
  //   }
  // }

  getProduct(productId: string): void {
    console.log('Fetching product with ID:', productId);
    this.service.getProductById(productId).subscribe(
      (response: Product) => {
        this.product = response;
        console.log('API response:', response);
      },
      (error) => {
        console.error('Error retrieving product:', error);
      }
    );
  }

  ngOnInit(): void {
    this.routeSub = this.route.paramMap.subscribe((params) => {
      const productId = params.get('id');
      console.log('Product ID:', productId);

      if (productId) {
        this.getProduct(productId);
      } else {
        console.error('Product ID is undefined');
      }
    });
  }

  ngOnDestroy() {
    if (this.routeSub) {
      this.routeSub.unsubscribe(); // Clean up the subscription
    }
  }
  addToCart(): void {
    if (this.product) {
      this.cartService.addToCart(this.product);
      alert('Product added to cart!');
    } else {
      console.error('Product is not available to add to cart.');
    }
  }
}
