import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-season',
  templateUrl: './season.component.html',
  styleUrls: ['./season.component.css'],
})
export class SeasonComponent {
  faAngleLeft = faAngleLeft;

  constructor(private router: Router) {}

  selectedSeasons: string[] = [];

  @Output() seasonsSelected = new EventEmitter<string[]>();

  onToggleSeason(season: string) {
    const index = this.selectedSeasons.indexOf(season);
    if (index > -1) {
      this.selectedSeasons.splice(index, 1);
    } else {
      this.selectedSeasons.push(season);
    }
  }

  onSubmitSeasons(seasons: string[]) {
    this.selectedSeasons = seasons;
    this.router.navigate(['/personal-guide/families'], {
      state: { seasons: seasons },
    });
    console.log('Gender Selected:', seasons);
  }
}
