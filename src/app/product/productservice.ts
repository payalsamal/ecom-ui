import { Injectable } from '@angular/core';
import { Producti } from './producti';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { error } from 'console';

@Injectable({
  providedIn: 'root',
})
export class Productservice {

productList: Producti[] = [];
constructor(private http: HttpClient){

}

saveProduct(product:Producti){
 this.http.post( 'http://localhost:8080/product',product)
.subscribe({
    next: (res) => {
       
      console.log(res); 
     
    },
    error: (err) => {
      console.log(err.status); 
    }
  });
  
}
getProducts():any{
  let headers = new HttpHeaders().set('X-API-Version', '1');
  return this.http.get<Producti[]>('http://localhost:8080/product', { headers })
  
   
   
}

getProductsPage(pageNo:number,size:number):any{
  console.log("in service pageNo:", pageNo, "size:", size); 
  let headers = new HttpHeaders().set('X-API-Version', '3');
  let params = new HttpParams().set("pageNo",pageNo.toString())
  .set("size",size.toString())
  return this.http.get<Producti[]>('http://localhost:8080/product', { headers ,params})
  
   
   
}


}
