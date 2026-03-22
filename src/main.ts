import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app.component';
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Seller } from './app/seller/seller.component';
import { Product } from './app/product/product.component';
bootstrapApplication(App, {
  providers: [
    provideRouter([
      { path: '', component: Seller } ,// 🔹 default route
      { path: 'product', component: Product }  
    ])
  ]
}).catch(err => console.error(err));
