import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Cab } from 'src/app/z-interfaces/Cab';
import { TransporterService } from '../transporter.service';

@Component({
  selector: 'app-book-now',
  templateUrl: './book-now.component.html',
  styleUrls: ['./book-now.component.css']
})
export class BookNowComponent implements OnInit {

  constructor(private transporter:TransporterService,private router:Router, private userService:UserService) { }

  book(data:Cab)
  {
      this.transporter.bookingObject=data;
      this.transporter.bookingObject.distance=Number((Math.random()*1000+88).toFixed(2));
      this.transporter.bookingObject.cost=Number((Math.random()*500+32).toFixed(2));
      this.transporter.bookingObject.status="requested";
      let today = new Date();
      this.transporter.bookingObject.bookingDate =today.getDate().toString() + "/" + today.getMonth().toString() + "/" + today.getFullYear().toString();

      if(data.arrivalDate< data.departureDate)
      {
          window.alert("Please Enter valid date");
          return;
      }
      
      this.userService.test().subscribe({
        next:()=>{
            this.router.navigateByUrl("mytour/confirm");
        },
        error:(e)=>{
            window.alert(e);
        }
      })
  }

  getCurrentDate(): string {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }

  getMaxDate(): string {
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 2);
    return maxDate.toISOString().split('T')[0];
  }
  getMaxDate2(): string {
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 2);
    maxDate.setDate(maxDate.getDate() + 7);
    return maxDate.toISOString().split('T')[0];
  }
  

  ngOnInit(): void {

  }

}
