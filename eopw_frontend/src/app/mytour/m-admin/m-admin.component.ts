import { Component, OnInit } from '@angular/core';
import { CabService } from 'src/app/services/cab.service';

@Component({
  selector: 'app-m-admin',
  templateUrl: './m-admin.component.html',
  styleUrls: ['./m-admin.component.css']
})
export class MAdminComponent implements OnInit {

  constructor(private cabService:CabService) { }

  bookingRequestArray:any= [];

  approve(id:number,index:number)
  {
    this.cabService.approveBookingRequests(id).subscribe({
      next:(success)=>{
          this.bookingRequestArray[index]=success;
      },
      error:(e)=>{
          window.alert("Something went wrong in SERVER");
      }
    })
  }

  approvalShowVariable:boolean=false;
  approvalsArray:any = [];
  showApprovalsByUs()
  {
    this.approvalShowVariable = !this.approvalShowVariable;
    if(this.approvalShowVariable){
        this.cabService.approvedCabsByMe().subscribe({
          next:(success)=>{
            this.approvalsArray=success;
            this.approvalsArray.reverse();
          },
          error:(e)=>{
            window.alert("Something wrong in SERVER");
          }
        })
    }
  }

  ngOnInit(): void {
      this.cabService.getBookingRequests().subscribe({
        next:(success)=>{
            this.bookingRequestArray=success;
            this.bookingRequestArray.reverse();
        },
        error:(e)=>{
            window.alert("Something went wrong in SERVER");
        }
      })
  }

}
