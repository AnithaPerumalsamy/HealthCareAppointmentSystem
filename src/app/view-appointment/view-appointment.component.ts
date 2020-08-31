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
  appointmentDetails: AppointmentDetails[];
  appointmentDeletedSuccess = false;
  loginSuccess: boolean;
  finalAppointmentDetails: AppointmentDetails[] = [];

  constructor(private authService: AuthService,
    private dataService: DataService,
    private router: Router) { }


  ngOnInit(): void {
    this.appointmentDeletedSuccess = false;
    console.log('LoggedInUserMethod in view page');
    this.memberId = this.authService.getLoggedInUserLocal();
    console.log('MemberId in view ' + this.memberId);

    if (this.memberId === '') {
      console.log('In notlogged in');
      this.loginSuccess = false;
    } else {
      this.loginSuccess = true;
    }
    this.viewAppointmentDetails();

  }

  viewAppointmentDetails() {
    this.appointmentDeletedSuccess = false;
    const url = this.router.url;
    this.dataService.getAllAppointments().subscribe(
      res => {
        console.log('View Appointment Details ' + JSON.stringify(res));
        this.appointmentDetails = res;
        this.appointmentDetails.forEach(appointmentDetail => {
          if (appointmentDetail.memberId === this.memberId) {
            this.finalAppointmentDetails.push(appointmentDetail);
          }
          console.log('Final Appointment ' + JSON.stringify(this.finalAppointmentDetails));
        })
      }, err => {
        console.log('Error occured during viewing appointment details');
      }
    );
  }

  onEditClicked(id: string) {
    this.router.navigateByUrl('/viewAppointment/appointment/edit/' + id);
  }

  onDeleteClicked(id: string) {
    this.router.navigateByUrl('/viewAppointment/deleteUser/delete/' + id);
  }

}
