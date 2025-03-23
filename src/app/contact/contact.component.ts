import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  faInstagram,
  faWhatsapp,
  faFacebook,
} from '@fortawesome/free-brands-svg-icons';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {
  faFacebook = faFacebook;
  faInstagram = faInstagram;
  faWhatsapp = faWhatsapp;

  contactForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    // this.contactService.sendEmail(this.contactForm.value).subscribe({
    //   next: (response) => {
    //     console.log('Email sent successfully:', response);
    //     alert(response.message); // Display success message to user
    //     this.contactForm.reset();
    //   },
    //   error: (error) => {
    //     console.error('Error sending email:', error);
    //     alert('An error occurred while sending the email. Please try again.');
    //     this.contactForm.markAllAsTouched();
    //   },
    // });
  }
}
