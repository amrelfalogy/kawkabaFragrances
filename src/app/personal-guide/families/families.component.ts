import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-families',
  templateUrl: './families.component.html',
  styleUrls: ['./families.component.css'],
})
export class FamiliesComponent {
  selectedFamily: string = '';

  constructor(private router: Router) {}

  onSelectFamily(family: string) {
    this.selectedFamily = family;
    this.router.navigate([`/personal-guide/families/${family}`]);
  }

  // onAccordsSelected(accords: string[]) {
  //   console.log('Accords received in Families Component:', accords);
  //   this.router.navigate(['/personal-guide'], { state: { accords } });
  // }
}
