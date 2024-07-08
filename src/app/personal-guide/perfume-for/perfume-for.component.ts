import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfume-for',
  templateUrl: './perfume-for.component.html',
  styleUrls: ['./perfume-for.component.css'],
})
export class PerfumeForComponent {
  constructor(private router: Router) {}

  navigateToGender() {
    this.router.navigate(['/personal-guide/gender']);
  }
}
