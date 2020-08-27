import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppointmentComponent } from './appointment/appointment.component';
import { HomeComponent } from './home/home.component';
import { DropDownService } from './service/DropDownService';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AuthService } from './service/auth.service';
import { ViewUserDetailsComponent } from './view-user-details/view-user-details.component';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    RegisterComponent,
    AppointmentComponent,
    HomeComponent,
    ViewUserDetailsComponent
  ],
  imports: [
    NgbModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule.forRoot([
      {
        path: 'header/login',
        component: LoginComponent
      },
      {
        path: 'header',
        component: HeaderComponent
      },
      {
        path: 'header/register',
        component: RegisterComponent
      },
      {
        path: 'appointment',
        component: AppointmentComponent
      },
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'view',
        component: ViewUserDetailsComponent
      },
      {
        path: 'header/register/:Id',
        component: RegisterComponent
      }
    ]),
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    BsDropdownModule.forRoot(),
    NgxMaterialTimepickerModule,
    TimepickerModule
  ],
  providers: [DropDownService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
