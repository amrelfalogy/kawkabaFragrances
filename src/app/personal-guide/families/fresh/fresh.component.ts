import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fresh',
  templateUrl: './fresh.component.html',
  styleUrls: ['./fresh.component.css'],
})
export class FreshComponent {
  selectedAccords: String[] = [];

  constructor(private router: Router) {}

  @Output() accordsSelected = new EventEmitter<string[]>();

  onToggleAccord(accord: string) {
    const index = this.selectedAccords.indexOf(accord);
    if (index > -1) {
      this.selectedAccords.splice(index, 1);
    } else {
      if (this.selectedAccords.length < 3) {
        this.selectedAccords.push(accord);
      }
    }
  }

  onSubmitAccords() {
    console.log('Selected Accords in fresh Component:', this.selectedAccords);
    this.router.navigate(['../personal-guide'], {
      state: { accords: this.selectedAccords },
    });
    console.log('Accords Selected:', this.selectedAccords);
  }
}
