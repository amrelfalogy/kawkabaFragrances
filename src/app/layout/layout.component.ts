import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  faInstagram,
  faTelegram,
  faWhatsapp,
  faTiktok,
  faFacebookF,
} from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { Router, NavigationEnd } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { CartDataService } from '../services/cartData.service';
import { CartComponent } from '../cart/cart.component';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { SearchComponent } from '../search/search.component';
import { UiService } from '../services/Ui.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent implements OnInit {
  faCartShopping = faCartShopping;
  faSearch = faSearch;
  isHomePage: boolean = false;
  isAtTop: boolean = true;
  isNavbarVisible = true;
  isNavbarCollapsed: boolean = false;
  cartItemsCount: number = 0;
  isSearchOpen: boolean;
  searchIconElement: HTMLElement;
  currentUser$ = this.authService.currentUser$;
  faInstagram = faInstagram;
  faWhatsapp = faWhatsapp;
  faTelegram = faTelegram;
  faTiktok = faTiktok;
  faFacebookF = faFacebookF;
  faEnvelope = faEnvelope;
  faPhone = faPhone;

  constructor(
    public authService: AuthenticationService,
    private cartDataService: CartDataService,
    private cartService: CartService,
    public cartComponent: CartComponent,
    public searchComponent: SearchComponent,
    private elRef: ElementRef,
    private router: Router,
    private uiService: UiService
  ) {}
  ngOnInit() {
    this.cartService.cartItems$.subscribe((cartItems) => {
      this.cartItemsCount = cartItems.length;
    });
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isHomePage =
          this.router.url === '/home' || this.router.url === '/';
      }
    });
  }

  onCartClick(): void {
    this.cartComponent.toggleVisibility();
  }

  onSearchClick(): void {
    this.searchComponent.toggleVisibility();
  }

  toggleNavbar(): void {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }

  collapseNavbar() {
    const navbarToggle =
      this.elRef.nativeElement.querySelector('.navbar-collapse');
    if (navbarToggle && navbarToggle.classList.contains('show')) {
      navbarToggle.classList.remove('show');
    }
  }

  onCloseClick(): void {
    this.uiService.hide();
    this.isNavbarCollapsed = true;
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: Event) {
    if (this.searchContainerRef) {
      const target = event.target as HTMLElement;
      if (target !== this.searchIconElement) {
        this.isSearchOpen = false;
      }
    }
  }

  @ViewChild('searchContainerRef') searchContainerRef: ElementRef;

  currentYear = new Date().getFullYear();

  prevScrollPos = window.pageYOffset;

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

    this.authService.logout().subscribe(() => {
      this.router.navigate(['']);
    });
  }
}
