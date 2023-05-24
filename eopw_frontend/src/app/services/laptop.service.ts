import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { base } from '../urls';
import { Product } from '../z-interfaces/Product';

@Injectable({
  providedIn: 'root'
})
export class LaptopService {

  url:string=base;
  username:string="";
  constructor(private http:HttpClient) {}

  setUsername()
  {
    let jsonString = localStorage.getItem("current-user");
    if(jsonString!=null)
    {
       this.username=JSON.parse(jsonString).username;
    }
  }
  
  getProducts()
  {
      return this.http.get(this.url + "/product/products");
  }

  getOneProduct(id:number)
  {
      return this.http.get(this.url + "/product/products/OneProduct/" + id);
  }

  

  getProductsByCategory(category:string)
  {
      return this.http.get(this.url + "/product/products/category/" + category);
  }


  getProductsByAdmin()
  {
    this.setUsername();
    return this.http.get(this.url + "/product/products/" + this.username)
  }

  createProduct(data:FormData)
  {
      this.setUsername();
      return this.http.post(this.url + "/product/create/" + this.username, data)
  }

  deleteProduct(id:number, seller:string)
  {
      return this.http.delete(this.url + "/product/delete/" + seller + "/" + id);
  }

}
