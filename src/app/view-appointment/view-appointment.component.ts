import { Component, OnInit } from '@angular/core';
import { AppointmentDetails } from '../models/AppointmentDetails';
import { AuthService } from '../service/auth.service';
import { DataService } from '../service/DataService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-appointment',
  templateUrl: './view-appointment.component.html',
  styleUrls: ['./view-appointment.component.css']
})
export class ViewAppointmentComponent implements OnInit {


  memberId: string;
  appointmentDetails: AppointmentDetails;
  appointmentDeletedSuccess = false;

  constructor(private authService: AuthService,
    private dataService: DataService,
    private router: Router) { }


  ngOnInit(): void {
    this.appointmentDeletedSuccess = false;
    console.log('LoggedInUserMethod in view page');
    this.memberId = this.authService.getLoggedInUserLocal();
    console.log('MemberId in view ' + this.memberId);

    this.viewAppointmentDetails();

  }

  viewAppointmentDetails() {
    this.appointmentDeletedSuccess = false;
    const url = this.router.url;
    this.dataService.getAppointmentDetails(this.memberId).subscribe(
      (data: AppointmentDetails) => {
        this.appointmentDetails = data;
      }
    );
  }



}
