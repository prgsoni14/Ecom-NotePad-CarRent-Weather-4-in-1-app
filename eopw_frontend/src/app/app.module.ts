import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EHomeComponent } from './ecom/e-home/e-home.component';
import { WHomeComponent } from './weather/w-home/w-home.component';
import { MHomeComponent } from './mytour/m-home/m-home.component';
import { CHomeComponent } from './cred/c-home/c-home.component';
import { GeneratorComponent } from './cred/generator/generator.component';
import { NotfoundComponent } from './others/notfound/notfound.component';
import { NavbarComponent } from './others/navbar/navbar.component';
import { ManagerComponent } from './cred/manager/manager.component';
import { CartComponent } from './ecom/cart/cart.component';
import { ProfileComponent } from './others/profile/profile.component';
import { FooterComponent } from './others/footer/footer.component';
import { BookNowComponent } from './mytour/book-now/book-now.component';
import { ConfirmBookingComponent } from './mytour/confirm-booking/confirm-booking.component';
import { BookingsComponent } from './mytour/bookings/bookings.component';
import { OrdersComponent } from './ecom/orders/orders.component';
import { ProductComponent } from './ecom/product/product.component';
import { HomeComponent } from './others/home/home.component';
import { StarterComponent } from './others/starter/starter.component';
import { LoginComponent } from './others/login/login.component';
import { SignupComponent } from './others/signup/signup.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { EStarterComponent } from './ecom/e-starter/e-starter.component';
import { CStarterComponent } from './cred/c-starter/c-starter.component';
import { MStarterComponent } from './mytour/m-starter/m-starter.component';
import { EAdminComponent } from './ecom/e-admin/e-admin.component';
import { MAdminComponent } from './mytour/m-admin/m-admin.component';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { NgxUiLoaderModule,NgxUiLoaderHttpModule } from 'ngx-ui-loader';
import { ProductsComponent } from './ecom/products/products.component';
import { UserUIComponent } from './user-ui/user-ui.component';
import { PurchasingPageComponent } from './ecom/purchasing-page/purchasing-page.component';
import { OrderRequestsComponent } from './ecom/order-requests/order-requests.component';
import { GetWeatherComponent } from './weather/get-weather/get-weather.component';


@NgModule({
  declarations: [
    AppComponent,
    EHomeComponent,
    WHomeComponent,
    MHomeComponent,
    CHomeComponent,
    GeneratorComponent,
    NotfoundComponent,
    NavbarComponent,
    ManagerComponent,
    CartComponent,
    ProfileComponent,
    FooterComponent,
    BookNowComponent,
    ConfirmBookingComponent,
    BookingsComponent,
    OrdersComponent,
    ProductComponent,
    HomeComponent,
    StarterComponent,
    LoginComponent,
    SignupComponent,
    EStarterComponent,
    CStarterComponent,
    MStarterComponent,
    EAdminComponent,
    MAdminComponent,
    ProductsComponent,
    UserUIComponent,
    PurchasingPageComponent,
    OrderRequestsComponent,
    GetWeatherComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxUiLoaderModule,
    NgxUiLoaderHttpModule.forRoot({
      showForeground:true
    })
  ],
  providers: [
    {
      provide : HTTP_INTERCEPTORS, 
      useClass : TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
