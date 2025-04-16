import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './home/home.component';
import { NewArrivalComponent } from './new-arrival/new-arrival.component';
import { BestSellerComponent } from './best-seller/best-seller.component';
import { CollectionComponent } from './collection/collection.component';
import { MenComponent } from './men/men.component';
import { WomenComponent } from './women/women.component';
import { unisexComponent } from './unisex/unisex.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { ProductDetailsComponent } from './product-details/product-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { environment } from '../environments/environment';
import { MatMenuModule } from '@angular/material/menu';
import { PersonalGuideComponent } from './personal-guide/personal-guide.component';
import { PerfumeForComponent } from './personal-guide/perfume-for/perfume-for.component';
import { GenderComponent } from './personal-guide/gender/gender.component';
import { SeasonComponent } from './personal-guide/season/season.component';
import { FamiliesComponent } from './personal-guide/families/families.component';
import { FloralComponent } from './personal-guide/families/floral/floral.component';
import { WoodyComponent } from './personal-guide/families/woody/woody.component';
import { FreshComponent } from './personal-guide/families/fresh/fresh.component';
import { OrientalComponent } from './personal-guide/families/oriental/oriental.component';
import { TailoredSelectionComponent } from './tailored-selection/tailored-selection.component';
import { ProductAboutComponent } from './product-about/product-about.component';
import { FavPerfumeComponent } from './personal-guide/fav-perfume/fav-perfume.component';
import { ProductService } from './services/product.service';
import { ProductsComponent } from './products/products.component';
import { CartComponent } from './cart/cart.component';
import { CartService } from './services/cart.service';
import { CartDataService } from './services/cartData.service';
import { SearchComponent } from './search/search.component';
import { ScentFinderComponent } from './personal-guide/scent-finder/scent-finder.component';
import { ScanSmellComponent } from './personal-guide/scan-smell/scan-smell.component';
import { RecommendationService } from './services/recommendation.service';
import { CheckoutComponent } from './checkout/checkout.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HomeComponent,
    NewArrivalComponent,
    BestSellerComponent,
    CollectionComponent,
    MenComponent,
    WomenComponent,
    unisexComponent,
    AboutComponent,
    ContactComponent,
    LoginComponent,
    SignupComponent,
    // ProductDetailsComponent,
    PersonalGuideComponent,
    PerfumeForComponent,
    GenderComponent,
    SeasonComponent,
    FamiliesComponent,
    FloralComponent,
    WoodyComponent,
    FreshComponent,
    OrientalComponent,
    TailoredSelectionComponent,
    ProductAboutComponent,
    FavPerfumeComponent,
    ProductsComponent,
    CartComponent,
    SearchComponent,
    ScentFinderComponent,
    ScanSmellComponent,
    CheckoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
   
    MatMenuModule,
    MatSnackBarModule,
  ],
  providers: [
    ProductService,
    CartService,
    CartComponent,
    SearchComponent,
    RecommendationService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
