import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { QuizService } from '../services/quiz.service';
import { CartService } from '../services/cart.service';
import { Product } from '../product';
import { faStar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-tailored-selection',
  templateUrl: './tailored-selection.component.html',
  styleUrls: ['./tailored-selection.component.css'],
})
export class TailoredSelectionComponent implements OnInit {
  faStar = faStar;
  products: any;
  recommendationSource: string = '';

  constructor(
    private quizService: QuizService,
    private cartService: CartService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      const state = window.history.state;
      console.log('State from history:', state);

      let rawProducts = [];

      if (state && state['products']) {
        rawProducts = state['products'];
        this.recommendationSource = 'Our Specialist';
      } else if (state && state['recommendations']) {
        rawProducts = state['recommendations'];
        this.recommendationSource = 'AI Assistant';
      } else {
        console.error('No products found in state.');
      }

      // Filter products where isAvailable is true
      console.log('Raw Products:', rawProducts);
      this.products = rawProducts.filter((product: any) => {
        console.log('Checking Product:', product);
        console.log('Product ID:', product._id);
        return product.isAvailable;
      });
      console.log('Filtered Products:', this.products);
    });
  }

  addToCart(product: Product): void {
    if (product) {
      this.cartService.addToCart(product);
      alert('Product added to cart!');
    } else {
      console.error('Product is not available to add to cart.');
    }
  }
  seeMore(product: any): void {
    console.log('Navigating to product:', product);
    if (product && product._id) {
      this.router.navigate(['/products', product._id]);
    } else {
      console.error('Product ID is undefined:', product);
    }
  }
}
