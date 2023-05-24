import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PurchaseService } from 'src/app/services/purchase.service';
import { Purchase } from 'src/app/z-interfaces/Purchase';
import { ProductTransporterService } from '../product-transporter.service';

@Component({
  selector: 'app-purchasing-page',
  templateUrl: './purchasing-page.component.html',
  styleUrls: ['./purchasing-page.component.css']
})
export class PurchasingPageComponent implements OnInit {

  constructor(public productTransporter:ProductTransporterService, private router:Router,private purchaseService:PurchaseService) { }

  items:any=[]
  buy(data: Purchase) {
    if (data.count < 11) {
      let numItems = this.items.length;
      let numPurchases = 0;
  
      for (let item of this.items) {
        data.cost = item.price * data.count;
        data.status="ordered";
        let today = new Date();
        data.orderDate = today.getDate().toString() + "/" + today.getMonth().toString() + "/" + today.getFullYear().toString();
  
        this.purchaseService.createPurchase(item.id, data).subscribe({
          next: (success) => {
            if (success != null) {
              numPurchases++;
              if (numPurchases === numItems) {
                this.router.navigateByUrl("/ecom/orders");
              }
            } else {
              window.alert("Something Went Wrong in SERVER");
            }
          },
          error: (e) => {
            window.alert("Something Went Wrong in SERVER");
          }
        })
      }
    } else {
      window.alert("Can't Buy more than 10 items at a time");
    }
  }
  

  ngOnInit(): void {
    if(this.productTransporter.product.price==-1 && this.productTransporter.fromCart.length==0)
          this.router.navigateByUrl("/ecom/products");
    else 
    {  
      if(this.productTransporter.fromCart.length==0)
        this.items.push(this.productTransporter.product);
      else
        this.items=this.productTransporter.fromCart;
    } 
    
    console.log(this.items)
  }

}
