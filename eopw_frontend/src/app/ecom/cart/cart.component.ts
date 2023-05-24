import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PurchaseService } from 'src/app/services/purchase.service';
import { ProductTransporterService } from '../product-transporter.service';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private purchaseService:PurchaseService, private router:Router, private productTransporter:ProductTransporterService, private imageService:ImageService) { }
  cartArray:any = []

  deleteFromCart(index:number)
  {
      this.totalCost-=this.cartArray[index].price;
      this.productTransporter.cartSize--;
      this.cartArray.splice(index,1); 
      localStorage.setItem("eopwCart", JSON.stringify(this.cartArray));
  }

  toProduct(index:number)
  {
      this.router.navigateByUrl("/ecom/product/" + this.cartArray[index].id)
  }

  checkout()
  {
    this.productTransporter.fromCart=this.cartArray;
    this.router.navigateByUrl("/ecom/purchasing")
  }

  totalCost:number=0;
  ngOnInit(): void {
      let cartArrayString = localStorage.getItem("eopwCart");
      if(cartArrayString!=null)
      {
            this.cartArray = JSON.parse(cartArrayString);
            for(let i=0;i<this.cartArray.length;i++)
                {
                  this.cartArray[i].imageFile = this.imageService.handleImage(this.cartArray[i].imageBytes, this.cartArray[i].images[0]);
                }

            this.cartArray.reverse();
            for(let item of this.cartArray) {
                    this.totalCost+=item.price;
            }
      }
    }
}
