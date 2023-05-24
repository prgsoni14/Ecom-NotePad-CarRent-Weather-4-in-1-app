import { Component, OnInit } from '@angular/core';
import { ImageService } from 'src/app/services/image.service';
import { PurchaseService } from 'src/app/services/purchase.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-order-requests',
  templateUrl: './order-requests.component.html',
  styleUrls: ['./order-requests.component.css']
})
export class OrderRequestsComponent implements OnInit {

  constructor(private purchaseService:PurchaseService, private userService:UserService, private imageService:ImageService) { }

  orderRequests:any = [];

  ship(index:number,id:number)
  {
      this.orderRequests[index].status="shipped";
      this.purchaseService.updatePurchaseByAdmin(id,this.orderRequests[index],this.orderRequests[index].product.id).subscribe(
        {
              next:(success:any)=>{
                  
              },
              error:(e)=>{
                  window.alert("Server Error")
              }
        }
      )
  }

  ngOnInit(): void {
    this.purchaseService.getPurchaseRequests().subscribe({
      next:(success:any)=>{
        this.orderRequests=success.purchases;
        for(let i=0;i<success.purchases.length;i++)
        {
            this.orderRequests[i].imageFile = this.imageService.handleImage(success.imagesBytes[i],this.orderRequests[i].product.images[0]);
        }
        this.orderRequests.reverse();
      },
      error:(e)=>{
        window.alert("Server Error")
      }
    })
  }

}
