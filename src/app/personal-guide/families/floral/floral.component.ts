import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-floral',
  templateUrl: './floral.component.html',
  styleUrls: ['./floral.component.css'],
})
export class FloralComponent {
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
    console.log(
      'Selected Accords in floral Component:',
      this.selectedAccords
    );
    this.router.navigate(['../personal-guide'], {
      state: { accords: this.selectedAccords },
    });
    console.log('Accords Selected:', this.selectedAccords);
  }
}
