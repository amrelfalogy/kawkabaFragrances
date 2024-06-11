import { Component, HostListener, OnInit } from '@angular/core';
import { faInstagram, faTelegram } from '@fortawesome/free-brands-svg-icons';
import { Router, NavigationEnd } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent {
  constructor(
    public authService: AuthenticationService,
    private router: Router
  ) {}

  faInstagram = faInstagram;
  faTelegram = faTelegram;

  currentYear = new Date().getFullYear();

  isNavbarVisible = true;
  prevScrollPos = window.pageYOffset;
  // toggleNavbar() {
  //   this.isNavbarVisible = !this.isNavbarVisible;
  // }
  isAtTop: boolean = true;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const currentScrollPos = window.pageYOffset;

    if (this.prevScrollPos > currentScrollPos) {
      this.isNavbarVisible = true;
    } else {
      this.isNavbarVisible = false;
    }

    this.prevScrollPos = currentScrollPos;

    if (currentScrollPos === 0) {
      this.isAtTop = true;
    } else {
      this.isAtTop = false;
    }
  }

  logout(event: MouseEvent) {
    const simulatedClickEvent = new MouseEvent('click', { bubbles: true }); // Simulate a click event
    document.getElementById('userMenu')?.dispatchEvent(simulatedClickEvent);

    this.authService.logut().subscribe(() => {
      this.router.navigate(['']);
    });
  }
}
