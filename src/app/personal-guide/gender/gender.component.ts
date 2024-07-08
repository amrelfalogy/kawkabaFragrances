import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-gender',
  templateUrl: './gender.component.html',
  styleUrls: ['./gender.component.css'],
})
export class GenderComponent {
  faAngleLeft = faAngleLeft;

  constructor(private router: Router) {}

  selectedGender: String;

  @Output() genderSelected = new EventEmitter<string>();

  onSelectGender(gender: string) {
    this.selectedGender = gender;
    this.router.navigate(['/personal-guide/season'], {
      state: { gender: gender },
    });
    console.log('Gender Selected:', gender);
  }
}
