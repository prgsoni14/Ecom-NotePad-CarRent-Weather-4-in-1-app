import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ProductTransporterService } from '../product-transporter.service';

@Component({
  selector: 'app-e-home',
  templateUrl: './e-home.component.html',
  styleUrls: ['./e-home.component.css']
})
export class EHomeComponent implements OnInit {

  constructor(public userService:UserService, public productTransporter:ProductTransporterService) { }

  ngOnInit(): void {
      this.productTransporter.cartSizeGetter();
  }

}
