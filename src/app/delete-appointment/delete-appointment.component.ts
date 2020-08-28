import { Component, OnInit } from '@angular/core';
import { AppointmentDetails } from '../models/AppointmentDetails';
import { AuthService } from '../service/auth.service';
import { DataService } from '../service/DataService';
import { Router } from '@angular/router';



@Component({
  selector: 'app-delete-appointment',
  templateUrl: './delete-appointment.component.html',
  styleUrls: ['./delete-appointment.component.css']
})
export class DeleteAppointmentComponent implements OnInit {

  memberId: string;
  appointmentDetails: AppointmentDetails;
  appointmentDeletedSuccess = false;

  constructor(private authService: AuthService,
    private dataService: DataService,
    private router: Router) { }

  ngOnInit(): void {
    this.deleteAppointmentDetails();
  }


  deleteAppointmentDetails() {
    this.appointmentDetails == null;
    console.log('In delete');
    if (this.getParamQueryStringValue()) {
      console.log('delete member id ' + this.getParamQueryStringValue());
      this.dataService.deleteUserDetails(this.getParamQueryStringValue()).subscribe(
        (data: AppointmentDetails) => {
          this.appointmentDetails = data;
          if (this.appointmentDetails != null) {
            this.dataService.deleteAppointmentDetails(this.getParamQueryStringValue()).subscribe();
          }
        }
      );
      this.appointmentDeletedSuccess = true;
    }
  }

  getParamQueryStringValue() {
    const url = this.router.url;
    if (url.includes('delete')) {
      console.log('In delete parama');
      const httpParams = url.split('/');
      console.log(httpParams);
      if (httpParams[4]) {
        console.log('param in delete ' + httpParams[3]);
        return httpParams[4];
      }
    }
  }
}
