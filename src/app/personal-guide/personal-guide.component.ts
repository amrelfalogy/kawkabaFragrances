import { Component } from '@angular/core';
import { QuizService } from '../services/quiz.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-personal-guide',
  templateUrl: './personal-guide.component.html',
  styleUrls: ['./personal-guide.component.css'],
})
export class PersonalGuideComponent {
  step: number = 1;
  userSelections = {
    gender: '',
    seasons: [],
    accords: [],
  };

  constructor(private quizService: QuizService, private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const state = this.router.getCurrentNavigation()?.extras.state;
        if (state) {
          if (state['gender']) {
            this.userSelections.gender = state['gender'];
          }
          if (state['seasons']) {
            this.userSelections.seasons = state['seasons'];
          }
          if (state['accords']) {
            this.userSelections.accords = state['accords'];
            this.submitQuiz();
          }
        }
        console.log('User selections:', this.userSelections);
      }
    });
  }

  submitQuiz() {
    console.log('Submitting:', this.userSelections);
    if (this.validateSelections(this.userSelections)) {
      this.quizService.getRecommendations(this.userSelections).subscribe({
        next: (result) => {
          console.log('API Response:', JSON.stringify(result, null, 2));

          if (result.status === 'success') {
            console.log('API Navigating:', result.data.recommendations);
            this.router
              .navigate(['tailored-selection'], {
                state: { products: result.data.recommendations },
              })
              .then((navigationResult) => {
                console.log('Navigation Result:', navigationResult);
              });
          } else {
            console.error('Failed to fetch recommendations');
          }
        },
        error: (error) => console.error('API Error:', error),
      });
    } else {
      console.error('Validation Failed:', this.userSelections);
    }
  }

  validateSelections(selections) {
    return (
      selections.gender &&
      selections.seasons.length > 0 &&
      selections.accords.length > 0
    );
  }
}
