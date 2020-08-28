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
import { DataService } from './service/DataService';
import { ViewAppointmentComponent } from './view-appointment/view-appointment.component';
import { DeleteUserComponent } from './delete-user/delete-user.component';
import { DeleteAppointmentComponent } from './delete-appointment/delete-appointment.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    RegisterComponent,
    AppointmentComponent,
    HomeComponent,
    ViewUserDetailsComponent,
    ViewAppointmentComponent,
    DeleteUserComponent,
    DeleteAppointmentComponent
  ],
  imports: [
    NgbModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule.forRoot([
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'header',
        component: HeaderComponent
      },
      {
        path: 'register',
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
        path: 'view/register/edit/:Id',
        component: RegisterComponent
      },
      {
        path: 'view/deleteUser/delete/:Id',
        component: DeleteUserComponent
      },
      {
        path: 'viewAppointment',
        component: ViewAppointmentComponent
      },
      {
        path: 'viewAppointment/appointment/edit/:Id',
        component: AppointmentComponent
      },
      {
        path: 'viewAppointment/deleteUser/delete:Id',
        component: DeleteAppointmentComponent
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
  providers: [DropDownService, AuthService, DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
