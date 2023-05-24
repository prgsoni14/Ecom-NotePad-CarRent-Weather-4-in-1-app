import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cred } from '../z-interfaces/Cred';
import { base } from '../urls';
import { User } from '../z-interfaces/User';

@Injectable({
  providedIn: 'root'
})
export class CredService {

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

  getCred()
  {
      this.setUsername();
      return this.http.get(this.url +"/credential/" + this.username);
  }

  createCred(data:Cred)
  {
    this.setUsername();
    return this.http.post(this.url +"/credential/create/" + this.username,data);
  }

  deleteCred(id:string)
  {
    this.setUsername();
    return this.http.delete(this.url +"/credential/" + "delete/" +  this.username + "/" + id);
  }
 
}
