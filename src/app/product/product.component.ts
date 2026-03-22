import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Producti } from './producti';
import { Productservice } from './productservice';
import { CommonModule } from '@angular/common';

@Component({
  
  selector: 'app-product',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './product.html',
  styleUrl: './product.css',
})
export class Product implements OnInit{


   productForm !: FormGroup;
    product !: Producti;
    productService = inject(Productservice);
    productList: Producti[] = [];

   constructor(private fb: FormBuilder, private http: HttpClient){}

   ngOnInit(): void {
     
    this.productForm = this.fb.group({
      id: [null],
      name: ['', [Validators.required, Validators.minLength(3)]],
      category: ['', [Validators.required]],
      price: [0, [Validators.required]],
    
      inStock: [false]
    });
    this.getProducts();

   }

   onSubmit(){
   this.product = this.productForm.value;
   
   this.productService.saveProduct(this.product)
    this.productForm.reset();
    this.getProducts();
   
   }

  getProducts() {
  this.productService.getProducts()
    .subscribe({
      next: (res:any) => {
        this.productList = res;  
         
      },
      error: (err:any) => console.error(err)
    });
    console.log(this.productList.length+" this is the length of the product")
}

}
