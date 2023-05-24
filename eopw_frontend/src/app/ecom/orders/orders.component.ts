import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PurchaseService } from 'src/app/services/purchase.service';
import { ProductTransporterService } from '../product-transporter.service';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  constructor(private purchaseService:PurchaseService, private router:Router, private productTransporter:ProductTransporterService, private imageService:ImageService) { }
  Orders:any=[]
  ngOnInit(): void {
    this.purchaseService.getPurchases().subscribe({
      next:(success:any)=>{
        this.Orders=success.purchases;
        for(let i=0;i<success.purchases.length;i++)
        {
            this.Orders[i].imageFile = this.imageService.handleImage(success.imagesBytes[i],this.Orders[i].product.images[0]);
        }
        this.Orders.reverse();
      }
    })
  }
  cancelOrder(id:number,index:number)
  {
      this.purchaseService.deletePurchase(id).subscribe({
        next:(success:any)=>{
            if(success.owner=="successful")
            {
                this.Orders.splice(index,1);
                this.expandVariable=0;
            }
            else
            {
              window.alert(success.owner);
            }
        },
        
        error:(e)=>{
          window.alert("Something went wrong in SERVER");
        }
      })
  }

  receiveOrder(index:number,id:number)
  {
      let today = new Date();
      let todayString =today.getDate().toString() + "/" + today.getMonth().toString() + "/" + today.getFullYear().toString();
      this.Orders[index].status="delivered on " + todayString;
      this.purchaseService.updatePurchaseByUser(id,this.Orders[index],this.Orders[index].product.id).subscribe(
        {
              next:(success:any)=>{
                  window.alert("Thank You for shopping with Us");
              },
              error:(e)=>{
                  window.alert("Something wrong in Server")
              }
        }
      )
  }

  toProduct(index:number)
  {
      this.router.navigateByUrl("/ecom/product/" + this.Orders[index].product.id)
  }

  expandVariable:number=0;
  expandOrder(index:number)
  {
      if(this.expandVariable==0)
        this.expandVariable=index;
      else
        this.expandVariable=0;
  }




  searchKeyword:string="";
  searchedArray:any=[];
  showSearch:boolean=false;

  search()
  {
      this.showSearch=true;
      this.searchedArray = this.Orders.filter((purchase:any)=>{
        return purchase.product.name.toLowerCase().includes(this.searchKeyword) ||
               purchase.product.description.toLowerCase().includes(this.searchKeyword) ||
               purchase.product.description2.toLowerCase().includes(this.searchKeyword) ||
               purchase.product.description3.toLowerCase().includes(this.searchKeyword) ||
               purchase.product.category.toLowerCase().includes(this.searchKeyword);
      })
  } 

}
