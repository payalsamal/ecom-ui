import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-seller',
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './seller.html',
  styleUrl: './seller.css',
})
export class Seller implements OnInit {


  sellerForm!: FormGroup;
 

  constructor(private fb: FormBuilder, private http: HttpClient,  private router: Router) { }

  ngOnInit(): void {
    this.sellerForm = this.fb.group({
      id: [null],
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      verified: [false]
    });
  }

  onSubmit() {
    
    let headers = new HttpHeaders()
        .set('X-API-Version', '1')
    if (this.sellerForm.valid) {
      
    console.log("inside if");
      

      this.http.post('http://localhost:8080/seller', this.sellerForm.value, { headers })
        .subscribe(res => console.log("saved"+res));
     // console.log(this.sellerForm.value);
    }
     this.http.post('http://localhost:8080/seller', this.sellerForm.value, { headers })
        .subscribe(res => {console.log("saved"+res
          
        )
         this.router.navigate(['/product']);
      }
      );
    console.log(this.sellerForm.value);
  }
}
