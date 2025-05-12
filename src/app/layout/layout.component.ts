import {
  AfterViewInit,
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
import { Collapse } from 'bootstrap';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent implements OnInit, AfterViewInit {
  faCartShopping = faCartShopping;
  faSearch = faSearch;
  isHomePage: boolean = false;
  isAtTop: boolean = true;
  isNavbarVisible = true;
  isNavbarCollapsed: boolean = false;
  cartItemsCount: number = 0;
  currentUser$ = this.authService.currentUser$;
  faInstagram = faInstagram;
  faWhatsapp = faWhatsapp;
  faTelegram = faTelegram;
  faTiktok = faTiktok;
  faFacebookF = faFacebookF;
  faEnvelope = faEnvelope;
  faPhone = faPhone;

  public isCartVisible: boolean = false;
  public isSearchVisible: boolean = false;


  constructor(
    public authService: AuthenticationService,
    private cartDataService: CartDataService,
    private cartService: CartService,
    private elRef: ElementRef,
    private router: Router,
    public uiService: UiService
  ) {}

  ngAfterViewInit() {}
  
  ngOnInit() {
    this.uiService.cartVisibility.subscribe((visible) => {
      this.isCartVisible = visible;
    });
  
    this.uiService.searchVisibility.subscribe((visible) => {
      this.isSearchVisible = visible;
    });
  
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
    this.uiService.toggleCart();
  }
  
  onSearchClick(): void {
    this.uiService.toggleSearch();
  }
  
  // toggle the navbar collapse burger state manually, with deletion of data-bs-toggle, aria..etc in burger btn
  toggleNavbar() {
    const element = this.navbarCollapse?.nativeElement;
    if (element) {
      const bsCollapse = Collapse.getInstance(element) || new Collapse(element, { toggle: false });
  
      if (element.classList.contains('show')) {
        bsCollapse.hide();
        this.isNavbarCollapsed = true;
      } else {
        bsCollapse.show();
        this.isNavbarCollapsed = false;
      }
    }
  }
  

  @ViewChild('cartContainerRef', { static: false }) cartContainerRef: ElementRef;
  @ViewChild('searchContainerRef', { static: false }) searchContainerRef: ElementRef;
  
  @ViewChild('cartToggleRef', { static: false }) cartToggleRef: ElementRef;
  @ViewChild('searchToggleRef', { static: false }) searchToggleRef: ElementRef;

  @ViewChild('navbarCollapse') navbarCollapse: ElementRef;

  collapseNavbar() {
    const element = this.navbarCollapse?.nativeElement;
    if (element && element.classList.contains('show')) {
      const bsCollapse = Collapse.getInstance(element) || new Collapse(element, { toggle: false });
      bsCollapse.hide(); // Animates collapse
      this.isNavbarCollapsed = true;
    }
  }
  

  onCloseClick(): void {
    this.uiService.hideCart();
    this.uiService.hideSearch();
    this.isNavbarCollapsed = true;
  }
  
  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent): void {
    if (!this.isCartVisible && !this.isSearchVisible) {
      return;
    }
  
    const target = event.target as HTMLElement;
  
    const isClickInsideCart =
      this.cartContainerRef?.nativeElement?.contains(target) ||
      this.cartToggleRef?.nativeElement?.contains(target);
  
    const isClickInsideSearch =
      this.searchContainerRef?.nativeElement?.contains(target) ||
      this.searchToggleRef?.nativeElement?.contains(target);
  
    if (this.isCartVisible && !isClickInsideCart) {
      this.uiService.hideCart();
    }
  
    if (this.isSearchVisible && !isClickInsideSearch) {
      this.uiService.hideSearch();
    }
  }
  
  


  currentYear = new Date().getFullYear();

  prevScrollPos = window.pageYOffset;

@HostListener('window:scroll', [])
onWindowScroll() {
  const currentScrollPos = window.pageYOffset;

  const cartOpen = this.isCartVisible;
  const searchOpen = this.isSearchVisible;

  if (Math.abs(this.prevScrollPos - currentScrollPos) > 5) { // Add a threshold to reduce updates
    
    if (!cartOpen && !searchOpen) {
      this.isNavbarVisible = this.prevScrollPos > currentScrollPos || currentScrollPos === 0;
    }    
    this.isAtTop = currentScrollPos === 0;
    this.prevScrollPos = currentScrollPos;
  }
}

  logout(event: MouseEvent) {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['']);
    });
  }
}
