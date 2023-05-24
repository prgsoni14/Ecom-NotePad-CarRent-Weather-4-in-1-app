import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { base } from '../urls';
import { Cab } from '../z-interfaces/Cab';

@Injectable({
  providedIn: 'root'
}) 
export class CabService {
  url:string = base;
  username:string="";
  constructor(private http:HttpClient) {}
   
  setUsername()
  {
    let jsonString = localStorage.getItem("current-user");
    if(jsonString!=null)
    {
       this.username=JSON.parse(jsonString).username;
    }
  }

  getBookings()
  {
      this.setUsername();
      return this.http.get(this.url + "/cab/" + this.username);
  }

  createBooking(data:Cab)
  {
    this.setUsername();
    return this.http.post(this.url + "/cab/create/" + this.username,data);
  }

  deleteBooking(id:number)
  {
    this.setUsername();
    return this.http.delete(this.url+ "/cab/" + "delete/" +  this.username + "/" + id);
  }

  getBookingRequests()
  {
    this.setUsername();
    return this.http.get(this.url + "/adminr/cab/request/" + this.username);
  }

  approveBookingRequests(id:number)
  {
    this.setUsername();
    return this.http.put(this.url + "/adminr/cab/update/" + this.username + "/" + id, {});
  }

  approvedCabsByMe()
  {
    this.setUsername();
    return this.http.get(this.url + "/adminr/cab/approvals/" + this.username);
  }

}
