import { Injectable } from '@angular/core';
import { Product } from '../z-interfaces/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductTransporterService {

  constructor() {
    
   }
  product:Product={id:-1,name:"",description:"",description2:"",description3:"",category:"",price:-1,images:"",seller:""};
  cartSize:number=0;
  fromCart:any=[]
  cartSizeGetter()
  {
    let cartArrayString = localStorage.getItem("eopwCart");
    if(cartArrayString!=null)
        this.cartSize = JSON.parse(cartArrayString).length;
  }
}
