import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-oriental',
  templateUrl: './oriental.component.html',
  styleUrls: ['./oriental.component.css'],
})
export class OrientalComponent {
  selectedAccords: string[] = [];

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
      'Selected Accords in oriental Component:',
      this.selectedAccords
    );
    this.router.navigate(['../personal-guide'], {
      state: { accords: this.selectedAccords },
    });
    console.log('Accords Selected:', this.selectedAccords);
  }
}
