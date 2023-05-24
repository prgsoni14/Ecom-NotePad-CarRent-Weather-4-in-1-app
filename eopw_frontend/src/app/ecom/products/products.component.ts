import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LaptopService } from 'src/app/services/laptop.service';
import { PurchaseService } from 'src/app/services/purchase.service';
import { UserService } from 'src/app/services/user.service';
import { ProductTransporterService } from '../product-transporter.service';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(private laptopService:LaptopService, private purchaseService:PurchaseService,private router:Router, private productTransporter:ProductTransporterService, public userService:UserService, private imageService:ImageService) { }
  
  
  products:any=[];
  allProducts:any=[]
  toProduct(index:number)
  {
      this.productTransporter.product=this.products[index];
      this.router.navigateByUrl("/ecom/product/" + this.products[index].id);
  }

  arrayForCart:any = []

  addToCart(index:number)
  {
    this.userService.test().subscribe({
      next:()=>{
          
      },
      error:()=>{
          window.alert("SERVER down")
      }
    });
    let cartArrayString = localStorage.getItem("eopwCart");
    if(cartArrayString!=null)
        this.arrayForCart = JSON.parse(cartArrayString);

    this.arrayForCart.push(this.products[index]);
    localStorage.setItem("eopwCart", JSON.stringify(this.arrayForCart));

    this.productTransporter.cartSize++;
  }

  getByCategory(category:string)
  {
      this.showSearch=false;
      if(category=="All")
         this.ngOnInit();
      else{
            this.laptopService.getProductsByCategory(category).subscribe({
              next:(success:any)=>{
                this.products=success.products;
                for(let i=0;i<success.images.length;i++)
                {
                  this.products[i].imageFile = this.imageService.handleImage(success.images[i], this.products[i].images[0]);
                }
              },
              error:(e)=>{
                window.alert("Something went Wrong in SERVER");
              }
          }
          )
      }
  }

  searchKeyword:string="";
  searchedArray:any=[];
  showSearch:boolean=false;

  search()
  {
      this.showSearch=true;
      this.searchedArray = this.allProducts.filter((product:any)=>{
        return product.name.toLowerCase().includes(this.searchKeyword) ||
               product.description.toLowerCase().includes(this.searchKeyword) ||
               product.description2.toLowerCase().includes(this.searchKeyword) ||
               product.description3.toLowerCase().includes(this.searchKeyword) ||
               product.category.toLowerCase().includes(this.searchKeyword);
      })
  }   

  ngOnInit(): void { 
    this.laptopService.getProducts().subscribe({
      next:(success:any)=>{
        this.products=success.products;
        this.allProducts=success.products;
        
        for(let i=0;i<success.images.length;i++)
        {
          this.products[i].imageFile = this.imageService.handleImage(success.images[i], this.products[i].images[0]);
          this.allProducts[i].imageFile = this.imageService.handleImage(success.images[i], this.products[i].images[0]);
          this.products[i].imageBytes = success.images[i];
          this.allProducts[i].imageBytes = success.images[i];
        }
      },
      error:(e)=>{
        window.alert("Something went wrong in Server");
      }
    })

}
}
