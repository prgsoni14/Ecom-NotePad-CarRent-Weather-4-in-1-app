import { Component, OnInit } from '@angular/core';
import { ImageService } from 'src/app/services/image.service';
import { LaptopService } from 'src/app/services/laptop.service';
import { PurchaseService } from 'src/app/services/purchase.service';
import { UserService } from 'src/app/services/user.service';
import { Product } from 'src/app/z-interfaces/Product';
import { Purchase } from 'src/app/z-interfaces/Purchase';

@Component({
  selector: 'app-e-starter',
  templateUrl: './e-admin.component.html',
  styleUrls: ['./e-admin.component.css']
})
export class EAdminComponent implements OnInit { 

  constructor(private laptopService:LaptopService, private userService:UserService, private imageService:ImageService) { }
  products:any=[];
  delete(id:number, seller:string, index:number){
      this.laptopService.deleteProduct(id,seller).subscribe({
              next:(success:any)=>{
                  if(success.name!="product is already purchased by user")
                    this.products.splice(index,1);
                  else
                    window.alert("Product is already purchased by user")
              },
              error:(e)=>{
                window.alert("You are not authorized")
            }
      })
  }


  addVariable:boolean=false;
  showAdder()
  {
    this.addVariable= !this.addVariable;
  }

  categoryVariable:string=""
  productImagesToAdd:any="";
  addProduct(product:Product)
  {
      
      if(this.categoryVariable=="")
        window.alert("Please select Category");
      else{
          product.images=null;
          product.category=this.categoryVariable;
          this.userService.setUser();
          product.seller=this.userService.username;
          this.laptopService.createProduct(this.prepareFormData(product)).subscribe({
            next:(success:any)=>{ 
              success.product.imageFile = this.imageService.handleImage(success.imageBytes, success.product.images[0]);
              this.products.push(success.product);
            },
            error:(e)=>{
                window.alert("Product name should be unique/SERVER Error");
            }
          });
    }
  }

  prepareFormData(product:Product):FormData
  {
      const formData = new FormData();
      formData.append("product",new Blob([JSON.stringify(product)], {type:"application/json"} ));

      for(let file of this.productImagesToAdd)
      {
          formData.append("images",file);
      }
      
      return formData;
  }
  onImages(event:any)
  {
      if(event.target.files!=null)
      {
          this.productImagesToAdd=event.target.files;
      }
  }


  showSearch:boolean = false;
  searchedArray:any=[];
  searchKeyword:string="";
  search()
  {
      this.showSearch=true;
      this.searchedArray = this.products.filter((product:any)=>{
        return product.name.toLowerCase().includes(this.searchKeyword) ||
               product.description.toLowerCase().includes(this.searchKeyword) ||
               product.description2.toLowerCase().includes(this.searchKeyword) ||
               product.description3.toLowerCase().includes(this.searchKeyword) ||
               product.category.toLowerCase().includes(this.searchKeyword);
      })

      console.log(this.searchedArray);
  }  
  
  ngOnInit(): void { 
    this.laptopService.getProductsByAdmin().subscribe({
      next:(success:any)=>{
        this.products=success.products;
        for(let i=0;i<success.images.length;i++)
        {
            this.products[i].imageFile = this.imageService.handleImage(success.images[i], this.products[i].images[0]);
        }
      },
      error:(e)=>{
        window.alert("Something went wrong in server");
      }
    })
}

}
