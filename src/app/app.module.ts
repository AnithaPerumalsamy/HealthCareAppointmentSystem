import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppointmentComponent } from './appointment/appointment.component';
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
import { DatePipe } from '@angular/common';
import { DynamicComponent } from './dynamic/dynamic.component';
import { AdminComponent } from './admin/admin.component';


@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        RegisterComponent,
        AppointmentComponent,
        ViewUserDetailsComponent,
        ViewAppointmentComponent,
        DeleteUserComponent,
        DeleteAppointmentComponent,
        DynamicComponent,
        AdminComponent
    ],
    imports: [
        NgbModule,
        BrowserModule.withServerTransition({ appId: 'serverApp' }),
        HttpClientModule,
        AppRoutingModule,
        RouterModule.forRoot([
            {
                path: 'login',
                component: LoginComponent
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
                path: 'viewAppointment/deleteUser/delete/:Id',
                component: DeleteAppointmentComponent
            },
            {
                path: 'login/register',
                component: RegisterComponent
            },
            {
                path: 'admin',
                component: AdminComponent
            }
        ], {
            //initialNavigation: 'enabled'
        }),
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        BsDatepickerModule.forRoot(),
        BsDropdownModule.forRoot(),
        NgxMaterialTimepickerModule,
        TimepickerModule
    ],
    providers: [AuthService, DataService, DatePipe],
    bootstrap: [AppComponent],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
