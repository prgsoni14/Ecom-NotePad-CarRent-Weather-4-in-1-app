import { Component, OnInit } from '@angular/core';
import { CredService } from 'src/app/services/cred.service';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit {
 

  constructor(private credService:CredService) { }

  submit(data:any)
  {
      this.credService.createCred(data).subscribe({
        next: (success)=>{
            this.items.push(success);
        },
        error :(error)=>{
            window.alert("Something went wrong");
        } 
      }) 
      
  }
  update(data:any)
  {
    this.submit(data);
  }

  delete(id:string, index:number)
  {
    this.credService.deleteCred(id).subscribe({
      next:(success)=>{
        this.items.splice(index,1);
      },
      error:(e)=>{
        window.alert("Something went wrong on Server");
      }
    })
  }


  items:any=[];
  ngOnInit(): void {
    this.credService.getCred().subscribe({
      next: (success)=>{
          this.items=success;
      },
      error :(error)=>{
          window.alert("Something went wrong on Server")
      } 
    })
  }

}
