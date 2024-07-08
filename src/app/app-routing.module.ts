import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { BestSellerComponent } from './best-seller/best-seller.component';
import { NewArrivalComponent } from './new-arrival/new-arrival.component';
import { CollectionComponent } from './collection/collection.component';
import { MenComponent } from './men/men.component';
import { WomenComponent } from './women/women.component';
import { unisexComponent } from './unisex/unisex.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { PersonalGuideComponent } from './personal-guide/personal-guide.component';
import { FamiliesComponent } from './personal-guide/families/families.component';
import { FloralComponent } from './personal-guide/families/floral/floral.component';
import { FreshComponent } from './personal-guide/families/fresh/fresh.component';
import { WoodyComponent } from './personal-guide/families/woody/woody.component';
import { OrientalComponent } from './personal-guide/families/oriental/oriental.component';
import { GenderComponent } from './personal-guide/gender/gender.component';
import { SeasonComponent } from './personal-guide/season/season.component';
import { PerfumeForComponent } from './personal-guide/perfume-for/perfume-for.component';
import { TailoredSelectionComponent } from './tailored-selection/tailored-selection.component';
import { ProductAboutComponent } from './product-about/product-about.component';
import { FavPerfumeComponent } from './personal-guide/fav-perfume/fav-perfume.component';
import { ProductsComponent } from './products/products.component';
import { SearchComponent } from './search/search.component';
import { ScentFinderComponent } from './personal-guide/scent-finder/scent-finder.component';
// import { ProductDetailsComponent } from './product-details/product-details.component';
import {
  canActivate,
  redirectUnauthorizedTo,
  redirectLoggedInTo,
} from '@angular/fire/auth-guard';
import { CartComponent } from './cart/cart.component';
import { ScanSmellComponent } from './personal-guide/scan-smell/scan-smell.component';
import { CheckoutComponent } from './checkout/checkout.component';
// import { ProductAboutGuard } from './product-about.guard';

const redirectToLogin = () => redirectUnauthorizedTo(['login']);
const redirectToHome = () => redirectLoggedInTo(['home']);

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'best-seller', component: BestSellerComponent },
  { path: 'new-arrival', component: NewArrivalComponent },
  { path: 'collection', component: CollectionComponent },
  { path: 'men', component: MenComponent },
  { path: 'women', component: WomenComponent },
  { path: 'unisex', component: unisexComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'tailored-selection', component: TailoredSelectionComponent },
  { path: 'products/:id', component: ProductAboutComponent },
  // { path: 'search/:id', component: ProductAboutComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'cart', component: CartComponent },
  { path: 'search', component: SearchComponent },
  { path: 'checkout', component: CheckoutComponent },

  // { path: 'product-about/:index', component: ProductAboutComponent, canActivate: [ProductAboutGuard], },

  {
    path: 'personal-guide',
    component: PersonalGuideComponent,
    children: [
      { path: '', redirectTo: 'perfume-for', pathMatch: 'full' },
      { path: 'perfume-for', component: PerfumeForComponent },
      { path: 'fav-perfume', component: FavPerfumeComponent },
      { path: 'gender', component: GenderComponent },
      { path: 'scent-finder', component: ScentFinderComponent },
      { path: 'scan-smell', component: ScanSmellComponent },
      { path: 'season', component: SeasonComponent },
      {
        path: 'families', // Main route for families
        children: [
          { path: '', component: FamiliesComponent },
          { path: 'floral', component: FloralComponent },
          { path: 'woody', component: WoodyComponent },
          { path: 'fresh', component: FreshComponent },
          { path: 'oriental', component: OrientalComponent },
        ],
      },
    ],
  },

  // { path: ':id', component: ProductDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
