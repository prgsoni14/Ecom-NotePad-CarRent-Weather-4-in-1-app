import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CHomeComponent } from './cred/c-home/c-home.component';
import { CStarterComponent } from './cred/c-starter/c-starter.component';
import { GeneratorComponent } from './cred/generator/generator.component';
import { ManagerComponent } from './cred/manager/manager.component';
import { CartComponent } from './ecom/cart/cart.component';
import { EAdminComponent } from './ecom/e-admin/e-admin.component';
import { EHomeComponent } from './ecom/e-home/e-home.component';
import { EStarterComponent } from './ecom/e-starter/e-starter.component';
import { OrderRequestsComponent } from './ecom/order-requests/order-requests.component';
import { OrdersComponent } from './ecom/orders/orders.component';
import { ProductComponent } from './ecom/product/product.component';
import { ProductsComponent } from './ecom/products/products.component';
import { PurchasingPageComponent } from './ecom/purchasing-page/purchasing-page.component';
import { BookNowComponent } from './mytour/book-now/book-now.component';
import { BookingsComponent } from './mytour/bookings/bookings.component';
import { ConfirmBookingComponent } from './mytour/confirm-booking/confirm-booking.component';
import { MAdminComponent } from './mytour/m-admin/m-admin.component';
import { MHomeComponent } from './mytour/m-home/m-home.component';
import { MStarterComponent } from './mytour/m-starter/m-starter.component';
import { HomeComponent } from './others/home/home.component';
import { LoginComponent } from './others/login/login.component';
import { NotfoundComponent } from './others/notfound/notfound.component';
import { ProfileComponent } from './others/profile/profile.component';
import { SignupComponent } from './others/signup/signup.component';
import { StarterComponent } from './others/starter/starter.component';
import { AdminGuard } from './services/admin.guard';
import { LoggedGuard } from './services/logged.guard';
import { UserGuard } from './services/user.guard';
import { UserUIComponent } from './user-ui/user-ui.component';
import { GetWeatherComponent } from './weather/get-weather/get-weather.component';
import { WHomeComponent } from './weather/w-home/w-home.component';

const routes: Routes = [
  { path: "", component: HomeComponent, children: [

      { path: "", component: StarterComponent },

      { path: "user" ,component: UserUIComponent, children:[
            { path: "profile", component: ProfileComponent, canActivate:[LoggedGuard] },
            { path: "login", component: LoginComponent },
            { path: "signup", component: SignupComponent },
      ]},
      
      { path: "weather", component: WHomeComponent},
      { path: "weather/getWeather", component: GetWeatherComponent},
      

      { path: "ecom", component: EHomeComponent, children: [
          { path: "", component : EStarterComponent},
          { path: "cart", component: CartComponent },
          { path: "products", component: ProductsComponent},
          { path : "product/:id" , component: ProductComponent},
          { path : "purchasing" , component: PurchasingPageComponent,canActivate:[UserGuard] },
          { path: "orders", component:OrdersComponent,canActivate:[UserGuard] },
          { path: "admin", component:EAdminComponent, canActivate:[AdminGuard]},
          { path: "admin/requests", component:OrderRequestsComponent, canActivate:[AdminGuard]},
      ] },

      {
        path: "cred", component: CHomeComponent, children: [
            { path: "", component : CStarterComponent },
            { path: "generator", component: GeneratorComponent },
            { path: "manager", component:ManagerComponent, canActivate:[LoggedGuard]}
        ]
      },

      { path: "mytour", component: MHomeComponent, children: [
        { path: "", component : MStarterComponent},
        { path: "booknow", component:BookNowComponent, canActivate:[UserGuard] },
        { path: "confirm", component:ConfirmBookingComponent, canActivate:[UserGuard]},
        { path: "bookings", component: BookingsComponent, canActivate:[UserGuard]},
        { path: "admin", component:MAdminComponent, canActivate :[AdminGuard]},
      ] },
      
      { path: "**", redirectTo: "/"},

    ]
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
