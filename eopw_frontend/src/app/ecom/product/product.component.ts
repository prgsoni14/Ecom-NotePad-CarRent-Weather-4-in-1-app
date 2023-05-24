import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LaptopService } from 'src/app/services/laptop.service';
import { PurchaseService } from 'src/app/services/purchase.service';
import { UserService } from 'src/app/services/user.service';
import { Product } from 'src/app/z-interfaces/Product';
import { ProductTransporterService } from '../product-transporter.service';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(private router:Router, private productTransporter:ProductTransporterService, public userService:UserService, private route:ActivatedRoute, private laptopService:LaptopService, private imageService:ImageService) {  }
  
  productId:any=-1;
  item:any={}
  boughtVariable:number=0;

  arrayForCart:any = []
  addToCart()
    {
      this.userService.test().subscribe({
        next:()=>{
            console.log("Working fine");
        },
        error:()=>{
            window.alert("SERVER down")
        }
      });
      let cartArrayString = localStorage.getItem("eopwCart");
      if(cartArrayString!=null)
          this.arrayForCart = JSON.parse(cartArrayString);
  
      this.arrayForCart.push(this.item);
      localStorage.setItem("eopwCart", JSON.stringify(this.arrayForCart));

      this.productTransporter.cartSize++;
    }
  
    productImages:any = []
    imageNumber:number=0;
    getImages(imagesBA:any, imagesDetails:any)
    {
        for(let i=0;i<imagesBA.length;i++)
        {
            this.productImages[i]=this.imageService.handleImage(imagesBA[i],imagesDetails[i]);
        }
    }
    swipeRight()
    {
        if(this.imageNumber<this.productImages.length-1)
        this.imageNumber++;
        else
        this.imageNumber=0;
    }
    swipeLeft()
    {
        if(this.imageNumber!=0)
        this.imageNumber--;
        else
        this.imageNumber==this.productImages.length-1;
    }

  

  ngOnInit(): void {
      if(this.route.snapshot.paramMap.get("id")==null)
          this.router.navigateByUrl("/ecom/products");
      else
          this.productId=this.route.snapshot.paramMap.get("id");
      
      this.laptopService.getOneProduct(this.productId).subscribe({
        next:(s:any)=>{
          this.item=s.product;
          this.getImages(s.images, s.product.images);
        },
        error:(e)=>{
          window.alert("Server Issue");
        }
      })
  }

}
