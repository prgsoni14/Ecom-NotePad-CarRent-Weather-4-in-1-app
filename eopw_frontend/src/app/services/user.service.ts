import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../z-interfaces/User';
import { base } from '../urls';
import { Subject } from 'rxjs';
import { ImageService } from './image.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url:string = base;
  user:any="";
  username:string="";
  isUser:number=0;
  isAdmin:number=0;
  isLoggedin:number=0;
  userPic:string=""
  constructor(private http:HttpClient, private imageService:ImageService) { }
  
  generateToken(data:User)
  {
      return this.http.post( this.url + "/user/generate-token",data);
  }

  getCurrentUser()
  {
      return this.http.get( this.url + "/user/current-user");
  }
 
  setUser()
  {
    let jsonString = localStorage.getItem("current-user");
    if(jsonString!=null)
    {
       this.user=JSON.parse(jsonString);
       this.username=this.user.username;
       this.isLoggedin=1;
       if(this.user.role=="Admin")
          this.isAdmin=1;
       else 
          this.isUser=1;
    } 
  }
  setUserPic()
  {
    if(this.user!="" && this.user.picBytes.length>0)
    {
            const imageFileReceiver =  this.imageService.handleImage(this.user.picBytes,this.user.profilePic);
            this.userPic=imageFileReceiver.url;
    }
  }

  createUser(data:FormData)
  {
    return this.http.post(this.url + "/user/create",data);
  }
  getUser(data:any)
  {
    return this.http.get(this.url +"/user/"+data.username);
  }
  updateUser(data:User)
  {
    this.setUser();
    return this.http.put( this.url + "/user/update/" + this.username,  data);
  }
  deleteUser(id:number)
  {
    this.setUser();
    return this.http.delete(this.url + "/user/delete/" + this.username +"/" + id);
  }
  logOut()
  {
    localStorage.removeItem("current-user");
    localStorage.removeItem("eopwToken");
    localStorage.removeItem("eopwCart");
    this.isUser=0;
    this.isAdmin=0;
    this.isLoggedin=0;
  }
  

  test()
  {
    return this.http.get(this.url + "/",{ responseType: 'text' });
  }
  
}
