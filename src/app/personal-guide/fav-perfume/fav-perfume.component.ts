import { Component } from '@angular/core';
import { RecommendationService } from '../../services/recommendation.service';
import { ProductService } from 'src/app/services/product.service';
import { Product } from '../../product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fav-perfume',
  templateUrl: './fav-perfume.component.html',
  styleUrls: ['./fav-perfume.component.css'],
})
export class FavPerfumeComponent {
  perfumeName: string = '';
  filteredProducts: Product[] = [];
  products: Product[] = [];
  recommendations: Product[] = [];
  noRecommendationsMessage: string | null = null;
  isLoading: boolean = false;

  constructor(
    private recommendationService: RecommendationService,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to get products', err);
        this.isLoading = false; // Stop loading
      },
    });
  }

  searchPerfume() {
    if (this.perfumeName) {
      this.filteredProducts = this.products.filter(
        (p) =>
          p.name.toLowerCase().includes(this.perfumeName.toLowerCase()) ||
          p.company.toLowerCase().includes(this.perfumeName.toLowerCase())
      );
    } else {
      this.filteredProducts = [];
    }
  }

  viewRecommendations(perfume: Product) {
    this.isLoading = true;
    this.recommendationService.getRecommendations(perfume.name).subscribe(
      (response) => {
        this.isLoading = false;
        if (response.status === 'success') {
          this.recommendations = response.data.recommendations;
          this.router.navigate(['../tailored-selection'], {
            state: { perfume, recommendations: this.recommendations },
          });
        } else {
          console.error('Failed to fetch recommendations.');
          this.noRecommendationsMessage = 'Failed to fetch recommendations.';
        }
      },
      (error) => {
        this.isLoading = false;
        console.error('API Error:', error);
        this.noRecommendationsMessage =
          'An error occurred while fetching recommendations.';
      }
    );
  }
}
