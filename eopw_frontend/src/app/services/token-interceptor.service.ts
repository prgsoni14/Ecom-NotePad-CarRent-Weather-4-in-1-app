import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
   
    let authReq = req;
    const token = localStorage.getItem("eopwToken");
    if (!req.url.startsWith("https://api.openweathermap.org") && token != null) {
      authReq = req.clone({
        setHeaders: {
          Authorization: "Bearer " + token
        },
      })
    } 
    
    return next.handle(authReq);
  }
}
