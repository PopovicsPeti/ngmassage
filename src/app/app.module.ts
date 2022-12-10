import { NgModule } from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AppComponent } from './app.component';

import { AuthComponent } from './auth/auth-component/auth.component';
import { ContactComponent } from './contact-component/contact.component';
import { HeaderComponent } from './header-component/header.component';
import { HomeComponent } from './home-component/home.component';
import { ProductComponent } from './product-component/product.component';
import { FooterComponent } from './footer/footer.component';
import { ButtonComponent } from './shared/button/button.component';
import { AboutComponent } from './about/about.component';
import { ProductDetailsComponent } from './product-component/product-details/product-details.component';
import { ProductListComponent } from './product-component/product-list/product-list.component';

import { ProductService } from './product-component/product.service';
import { AuthInterceptorService } from './auth/auth-interceptor.service';

import { userModuel } from './user-profil/user.module';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    ContactComponent,
    HeaderComponent,
    HomeComponent,
    ProductComponent,
    FooterComponent,
    ButtonComponent,
    AboutComponent,
    ProductDetailsComponent,
    ProductListComponent 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    userModuel,
  ],
  providers: [ ButtonComponent, 
               ProductService,
               { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}       
    ],
  bootstrap: [AppComponent]

})
export class AppModule { }
