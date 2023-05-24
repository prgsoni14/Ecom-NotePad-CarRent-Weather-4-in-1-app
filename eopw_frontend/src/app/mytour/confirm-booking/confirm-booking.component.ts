import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CabService } from 'src/app/services/cab.service';
import { Cab } from 'src/app/z-interfaces/Cab';
import { TransporterService } from '../transporter.service';

@Component({
  selector: 'app-confirm-booking',
  templateUrl: './confirm-booking.component.html',
  styleUrls: ['./confirm-booking.component.css']
})
export class ConfirmBookingComponent implements OnInit {

  constructor(private transporter:TransporterService,private cabService:CabService,private router:Router) {  }
  cur_booking_object:Cab=this.transporter.bookingObject;

  confirm()
  {
    this.cabService.createBooking(this.cur_booking_object).subscribe({
        next:(success)=>{
          this.router.navigateByUrl("/mytour/bookings")
        },
        error:(e)=>{
          window.alert(e);
        }
    })
  }
  ngOnInit(): void {
      if(this.transporter.bookingObject.fromPlace=="")
          this.router.navigateByUrl("/mytour/booknow")
  }

}
