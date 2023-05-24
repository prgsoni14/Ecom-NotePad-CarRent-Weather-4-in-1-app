import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductTransporterService } from 'src/app/ecom/product-transporter.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public userService:UserService,private router:Router,private productTransporter:ProductTransporterService) {  }

  logOut()
  {
    this.userService.logOut();
    this.productTransporter.cartSize=0;
    this.router.navigateByUrl("/");
    
  }

  profile:string="";
  handler:number=0;

  ngOnInit(): void {
    this.userService.setUser();
    this.userService.setUserPic();
  }

}
