import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AuthComponent } from './auth/auth-component/auth.component';
import { SecondLoginGuard } from './auth/second-login.guard';
import { ContactComponent } from './contact-component/contact.component';
import { HomeComponent } from './home-component/home.component';
import { ProductDetailsComponent } from './product-component/product-details/product-details.component';
import { ProductListComponent } from './product-component/product-list/product-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'services', component: ProductListComponent,
          children: [
           { path: '', component: ProductListComponent },
           { path: ':id', component: ProductDetailsComponent }
  ]},
  { path: 'contacts', component: ContactComponent},
  { path: 'login', 
          component: AuthComponent,
          canActivate: [ SecondLoginGuard ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})], 
  exports: [RouterModule]
})
export class AppRoutingModule { }
