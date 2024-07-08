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
      if (state && state['products']) {
        this.products = state['products'];
        this.recommendationSource = 'Our Specialist';
        console.log('Products received from history state:', this.products);
      } else if (state && state['recommendations']) {
        this.products = state['recommendations'];
        this.recommendationSource = 'AI Assistant';
        console.log('Products received from history state:', this.products);
        console.log('Example Product:', this.products[0]);
      } else {
        console.error('No products found in state.');
      }

      if (this.products) {
        this.products.forEach((product: any) => {
          console.log('Product:', product);
        });
      }
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
  seeMore(productId: string): void {
    if (productId) {
      this.router.navigate(['/products', productId]);
    } else {
      console.error('Product ID is undefined.');
    }
  }
}
