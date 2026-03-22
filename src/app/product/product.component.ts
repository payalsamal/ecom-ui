import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Producti } from './producti';
import { Productservice } from './productservice';
import { CommonModule } from '@angular/common';

@Component({

  selector: 'app-product',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './product.html',
  styleUrl: './product.css',
})
export class Product implements OnInit {


  productForm !: FormGroup;
  product !: Producti;
  productService = inject(Productservice);
  productList: Producti[] = [];

  pageNo: number = 0;
  size: number = 5;
  totalPages: number = 0;

  constructor(private fb: FormBuilder, private http: HttpClient) { }

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

  onSubmit() {
    this.product = this.productForm.value;

    this.productService.saveProduct(this.product)
    this.getProducts();
    this.productForm.reset();
    

  }

  getProducts() {
    this.productService.getProductsPage( this.pageNo, this.size)
    .subscribe({
      next: (res: any) => {
        console.log("pageNo:", this.pageNo, "size:", this.size);  // 
        this.productList = res.products;   
        this.totalPages = res.totalPage; 
      },
      error: (err:any) => console.error(err)
    });
  }

  


  nextPage() {
  if (this.pageNo < this.totalPages - 1) {
    this.pageNo++;
    this.getProducts();
  }
}

prevPage() {
  if (this.pageNo > 0) {
    this.pageNo--;
    this.getProducts();
  }
}
}
