import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Purchase } from '../z-interfaces/Purchase';
import { base } from '../urls';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {
  url:string = base;
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

  getPurchases()
  {
    this.setUsername();
    return this.http.get(this.url + "/purchase/" + this.username);
  }

  createPurchase(id:number,data:Purchase)
  {
    this.setUsername();
    return this.http.post(this.url + "/purchase/create/" + this.username + "/" + id, data);
  } 

  deletePurchase(id:number)
  {
    this.setUsername();
    return this.http.delete(this.url + "/purchase/delete/" + this.username  + "/"  + id);
  }

  updatePurchaseByUser(id:number, data:Purchase,product_id:number)
  {
    this.setUsername();
    return this.http.put(this.url + "/purchase/update/" + this.username  + "/"  + id + "/" + product_id,data);
  }
  updatePurchaseByAdmin(id:number, data:Purchase,product_id:number)
  {
    this.setUsername();
    return this.http.put(this.url + "/adminr/ecom/update/" + this.username  + "/"  + id + "/" + product_id,data);
  }

  getPurchaseRequests()
  {
    this.setUsername();
    return this.http.get(this.url + "/adminr/ecom/request/" + this.username);
  }
  
}
